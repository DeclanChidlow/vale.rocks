document.addEventListener("DOMContentLoaded", () => {
	const numbers = document.querySelectorAll(".number");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !entry.target.dataset.animated) {
					entry.target.dataset.animated = "true";
					animateTicker(entry.target);
				}
			});
		},
		{ threshold: 0.5 },
	);

	numbers.forEach((el) => observer.observe(el));

	function animateTicker(el) {
		const text = el.textContent.trim();
		el.innerHTML = "";

		const srSpan = document.createElement("span");
		srSpan.classList.add("sr-only");
		srSpan.textContent = text;
		el.appendChild(srSpan);

		for (const char of text) {
			if (/\d/.test(char)) {
				const digit = document.createElement("div");
				digit.classList.add("digit");
				digit.setAttribute("aria-hidden", "true");

				const span = document.createElement("span");
				for (let i = 0; i <= 9; i++) {
					const numDiv = document.createElement("div");
					numDiv.textContent = i;
					span.appendChild(numDiv);
				}

				digit.appendChild(span);
				el.appendChild(digit);

				const targetDigit = parseInt(char, 10);
				requestAnimationFrame(() => {
					span.style.transform = `translateY(-${targetDigit * 1.2}em)`;
				});
			} else {
				const staticChar = document.createElement("div");
				staticChar.classList.add("static-char");
				staticChar.setAttribute("aria-hidden", "true");
				staticChar.textContent = char;
				el.appendChild(staticChar);
			}
		}
	}
});
