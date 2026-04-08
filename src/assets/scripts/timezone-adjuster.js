class TimezoneConverter {
	constructor() {
		const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
			day: "numeric",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
			timeZoneName: "short",
		});

		const dateFormatter = new Intl.DateTimeFormat(undefined, {
			day: "numeric",
			month: "short",
			year: "numeric",
			timeZoneName: "short",
		});

		const timeElements = document.querySelectorAll("time[datetime]:not([data-timezone-ignore])");

		timeElements.forEach((el) => {
			const date = new Date(el.getAttribute("datetime"));

			if (!isNaN(date)) {
				const originalText = el.textContent;
				const hasTime = originalText.includes(":") || originalText.includes(",");

				if (hasTime) {
					el.textContent = dateTimeFormatter.format(date);
				} else {
					el.textContent = dateFormatter.format(date);
				}
			}
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new TimezoneConverter();
});
