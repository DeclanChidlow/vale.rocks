document.addEventListener("DOMContentLoaded", function () {
	const images = document.querySelectorAll("figure img"),
		modal = document.getElementById("fullscreenModal"),
		modalImg = document.getElementById("fullscreenImg"),
		captionText = document.getElementById("caption"),
		altText = document.getElementById("altText"),
		closeButton = document.getElementById("close");

	Array.from(images).forEach((img) => {
		img.addEventListener("click", () => openFullscreen(img));
	});

	closeButton.addEventListener("click", closeFullscreen);

	modal.addEventListener("click", (event) => {
		if (event.target === modal) {
			closeFullscreen();
		}
	});

	function openFullscreen(imgElement) {
		modal.style.display = "flex";
		modalImg.src = imgElement.currentSrc || imgElement.src;
		altText.textContent = imgElement.alt;

		let caption = imgElement.nextElementSibling;
		if (caption && caption.tagName.toLowerCase() === "figcaption") {
			captionText.textContent = caption.textContent;
		}
	}

	function closeFullscreen() {
		modal.style.display = "none";
	}
});
