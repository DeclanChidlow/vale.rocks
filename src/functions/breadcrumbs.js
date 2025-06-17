export default (pathString) => {
	const segments = pathString.replace(/^\//, "").split("/");

	if (segments.length <= 1) {
		return "";
	}

	let breadcrumbs = [];
	let currentPath = "";
	segments.forEach((segment) => {
		currentPath += "/" + segment;
		breadcrumbs.push(`<a href="${currentPath}">${segment}</a>`);
	});

	return breadcrumbs.join("➞");
};
