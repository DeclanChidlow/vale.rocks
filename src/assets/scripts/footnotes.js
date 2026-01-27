class FootnotesSidenotes {
	constructor() {
		this.sidenotesBreakpoint = 1500;
		this.gap = 40;
		this.references = document.querySelectorAll("sup a[data-footnote-ref]");
		this.sidenoteContainer = this.createSidenoteContainer();
		this.init();
	}

	init() {
		if (!this.references.length) {
			return;
		}
		this.setupReferences();
		this.updateArticleWidth();
	}

	updateArticleWidth() {
		const article = document.querySelector("article div");
		if (article) {
			const width = article.offsetWidth;
			document.documentElement.style.setProperty("--article-width", `${width}px`);
			return width;
		}
		return null;
	}

	createSidenoteContainer() {
		const container = document.createElement("div");
		container.className = "sidenote-container";
		document.body.appendChild(container);
		return container;
	}

	toggleHighlight(element, action) {
		element.classList[action]("highlight");
	}

	positionSidenote(sidenote, reference, index) {
		if (window.innerWidth < this.sidenotesBreakpoint) {
			return;
		}
		const rect = reference.getBoundingClientRect();

		let top = rect.top + window.scrollY;

		if (index > 0) {
			const prevSidenote = this.sidenoteContainer.children[index - 1];

			const prevBottom = prevSidenote.offsetTop + prevSidenote.offsetHeight;

			if (top < prevBottom + this.gap) {
				top = prevBottom + this.gap;
			}
		}
		sidenote.style.insetBlockStart = `${top}px`;
	}

	createPopover(content, index) {
		const popover = document.createElement("div");
		popover.id = `footnote-popover-${index}`;
		popover.setAttribute("popover", "auto");
		popover.className = "footnote-popover";
		popover.innerHTML = content;
		return popover;
	}

	setupReference(reference, index) {
		const footnoteId = reference.getAttribute("href").substring(1);
		const footnoteContent = document.getElementById(footnoteId).innerHTML;

		const sidenote = document.createElement("div");
		sidenote.className = "sidenote";
		sidenote.innerHTML = footnoteContent;
		this.sidenoteContainer.appendChild(sidenote);

		const button = document.createElement("button");
		button.className = "footnote-button";
		button.id = `footnote-ref-${index + 1}`;
		button.innerHTML = reference.innerHTML;

		const anchorName = `--footnote-ref-${index + 1}`;
		button.style.anchorName = anchorName;

		const popover = this.createPopover(footnoteContent, index);
		popover.style.positionAnchor = anchorName;
		document.body.appendChild(popover);

		reference.parentNode.replaceChild(button, reference);

		["mouseenter", "mouseleave"].forEach((event) => {
			const action = event === "mouseenter" ? "add" : "remove";
			button.addEventListener(event, () => this.toggleHighlight(sidenote, action));
			sidenote.addEventListener(event, () => this.toggleHighlight(button, action));
		});

		button.setAttribute("popovertarget", popover.id);
		button.setAttribute("popovertargetaction", "toggle");

		const updatePosition = () => {
			this.updateArticleWidth();
			this.positionSidenote(sidenote, button, index);
		};

		window.addEventListener("load", updatePosition);
		window.addEventListener("resize", updatePosition);
		document.fonts.ready.then(updatePosition);
	}

	setupReferences() {
		this.references.forEach((reference, index) => this.setupReference(reference, index));
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new FootnotesSidenotes();
});
