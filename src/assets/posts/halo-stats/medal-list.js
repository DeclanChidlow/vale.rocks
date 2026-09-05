import { toPlainValue } from "@weborigami/async-tree";

const escapeHtml = (text) =>
	String(text ?? "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

export default async (medals, earned) => {
	const [medalData, earnedData] = await Promise.all([toPlainValue(medals), toPlainValue(earned)]);

	if (!medalData || !earnedData) return "";

	const counts = {};
	for (const stat of earnedData) {
		counts[stat.NameId] = stat.Count;
	}

	const groups = [];

	for (const [type, entries] of Object.entries(medalData)) {
		const items = entries
			.filter((entry) => counts[entry.nameId] != null)
			.sort((a, b) => counts[b.nameId] - counts[a.nameId])
			.map((entry) => {
				const name = escapeHtml(entry.name);
				const description = escapeHtml(entry.description);

				const x = (entry.spriteIndex % 16) * 64;
				const y = Math.floor(entry.spriteIndex / 16) * 64;

				return `<span class="medal" style="background-position:-${x}px -${y}px;"></span> <strong>${name}</strong> ×${counts[entry.nameId]}<br>${description}.`;
			});

		if (items.length === 0) continue;

		const title = type.charAt(0).toUpperCase() + type.slice(1);
		groups.push(`<h4>${title}</h4>\n<ul>\n\t<li>${items.join("</li>\n\t<li>")}</li>\n</ul>`);
	}

	return groups.length > 0 ? groups.join("\n") + "\n" : "";
};
