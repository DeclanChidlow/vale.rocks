import { toPlainValue } from "@weborigami/async-tree";
import readableDuration from "./readable-duration.js";

const escapeHtml = (text) => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const DIFFICULTIES = [
	{ key: "easy", label: "Easy" },
	{ key: "normal", label: "Normal" },
	{ key: "heroic", label: "Heroic" },
	{ key: "legendary", label: "Legendary" },
	{ key: "laso", label: "LASO" },
];

export default async (game, levels) => {
	const [data, levelNames] = await Promise.all([toPlainValue(game), toPlainValue(levels)]);

	if (!data?.missions) return "";

	return data.missions
		.map((mission) => {
			const name = escapeHtml(levelNames[mission.mapId] ?? `Map ${mission.mapId}`);
			const coop = mission.highestDifficultyCoop === "None" ? "Not Played" : mission.highestDifficultyCoop;

			const lines = [`Highest Difficulty (Single Player): ${mission.highestDifficultySinglePlayer}`, `Highest Difficulty (Co-op): ${coop}`];

			for (const { key, label } of DIFFICULTIES) {
				const stats = mission[key];
				if (!stats) continue;

				if (stats.bestScoreSinglePlayer != null) {
					lines.push(`Best Score (Single Player) (${label}): ${stats.bestScoreSinglePlayer}`);
				}
				if (stats.bestTimeMsSinglePlayer != null) {
					lines.push(`Best Time (Single Player) (${label}): ${readableDuration(stats.bestTimeMsSinglePlayer / 1000)}`);
				}
				if (stats.bestScoreCoop != null) {
					lines.push(`Best Score (Co-op) (${label}): ${stats.bestScoreCoop}`);
				}
				if (stats.bestTimeMsCoop != null) {
					lines.push(`Best Time (Co-op) (${label}): ${readableDuration(stats.bestTimeMsCoop / 1000)}`);
				}
			}

			return `<h4>${name}</h4>\n<ul>\n\t<li>${lines.join("</li>\n\t<li>")}</li>\n</ul>`;
		})
		.join("\n");
};
