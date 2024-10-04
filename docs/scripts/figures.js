document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("figure").forEach((figure) => {
		const img = figure.querySelector("img");
		if (img) {
			figure.style.backgroundImage = `url('${img.src}')`;
		}
	});

	function createLightboxDialogs(selector) {
		if (!selector) {
			return console.error("Missing selector argument");
		}

		const buttonTemplate = document.createElement("button");
		buttonTemplate.classList.add("lightbox-button");
		buttonTemplate.setAttribute("aria-haspopup", "dialog");

		const dialogTemplate = document.createElement("dialog");
		dialogTemplate.classList.add("lightbox");
		dialogTemplate.innerHTML = `
            <form method="dialog">
                <button id="close" type="submit">
                    <span class="icons">close</span>
                </button>
                <figure>
					<img>
					<figcaption>
						<p class="caption"></p>
						<hr/>
						<p class="alt-text"></p>
					</figcaption>
				</figure>
            </form>
        `;

		function createDialog(img) {
			const button = buttonTemplate.cloneNode();
			const dialog = dialogTemplate.cloneNode(true);
			const dialogImg = dialog.querySelector("img");
			const caption = dialog.querySelector(".caption");
			const altText = dialog.querySelector(".alt-text");

			dialogImg.src = img.src;
			dialogImg.alt = img.alt;
			altText.textContent = img.alt;

			const figcaption = img.closest("figure").querySelector("figcaption");
			caption.textContent = figcaption ? figcaption.textContent : "";

			img.before(button);
			button.append(img);
			button.after(dialog);

			button.addEventListener("click", () => {
				dialog.showModal();
			});

			dialog.addEventListener("click", (event) => {
				if (event.target === dialog) {
					dialog.close();
				}
			});
		}

		[...document.querySelectorAll(selector)].forEach(createDialog);
	}

	createLightboxDialogs("figure img");

	document.querySelectorAll("figure img").forEach((img) => {
		img.style.cursor = "zoom-in";
	});
});
