class TimezoneConverter {
	constructor() {
		this.timeElements = document.querySelectorAll("time[datetime*='T'][datetime$='Z']");
		this.init();
	}

	init() {
		if (!this.timeElements.length) {
			console.warn("No time elements with UTC time components found");
			return;
		}
		this.convertTimezones();
	}

	formatDateTime(date) {
		const options = {
			day: "numeric",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		};
		return date.toLocaleDateString(undefined, options);
	}

	convertTimezone(timeElement) {
		const utcDatetime = timeElement.getAttribute("datetime");
		const date = new Date(utcDatetime);

		if (isNaN(date)) {
			console.warn(`Invalid datetime format in element: ${timeElement.outerHTML}`);
			return;
		}

		const originalText = timeElement.textContent;
		const localTimeText = this.formatDateTime(date);

		if (originalText !== localTimeText) {
			timeElement.textContent = localTimeText;
		}
	}

	convertTimezones() {
		this.timeElements.forEach((timeElement) => this.convertTimezone(timeElement));
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new TimezoneConverter();
});
