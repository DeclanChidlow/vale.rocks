export default (timeString) => {
	const date = new Date(timeString);
	return date.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });
};
