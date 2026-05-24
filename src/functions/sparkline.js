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

	const minTime = dates[0].getTime();
	const maxTime = Math.max(dates[dates.length - 1].getTime(), Date.now());

	if (minTime === maxTime) return "";

	const width = 400;
	const graphHeight = 30;
	const totalHeight = 45;
	const binsCount = 70;

	const bins = new Array(binsCount).fill(0);
	const timeRange = maxTime - minTime;

	for (const date of dates) {
		let binIndex = Math.floor(((date.getTime() - minTime) / timeRange) * binsCount);
		if (binIndex >= binsCount) binIndex = binsCount - 1;
		bins[binIndex]++;
	}

	const maxBin = Math.max(...bins);
	if (maxBin === 0) return "";

	const points = bins.map((count, index) => {
		const x = (index / (binsCount - 1)) * width;
		const y = graphHeight - (count / maxBin) * graphHeight;
		return { x, y };
	});

	const linePath = "M " + points.map((p) => `${p.x},${p.y}`).join(" L ");

	const startYear = dates[0].getFullYear();
	const endYear = new Date(maxTime).getFullYear();

	return `
		<svg viewBox="0 -4 ${width} ${totalHeight + 6}" class="sparkline" role="img" aria-label="Sparkline showing activity from ${startYear} to ${endYear}">
			<path d="${linePath}" stroke="currentColor" fill="none" />
			
			<g font-size="10" color="light-dark(var(--grey), var(--white))">
				<text x="0" y="${totalHeight}">${startYear}</text>
				<text x="${width}" y="${totalHeight}" text-anchor="end">${endYear}</text>
			</g>
		</svg>	
	`;
};
