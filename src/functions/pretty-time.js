export default (timeString) => {
	const date = new Date(timeString);
	return date.toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
};
