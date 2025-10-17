class RepoDetails {
	constructor(repo) {
		this.repo = repo;
	}

	async fetchStats() {
		try {
			const response = await fetch(`https://api.github.com/repos/${this.repo}`);
			if (!response.ok) throw new Error("Failed to fetch repo data");

			const data = await response.json();
			const contributors = await this.fetchContributors();

			return {
				stars: data.stargazers_count,
				forks: data.forks_count,
				contributors,
			};
		} catch (error) {
			console.error(`Error fetching stats for ${this.repo}:`, error);
			return { stars: 0, forks: 0, contributors: 0 };
		}
	}

	async fetchContributors() {
		try {
			const response = await fetch(`https://api.github.com/repos/${this.repo}/contributors?per_page=1`);
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

		container.innerHTML = `
			<li class="stars">${stats.stars} ${stats.stars === 1 ? "Star" : "Stars"}</li>
			<li class="forks">${stats.forks} ${stats.forks === 1 ? "Fork" : "Forks"}</li>
			<li class="contributors">${stats.contributors} ${stats.contributors === 1 ? "Contributor" : "Contributors"}</li>
		`;
	}
}
