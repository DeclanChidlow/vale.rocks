document.addEventListener("DOMContentLoaded", () => {
	const observer = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animateOdometer(entry.target);
					obs.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.5 },
	);

	document.querySelectorAll(".number").forEach((el) => observer.observe(el));

	function animateOdometer(el) {
		const text = el.textContent.trim();
		const targetDigits = [];

		let html = `<span class="sr-only">${text}</span><span aria-hidden="true">`;

		for (const char of text) {
			if (/\d/.test(char)) {
				html += `<div class="digit"><span>`;
				for (let i = 0; i <= 9; i++) {
					html += `<div>${i}</div>`;
				}
				html += `</span></div>`;
				targetDigits.push(parseInt(char, 10));
			} else {
				html += `<div class="static-char">${char}</div>`;
			}
		}

		html += `</span>`;
		el.innerHTML = html;

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				const spans = el.querySelectorAll(".digit span");
				spans.forEach((span, index) => {
					const digit = targetDigits[index];
					span.style.transform = `translateY(-${digit * 1.2}em)`;
				});
			});
		});
	}
});
