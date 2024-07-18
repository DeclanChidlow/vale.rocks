document.getElementById("scroll-progress-container").style.display = "block";

function addHeadingLines() {
	const headings = document.querySelectorAll("h2, h3, h4, h5, h6"),
		scrollableHeight = document.documentElement.scrollHeight - window.innerHeight,
		progressContainer = document.getElementById("scroll-progress-container");

	headings.forEach((heading) => {
		const linePosition = (heading.offsetTop / scrollableHeight) * 100,
			line = document.createElement("div");
		line.className = "heading-line";
		line.style.left = `${linePosition}%`;
		progressContainer.appendChild(line);
	});
}

document.addEventListener("DOMContentLoaded", addHeadingLines);

window.addEventListener("scroll", function () {
	const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight,
		scrolled = window.scrollY,
		progressBar = document.getElementById("scroll-progress"),
		progress = (scrolled / scrollableHeight) * 100;
	progressBar.style.width = progress + "%";
});
