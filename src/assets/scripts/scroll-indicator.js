class ScrollProgressIndicator {
	constructor() {
		this.els = {
			container: document.getElementById("scroll-container"),
			indicator: document.getElementById("indicator"),
			article: document.querySelector("article"),
			tocButton: document.querySelector(".toc-button"),
		};

		if (!this.els.article || !this.els.container) return;

		this.headers = Array.from(this.els.article.querySelectorAll("h2, h3"));
		this.isNarrow = null;
		this.ticking = false;

		this.init();
	}

	init() {
		this.els.container.style.display = "block";
		this.buildUI();
		this.updateLayout();
		this.setupEventListeners();
	}

	create(tag, { classes = [], attrs = {}, text = "", html = "", children = [] } = {}) {
		const el = document.createElement(tag);
		if (classes.length) el.classList.add(...classes);
		Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
		if (text) el.textContent = text;
		if (html) el.innerHTML = html;
		children.forEach((child) => child && el.appendChild(child));
		return el;
	}

	buildUI() {
		// Percentage Display (Wide only)
		this.els.percentDisplay = this.create("span", {
			classes: ["scroll-percentage"],
			children: [this.create("span", { classes: ["sr-only"], text: "Article progress: " }), (this.els.percentText = this.create("span", { text: "0%" }))],
		});
		this.els.container.appendChild(this.els.percentDisplay);

		// Markers Track
		this.els.markerNav = this.create("nav", {
			attrs: { "aria-label": "Table of contents" },
			children: [(this.els.markerList = this.create("ol"))],
		});
		this.els.container.appendChild(this.els.markerNav);

		// Popover Menu (Narrow only)
		this.els.mobileMenu = this.create("nav", {
			classes: ["horizontal-layout-container"],
			attrs: { "id": "toc-menu", "popover": "manual", "aria-label": "Table of contents" },
		});

		this.els.mobilePercent = this.create("div", { classes: ["horizontal-percentage"], text: "Article progress: 0%" });
		this.els.headerList = this.create("ol");

		const closeBtn = this.create("button", {
			classes: ["close"],
			attrs: { popovertarget: "toc-menu" },
			html: `<svg viewBox="0 -960 960 960"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg>`,
		});

		this.els.mobileMenu.append(this.els.mobilePercent, this.els.headerList, closeBtn);
		this.els.container.appendChild(this.els.mobileMenu);

		this.generateNarrowMenuLinks();
	}

	generateNarrowMenuLinks() {
		let currentH2List = null;

		this.headers.forEach((header) => {
			const rawText = header.querySelector("a")?.textContent.trim() ?? header.textContent.trim();

			const link = this.create("a", {
				attrs: { href: `#${header.id}` },
				text: rawText,
			});

			const li = this.create("li", {
				classes: ["header-list-link"],
				children: [link],
			});

			if (header.tagName.toLowerCase() === "h2") {
				this.els.headerList.appendChild(li);
				currentH2List = li;
			} else if (currentH2List) {
				let subUl = currentH2List.querySelector("ul");
				if (!subUl) {
					subUl = this.create("ul", { classes: ["headers-sublist"] });
					currentH2List.appendChild(subUl);
				}
				subUl.appendChild(li);
			} else {
				this.els.headerList.appendChild(li);
			}
		});
	}

	setupEventListeners() {
		document.addEventListener(
			"scroll",
			() => {
				if (!this.ticking) {
					window.requestAnimationFrame(() => {
						this.updateProgress();
						this.ticking = false;
					});
					this.ticking = true;
				}
			},
			{ passive: true },
		);

		window.addEventListener("resize", () => this.updateLayout());

		this.els.article.querySelectorAll("img").forEach((img) => {
			if (!img.complete) {
				img.addEventListener("load", () => this.updateLayout());
			}
		});

		this.els.mobileMenu.addEventListener("toggle", (e) => {
			if (e.newState === "open") {
				document.documentElement.style.setProperty("--toc-height", `${this.els.mobileMenu.offsetHeight}px`);
			}
		});
	}

	getDimensions() {
		const scrollTop = window.scrollY;
		const articleHeight = this.els.article.scrollHeight;
		const viewHeight = window.innerHeight;
		const currentScroll = scrollTop - this.els.article.offsetTop;
		const maxScroll = articleHeight - viewHeight;

		return {
			scrollTop: Math.max(0, Math.min(currentScroll, maxScroll)),
			maxScroll,
			articleHeight,
			viewHeight,
		};
	}

	updateLayout() {
		const newIsNarrow = window.innerWidth <= 45 * parseFloat(getComputedStyle(document.documentElement).fontSize);

		if (this.isNarrow !== newIsNarrow) {
			this.isNarrow = newIsNarrow;

			this.els.mobileMenu.style.display = this.isNarrow ? "" : "none";
			this.els.percentDisplay.style.display = this.isNarrow ? "none" : "block";

			if (this.els.tocButton) {
				this.els.tocButton.style.display = this.isNarrow ? "block" : "none";
			}

			this.els.indicator.style = "";
			this.els.indicator.setAttribute("aria-hidden", "true");
			this.els.markerNav.setAttribute("aria-hidden", this.isNarrow ? "true" : "false");

			this.rebuildMarkers();
		}

		this.updateProgress();
	}

	rebuildMarkers() {
		this.els.markerList.innerHTML = "";
		const { articleHeight, maxScroll } = this.getDimensions();
		const scrollableHeight = maxScroll;

		this.headers
			.filter((h) => h.tagName === "H2")
			.forEach((header) => {
				const topOffset = header.offsetTop - this.els.article.offsetTop;
				const rawText = header.querySelector("a")?.textContent.trim() ?? header.textContent.trim();

				const li = document.createElement("li");

				if (this.isNarrow) {
					const percent = scrollableHeight > 0 ? (topOffset / scrollableHeight) * 100 : 0;
					li.style.insetInlineStart = `${percent}%`;
					li.style.insetBlockStart = "0";
				} else {
					const percent = (topOffset / articleHeight) * 100;
					li.style.insetBlockStart = `${percent}%`;
					li.style.insetInlineStart = "0";
					li.style.inlineSize = "100%";

					const marker = this.create("a", {
						classes: ["heading-marker-h2"],
						attrs: { "href": `#${header.id}`, "aria-label": `Jump to ${rawText}` },
						children: [this.create("span", { classes: ["heading-label"], text: rawText })],
					});
					li.appendChild(marker);
				}

				this.els.markerList.appendChild(li);
			});
	}

	updateProgress() {
		const { scrollTop, maxScroll, articleHeight, viewHeight } = this.getDimensions();
		const rawProgress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
		const progress = Math.round(Math.max(0, Math.min(100, rawProgress)));

		this.els.percentText.textContent = `${progress}%`;
		this.els.mobilePercent.textContent = `Article progress: ${progress}%`;

		if (this.isNarrow) {
			this.els.indicator.style.inlineSize = `${progress}%`;
		} else {
			const barHeight = (viewHeight / articleHeight) * 100;
			const barTop = (scrollTop / articleHeight) * 100;
			this.els.indicator.style.blockSize = `${barHeight}%`;
			this.els.indicator.style.insetBlockStart = `${Math.min(100 - barHeight, barTop)}%`;
		}

		this.updateActiveHeaderState();
	}

	updateActiveHeaderState() {
		const scrollY = window.scrollY;
		let activeHeader = null;
		for (let i = this.headers.length - 1; i >= 0; i--) {
			if (scrollY >= this.headers[i].offsetTop - 100) {
				activeHeader = this.headers[i];
				break;
			}
		}

		const updateList = (container) => {
			if (!container) return;
			container.querySelectorAll("[aria-current]").forEach((el) => el.removeAttribute("aria-current"));
			if (activeHeader) {
				const link = container.querySelector(`a[href="#${activeHeader.id}"]`);
				if (link) link.setAttribute("aria-current", "true");
			}
		};

		updateList(this.els.headerList);
		updateList(this.els.markerList);
	}
}

const scrollIndicator = new ScrollProgressIndicator();
