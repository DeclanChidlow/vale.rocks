document.addEventListener("DOMContentLoaded", async () => {
	const container = document.getElementById("fetched-social-data");
	if (!container) return;

	const SOCIAL_LINKS = document.querySelectorAll(".socials .u-syndication");

	let totalLikes = 0;
	let rawTrees = [];
	const failedSources = new Set();

	class CommentNode {
		constructor({ id, author, content, platform, url, timestamp, children = [], sources = [], isOwner = false, likes = 0 }) {
			this.id = id;
			this.author = author;
			this.content = content;
			this.platform = platform;
			this.url = url;
			this.timestamp = new Date(timestamp);
			this.children = children;
			this.sources = sources.length ? sources : [{ platform, url }];
			this.isOwner = isOwner;
			this.likes = likes;
		}
	}

	function renderBlueskyText(record) {
		if (!record.facets || !record.facets.length) return record.text.replace(/\n/g, "<br>");

		const text = record.text;
		const encoder = new TextEncoder();
		const decoder = new TextDecoder();
		const bytes = encoder.encode(text);

		let html = "";
		let lastIndex = 0;

		const sortedFacets = record.facets.sort((a, b) => a.index.byteStart - b.index.byteStart);

		for (const facet of sortedFacets) {
			const before = bytes.slice(lastIndex, facet.index.byteStart);
			html += decoder.decode(before);

			const facetBytes = bytes.slice(facet.index.byteStart, facet.index.byteEnd);
			const facetText = decoder.decode(facetBytes);

			const linkFeature = facet.features.find((f) => f.$type === "app.bsky.richtext.facet#link");
			const mentionFeature = facet.features.find((f) => f.$type === "app.bsky.richtext.facet#mention");

			if (linkFeature) html += `<a href="${linkFeature.uri}" target="_blank" rel="nofollow noreferrer">${facetText}</a>`;
			else if (mentionFeature) html += `<a href="https://bsky.app/profile/${mentionFeature.did}" target="_blank" rel="nofollow noreferrer">${facetText}</a>`;
			else html += facetText;
			lastIndex = facet.index.byteEnd;
		}

		html += decoder.decode(bytes.slice(lastIndex));
		return html.replace(/\n/g, "<br>");
	}

	function normalize(htmlOrText) {
		const tmp = document.createElement("div");
		tmp.innerHTML = htmlOrText;
		return tmp.textContent
			.toLowerCase()
			.replace(/https?:\/\/[^\s]+/g, "")
			.replace(/[^a-z0-9]/g, "");
	}

	async function fetchAkkoma(url) {
		try {
			const idMatch = url.match(/\/(?:notice|statuses)\/([a-zA-Z0-9]+)/);
			if (!idMatch) return null;
			const postId = idMatch[1];
			const urlObj = new URL(url);
			const apiBase = `${urlObj.origin}/api/v1/statuses/${postId}`;

			const statusRes = await fetch(apiBase);
			if (!statusRes.ok) throw new Error(`Fedi status fetch failed`);
			const statusData = await statusRes.json();
			if (statusData.favourites_count) totalLikes += statusData.favourites_count;
			const rootOwnerId = statusData.account.id;
			const contextRes = await fetch(`${apiBase}/context`);
			if (!contextRes.ok) throw new Error(`Fedi context fetch failed`);
			const contextData = await contextRes.json();

			const descendants = contextData.descendants || [];
			const nodeMap = new Map();

			descendants.forEach((d) => {
				if (!d.content || !d.content.trim()) return;

				let parsedContent = d.content.replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi, '<a href="$1" target="_blank" rel="nofollow noreferrer">[Attached Image]</a>');

				parsedContent = parsedContent.replace(/<a\s+([^>]+)>/gi, (match, attrs) => {
					let updatedAttrs = attrs;
					if (!/target=/i.test(updatedAttrs)) updatedAttrs += ' target="_blank"';
					if (!/rel=/i.test(updatedAttrs)) {
						updatedAttrs += ' rel="nofollow noreferrer"';
					} else {
						updatedAttrs = updatedAttrs.replace(/rel=["'][^"']*["']/i, 'rel="nofollow noreferrer"');
					}
					return `<a ${updatedAttrs}>`;
				});

				if (d.media_attachments && d.media_attachments.length > 0) {
					const images = d.media_attachments.filter((m) => m.type === "image");
					if (images.length > 0) {
						parsedContent += "<br><br>" + images.map((m) => `<a href="${m.url}" target="_blank" rel="nofollow noreferrer">[Attached Image]</a>`).join(" ");
					}
				}

				nodeMap.set(
					d.id,
					new CommentNode({
						id: d.id,
						author: d.account.display_name || d.account.username,
						content: parsedContent,
						platform: "Fediverse",
						url: d.url,
						timestamp: d.created_at,
						isOwner: d.account.id === rootOwnerId,
						likes: d.favourites_count || 0,
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
			const pathParts = urlObj.pathname.split("/");
			const handle = pathParts[2];
			const rkey = pathParts[4];

			const resolveRes = await fetch(`https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${handle}`);
			const { did } = await resolveRes.json();

			const atUri = `at://${did}/app.bsky.feed.post/${rkey}`;
			const threadRes = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${atUri}&depth=10`);
			const data = await threadRes.json();

			if (!data.thread) return [];

			if (data.thread.post?.likeCount) totalLikes += data.thread.post.likeCount;
			const rootDid = data.thread.post.author.did;
			function convertToNode(bskyNode) {
				const labels = bskyNode.post.labels || [];
				if (labels.some((l) => l.val === "hide" || l.val === "!hide") || !bskyNode.post.record.text?.trim()) return null;

				let imageText = "";
				if (bskyNode.post.embed) {
					const embed = bskyNode.post.embed;
					if (embed.$type === "app.bsky.embed.images#view" && embed.images) {
						imageText = "<br><br>" + embed.images.map((img) => `<a href="${img.fullsize || img.thumb}" target="_blank" rel="nofollow noreferrer">[Attached Image]</a>`).join(" ");
					} else if (embed.$type === "app.bsky.embed.recordWithMedia#view" && embed.media && embed.media.images) {
						imageText = "<br><br>" + embed.media.images.map((img) => `<a href="${img.fullsize || img.thumb}" target="_blank" rel="nofollow noreferrer">[Attached Image]</a>`).join(" ");
					}
				}

				const node = new CommentNode({
					id: bskyNode.post.uri,
					author: bskyNode.post.author.displayName || bskyNode.post.author.handle,
					content: `<p>${renderBlueskyText(bskyNode.post.record)}${imageText}</p>`,
					platform: "Bluesky",
					url: `https://bsky.app/profile/${bskyNode.post.author.did}/post/${bskyNode.post.uri.split("/").pop()}`,
					timestamp: bskyNode.post.record.createdAt,
					isOwner: bskyNode.post.author.did === rootDid,
					likes: bskyNode.post.likeCount || 0,
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

	function filterNodes(nodes, articleText) {
		return nodes.filter((node) => {
			if (node.isOwner) {
				const norm = normalize(node.content);
				if (norm.length > 20 && articleText.includes(norm)) return false;
			}

			node.children = filterNodes(node.children, articleText);
			return true;
		});
	}

	function mergeTrees(nodes) {
		const mergedNodes = [];

		nodes.forEach((newNode) => {
			if (!newNode) return;
			const newNorm = normalize(newNode.content);
			const newNormAuthor = normalize(newNode.author);

			const match = mergedNodes.find((existingNode) => normalize(existingNode.content) === newNorm && normalize(existingNode.author) === newNormAuthor);

			if (match) {
				newNode.sources.forEach((s) => {
					if (!match.sources.some((ms) => ms.url === s.url)) match.sources.push(s);
				});
				match.children = match.children.concat(newNode.children);
				match.likes += newNode.likes;
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
		return nodes
			.map((node) => {
				const dateStr = node.timestamp.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
				const sourceLinks = node.sources.map((s) => `<a href="${s.url}" target="_blank" rel="nofollow noreferrer">${s.platform}</a>`).join(" | ");

				const likeBadge =
					node.likes > 0
						? `<span class="reply-likes"><svg viewBox="0 -960 960 960" width="14" height="14" style="fill: currentColor; vertical-align: middle;"><path d="m480-144-50-45q-100-89-165-152T163-454t-52-91-15-84q0-89 61-150t150-61q49 0 95 21t78 59q32-38 78-59t95-21q89 0 150 61t61 150q0 43-14 83t-51 89-103 114-168 156z"/></svg>${node.likes}</span> • `
						: "";

				let childrenHtml = "";
				if (node.children.length > 0) {
					if (depth < 3) childrenHtml = `<div class="comment-children">${renderTree(node.children, depth + 1)}</div>`;
					else {
						const cont = node.sources.map((s) => `<a href="${s.url}" target="_blank" rel="nofollow noreferrer">Continue on ${s.platform}</a>`).join(" | ");
						childrenHtml = `<div class="comment-children"><p><em>${cont}</em></p></div>`;
					}
				}
				return `<div class="comment-item"><div class="comment-meta"><strong>${node.author}</strong> • ${dateStr} • ${likeBadge}${sourceLinks}</div><div class="comment-body readable">${node.content}</div>${childrenHtml}</div>`;
			})
			.join("");
	}

	const articleEl = document.querySelector(".e-content");
	const promises = Array.from(SOCIAL_LINKS).map((link) => {
		if (link.href.includes("bsky.app")) return fetchBluesky(link.href);
		if (link.title === "Fediverse") return fetchAkkoma(link.href);
		return null;
	});

	const results = await Promise.all(promises);

	results.forEach((r) => {
		if (r) rawTrees = rawTrees.concat(r);
	});

	if (articleEl) {
		const articleText = normalize(articleEl.innerText);
		rawTrees = filterNodes(rawTrees, articleText);
	}

	const finalTree = mergeTrees(rawTrees);

	if (totalLikes > 0 || finalTree.length > 0 || failedSources.size > 0) {
		container.style.display = "block";
		let html =
			totalLikes > 0
				? `<div class="likes"><svg viewBox="0 -960 960 960" role="presentation"><path d="m480-144-50-45q-100-89-165-152T163-454t-52-91-15-84q0-89 61-150t150-61q49 0 95 21t78 59q32-38 78-59t95-21q89 0 150 61t61 150q0 43-14 83t-51 89-103 114-168 156z"/></svg> ${totalLikes} ${totalLikes === 1 ? "Like" : "Likes"}</div>`
				: "";

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
