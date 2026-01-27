class HeadingLinks {
	constructor() {
		this.headings = document.querySelectorAll("h2, h3, h4, h5, h6");
		this.init();
	}

	init() {
		if (!this.headings.length) {
			console.warn("No headings found");
			return;
		}
		this.setupHeadings();
	}

	createCopyButton(headingText) {
		const button = document.createElement("button");
		button.title = `Copy link to section '${headingText}'.`;
		button.textContent = "§";
		return button;
	}

	createAnchorLink(headingId, headingText) {
		const anchor = document.createElement("a");
		anchor.href = `#${headingId}`;
		anchor.textContent = headingText;
		return anchor;
	}

	async copyLink(headingId, button) {
		const url = new URL(window.location.href);
		url.hash = headingId;
		const linkUrl = url.toString();

		try {
			await navigator.clipboard.writeText(linkUrl);
			const originalText = button.textContent;
			button.textContent = "✓";
			button.classList.add("copied");
			setTimeout(() => {
				button.textContent = originalText;
				button.classList.remove("copied");
			}, 2000);
		} catch (err) {
			console.error("Failed to copy link:", err);
			const originalText = button.textContent;
			button.textContent = "!";
			button.classList.add("error");
			setTimeout(() => {
				button.textContent = originalText;
				button.classList.remove("error");
			}, 2000);
		}
	}

	setupHeading(heading) {
		if (!heading.id || heading.id === "footnote-label") return;
		const headingText = heading.textContent;
		heading.innerHTML = "";
		const anchor = this.createAnchorLink(heading.id, headingText);
		const copyButton = this.createCopyButton(headingText);
		heading.appendChild(anchor);
		heading.appendChild(copyButton);
		copyButton.addEventListener("click", () => this.copyLink(heading.id, copyButton));
	}

	setupHeadings() {
		this.headings.forEach((heading) => this.setupHeading(heading));
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new HeadingLinks();
});
