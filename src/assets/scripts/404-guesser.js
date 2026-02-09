// Inspired by Gwern's 404 Error Page URL Suggester
// https://gwern.net/static/js/404-guesser.js

class BKTreeNode {
	constructor(word) {
		this.word = word;
		this.children = new Map();
	}
}

class BKTree {
	constructor() {
		this.root = null;
	}

	levenshteinDistance(a, b) {
		if (a.length === 0) return b.length;
		if (b.length === 0) return a.length;

		const matrix = Array(b.length + 1)
			.fill(null)
			.map((_, i) => [i]);
		for (let j = 1; j <= a.length; j++) {
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

	add(word) {
		if (this.root === null) {
			this.root = new BKTreeNode(word);
			return;
		}

		let current = this.root;
		while (true) {
			const distance = this.levenshteinDistance(current.word, word);
			if (distance === 0) {
				// Word already exists
				return;
			}

			if (current.children.has(distance)) {
				current = current.children.get(distance);
			} else {
				current.children.set(distance, new BKTreeNode(word));
				break;
			}
		}
	}

	search(word, maxDistance) {
		if (this.root === null) return [];

		const results = [];
		const stack = [this.root];

		while (stack.length > 0) {
			const current = stack.pop();
			const distance = this.levenshteinDistance(current.word, word);

			if (distance <= maxDistance) {
				results.push({ word: current.word, distance });
			}

			// Add children to stack if they could potentially contain matches
			for (const [childDistance, child] of current.children) {
				if (Math.abs(childDistance - distance) <= maxDistance) {
					stack.push(child);
				}
			}
		}

		return results.sort((a, b) => a.distance - b.distance);
	}
}

class URLSuggester {
	constructor() {
		this.maxDistance = 8;
		this.bkTree = new BKTree();
		this.urls = [];
	}

	async initialize() {
		try {
			const sitemapText = await this.fetchSitemap();
			if (sitemapText) {
				this.urls = this.parseUrls(sitemapText);
				this.urls.forEach((url) => this.bkTree.add(url));

				const currentPath = window.location.pathname;
				if (!currentPath.endsWith("/404")) {
					const normalizedPath = this.normalizePath(currentPath);
					const suggestions = this.findSimilarUrls(normalizedPath);
					this.injectSuggestions(currentPath, suggestions);
				}
			}
		} catch (error) {
			console.error("Error initialising URL suggester:", error);
		}
	}

	normalizePath(path) {
		if (path.startsWith("/blog/")) {
			let slug = path.substring(6);
			slug = slug.replace(/_/g, "-");
			slug = slug.toLowerCase();
			return `/posts/${slug}`;
		}
		return path;
	}

	async fetchSitemap() {
		try {
			const response = await fetch("/sitemap.xml");
			return await response.text();
		} catch (error) {
			console.error("Error fetching sitemap:", error);
			return null;
		}
	}

	parseUrls(sitemapText) {
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(sitemapText, "text/xml");
		const urlNodes = xmlDoc.getElementsByTagName("url");
		return Array.from(urlNodes).map((node) => new URL(node.getElementsByTagName("loc")[0].textContent).pathname);
	}

	findSimilarUrls(targetUrl) {
		const targetPath = new URL(targetUrl, location.origin).pathname;

		if (targetPath.startsWith("/posts/")) {
			const exactMatch = this.urls.find((url) => url === targetPath);
			if (exactMatch) {
				return [location.origin + exactMatch];
			}
		}

		const similarUrls = this.bkTree.search(targetPath, this.maxDistance).filter((item) => !item.word.endsWith("/404.html"));

		const seenUrls = new Set();
		const uniqueSimilarUrls = similarUrls
			.filter((item) => {
				if (seenUrls.has(item.word)) return false;
				seenUrls.add(item.word);
				return true;
			})
			.slice(0, 10);

		return uniqueSimilarUrls.map((item) => location.origin + item.word);
	}

	injectSuggestions(currentPath, suggestions) {
		const app = document.querySelector("#suggestions");
		if (!app) return;

		const container = document.createElement("div");
		if (suggestions.length > 0) {
			const ul = document.createElement("ul");
			const p = document.createElement("p");

			p.innerHTML = `URLs similar to <code>${currentPath}</code>:`;
			container.insertBefore(p, container.firstChild);

			suggestions.forEach((url) => {
				const li = document.createElement("li");
				const a = document.createElement("a");
				const cleanUrl = url.replace(/\.html$/, "");
				a.href = cleanUrl;
				a.textContent = cleanUrl;
				li.appendChild(a);
				ul.appendChild(li);
			});
			container.appendChild(ul);
			const endText = document.createElement("p");
			endText.innerHTML = "<br>Otherwise, you could always try make the page yourself...";
			container.appendChild(endText);
		} else {
			container.innerHTML = `Couldn't find any URLs similar to <code>${currentPath}</code>. Perhaps try <a href='/search'>search</a> for the page instead.<br><br>Otherwise, you can always try to build the page yourself…`;
		}

		container.className = "url-suggestions";
		app.appendChild(container);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new URLSuggester().initialize();
});
