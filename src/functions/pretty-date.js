export default (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
};
