export default (text, locale = "en-AU") => {
	const cleanText = text.replace(/<(script|style|noscript|pre|svg)[\s\S]*?<\/\1>/gi, "");
	const segmenter = new Intl.Segmenter(locale, { granularity: "word" });
	const segments = segmenter.segment(cleanText);

	let count = 0;
	for (const segment of segments) {
		if (segment.isWordLike) count++;
	}

	return count;
};
