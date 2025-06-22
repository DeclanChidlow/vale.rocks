export default (pathString) => {
	const segments = pathString.replace(/^\//, "").split("/");

	if (segments.length <= 1) {
		return "";
	}

	let breadcrumbs = [];
	let currentPath = "";
	segments.forEach((segment, index) => {
		currentPath += "/" + segment;
		const isLast = index === segments.length - 1;
		const ariaCurrent = isLast ? ' aria-current="page"' : "";
		breadcrumbs.push(`<li><a href="${currentPath}"${ariaCurrent}>${segment}</a></li>`);
	});

	return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${breadcrumbs.join("")}</ol></nav>`;
};
