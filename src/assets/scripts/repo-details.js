class RepoDetails {
	constructor(repo) {
		this.repoUrl = repo;
		this.isGithub = repo.startsWith("github.com/");
		this.repoPath = repo.replace("github.com/", "");
	}

	async fetchStats() {
		if (this.isGithub) return this.fetchGithubStats();
		return null;
	}

	async fetchGithubStats() {
		try {
			const response = await fetch(`https://api.github.com/repos/${this.repoPath}`);
			if (!response.ok) throw new Error();

			const data = await response.json();
			const contributors = await this.fetchGithubContributors();

			return {
				stars: data.stargazers_count,
				forks: data.forks_count,
				contributors,
			};
		} catch {
			return null;
		}
	}

	async fetchGithubContributors() {
		try {
			const response = await fetch(`https://api.github.com/repos/${this.repoPath}/contributors?per_page=1`);
			if (!response.ok) return 0;

			const link = response.headers.get("link");
			if (!link) return 1;

			const match = link.match(/last.*?&page=(\d+)/);
			return match ? parseInt(match[1]) : 1;
		} catch {
			return 0;
		}
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

		listItems.push(`<li class="contributors">${stats.contributors} ${stats.contributors === 1 ? "Contributor" : "Contributors"}</li>`);

		container.innerHTML = listItems.join("");
	}
}
