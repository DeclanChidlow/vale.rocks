export default (dateString) => {
	const date = new Date(dateString);

	const day = date.getUTCDate();
	const month = date.toLocaleString("en-AU", { month: "long", timeZone: "UTC" });
	const year = date.getUTCFullYear();

	const getOrdinal = (n) => {
		const s = ["th", "st", "nd", "rd"];
		const v = n % 100;
		return n + (s[(v - 20) % 10] || s[v] || s[0]);
	};

	return `${month} ${getOrdinal(day)}, ${year}`;
};
