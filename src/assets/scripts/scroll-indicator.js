class ScrollProgressIndicator {
	constructor() {
		this.scrollContainer = document.getElementById("scroll-container");
		this.indicator = document.getElementById("indicator");
		this.article = document.querySelector("article");
		this.headers = this.article.querySelectorAll("h2");
		this.breakpoint = 700;
		this.currentLayout = null;

		this.init();
	}

	init() {
		if (!this.article) {
			console.warn("No article element found");
			return;
		}

		this.scrollContainer.style.display = "block";
		this.setupEventListeners();
		this.update();
	}

	setupEventListeners() {
		document.addEventListener("scroll", () => this.update());
		document.addEventListener("DOMContentLoaded", () => this.update());
		window.addEventListener("resize", () => this.update());
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

	isScrolledIntoArticle() {
		const { articleTop, articleBottom } = this.getArticleDimensions();
		const viewportTop = window.scrollY;
		const viewportBottom = viewportTop + window.innerHeight;

		return viewportBottom >= articleTop && viewportTop <= articleBottom;
	}

	createHeaderMarker(header, position, isHorizontal) {
		const line = document.createElement("a");
		line.href = `#${header.id}`;
		line.className = "heading-indicator";
		line.setAttribute("data-title", header.textContent);

		if (isHorizontal) {
			line.style.left = `${position}%`;
			line.style.top = "";
		} else {
			line.style.top = `${position}%`;
			line.style.left = "";
		}

		return line;
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
		const { articleHeight, articleTop } = this.getArticleDimensions();

		this.scrollContainer.querySelectorAll(".heading-indicator").forEach((marker) => marker.remove());

		this.headers.forEach((header) => {
			const headerOffset = header.offsetTop - this.article.offsetTop;
			const position = (headerOffset / articleHeight) * 100;
			const marker = this.createHeaderMarker(header, position, isHorizontal);
			this.scrollContainer.appendChild(marker);
		});
	}

	update() {
		const isHorizontal = window.innerWidth <= this.breakpoint;

		if (this.currentLayout !== isHorizontal) {
			this.currentLayout = isHorizontal;
			this.resetIndicatorStyles();
			this.updateHeaderMarkers(isHorizontal);
		}

		this.updateIndicator(isHorizontal);
	}
}

const scrollIndicator = new ScrollProgressIndicator();
