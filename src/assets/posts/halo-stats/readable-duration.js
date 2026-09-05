export default (duration) => {
	let days, hours, minutes, seconds;

	if (typeof duration === "number") {
		const total = Math.round(duration);
		days = Math.floor(total / 86400);
		hours = Math.floor((total % 86400) / 3600);
		minutes = Math.floor((total % 3600) / 60);
		seconds = total % 60;
	} else {
		const match = /^P(?:(\d+(?:\.\d+)?)D)?T?(?:(\d+(?:\.\d+)?)H)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)S)?$/.exec(duration);
		if (!match) return duration;
		days = Math.round(Number(match[1] ?? 0));
		hours = Math.round(Number(match[2] ?? 0));
		minutes = Math.round(Number(match[3] ?? 0));
		seconds = Math.round(Number(match[4] ?? 0));
	}

	const includeMinutes = minutes && !days;
	const includeSeconds = seconds && !hours && !days;

	const parts = [];
	if (days) parts.push(`${days} ${days === 1 ? "day" : "days"}`);
	if (hours) parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
	if (includeMinutes) parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
	if (includeSeconds) parts.push(`${seconds} ${seconds === 1 ? "second" : "seconds"}`);

	const formatter = new Intl.ListFormat("en-AU", { style: "long", type: "conjunction" });
	return parts.length === 0 ? "0 seconds" : formatter.format(parts);
};
