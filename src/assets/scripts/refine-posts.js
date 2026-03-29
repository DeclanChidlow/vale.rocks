class PostRefiner {
	constructor() {
		this.refineBar = document.getElementById("refine-posts");
		this.postsFilter = document.getElementById("posts-filter");
		this.postsSorter = document.getElementById("posts-sort");
		this.postContainer = document.getElementById("posts");

		if (!this.refineBar) return;

		this.postData = Array.from(this.postContainer.querySelectorAll(".post")).map((post) => {
			const infoElements = post.querySelectorAll("ul li");
			const timeElements = infoElements[1].querySelectorAll("time");

			const published = new Date(timeElements[0].getAttribute("datetime")).getTime();

			return {
				element: post,
				type: post.querySelector("p").textContent.trim().toLowerCase(),
				length: parseInt(infoElements[0].textContent) || 0,
				published: published,
				revised: timeElements.length > 1 ? new Date(timeElements[1].getAttribute("datetime")).getTime() : published,
			};
		});

		this.init();
	}

	init() {
		this.refineBar.style.display = "flex";
		this.postsFilter.addEventListener("change", () => this.filterAndSortPosts());
		this.postsSorter.addEventListener("change", () => this.filterAndSortPosts());
	}

	filterAndSortPosts() {
		const filterValue = this.postsFilter.value.toLowerCase();
		const sortValue = this.postsSorter.value;

		const filteredData = this.postData.filter((item) => {
			return filterValue === "all" || item.type === filterValue;
		});

		const [key, direction] = sortValue.split("-");
		const isAsc = direction === "asc";

		filteredData.sort((a, b) => {
			const comparison = a[key] - b[key];
			return isAsc ? comparison : -comparison;
		});

		this.render(filteredData.map((item) => item.element));
	}

	render(elements) {
		const fragment = document.createDocumentFragment();

		if (elements.length === 0) {
			const noResults = document.createElement("div");
			noResults.className = "no-results";
			noResults.textContent = "No results found.";
			fragment.appendChild(noResults);
		} else {
			elements.forEach((el) => fragment.appendChild(el));
		}

		this.postContainer.innerHTML = "";
		this.postContainer.appendChild(fragment);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new PostRefiner();
});
