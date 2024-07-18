document.addEventListener("DOMContentLoaded", () => {
	const images = document.querySelectorAll("figure img"),
		modal = document.getElementById("fullscreenModal"),
		modalImg = document.getElementById("fullscreenImg"),
		captionText = document.getElementById("caption"),
		altText = document.getElementById("altText"),
		closeButton = document.getElementById("close");

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
});
