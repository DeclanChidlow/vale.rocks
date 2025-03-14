export default (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
};
