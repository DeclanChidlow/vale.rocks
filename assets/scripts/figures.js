class FigureGlowLightbox {
	constructor() {
		this.figures = document.querySelectorAll("figure");
		this.init();
	}

	init() {
		if (!this.figures.length) {
			console.warn("No figures found");
			return;
		}
		this.setupFigures();
	}

	createDialog(figure, index) {
		const dialog = document.createElement("dialog");
		dialog.id = `lightbox-${index}`;
		dialog.className = "lightbox";

		const clonedImg = figure.querySelector("img").cloneNode(true);
		const closeButton = this.createCloseButton();

		dialog.appendChild(clonedImg);
		dialog.appendChild(closeButton);

		const caption = this.createCaption(figure);
		if (caption) {
			dialog.appendChild(caption);
		}

		const altText = clonedImg.getAttribute("alt");
		const altElement = this.createAltTextElement(altText);
		if (altElement) {
			dialog.appendChild(altElement);
		}

		return dialog;
	}

	createCaption(figure) {
		const figcaption = figure.querySelector("figcaption");
		if (figcaption) {
			const clonedCaption = figcaption.cloneNode(true);
			clonedCaption.className = "caption";
			return clonedCaption;
		}
		return null;
	}

	createAltTextElement(altText) {
		if (!altText) return null;

		const altElement = document.createElement("p");
		altElement.className = "alt-text";
		altElement.textContent = `Alt Text: ${altText}`;
		return altElement;
	}

	createBlur(img) {
		const blur = document.createElement("div");
		blur.className = "blur";
		blur.style.backgroundImage = `url('${img.src}')`;
		return blur;
	}

	createCloseButton() {
		const closeButton = document.createElement("button");
		closeButton.textContent = "×";
		closeButton.className = "close";
		closeButton.setAttribute("aria-label", "Close lightbox");
		return closeButton;
	}

	addBlurEffect(figure) {
		const wrapper = document.createElement("div");
		wrapper.className = "figure-content-wrapper";
		const originalImg = figure.querySelector("img");
		const blur = this.createBlur(originalImg);
		wrapper.appendChild(blur);
		originalImg.parentNode.insertBefore(wrapper, originalImg);
		wrapper.appendChild(originalImg);
	}

	setupFigure(figure, index) {
		this.addBlurEffect(figure);
		const dialog = this.createDialog(figure, index);
		document.body.appendChild(dialog);
		figure.style.cursor = "zoom-in";
		figure.tabIndex = 0;
		this.setupEventListeners(figure, dialog);
	}

	setupEventListeners(figure, dialog) {
		figure.addEventListener("click", () => {
			dialog.showModal();
		});

		figure.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				dialog.showModal();
			}
		});

		dialog.querySelector(".close").addEventListener("click", () => {
			dialog.close();
		});

		dialog.addEventListener("click", (e) => {
			const rect = dialog.getBoundingClientRect();
			if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
				dialog.close();
			}
		});

		dialog.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				dialog.close();
			}
		});
	}

	setupFigures() {
		this.figures.forEach((figure, index) => this.setupFigure(figure, index));
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new FigureGlowLightbox();
});
