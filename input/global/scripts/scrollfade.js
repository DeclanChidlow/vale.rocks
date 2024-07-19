if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
	const elements = document.querySelectorAll(".post");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("fade-in-up");
					observer.unobserve(entry.target);
				}
			});
		},
		{
			root: null,
			rootMargin: "0px",
			threshold: 0.1,
		},
	);

	elements.forEach((el) => {
		observer.observe(el);
	});
}
