document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("figure").forEach((figure) => {
		const img = figure.querySelector("img");
		if (img) {
			figure.style.backgroundImage = `url('${img.src}')`;
		}
	});
});
