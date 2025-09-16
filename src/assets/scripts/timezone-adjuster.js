class TimezoneConverter {
	constructor() {
		document.querySelectorAll("time[datetime*='T'][datetime$='Z']").forEach((el) => {
			const date = new Date(el.getAttribute("datetime"));
			if (!isNaN(date)) {
				el.textContent = date.toLocaleDateString(undefined, {
					day: "numeric",
					month: "short",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit",
					hour12: false,
				});
			}
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new TimezoneConverter();
});
