class RepoDetails {
	constructor(repo) {
		const [host, ...path] = repo.replace(/^https?:\/\//, "").split("/");
		this.host = host;
		this.repoPath = path.join("/");
	}

	async fetchStats() {
		const key = `repo-details:v1:stats:${this.host}/${this.repoPath.toLowerCase()}`;
		return this.cached(key, 5 * 60 * 1000, () => {
			if (this.host === "github.com") return this.fetchGithubStats();
			if (this.host === "tangled.org" || this.host === "tangled.sh") return this.fetchTangledStats();
			return null;
		});
	}

	async cached(key, maxAge, load) {
		try {
			const cached = JSON.parse(localStorage.getItem(key));
			if (cached && Date.now() - cached.time < maxAge) return cached.value;
		} catch {}

		const value = await load();
		if (value != null) {
			try {
				localStorage.setItem(key, JSON.stringify({ time: Date.now(), value }));
			} catch {}
		}

		return value;
	}

	async fetchJSON(url) {
		try {
			const response = await fetch(url);
			if (!response.ok) return null;

			return await response.json();
		} catch {
			return null;
		}
	}

	async fetchGithubStats() {
		const [repo, contributors] = await Promise.all([this.fetchJSON(`https://api.github.com/repos/${this.repoPath}`), this.fetchGithubContributors()]);

		if (!repo) return null;

		return {
			stars: repo.stargazers_count,
			forks: repo.forks_count,
			contributors,
		};
	}

	async fetchGithubContributors() {
		try {
			const response = await fetch(`https://api.github.com/repos/${this.repoPath}/contributors?per_page=1`);
			if (!response.ok) return 0;

			const match = response.headers.get("link")?.match(/[?&]page=(\d+)>; rel="last"/);
			return match ? Number(match[1]) : 1;
		} catch {
			return 0;
		}
	}

	async fetchTangledDid(handle) {
		const key = `repo-details:v1:tangled:did:${handle.toLowerCase()}`;
		return this.cached(key, 24 * 60 * 60 * 1000, async () => {
			const query = new URLSearchParams({ q: handle, limit: "5" });
			const actors = await this.fetchJSON(`https://api.tangled.org/xrpc/org.tangled.actor.searchActorsTypeahead?${query}`);
			const actor = actors?.actors?.find((candidate) => candidate.handle?.toLowerCase() === handle.toLowerCase());
			if (actor?.did) return actor.did;

			const resolved = await this.fetchJSON(`https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${encodeURIComponent(handle)}`);
			return resolved?.did ?? null;
		});
	}

	async fetchTangledStats() {
		const [owner, name] = this.repoPath.replace(/^@/, "").split("/");
		if (!owner || !name) return null;

		const ownerDid = owner.startsWith("did:") ? owner : await this.fetchTangledDid(owner);
		if (!ownerDid) return null;

		const repoKey = `repo-details:v1:tangled:repo:${ownerDid}/${name.toLowerCase()}`;
		const repo = await this.cached(repoKey, 60 * 60 * 1000, () => {
			const query = new URLSearchParams({ owner: ownerDid, name: name.toLowerCase() });
			return this.fetchJSON(`https://api.tangled.org/xrpc/org.tangled.repo.getRepoByName?${query}`);
		});
		const repoDid = repo?.uri?.split("/")[2];
		if (!repoDid) return null;

		const [stars, forks, contributors] = await Promise.all([
			this.fetchJSON(`https://api.tangled.org/xrpc/org.tangled.feed.countStars?subject=${encodeURIComponent(repoDid)}`),
			this.fetchJSON(`https://api.tangled.org/xrpc/org.tangled.repo.countForks?subject=${encodeURIComponent(repoDid)}`),
			this.fetchTangledContributors(repo),
		]);

		return {
			stars: stars?.distinctAuthors ?? 0,
			forks: forks?.count ?? 0,
			contributors,
		};
	}

	async fetchTangledContributors(repo) {
		const repoDid = repo.uri?.split("/")[2];
		const knot = repo.knot?.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
		if (!repoDid || !knot) return null;

		const contributors = new Set();
		let cursor;
		let pages = 0;

		do {
			const query = new URLSearchParams({ repo: repoDid, ref: repo.defaultBranch || "HEAD", limit: "100" });
			if (cursor) query.set("cursor", cursor);

			const data = await this.fetchJSON(`https://${knot}/xrpc/org.tangled.git.listCommits?${query}`);
			if (!data) return null;

			for (const { author } of data.commits ?? []) {
				const identity = author?.name?.trim().toLowerCase() || author?.email?.trim().toLowerCase();
				if (identity) contributors.add(identity);
			}

			cursor = data.cursor;
			pages++;
		} while (cursor && pages < 50);

		return contributors.size;
	}

	async render() {
		const stats = await this.fetchStats();
		const container = document.getElementById("repo-details");

		if (!stats || !container) return;

		const listItems = [];

		if (stats.stars >= 10) {
			listItems.push(`<li class="stars">${stats.stars} Stars</li>`);
		}

		if (stats.forks >= 5) {
			listItems.push(`<li class="forks">${stats.forks} Forks</li>`);
		}

		if (stats.contributors != null) {
			listItems.push(`<li class="contributors">${stats.contributors} ${stats.contributors === 1 ? "Contributor" : "Contributors"}</li>`);
		}

		container.innerHTML = listItems.join("");
	}
}
