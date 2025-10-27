class FigureGlowLightbox {
	constructor() {
		this.figures = document.querySelectorAll("figure:has(img, svg)");
		this.figures.forEach((figure, index) => this.setupFigure(figure, index));
	}

	setupFigure(figure, index) {
		if (figure.querySelector("img")) {
			this.addBlurEffect(figure);
		}
		const dialog = this.createDialog(figure, index);
		document.body.appendChild(dialog);

		const button = document.createElement("button");
		button.innerHTML = `<svg viewBox="0 -960 960 960"><title>Open figure lightbox</title><path d="M144-144v-192h72v120h120v72H144Zm480 0v-72h120v-120h72v192H624ZM144-624v-192h192v72H216v120h-72Zm600 0v-120H624v-72h192v192h-72Z"/></svg>`;
		button.className = "open";
		figure.appendChild(button);

		const openLightbox = () => dialog.showModal();
		button.addEventListener("click", openLightbox);

		const closeLightbox = () => dialog.close();
		dialog.querySelector(".close").addEventListener("click", closeLightbox);
		dialog.addEventListener("keydown", (e) => e.key === "Escape" && closeLightbox());
		dialog.addEventListener("click", (e) => {
			if (e.target === dialog) closeLightbox();
		});
	}

	createDialog(figure) {
		const dialog = document.createElement("dialog");
		dialog.ariaLabel = "Image Lightbox";
		dialog.className = "lightbox";

		const content = (figure.querySelector("img") || figure.querySelector("svg")).cloneNode(true);

		dialog.append(content);
		const figcaption = figure.querySelector("figcaption");
		if (figcaption) {
			const caption = figcaption.cloneNode(true);
			caption.className = "caption";
			dialog.appendChild(caption);
		}

		const altText = content.tagName === "svg" ? content.querySelector("desc")?.textContent : content.getAttribute("alt");
		if (altText) {
			const altElement = document.createElement("p");
			altElement.className = "alt-text";
			altElement.textContent = `Alt Text: ${altText}`;
			dialog.appendChild(altElement);
		}

		const button = document.createElement("button");
		button.innerHTML = `<svg viewBox="0 -960 960 960"><title>Close lightbox</title><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg>`;
		button.className = "close";
		dialog.append(button);

		return dialog;
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
