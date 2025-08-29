export default (sitemapContent) => {
	if (sitemapContent.includes("<?xml-stylesheet")) return sitemapContent;
	const withStylesheet = sitemapContent.replace('<?xml version="1.0" encoding="UTF-8"?>', '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/assets/sitemap.xsl"?>');
	return withStylesheet.replace(/(https:\/\/vale\.rocks[^<\s]+)(\/|\.html)(?=<\/loc>)/g, "$1");
};
