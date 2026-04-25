class LibrarySorting {
	constructor() {
		this.contentType = this.detectContentType();
		if (!this.contentType) return;

		this.contentList = document.querySelector(`.${this.contentType}`);
		this.refineEntries = document.getElementById("refine-entries");
		this.sortSelect = document.getElementById("entries-sort");

		this.platformFilter = document.getElementById("platform-filter");

		if (!this.contentList || !this.sortSelect) return;

		this.refineEntries.style.display = "flex";
		this.items = this.extractItems();

		if (this.platformFilter) {
			this.populatePlatformFilter();
			this.platformFilter.addEventListener("change", () => this.sortContent());
		}

		this.sortSelect.addEventListener("change", () => this.sortContent());

		this.filterMessage = document.createElement("p");
		this.filterMessage.id = "filter-message";
		this.contentList.insertAdjacentElement("afterend", this.filterMessage);

		this.sortContent();
	}

	detectContentType() {
		const types = ["films", "books", "series", "albums", "games", "productions"];
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

			let platforms = [];
			const nextEl = titleElement?.nextElementSibling;

			if (this.contentType !== "productions" && nextEl && nextEl.tagName === "P" && !nextEl.classList.contains("star-rating")) {
				platforms = nextEl.textContent.split(",").map((p) => p.trim());
			}

			return { element: item, year, rating, lastActivity, platforms };
		});
	}

	populatePlatformFilter() {
		const uniquePlatforms = new Set();

		this.items.forEach((item) => {
			if (item.platforms) {
				item.platforms.forEach((platform) => uniquePlatforms.add(platform));
			}
		});

		Array.from(uniquePlatforms)
			.sort()
			.forEach((platform) => {
				const option = document.createElement("option");
				option.value = platform;
				option.textContent = platform;
				this.platformFilter.appendChild(option);
			});
	}

	extractLastActivity(item) {
		const timeElements = item.querySelectorAll("time[datetime]");
		const dates = [];

		if (timeElements.length > 0) {
			timeElements.forEach((timeElement) => {
				const datetime = timeElement.getAttribute("datetime");
				const date = this.parseDateTime(datetime);
				if (date && !isNaN(date.getTime())) {
					dates.push(date.getTime());
				}
			});
		}

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
		} else if (this.contentType === "productions") {
			const nextEl = item.querySelector("h2")?.nextElementSibling;
			if (nextEl && nextEl.tagName === "P") {
				const dateMatch = nextEl.textContent.match(/^(\d{4}(?:-\d{2}-\d{2})?)/);
				if (dateMatch) {
					const date = this.parseDateTime(dateMatch[1]);
					if (date && !isNaN(date.getTime())) {
						dates.push(date.getTime());
					}
				}
			}
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

		if (this.platformFilter && this.platformFilter.value !== "all") {
			sorted = sorted.filter((item) => item.platforms.includes(this.platformFilter.value));
		}

		if (type.startsWith("reviews")) {
			sorted = sorted.filter((item) => item.rating !== null);
		} else if (type.includes("watched") || type.includes("read") || type.includes("played") || type.includes("attended")) {
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
			"attended-desc": (a, b) => (b.lastActivity || 0) - (a.lastActivity || 0),
			"attended-asc": (a, b) => (a.lastActivity || 0) - (b.lastActivity || 0),
		};

		sorted.sort(sorters[type] || (() => 0));

		const filteredCount = sorted.length;
		const totalCount = this.items.length;
		if (filteredCount < totalCount) {
			this.filterMessage.textContent = `Due to your chosen filtering/sorting options, only ${filteredCount} out of ${totalCount} items are displayed.`;
			this.filterMessage.style.display = "block";
		} else {
			this.filterMessage.textContent = "";
			this.filterMessage.style.display = "none";
		}

		this.contentList.replaceChildren(...sorted.map((item) => item.element));
	}
}

document.addEventListener("DOMContentLoaded", () => new LibrarySorting());
