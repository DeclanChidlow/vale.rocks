document.addEventListener("DOMContentLoaded", async () => {
	const container = document.getElementById("fetched-social-data");
	if (!container) return;

	const SOCIAL_LINKS = document.querySelectorAll(".socials .u-syndication");

	let totalLikes = 0;
	let rawTrees = [];

	class CommentNode {
		constructor({ id, author, content, platform, url, timestamp, children = [], sources = [] }) {
			this.id = id;
			this.author = author;
			this.content = content;
			this.platform = platform;
			this.url = url;
			this.timestamp = new Date(timestamp);
			this.children = children;
			this.sources = sources.length ? sources : [{ platform, url }];
		}
	}

	function renderBlueskyText(record) {
		if (!record.facets || !record.facets.length) {
			return record.text;
		}

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

			if (linkFeature) {
				html += `<a href="${linkFeature.uri}" target="_blank" rel="nofollow">${facetText}</a>`;
			} else if (mentionFeature) {
				html += `<a href="https://bsky.app/profile/${mentionFeature.did}" target="_blank" rel="nofollow">${facetText}</a>`;
			} else {
				html += facetText;
			}

			lastIndex = facet.index.byteEnd;
		}

		html += decoder.decode(bytes.slice(lastIndex));
		return html;
	}

	function normalize(htmlOrText) {
		const txt = document.createElement("textarea");
		txt.innerHTML = htmlOrText;
		let clean = txt.value;

		clean = clean.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
		clean = clean.replace(/https?:\/\/[^\s]+/g, "");
		clean = clean.replace(/\b\w+\.\w+\/[\S]*/g, "");
		clean = clean.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

		return clean.trim().toLowerCase();
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

			const contextRes = await fetch(`${apiBase}/context`);
			if (!contextRes.ok) throw new Error(`Fedi context fetch failed`);
			const contextData = await contextRes.json();

			const descendants = contextData.descendants || [];
			const nodeMap = new Map();

			descendants.forEach((d) => {
				nodeMap.set(
					d.id,
					new CommentNode({
						id: d.id,
						author: d.account.display_name || d.account.username,
						content: d.content,
						platform: "Fediverse",
						url: d.url,
						timestamp: d.created_at,
					}),
				);
			});

			const roots = [];
			descendants.forEach((d) => {
				const node = nodeMap.get(d.id);
				if (d.in_reply_to_id === postId) {
					roots.push(node);
				} else if (nodeMap.has(d.in_reply_to_id)) {
					nodeMap.get(d.in_reply_to_id).children.push(node);
				} else {
					roots.push(node);
				}
			});

			return roots;
		} catch (e) {
			console.error("Akkoma Error:", e);
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
			if (!resolveRes.ok) throw new Error("Bluesky Handle resolve failed");
			const { did } = await resolveRes.json();

			const atUri = `at://${did}/app.bsky.feed.post/${rkey}`;
			const threadRes = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${atUri}&depth=10`);
			if (!threadRes.ok) throw new Error("Bluesky Thread fetch failed");
			const data = await threadRes.json();

			if (!data.thread) return [];

			if (data.thread.post && data.thread.post.likeCount) {
				totalLikes += data.thread.post.likeCount;
			}

			function convertToNode(bskyNode) {
				const labels = bskyNode.post.labels || [];
				if (labels.some((l) => l.val === "hide" || l.val === "!hide")) return null;

				const richContent = renderBlueskyText(bskyNode.post.record);

				const node = new CommentNode({
					id: bskyNode.post.uri,
					author: bskyNode.post.author.displayName || bskyNode.post.author.handle,
					content: `<p>${richContent}</p>`,
					platform: "Bluesky",
					url: `https://bsky.app/profile/${bskyNode.post.author.did}/post/${bskyNode.post.uri.split("/").pop()}`,
					timestamp: bskyNode.post.record.createdAt,
				});

				if (bskyNode.replies) {
					bskyNode.replies.forEach((reply) => {
						const childNode = convertToNode(reply);
						if (childNode) node.children.push(childNode);
					});
				}
				return node;
			}

			if (!data.thread.replies) return [];
			return data.thread.replies.map(convertToNode).filter((n) => n !== null);
		} catch (e) {
			console.error("Bluesky Error:", e);
			return [];
		}
	}

	function levenshtein(a, b) {
		if (a.length === 0) return b.length;
		if (b.length === 0) return a.length;

		const matrix = [];

		for (let i = 0; i <= b.length; i++) {
			matrix[i] = [i];
		}

		for (let j = 0; j <= a.length; j++) {
			matrix[0][j] = j;
		}

		for (let i = 1; i <= b.length; i++) {
			for (let j = 1; j <= a.length; j++) {
				if (b.charAt(i - 1) === a.charAt(j - 1)) {
					matrix[i][j] = matrix[i - 1][j - 1];
				} else {
					matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
				}
			}
		}

		return matrix[b.length][a.length];
	}

	function mergeTrees(nodes) {
		if (!nodes || nodes.length === 0) return [];

		const mergedNodes = [];
		const SIMILARITY_THRESHOLD_PERCENT = 0.2;

		nodes.forEach((newNode) => {
			const newNorm = normalize(newNode.content);

			const match = mergedNodes.find((existingNode) => {
				const existingNorm = normalize(existingNode.content);

				if (newNorm.length < 10 || existingNorm.length < 10) {
					return newNorm === existingNorm;
				}

				const distance = levenshtein(newNorm, existingNorm);
				const maxLength = Math.max(newNorm.length, existingNorm.length);

				return distance / maxLength <= SIMILARITY_THRESHOLD_PERCENT;
			});

			if (match) {
				newNode.sources.forEach((s) => {
					if (!match.sources.some((ms) => ms.url === s.url)) {
						match.sources.push(s);
					}
				});
				match.children = match.children.concat(newNode.children);

				if (newNode.timestamp < match.timestamp) {
					match.timestamp = newNode.timestamp;
				}
			} else {
				mergedNodes.push(newNode);
			}
		});

		mergedNodes.forEach((node) => {
			node.children = mergeTrees(node.children);
		});

		return mergedNodes.sort((a, b) => a.timestamp - b.timestamp);
	}

	function renderTree(nodes) {
		if (!nodes || nodes.length === 0) return "";

		return nodes
			.map((node) => {
				const dateStr = node.timestamp.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
				const sourceLinks = node.sources.map((s) => `<a href="${s.url}" target="_blank" rel="nofollow">${s.platform}</a>`).join(" | ");
				const childrenHtml = node.children && node.children.length > 0 ? `<div class="comment-children">${renderTree(node.children)}</div>` : "";

				return `
					<div class="comment-item">
						<div class="comment-meta">
							<strong>${node.author}</strong> • ${dateStr} • ${sourceLinks}
						</div>
						<div class="comment-body readable">
							${node.content}
						</div>
						${childrenHtml}
					</div>
				`;
			})
			.join("");
	}

	async function init() {
		const promises = [];

		SOCIAL_LINKS.forEach((link) => {
			const href = link.href;
			if (href.includes("bsky.app")) promises.push(fetchBluesky(href));
			else if (link.textContent.toLowerCase().includes("fedi") || link.title.toLowerCase().includes("fediverse") || link.title.toLowerCase().includes("akkoma")) {
				promises.push(fetchAkkoma(href));
			}
		});

		const results = await Promise.all(promises);
		results.forEach((r) => {
			if (r) rawTrees = rawTrees.concat(r);
		});

		const finalTree = mergeTrees(rawTrees);

		if (totalLikes === 0 && finalTree.length === 0) {
			container.style.display = "none";
			return;
		}

		container.style.display = "block";

		let html = "";

		if (totalLikes > 0) {
			html += `<div class="likes"><svg viewBox="0 -960 960 960" role="presentation"><path d="m480-144-50-45q-100-89-165-152T163-454t-52-91-15-84q0-89 61-150t150-61q49 0 95 21t78 59q32-38 78-59t95-21q89 0 150 61t61 150q0 43-14 83t-51 89-103 114-168 156z"/></svg> ${totalLikes} Likes</div>`;
		}

		html += "<h2>Comments</h2>";

		if (finalTree.length > 0) {
			html += `<div class="comments-list">${renderTree(finalTree)}</div>`;
		} else {
			html += `<p><em>No comments yet.</em></p>`;
		}

		container.innerHTML = html;
	}

	init();
});
