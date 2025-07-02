class ScrollProgressIndicator {
	constructor() {
		this.scrollContainer = document.getElementById("scroll-container");
		this.indicator = document.getElementById("indicator");
		this.article = document.querySelector("article");
		this.headers = this.article.querySelectorAll("h2, h3");
		this.breakpoint = 700;
		this.currentLayout = null;
		this.percentageDisplay = null;
		this.headersList = null;
		this.horizontalContainer = null;

		this.init();
	}

	init() {
		if (!this.article) {
			console.warn("No article element found");
			return;
		}

		this.scrollContainer.style.display = "block";
		this.createPercentageDisplay();
		this.createHorizontalContainer();
		this.setupEventListeners();
		this.update();
	}

	createPercentageDisplay() {
		this.percentageDisplay = document.createElement("div");
		this.percentageDisplay.className = "scroll-percentage";
		this.percentageDisplay.setAttribute("aria-label", "Reading progress");
		this.percentageDisplay.textContent = "0%";
		this.scrollContainer.appendChild(this.percentageDisplay);
	}

	createHorizontalContainer() {
		this.horizontalContainer = document.createElement("div");
		this.horizontalContainer.className = "horizontal-layout-container";
		this.horizontalContainer.setAttribute("id", "toc-menu");
		this.horizontalContainer.setAttribute("popover", "manual");

		this.horizontalPercentageDiv = document.createElement("div");
		this.horizontalPercentageDiv.className = "horizontal-percentage";
		this.horizontalPercentageDiv.textContent = "Progress: 0%";

		this.headersList = document.createElement("ul");
		this.headersList.className = "headers-list";

		this.horizontalCloseButton = document.createElement("button");
		this.horizontalCloseButton.className = "close";
		this.horizontalCloseButton.setAttribute("aria-label", "Close table of contents");
		this.horizontalCloseButton.setAttribute("popovertarget", "toc-menu");
		this.horizontalCloseButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><title>Close lightbox</title><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg>`;

		this.horizontalContainer.appendChild(this.horizontalPercentageDiv);
		this.horizontalContainer.appendChild(this.headersList);
		this.horizontalContainer.appendChild(this.horizontalCloseButton);
		this.scrollContainer.appendChild(this.horizontalContainer);
	}

	setupEventListeners() {
		document.addEventListener("scroll", () => this.update());
		document.addEventListener("DOMContentLoaded", () => this.update());
		window.addEventListener("resize", () => this.update());

		if (this.horizontalContainer) {
			this.horizontalContainer.addEventListener("toggle", (event) => {
				if (event.newState === "open") {
					requestAnimationFrame(() => {
						this.updateTocHeightVariable();
					});
				}
			});
		}
	}

	getArticleDimensions() {
		const articleRect = this.article.getBoundingClientRect();
		const scrollTop = window.scrollY - this.article.offsetTop;
		const adjustedScrollTop = Math.max(0, Math.min(scrollTop, this.article.scrollHeight));

		return {
			articleTop: articleRect.top + window.scrollY,
			articleHeight: this.article.scrollHeight,
			articleBottom: articleRect.bottom + window.scrollY,
			viewportHeight: window.innerHeight,
			viewportWidth: window.innerWidth,
			scrollTop: adjustedScrollTop,
		};
	}

	calculateProgress() {
		const { articleHeight, viewportHeight, scrollTop } = this.getArticleDimensions();
		const maxScroll = articleHeight - viewportHeight;
		const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

		return Math.max(0, Math.min(100, progress));
	}

	updatePercentageDisplay() {
		const progress = this.calculateProgress();
		const roundedProgress = Math.round(progress);

		if (this.percentageDisplay) {
			this.percentageDisplay.textContent = `${roundedProgress}%`;
		}

		if (this.horizontalPercentageDiv) {
			this.horizontalPercentageDiv.textContent = `Progress: ${roundedProgress}%`;
		}
	}

	getCurrentActiveHeader() {
		const scrollPosition = window.scrollY;
		let activeHeader = null;

		this.headers.forEach((header) => {
			const headerTop = header.offsetTop;
			if (scrollPosition >= headerTop - 100) {
				activeHeader = header;
			}
		});

		return activeHeader;
	}

	updateActiveHeaderInList() {
		if (!this.headersList || this.currentLayout !== true) return;

		const activeHeader = this.getCurrentActiveHeader();

		this.headersList.querySelectorAll(".header-list-link").forEach((link) => {
			link.classList.remove("active");
		});

		if (activeHeader) {
			const activeLink = this.headersList.querySelector(`a[href="#${activeHeader.id}"]`);
			if (activeLink) {
				activeLink.classList.add("active");
			}
		}
	}

	createHeadersList() {
		this.headersList.innerHTML = "";
		let currentH2Item = null;
		let currentH2SubList = null;

		this.headers.forEach((header) => {
			const tagName = header.tagName.toLowerCase();
			const listItem = document.createElement("li");
			const link = document.createElement("a");

			link.href = `#${header.id}`;
			link.textContent = header.querySelector("a") ? header.querySelector("a").textContent : header.textContent;
			link.className = "header-list-link";

			if (tagName === "h2") {
				link.classList.add("header-list-link-h2");
				listItem.appendChild(link);
				this.headersList.appendChild(listItem);

				currentH2Item = listItem;
				currentH2SubList = null;
			} else if (tagName === "h3") {
				link.classList.add("header-list-link-h3");
				listItem.appendChild(link);

				if (!currentH2SubList && currentH2Item) {
					currentH2SubList = document.createElement("ul");
					currentH2SubList.className = "headers-sublist";
					currentH2Item.appendChild(currentH2SubList);
				}

				if (currentH2SubList) {
					currentH2SubList.appendChild(listItem);
				} else {
					this.headersList.appendChild(listItem);
				}
			}
		});
	}

	updateTocHeightVariable() {
		if (this.horizontalContainer) {
			const containerHeight = this.horizontalContainer.offsetHeight;

			document.documentElement.style.setProperty("--toc-height", `${containerHeight}px`);
		}
	}

	createHeaderMarker(header, position, isHorizontal, isInert = false) {
		const markerElement = isInert ? document.createElement("span") : document.createElement("a");
		const tagName = header.tagName.toLowerCase();

		markerElement.className = `heading-marker-container heading-marker-${tagName}`;

		if (!isInert) {
			markerElement.href = `#${header.id}`;
		}

		const line = document.createElement("span");
		line.className = `heading-indicator heading-indicator-${tagName}`;
		line.setAttribute("aria-hidden", "true");

		markerElement.appendChild(line);

		if (!isHorizontal) {
			const label = document.createElement("span");
			label.className = `heading-label heading-label-${tagName}`;
			label.textContent = header.querySelector("a") ? header.querySelector("a").textContent : header.textContent;
			markerElement.appendChild(label);
		}

		if (isHorizontal) {
			markerElement.style.left = `${position}%`;
			markerElement.style.top = "";
		} else {
			markerElement.style.top = `${position}%`;
			markerElement.style.left = "";
		}

		return markerElement;
	}

	resetIndicatorStyles() {
		this.indicator.style.width = "";
		this.indicator.style.height = "";
		this.indicator.style.top = "";
		this.indicator.style.left = "";
	}

	updateIndicator(isHorizontal) {
		const { articleHeight, viewportHeight, scrollTop } = this.getArticleDimensions();

		if (isHorizontal) {
			const width = (scrollTop / (articleHeight - viewportHeight)) * 100;
			const clampedWidth = Math.max(0, Math.min(100, width));
			this.indicator.style.width = `${clampedWidth}%`;
			this.indicator.style.left = "";
			this.indicator.style.top = "";
		} else {
			const height = (viewportHeight / articleHeight) * 100;
			const position = (scrollTop / articleHeight) * 100;
			const clampedPosition = Math.max(0, Math.min(100 - height, position));
			this.indicator.style.height = `${height}%`;
			this.indicator.style.top = `${clampedPosition}%`;
			this.indicator.style.left = "";
		}
	}

	updateHeaderMarkers(isHorizontal) {
		const { articleHeight } = this.getArticleDimensions();
		this.scrollContainer.querySelectorAll(".heading-marker-container").forEach((marker) => marker.remove());
		const h2Headers = Array.from(this.headers).filter((header) => header.tagName.toLowerCase() === "h2");

		if (isHorizontal) {
			this.horizontalContainer.style.display = "";
			this.percentageDisplay.style.display = "none";
			this.createHeadersList();

			h2Headers.forEach((header) => {
				const headerOffset = header.offsetTop - this.article.offsetTop;
				const position = (headerOffset / articleHeight) * 100;
				const marker = this.createHeaderMarker(header, position, isHorizontal, true);
				this.scrollContainer.appendChild(marker);
			});
		} else {
			this.horizontalContainer.style.display = "none";
			this.percentageDisplay.style.display = "block";

			h2Headers.forEach((header) => {
				const headerOffset = header.offsetTop - this.article.offsetTop;
				const position = (headerOffset / articleHeight) * 100;
				const marker = this.createHeaderMarker(header, position, isHorizontal, false);
				this.scrollContainer.appendChild(marker);
			});
		}
	}

	update() {
		const isHorizontal = window.innerWidth <= this.breakpoint;

		if (this.currentLayout !== isHorizontal) {
			this.currentLayout = isHorizontal;
			this.resetIndicatorStyles();
			this.updateHeaderMarkers(isHorizontal);

			const tocButton = document.querySelector(".toc-button");
			if (tocButton) {
				tocButton.style.display = isHorizontal ? "block" : "none";
			}
		}

		this.updateIndicator(isHorizontal);
		this.updatePercentageDisplay();
		this.updateActiveHeaderInList();
	}
}

const scrollIndicator = new ScrollProgressIndicator();
