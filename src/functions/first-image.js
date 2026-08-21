const IMG_TAG_RX = /<img\b[^>]*>/i;
const SRC_RX = /\bsrc\s*=\s*["']([^"']+)["']/i;
const ALT_RX = /\balt\s*=\s*["']([^"']*)["']/i;

export default (html) => {
	const tag = IMG_TAG_RX.exec(html)?.[0];
	if (!tag) return {};
	const src = SRC_RX.exec(tag);
	if (!src) return {};
	const image = src[1].startsWith("/") ? `https://vale.rocks${src[1]}` : src[1];
	const alt = ALT_RX.exec(tag);
	return { image, ...(alt ? { alt_text: alt[1] } : {}) };
};
