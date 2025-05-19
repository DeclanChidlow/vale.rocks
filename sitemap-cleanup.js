const fs = require("fs");

function enhanceSitemap(path, stylesheet = "/assets/sitemap.xsl") {
	let content = fs.readFileSync(path, "utf8");

	content = content.replace(/(https:\/\/vale\.rocks[^<\s]+)(\/|\.html)(?=<\/loc>)/g, "$1");

	if (!content.includes("<?xml-stylesheet")) {
		content = content.replace('<?xml version="1.0" encoding="UTF-8"?>', `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="${stylesheet}"?>`);
	}

	fs.writeFileSync(path, content);
	console.log(`Sitemap enhanced with stylesheet: ${stylesheet}`);
}

const [, , path, stylesheet = "/assets/sitemap.xsl"] = process.argv;

if (!path) {
	console.error("Error: Missing sitemap path");
	process.exit(1);
}

enhanceSitemap(path, stylesheet);
