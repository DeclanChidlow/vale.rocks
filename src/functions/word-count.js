export default (text) => {
	const textWithoutExclusions = text.replace(/<pre[\s\S]*?<\/pre>/gi, "").replace(/<svg[\s\S]*?<\/svg>/gi, "");
	return textWithoutExclusions.split(" ").filter((w) => w.trim()).length;
};
