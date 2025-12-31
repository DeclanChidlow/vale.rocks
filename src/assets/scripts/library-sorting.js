class LibrarySorting {
	constructor() {
		this.contentType = this.detectContentType();
		if (!this.contentType) return;

		this.contentList = document.querySelector(`.${this.contentType}`);
		this.refineEntries = document.getElementById("refine-entries");
		this.sortSelect = document.getElementById("entries-sort");

		if (!this.contentList || !this.sortSelect) return;

		this.refineEntries.style.display = "block";
		this.items = this.extractItems();
		this.sortSelect.addEventListener("change", () => this.sortContent());

		this.filterMessage = document.createElement("p");
		this.filterMessage.id = "filter-message";
		this.contentList.insertAdjacentElement("afterend", this.filterMessage);

		this.sortContent();
	}

	detectContentType() {
		const types = ["films", "books", "series", "albums", "games"];
		return types.find((type) => document.querySelector(`.${type}`)) || null;
	}

	extractItems() {
		const items = Array.from(this.contentList.querySelectorAll(":scope > li"));

		return items.map((item) => {
			const titleElement = item.querySelector("h2");
			const year = parseInt(titleElement?.querySelector("span")?.textContent.replace(/[()]/g, ""), 10);
			const ratingElement = item.querySelector(".star-rating");
			const rating = ratingElement ? parseFloat(ratingElement.getAttribute("data-rating")) : null;

			const lastActivity = this.extractLastActivity(item);

			return { element: item, year, rating, lastActivity };
		});
	}

	extractLastActivity(item) {
		const timeElements = item.querySelectorAll("time[datetime]");
		if (timeElements.length === 0) return null;

		const dates = [];
		timeElements.forEach((timeElement) => {
			const datetime = timeElement.getAttribute("datetime");
			const date = this.parseDateTime(datetime);
			if (date && !isNaN(date.getTime())) {
				dates.push(date.getTime());
			}
		});

		if (this.contentType === "books" || this.contentType === "series" || this.contentType === "games") {
			const entries = this.contentType === "books" ? item.querySelectorAll("details[data-pagefind-ignore] ul li") : item.querySelectorAll("details ul li ul li");

			entries.forEach((entry) => {
				const text = entry.textContent;
				const endDateMatch = text.match(/(\d{4}-\d{2}-\d{2})(?:\s*-\s*(\d{4}-\d{2}-\d{2}))?/);
				if (endDateMatch) {
					const dateStr = endDateMatch[2] || endDateMatch[1];
					const date = new Date(dateStr);
					if (!isNaN(date.getTime())) {
						dates.push(date.getTime());
					}
				}
			});
		}

		return dates.length > 0 ? Math.max(...dates) : null;
	}

	parseDateTime(datetime) {
		if (datetime.includes("-")) {
			return new Date(datetime);
		} else {
			return new Date(parseInt(datetime), 0, 1);
		}
	}

	sortContent() {
		const type = this.sortSelect.value;
		let sorted = [...this.items];

		if (type.startsWith("reviews")) {
			sorted = sorted.filter((item) => item.rating !== null);
		} else if (type.includes("watched") || type.includes("read") || type.includes("played")) {
			sorted = sorted.filter((item) => item.lastActivity !== null);
		}

		const sorters = {
			"published-desc": (a, b) => (b.year || 0) - (a.year || 0),
			"published-asc": (a, b) => (a.year || 0) - (b.year || 0),
			"reviews-desc": (a, b) => (b.rating || 0) - (a.rating || 0),
			"reviews-asc": (a, b) => (a.rating || 0) - (b.rating || 0),
			"watched-desc": (a, b) => (b.lastActivity || 0) - (a.lastActivity || 0),
			"watched-asc": (a, b) => (a.lastActivity || 0) - (b.lastActivity || 0),
			"read-desc": (a, b) => (b.lastActivity || 0) - (a.lastActivity || 0),
			"read-asc": (a, b) => (a.lastActivity || 0) - (b.lastActivity || 0),
			"played-desc": (a, b) => (b.lastActivity || 0) - (a.lastActivity || 0),
			"played-asc": (a, b) => (a.lastActivity || 0) - (b.lastActivity || 0),
		};

		sorted.sort(sorters[type] || (() => 0));

		const filteredCount = sorted.length;
		const totalCount = this.items.length;
		if (filteredCount < totalCount) {
			this.filterMessage.textContent = `Due to your chosen sorting option, only ${filteredCount} out of ${totalCount} items are displayed.`;
			this.filterMessage.style.display = "block";
		} else {
			this.filterMessage.textContent = "";
			this.filterMessage.style.display = "none";
		}

		this.contentList.replaceChildren(...sorted.map((item) => item.element));
	}
}

document.addEventListener("DOMContentLoaded", () => new LibrarySorting());
