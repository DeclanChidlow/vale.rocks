import { parse } from "yaml";

const DEFAULT_START_YEAR = 2022;

const DATE_RX = /^(?:(\d{4})-)?(\d{2})-(\d{2})$/;
const YEAR_RX = /^\d{4}$/;
const INTERVAL_RX = /^(?:every\s+)?(\d*)\s*(month|year)s?$/;

const MONTHLY_INTERVALS = new Map([
	["monthly", 1],
	["quarterly", 3],
	["annually", 12],
]);

function formatISO(year, month, day) {
	const date = new Date(Date.UTC(year, month - 1, day));

	if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
		return null;
	}

	return date.toISOString().slice(0, 10);
}

function parseDate(value) {
	if (typeof value !== "string") return null;

	const match = DATE_RX.exec(value.trim());

	if (!match) return null;

	const year = match[1] ? Number(match[1]) : null;
	const month = Number(match[2]);
	const day = Number(match[3]);

	if (!formatISO(year ?? 2000, month, day)) return null;

	return { year, month, day };
}

function parseRecurrence(event, hasYear) {
	const { recurrence } = event;

	if (recurrence == null) return hasYear ? null : 12;

	const value = String(recurrence).trim().toLowerCase();

	if (value === "none") {
		if (!hasYear) {
			throw new Error(`Event "${event.title}" does not repeat, so its date must include a year (YYYY-MM-DD).`);
		}

		return null;
	}

	if (MONTHLY_INTERVALS.has(value)) return MONTHLY_INTERVALS.get(value);

	const interval = INTERVAL_RX.exec(value);

	if (interval) {
		const months = Number(interval[1] || 1) * (interval[2] === "year" ? 12 : 1);

		if (months >= 1) return months;
	}

	throw new Error(`Event "${event.title}" has an unrecognised recurrence: ${recurrence}.`);
}

function parseUntil(event, currentYear) {
	const { until, end_year } = event;

	if (until == null) return `${Number.parseInt(end_year, 10) || currentYear}-12-31`;

	const value = String(until).trim();

	if (YEAR_RX.test(value)) return `${value}-12-31`;

	if (parseDate(value)?.year) return value;

	throw new Error(`Event "${event.title}" has an invalid until date: ${value}`);
}

function occurrences(anchor, startYear, months, untilISO, todayISO) {
	if (months == null) {
		const pubTime = formatISO(anchor.year, anchor.month, anchor.day);

		return pubTime && pubTime <= todayISO ? [pubTime] : [];
	}

	const results = [];
	const endYear = Number(untilISO.slice(0, 4));

	let year = startYear;
	let month = anchor.month;

	while (year <= endYear) {
		const pubTime = formatISO(year, month, anchor.day);

		if (pubTime) {
			if (pubTime > untilISO || pubTime > todayISO) break;

			results.push(pubTime);
		}

		month += months;
		year += Math.floor((month - 1) / 12);
		month = ((month - 1) % 12) + 1;
	}

	return results;
}

export default (content) => {
	const yamlString = typeof content === "string" ? content : new TextDecoder().decode(content);

	if (!yamlString) return {};

	let events = parse(yamlString);

	if (!Array.isArray(events)) events = events ? [events] : [];

	const expandedEvents = {};

	const now = new Date();
	const currentYear = now.getUTCFullYear();
	const todayISO = now.toISOString().slice(0, 10);

	for (const event of events) {
		if (!event?.title || !event.date) continue;

		const anchor = parseDate(event.date);

		if (!anchor) {
			throw new Error(`Event "${event.title}" has an invalid date: ${event.date}`);
		}

		const months = parseRecurrence(event, anchor.year != null);
		const startYear = anchor.year ?? (Number.parseInt(event.start_year, 10) || DEFAULT_START_YEAR);
		const untilISO = parseUntil(event, currentYear);
		const slug = event.title.toLowerCase().replace(/[^\w\s-]/g, "");

		for (const pubTime of occurrences(anchor, startYear, months, untilISO, todayISO)) {
			expandedEvents[`${pubTime}-${slug}`] = {
				...event,
				pub_time: pubTime,
				type: "event",
			};
		}
	}

	return expandedEvents;
};
