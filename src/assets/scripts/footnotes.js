class FootnotesSidenotes {
	constructor() {
		this.sidenotesBreakpoint = 1400;
		this.references = document.querySelectorAll("sup a[data-footnote-ref]");
		this.sidenoteContainer = this.createSidenoteContainer();
		this.articleWidth = this.getArticleWidth();
		this.init();
	}

	init() {
		if (!this.references.length) {
			console.warn("No footnote references found");
			return;
		}
		this.setupReferences();
	}

	getArticleWidth() {
		const article = document.querySelector("article div");
		return article ? article.offsetWidth : null;
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
			if (top < prevBottom) {
				top = prevBottom + 10;
			}
		}
		sidenote.style.top = `${top}px`;
	}

	createPopover(content, index) {
		const popover = document.createElement("div");
		popover.id = `footnote-popover-${index}`;
		popover.setAttribute("popover", "auto");
		popover.className = "footnote-popover";

		if (this.articleWidth) {
			popover.style.maxWidth = `${this.articleWidth}px`;
		}

		const contentWrapper = document.createElement("div");
		contentWrapper.className = "footnote-content";
		contentWrapper.innerHTML = content;
		popover.appendChild(contentWrapper);
		return popover;
	}

	positionPopover(popover, button) {
		const buttonRect = button.getBoundingClientRect();
		const scrollTop = window.scrollY;
		popover.style.top = `${buttonRect.bottom + 10 + scrollTop}px`;
	}

	setupReference(reference, index) {
		if (!reference.id) {
			reference.id = `footnote-ref-${index}`;
		}

		const footnoteId = reference.getAttribute("href").substring(1);
		const footnoteContent = document.getElementById(footnoteId).innerHTML;
		const sidenote = document.createElement("div");
		sidenote.className = "sidenote";
		sidenote.innerHTML = footnoteContent;
		this.sidenoteContainer.appendChild(sidenote);

		const button = document.createElement("button");
		button.className = "footnote-button";
		button.innerHTML = reference.innerHTML;
		const popover = this.createPopover(footnoteContent, index);
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
			this.articleWidth = this.getArticleWidth();
			if (this.articleWidth) {
				popover.style.maxWidth = `${this.articleWidth}px`;
			}
			this.positionSidenote(sidenote, button, index);
		};

		window.addEventListener("load", updatePosition);
		window.addEventListener("resize", updatePosition);
		popover.addEventListener("toggle", (e) => {
			if (popover.matches(":popover-open")) {
				this.positionPopover(popover, button);
			}
		});
	}

	setupReferences() {
		this.references.forEach((reference, index) => this.setupReference(reference, index));
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new FootnotesSidenotes();
});
