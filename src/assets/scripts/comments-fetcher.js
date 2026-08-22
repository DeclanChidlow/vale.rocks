document.addEventListener("DOMContentLoaded", async () => {
	const container = document.getElementById("fetched-social-data");
	if (!container) return;

	const SOCIAL_LINKS = document.querySelectorAll(".socials .u-syndication");

	let totalLikes = 0;
	let totalReposts = 0;
	let rawTrees = [];
	const failedSources = new Set();
	let fediOwnerId = null;
	let bskyOwnerDid = null;

	class CommentNode {
		constructor({ id, author, authorId, content, platform, url, timestamp, editedAt = null, children = [], sources = [], isOwner = false, likes = 0, reposts = 0, language = null }) {
			this.id = id;
			this.author = author;
			this.authorId = authorId;
			this.content = stripLeadingMentions(content);
			this.platform = platform;
			this.url = url;
			this.timestamp = new Date(timestamp);
			this.editedAt = editedAt ? new Date(editedAt) : null;
			this.children = children;
			this.sources = sources.length ? sources : [{ platform, url }];
			this.isOwner = isOwner;
			this.likes = likes;
			this.reposts = reposts;
			this.language = language;
			this.normContent = normalise(this.content);
			this.normAuthor = normalise(this.author);
		}
	}

	function escapeHtml(value) {
		return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
	}

	function renderBlueskyText(record) {
		const rawText = record.text ?? "";
		if (!record.facets || !record.facets.length) return escapeHtml(rawText).replaceAll("\n", "<br>");

		const encoder = new TextEncoder();
		const decoder = new TextDecoder();
		const bytes = encoder.encode(rawText);

		let html = "";
		let lastIndex = 0;

		const sortedFacets = [...record.facets].sort((a, b) => a.index.byteStart - b.index.byteStart);

		for (const facet of sortedFacets) {
			html += escapeHtml(decoder.decode(bytes.slice(lastIndex, facet.index.byteStart)));

			const facetBytes = bytes.slice(facet.index.byteStart, facet.index.byteEnd);
			const facetText = decoder.decode(facetBytes);

			const linkFeature = facet.features.find((f) => f.$type === "app.bsky.richtext.facet#link");
			const mentionFeature = facet.features.find((f) => f.$type === "app.bsky.richtext.facet#mention");

			if (linkFeature) html += `<a href="${escapeHtml(linkFeature.uri)}" target="_blank" rel="nofollow ugc noreferrer">${escapeHtml(facetText)}</a>`;
			else if (mentionFeature) html += `<a href="https://bsky.app/profile/${escapeHtml(mentionFeature.did)}" target="_blank" rel="nofollow ugc noreferrer">${escapeHtml(facetText)}</a>`;
			else html += escapeHtml(facetText);
			lastIndex = facet.index.byteEnd;
		}

		html += escapeHtml(decoder.decode(bytes.slice(lastIndex)));
		return html.replaceAll("\n", "<br>");
	}

	function mediaTypeLabel(type) {
		const labels = { image: "Image", video: "Video", gifv: "GIF", audio: "Audio", unknown: "Media" };
		return labels[type] || "Media";
	}

	function normalise(htmlOrText) {
		const tmp = document.createElement("div");
		tmp.innerHTML = htmlOrText;
		return tmp.textContent
			.toLowerCase()
			.replace(/https?:\/\/[^\s]+/g, "")
			.replace(/[^a-z0-9]/g, "");
	}

	function sanitiseHTML(html) {
		const tmp = document.createElement("div");
		if (tmp.setHTML) {
			tmp.setHTML(html);
			return tmp.innerHTML;
		}
		return html;
	}

	function stripLeadingMentions(html) {
		const tmp = document.createElement("div");
		tmp.innerHTML = html;

		function removeLeading(node) {
			let changed = false;
			while (node.firstChild) {
				const child = node.firstChild;

				if (child.nodeType === Node.TEXT_NODE) {
					const originalText = child.textContent;
					let text = originalText.replace(/^\s+/, "");

					const plainMentionMatch = text.match(/^(@[^\s,:]+[\s,:]*)+/);
					if (plainMentionMatch) {
						text = text.substring(plainMentionMatch[0].length).replace(/^[\s,:]+/, "");
						changed = true;
					}

					if (text === "") {
						child.remove();
						changed = true;
						continue;
					} else if (text !== originalText) {
						child.textContent = text;
						break;
					} else {
						break;
					}
				}

				if (child.nodeType === Node.ELEMENT_NODE) {
					if (child.tagName === "BR") {
						child.remove();
						changed = true;
						continue;
					}

					if (child.tagName === "P" || child.tagName === "DIV" || child.tagName === "SPAN") {
						if (child.classList && child.classList.contains("h-card")) {
							child.remove();
							changed = true;
							continue;
						}

						const childChanged = removeLeading(child);
						if (child.childNodes.length === 0) {
							child.remove();
							changed = true;
							continue;
						}

						if (childChanged) {
							changed = true;
							continue;
						}
					}

					if (child.tagName === "A" && child.textContent.trim().startsWith("@")) {
						child.remove();
						changed = true;
						continue;
					}

					break;
				}
			}
			return changed;
		}

		removeLeading(tmp);
		const stripped = tmp.innerHTML.trim();
		return stripped === "" ? html : tmp.innerHTML;
	}

	async function fetchAkkoma(url) {
		try {
			const urlObj = new URL(url);
			const pathParts = urlObj.pathname.split("/").filter(Boolean);
			const typeIndex = pathParts.findIndex((part) => part === "notice" || part === "statuses");

			if (typeIndex === -1 || typeIndex >= pathParts.length - 1) return null;

			const postId = pathParts[typeIndex + 1];
			const apiBase = `${urlObj.origin}/api/v1/statuses/${postId}`;

			const statusRes = await fetch(apiBase);
			if (!statusRes.ok) throw new Error(`Fedi status fetch failed`);
			const statusData = await statusRes.json();
			if (statusData.favourites_count) totalLikes += statusData.favourites_count;
			if (statusData.reblogs_count) totalReposts += statusData.reblogs_count;

			const rootOwnerId = statusData.account?.id;
			fediOwnerId = rootOwnerId;
			const contextRes = await fetch(`${apiBase}/context`);
			if (!contextRes.ok) throw new Error(`Fedi context fetch failed`);
			const contextData = await contextRes.json();

			const descendants = contextData.descendants || [];
			const nodeMap = new Map();
			const parser = new DOMParser();

			descendants.forEach((d) => {
				const media = Array.isArray(d.media_attachments) ? d.media_attachments : [];
				if ((!d.content || !d.content.trim()) && media.length === 0) return;

				const doc = parser.parseFromString(d.content || "", "text/html");

				doc.querySelectorAll("img").forEach((img) => {
					const a = doc.createElement("a");
					a.href = img.src;
					a.target = "_blank";
					a.rel = "nofollow ugc noreferrer";
					a.textContent = "[Attached Image]";
					img.replaceWith(a);
				});

				doc.querySelectorAll("a").forEach((a) => {
					a.target = "_blank";
					a.rel = "nofollow ugc noreferrer";
				});

				let parsedContent = doc.body.innerHTML;

				const attachments = media.filter((m) => m.url);
				if (attachments.length > 0) {
					parsedContent += "<br><br>" + attachments.map((m) => `<a href="${escapeHtml(m.url)}" target="_blank" rel="nofollow ugc noreferrer">[Attached ${mediaTypeLabel(m.type)}]</a>`).join(" ");
				}

				nodeMap.set(
					d.id,
					new CommentNode({
						id: d.id,
						author: d.account?.display_name || d.account?.username || "Unknown",
						authorId: d.account?.id || "",
						content: parsedContent,
						platform: "Fediverse",
						url: d.url,
						timestamp: d.created_at,
						editedAt: d.edited_at,
						isOwner: rootOwnerId ? d.account?.id === rootOwnerId : false,
						likes: d.favourites_count || 0,
						reposts: d.reblogs_count || 0,
						language: d.language || null,
					}),
				);
			});

			const roots = [];
			descendants.forEach((d) => {
				const node = nodeMap.get(d.id);
				if (!node) return;

				if (d.in_reply_to_id === postId) roots.push(node);
				else if (nodeMap.has(d.in_reply_to_id)) nodeMap.get(d.in_reply_to_id).children.push(node);
			});

			return roots;
		} catch (e) {
			failedSources.add("Fediverse");
			return [];
		}
	}

	async function fetchBluesky(url) {
		try {
			const urlObj = new URL(url);
			const pathParts = urlObj.pathname.split("/").filter(Boolean);
			const handle = pathParts[1];
			const rkey = pathParts[3];

			const resolveRes = await fetch(`https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${encodeURIComponent(handle)}`);
			if (!resolveRes.ok) throw new Error(`Bluesky handle resolution failed`);
			const { did } = await resolveRes.json();

			const atUri = `at://${did}/app.bsky.feed.post/${rkey}`;
			const threadRes = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${encodeURIComponent(atUri)}&depth=10`);
			if (!threadRes.ok) throw new Error(`Bluesky thread fetch failed`);
			const data = await threadRes.json();

			if (!data.thread || !data.thread.post) {
				failedSources.add("Bluesky");
				return [];
			}

			if (data.thread.post?.likeCount) totalLikes += data.thread.post.likeCount;
			if (data.thread.post?.repostCount) totalReposts += data.thread.post.repostCount;

			const rootDid = data.thread.post.author.did;
			bskyOwnerDid = rootDid;

			function convertToNode(bskyNode) {
				const post = bskyNode.post;
				if (!post || !post.record) return null;

				const labels = post.labels || [];
				if (labels.some((l) => l.val === "hide" || l.val === "!hide")) return null;

				const postUrl = `https://bsky.app/profile/${post.author.did}/post/${post.uri.split("/").pop()}`;

				let attachmentText = "";
				if (post.embed) {
					const embed = post.embed;
					if (embed.$type === "app.bsky.embed.images#view" && embed.images) {
						attachmentText = "<br><br>" + embed.images.map((img) => `<a href="${escapeHtml(img.fullsize || img.thumb)}" target="_blank" rel="nofollow ugc noreferrer">[Attached Image]</a>`).join(" ");
					} else if (embed.$type === "app.bsky.embed.video#view" && embed.playlist) {
						attachmentText = `<br><br><a href="${escapeHtml(postUrl)}" target="_blank" rel="nofollow ugc noreferrer">[Attached Video]</a>`;
					} else if (embed.$type === "app.bsky.embed.recordWithMedia#view" && embed.media) {
						const media = embed.media;
						if (media.$type === "app.bsky.embed.images#view" && media.images) {
							attachmentText =
								"<br><br>" + media.images.map((img) => `<a href="${escapeHtml(img.fullsize || img.thumb)}" target="_blank" rel="nofollow ugc noreferrer">[Attached Image]</a>`).join(" ");
						} else if (media.$type === "app.bsky.embed.video#view" && media.playlist) {
							attachmentText = `<br><br><a href="${escapeHtml(postUrl)}" target="_blank" rel="nofollow ugc noreferrer">[Attached Video]</a>`;
						}
					}
				}

				const text = post.record.text?.trim() ?? "";
				if (!text && !attachmentText) return null;

				const lang = post.record.langs && post.record.langs.length > 0 ? post.record.langs[0] : null;

				const node = new CommentNode({
					id: post.uri,
					author: post.author.displayName || post.author.handle,
					authorId: post.author.did,
					content: `<p>${renderBlueskyText(post.record)}${attachmentText}</p>`,
					platform: "Bluesky",
					url: postUrl,
					timestamp: post.record.createdAt,
					isOwner: post.author.did === rootDid,
					likes: post.likeCount || 0,
					reposts: post.repostCount || 0,
					language: lang,
				});

				if (bskyNode.replies) {
					bskyNode.replies.forEach((reply) => {
						const childNode = convertToNode(reply);
						if (childNode) node.children.push(childNode);
					});
				}
				return node;
			}

			return (data.thread.replies || []).map(convertToNode).filter((n) => n !== null);
		} catch (e) {
			failedSources.add("Bluesky");
			return [];
		}
	}

	function filterNodes(nodes, articleText, pageUrls) {
		return nodes.filter((node) => {
			const isUserPost = (node.platform === "Bluesky" && node.authorId === bskyOwnerDid) || (node.platform === "Fediverse" && node.authorId === fediOwnerId);

			if (isUserPost) {
				const hasLink = pageUrls.some((url) => node.content.includes(url));
				if (hasLink) return false;
			}

			if (node.isOwner && articleText) {
				const norm = node.normContent;
				if (norm.length > 20 && articleText.includes(norm)) return false;
			}

			node.children = filterNodes(node.children, articleText, pageUrls);
			return true;
		});
	}

	function mergeTrees(nodes) {
		const mergedNodes = [];

		nodes.forEach((newNode) => {
			if (!newNode) return;
			const newNorm = newNode.normContent;
			const newNormAuthor = newNode.normAuthor;

			const match = mergedNodes.find((existingNode) => existingNode.normContent === newNorm && existingNode.normAuthor === newNormAuthor);

			if (match) {
				newNode.sources.forEach((s) => {
					if (!match.sources.some((ms) => ms.url === s.url)) match.sources.push(s);
				});
				match.children = match.children.concat(newNode.children);
				match.likes += newNode.likes;
				match.reposts += newNode.reposts;
			} else {
				mergedNodes.push(newNode);
			}
		});

		mergedNodes.forEach((node) => {
			node.children = mergeTrees(node.children);
		});

		return mergedNodes.sort((a, b) => a.timestamp - b.timestamp);
	}

	function renderTree(nodes, depth = 0) {
		const timeOptions = {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			timeZoneName: "short",
		};

		return nodes
			.map((node) => {
				const dateStr = node.timestamp.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
				const fullTimeStr = node.timestamp.toLocaleString(undefined, timeOptions);
				const timeHtml = `<time datetime="${node.timestamp.toISOString()}" title="${escapeHtml(fullTimeStr)}">${dateStr}</time>`;

				const sourceLinks = node.sources.map((s) => `<a href="${escapeHtml(s.url)}" target="_blank" rel="nofollow ugc noreferrer">${escapeHtml(s.platform)}</a>`).join(" | ");

				let editBadge = "";
				if (node.editedAt) {
					const timeDiff = node.editedAt.getTime() - node.timestamp.getTime();
					const fiveMinutes = 5 * 60 * 1000;
					let showEditBadge = timeDiff > fiveMinutes;

					if (!showEditBadge) {
						showEditBadge = node.children.some((child) => child.timestamp < node.editedAt);
					}

					if (showEditBadge) {
						const editTimeStr = node.editedAt.toLocaleString(undefined, timeOptions);
						const editIconSvg = `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M120-120v-170l585-583 167 171-582 582zm584-528 56-56-56-56-56 56z"/></svg>`;
						editBadge = `<span class="edit-badge" title="Edited: ${escapeHtml(editTimeStr)}">${editIconSvg}</span>`;
					}
				}

				const repostBadge =
					node.reposts > 0
						? `<span class="reply-reposts"><svg viewBox="0 0 24 24" width="14" height="14"><path d="m23.25 10.25-1.43 1.4L20 9.82V18H7.82l2-2H18V9.82l-1.82 1.83-1.43-1.4L19 6zM16.18 6l-2 2H6v6.17l1.82-1.82 1.43 1.4L5 18 .75 13.75l1.42-1.4L4 14.17V6z"/></svg> ${node.reposts}</span> `
						: "";

				const likeBadge =
					node.likes > 0
						? `<span class="reply-likes"><svg viewBox="0 -960 960 960" width="14" height="14"><path d="m480-144-50-45q-100-89-165-152T163-454t-52-91-15-84q0-89 61-150t150-61q49 0 95 21t78 59q32-38 78-59t95-21q89 0 150 61t61 150q0 43-14 83t-51 89-103 114-168 156z"/></svg> ${node.likes}</span> `
						: "";

				let childrenHtml = "";
				if (node.children.length > 0) {
					if (depth < 3) childrenHtml = `<div class="comment-children">${renderTree(node.children, depth + 1)}</div>`;
					else {
						const cont = node.sources.map((s) => `<a href="${escapeHtml(s.url)}" target="_blank" rel="nofollow ugc noreferrer">Continued on ${escapeHtml(s.platform)}</a>`).join(" | ");
						childrenHtml = `<div class="comment-children"><p><em>${cont}</em></p></div>`;
					}
				}

				const langAttr = node.language ? ` lang="${escapeHtml(node.language)}"` : "";

				const badgesContainer = repostBadge || likeBadge ? `${repostBadge}${likeBadge}• ` : "";

				return `<div class="comment-item"><div class="comment-meta"><strong>${escapeHtml(node.author)}</strong> • ${timeHtml}${editBadge} • ${badgesContainer}${sourceLinks}</div><div class="comment-body readable"${langAttr}>${sanitiseHTML(node.content)}</div>${childrenHtml}</div>`;
			})
			.join("");
	}

	const articleEl = document.querySelector(".e-content");

	const canonicalTag = document.querySelector("link[rel='canonical']");
	const basePath = window.location.origin + window.location.pathname.replace(/\/$/, "");
	const canonicalBase = canonicalTag ? canonicalTag.href.replace(/\/$/, "") : null;
	const pageUrls = [basePath, canonicalBase].filter(Boolean);

	const promises = Array.from(SOCIAL_LINKS).map((link) => {
		if (link.href.includes("bsky.app")) return fetchBluesky(link.href);
		if (link.title === "Fediverse") return fetchAkkoma(link.href);
		return null;
	});

	const results = await Promise.all(promises);

	results.forEach((r) => {
		if (r) rawTrees = rawTrees.concat(r);
	});

	const articleText = articleEl ? normalise(articleEl.innerText) : "";
	rawTrees = filterNodes(rawTrees, articleText, pageUrls);

	const finalTree = mergeTrees(rawTrees);

	if (totalLikes > 0 || totalReposts > 0 || finalTree.length > 0 || failedSources.size > 0) {
		container.style.display = "block";

		let statsHtml = "";
		if (totalLikes > 0 || totalReposts > 0) {
			statsHtml += `<div class="post-stats">`;
			if (totalReposts > 0) {
				statsHtml += `<span class="stat-reposts"><svg viewBox="0 0 24 24" width="16" height="16"><path d="m23.25 10.25-1.43 1.4L20 9.82V18H7.82l2-2H18V9.82l-1.82 1.83-1.43-1.4L19 6zM16.18 6l-2 2H6v6.17l1.82-1.82 1.43 1.4L5 18 .75 13.75l1.42-1.4L4 14.17V6z"/></svg> ${totalReposts} ${totalReposts === 1 ? "Repost" : "Reposts"}</span>`;
			}
			if (totalLikes > 0) {
				statsHtml += `<span class="stat-likes"><svg viewBox="0 -960 960 960" width="16" height="16"><path d="m480-144-50-45q-100-89-165-152T163-454t-52-91-15-84q0-89 61-150t150-61q49 0 95 21t78 59q32-38 78-59t95-21q89 0 150 61t61 150q0 43-14 83t-51 89-103 114-168 156z"/></svg> ${totalLikes} ${totalLikes === 1 ? "Like" : "Likes"}</span>`;
			}
			statsHtml += `</div>`;
		}

		let html = statsHtml;
		html += `<h2>Comments</h2>`;

		if (failedSources.size > 0) {
			const formatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
			const sourceList = formatter.format(Array.from(failedSources));
			html += `<p class="comments-error-notice"><em>Unable to load comments from ${sourceList} at this time.</em></p>`;
		}

		let commentsListHtml = "";
		if (finalTree.length > 0) {
			commentsListHtml = renderTree(finalTree);
		} else if (failedSources.size === 0) {
			commentsListHtml = "<p><em>No comments yet.</em></p>";
		}

		html += `<div class="comments-list">${commentsListHtml}</div>`;
		container.innerHTML = html;
	}
});
