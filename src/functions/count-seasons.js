import { Tree } from "@weborigami/async-tree";

export default async function countSeasons(series) {
	if (!series) return 0;
	const plainSeries = await Tree.plain(series);
	const items = Array.isArray(plainSeries) ? plainSeries : Object.values(plainSeries);

	return items.reduce((total, item) => {
		const seasonCount = item.seasons?.length || 0;
		return total + seasonCount;
	}, 0);
}
