document.addEventListener("DOMContentLoaded", () => {
	// Figure background functionality
	document.querySelectorAll("figure").forEach((figure) => {
		const img = figure.querySelector("img");
		if (img) {
			figure.style.backgroundImage = `url('${img.src}')`;
		}
	});

	// Modal functionality
	const modal = document.createElement("div");
	modal.id = "fullscreenModal";
	modal.style.display = "none";
	modal.innerHTML = `
        <span id="close" class="icons">close</span>
        <img id="fullscreenImg">
        <p id="caption"></p>
        <hr/>
        <p id="altText"></p>
    `;
	document.body.appendChild(modal);

	const modalImg = document.getElementById("fullscreenImg");
	const captionText = document.getElementById("caption");
	const altText = document.getElementById("altText");
	const closeButton = document.getElementById("close");

	function openFullscreen(imgElement) {
		modal.style.display = "block";
		modalImg.src = imgElement.currentSrc || imgElement.src;
		modalImg.alt = imgElement.alt;
		altText.textContent = imgElement.alt;
		const caption = imgElement.closest("figure").querySelector("figcaption");
		captionText.textContent = caption ? caption.textContent : "";
		document.body.style.overflow = "hidden";
	}

	function closeFullscreen() {
		modal.style.display = "none";
		document.body.style.overflow = "auto";
	}

	const images = document.querySelectorAll("figure img");

	images.forEach((img) => {
		img.style.cursor = "zoom-in";
		img.addEventListener("click", () => openFullscreen(img));
	});

	closeButton.addEventListener("click", closeFullscreen);

	modal.addEventListener("click", (event) => {
		if (event.target === modal) {
			closeFullscreen();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeFullscreen();
		}
	});
});
