if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
	const elements = document.querySelectorAll(".post");

	function fadeInIfInView() {
		elements.forEach((el) => {
			if (isInViewport(el)) {
				el.classList.add("fade-in-up");
			}
		});
	}

	function isInViewport(element) {
		const rect = element.getBoundingClientRect();
		return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
	}

	fadeInIfInView(); // Check initially on page load

	window.addEventListener("scroll", () => {
		elements.forEach((el) => {
			el.classList.toggle("fade-in-up", window.scrollY >= el.offsetTop - window.innerHeight);
		});
	});
}
