import { Tree } from "@weborigami/async-tree";

export default async (items) => {
	const itemsObj = await Tree.plain(items);
	const itemsArray = Object.values(itemsObj);

	if (!itemsArray || itemsArray.length === 0) return "";

	const dates = itemsArray
		.map((item) => (item?.pub_time ? new Date(item.pub_time) : null))
		.filter((date) => date && !isNaN(date.valueOf()))
		.sort((a, b) => a - b);

	if (dates.length < 2) return "";

	const startYear = dates[0].getFullYear();

	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();

	const width = 400;
	const graphHeight = 30;
	const totalHeight = 45;

	const binsCount = (currentYear - startYear) * 12 + currentMonth + 1;

	if (binsCount < 2) return "";

	const bins = new Array(binsCount).fill(0);

	for (const date of dates) {
		const year = date.getFullYear();
		const month = date.getMonth();

		const binIndex = (year - startYear) * 12 + month;

		if (binIndex >= 0 && binIndex < binsCount) {
			bins[binIndex]++;
		}
	}

	const maxBin = Math.max(...bins);
	if (maxBin === 0) return "";

	const points = bins.map((count, index) => {
		const x = (index / (binsCount - 1)) * width;
		const y = graphHeight - (count / maxBin) * graphHeight;
		return { x, y };
	});

	const linePath = "M " + points.map((p) => `${p.x},${p.y}`).join(" L ");

	return `
		<div class="sparkline">
			<svg viewBox="0 -4 ${width} ${totalHeight}" role="img" aria-label="Sparkline showing activity from ${startYear} to Present">
				<path d="${linePath}" stroke="currentColor" fill="none" />
			</svg>	
			<div aria-hidden="true">
				<span>${startYear}</span>
				<span>Present</span>
			</div>
		</div>
	`;
};
