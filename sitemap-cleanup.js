const fs = require("fs");

function enhanceSitemap(inputPath, stylesheetUrl = "/assets/sitemap.xsl") {
	let sitemapContent = fs.readFileSync(inputPath, "utf8");

	sitemapContent = sitemapContent.replace(new RegExp(`(https://vale.rocks[^<\\s]+)(/|\.html)(?=</loc>)`, "g"), "$1");

	if (!sitemapContent.includes("<?xml-stylesheet")) {
		sitemapContent = sitemapContent.replace('<?xml version="1.0" encoding="UTF-8"?>', '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="' + stylesheetUrl + '"?>');
	}

	fs.writeFileSync(inputPath, sitemapContent);
	console.log(`Sitemap updated with stylesheet reference: ${stylesheetUrl}`);
}

const inputPath = process.argv[2];
const stylesheetUrl = process.argv[3] || "/assets/sitemap.xsl";

if (!inputPath) {
	console.error("Error: Please provide the path to the sitemap file");
	process.exit(1);
}

enhanceSitemap(inputPath, stylesheetUrl);
