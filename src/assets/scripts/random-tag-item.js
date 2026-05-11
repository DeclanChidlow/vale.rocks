class RandomItemPicker {
	constructor() {
		this.wrapperDiv = document.querySelector("#main > div");
		if (!this.wrapperDiv) return;

		this.targetParagraph = this.wrapperDiv.querySelector("p");
		if (!this.targetParagraph) return;

		this.itemLinks = Array.from(document.querySelectorAll("article header h2 a")).map((link) => link.href);
		if (this.itemLinks.length === 0) return;
		this.init();
	}

	init() {
		this.injectButton();
	}

	injectButton() {
		const button = document.createElement("button");
		button.className = "random-item";
		button.textContent = "Open Random Item";
		button.addEventListener("click", () => this.openRandomItem());
		this.targetParagraph.insertAdjacentElement("afterend", button);
	}

	openRandomItem() {
		const randomIndex = Math.floor(Math.random() * this.itemLinks.length);
		window.location.href = this.itemLinks[randomIndex];
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new RandomItemPicker();
});
