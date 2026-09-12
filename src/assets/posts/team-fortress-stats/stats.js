import { toPlainValue } from "@weborigami/async-tree";

const CLASSES = ["Scout", "Soldier", "Pyro", "Demoman", "Heavy", "Engineer", "Medic", "Sniper", "Spy"];

const sum = (data, statKey) => CLASSES.reduce((total, className) => total + (data[`${className}.accum.${statKey}`]?.value ?? 0), 0);

export default async (stats, command, argument) => {
	const data = await toPlainValue(stats);

	switch (command) {
		case "sum":
			return sum(data, argument);
		case "top": {
			let best = null;
			let bestValue = -Infinity;
			for (const className of CLASSES) {
				const value = data[`${className}.accum.${argument}`]?.value;
				if (value != null && value > bestValue) {
					bestValue = value;
					best = className;
				}
			}
			return best;
		}
		case "topMax": {
			let best = null;
			let bestValue = -Infinity;
			for (const className of CLASSES) {
				const value = data[`${className}.max.${argument}`]?.value;
				if (value != null && value > bestValue) {
					bestValue = value;
					best = className;
				}
			}
			return best;
		}
		case "killsPerHour":
			return (sum(data, "iNumberOfKills") / (sum(data, "iPlayTime") / 3600)).toFixed(1);
		case "classKillsPerHour":
			return (data[`${argument}.accum.iNumberOfKills`]?.value / (data[`${argument}.accum.iPlayTime`]?.value / 3600)).toFixed(1);
		case "share":
			return `${((data[`${argument}.accum.iPlayTime`]?.value / sum(data, "iPlayTime")) * 100).toFixed(1)}%`;
		case "modeTotal": {
			let total = 0;
			for (const [key, entry] of Object.entries(data)) {
				if (key.startsWith(`${argument}_`) && key.endsWith(".accum.iPlayTime")) {
					total += entry.value;
				}
			}
			return total;
		}
	}
};
