class TagSorter {
	constructor() {
		this.refineBar = document.getElementById("refine-tags");
		this.tagsSorter = document.getElementById("tags-sort");
		this.tagsContainer = document.getElementById("tags-list");

		if (!this.refineBar || !this.tagsSorter || !this.tagsContainer) return;

		this.tagData = Array.from(this.tagsContainer.querySelectorAll("li")).map((li) => {
			return {
				element: li,
				name: li.getAttribute("data-tag-name"),
				count: parseInt(li.getAttribute("data-item-count")) || 0,
				lastDate: li.getAttribute("data-last-date") ? new Date(li.getAttribute("data-last-date")).getTime() : 0,
			};
		});

		this.init();
	}

	init() {
		this.refineBar.style.display = "flex";
		this.tagsSorter.addEventListener("change", () => this.sortTags());
		this.sortTags();
	}

	sortTags() {
		const sortValue = this.tagsSorter.value;

		const sorters = {
			"alphabetical": (a, b) => a.name.localeCompare(b.name),
			"items-desc": (a, b) => b.count - a.count,
			"items-asc": (a, b) => a.count - b.count,
			"date-desc": (a, b) => (b.lastDate || 0) - (a.lastDate || 0),
			"date-asc": (a, b) => (a.lastDate || 0) - (b.lastDate || 0),
		};

		const sorted = [...this.tagData].sort(sorters[sortValue] || sorters.alphabetical);

		this.render(sorted.map((item) => item.element));
	}

	render(elements) {
		const fragment = document.createDocumentFragment();
		elements.forEach((el) => fragment.appendChild(el));
		this.tagsContainer.innerHTML = "";
		this.tagsContainer.appendChild(fragment);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new TagSorter();
});
