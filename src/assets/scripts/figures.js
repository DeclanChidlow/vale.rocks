class FigureGlowLightbox {
	constructor() {
		this.figures = document.querySelectorAll("figure:has(img)");
		this.figures.forEach((figure, index) => this.setupFigure(figure, index));
	}

	setupFigure(figure, index) {
		this.addBlurEffect(figure);
		const dialog = this.createDialog(figure, index);
		document.body.appendChild(dialog);

		figure.style.cursor = "zoom-in";
		figure.tabIndex = 0;

		const openLightbox = () => dialog.showModal();
		figure.addEventListener("click", openLightbox);
		figure.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				openLightbox();
			}
		});

		const closeLightbox = () => dialog.close();
		dialog.querySelector(".close").addEventListener("click", closeLightbox);
		dialog.addEventListener("keydown", (e) => e.key === "Escape" && closeLightbox());
		dialog.addEventListener("click", (e) => {
			if (e.target === dialog) closeLightbox();
		});
	}

	createDialog(figure, index) {
		const dialog = document.createElement("dialog");
		dialog.id = `lightbox-${index}`;
		dialog.ariaLabel = "Image Lightbox";
		dialog.className = "lightbox";

		const img = figure.querySelector("img").cloneNode(true);
		const closeButton = this.createCloseButton();

		dialog.append(img, closeButton);

		const figcaption = figure.querySelector("figcaption");
		if (figcaption) {
			const caption = figcaption.cloneNode(true);
			caption.className = "caption";
			dialog.appendChild(caption);
		}

		const altText = img.getAttribute("alt");
		if (altText) {
			const altElement = document.createElement("p");
			altElement.className = "alt-text";
			altElement.textContent = `Alt Text: ${altText}`;
			dialog.appendChild(altElement);
		}

		return dialog;
	}

	createCloseButton() {
		const button = document.createElement("button");
		button.innerHTML = `<svg viewBox="0 -960 960 960"><title>Close lightbox</title><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg>`;
		button.className = "close";
		button.setAttribute("aria-label", "Close lightbox");
		return button;
	}

	addBlurEffect(figure) {
		const img = figure.querySelector("img");
		if (!img) return;

		const wrapper = document.createElement("div");
		wrapper.className = "figure-content-wrapper";

		const blur = document.createElement("div");
		blur.className = "blur";
		blur.style.backgroundImage = `url('${img.src}')`;

		wrapper.appendChild(blur);
		img.parentNode.insertBefore(wrapper, img);
		wrapper.appendChild(img);
	}
}

document.addEventListener("DOMContentLoaded", () => new FigureGlowLightbox());
