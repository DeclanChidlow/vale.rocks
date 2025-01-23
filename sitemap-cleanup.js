const fs = require("fs");

function cleanSitemap(inputPath) {
	const sitemapContent = fs.readFileSync(inputPath, "utf8");
	const cleanedContent = sitemapContent.replace(new RegExp(`(https://vale.rocks[^<\\s]+)(/|\.html)(?=</loc>)`, "g"), "$1");
	fs.writeFileSync(inputPath, cleanedContent);
}

const inputPath = process.argv[2];
cleanSitemap(inputPath);
