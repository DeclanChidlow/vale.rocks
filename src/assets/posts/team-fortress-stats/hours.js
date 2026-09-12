import readableDuration from "./readable-duration.js";

export default (seconds) => {
	if (seconds < 3600) return readableDuration(seconds);
	const hours = Math.round((seconds / 3600) * 10) / 10;
	return `${hours} ${hours === 1 ? "hour" : "hours"}`;
};
