class TimezoneConverter {
	constructor() {
		const formatter = new Intl.DateTimeFormat(undefined, {
			day: "numeric",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		});

		const timeElements = document.querySelectorAll("time[datetime*='T'][datetime$='Z']");

		timeElements.forEach((el) => {
			const date = new Date(el.getAttribute("datetime"));

			if (!isNaN(date)) {
				el.textContent = formatter.format(date);
			}
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new TimezoneConverter();
});
