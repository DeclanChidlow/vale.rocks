import { parse } from "yaml";

export default (content) => {
	const yamlString = typeof content === "string" ? content : new TextDecoder().decode(content);

	if (!yamlString) return {};

	let events = parse(yamlString);

	if (!Array.isArray(events)) events = events ? [events] : [];

	const expandedEvents = {};

	const now = new Date();
	const currentYear = now.getFullYear();
	const todayISO = now.toISOString().slice(0, 10);

	for (const event of events) {
		const { title, date, start_year, end_year } = event;

		if (!title || !date) continue;

		const start = parseInt(start_year) || 2022;
		const end = parseInt(end_year) || currentYear;

		const slug = title.toLowerCase().replace(/[^\w\s-]/g, "");

		for (let year = start; year <= end; year++) {
			const pubTime = `${year}-${date}`;

			if (pubTime > todayISO) continue;

			const key = `${pubTime}-${slug}`;

			expandedEvents[key] = {
				...event,
				pub_time: pubTime,
				type: "event",
			};
		}
	}

	return expandedEvents;
};
