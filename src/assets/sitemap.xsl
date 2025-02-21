<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
		<html>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="referrer" content="unsafe-url" />

				<title>Sitemap | Vale.Rocks</title>
				<meta name="color-scheme" content="light dark" />

				<link rel="preload" href="/assets/typefaces/Lexend/Lexend-VariableFont_wght.woff2"
					as="font" type="font/woff2" crossorigin="true" />

				<link rel="stylesheet" href="/assets/styles/base/reset.css" />
				<link rel="stylesheet" href="/assets/styles/base/body.css" />
				<link rel="stylesheet" href="/assets/styles/type/links.css" />
				<link rel="stylesheet" href="/assets/styles/type/type.css" />


				<link rel="search" type="application/opensearchdescription+xml"
					title="Vale.Rocks Search" href="https://vale.rocks/opensearch.xml" />

				<script data-goatcounter="https://stats.vale.rocks/count" async="true"
					src="//gc.zgo.at/count.js"></script>
			</head>
			<body>
				<main id="main">
					<div>
						<h1>Vale.Rocks Sitemap</h1>
						<a href="/">Return to main site content.</a>
						<br />
						<br />
						<p><xsl:value-of select="count(sitemap:urlset/sitemap:url)" /> total pages.</p>
						<ul>
							<xsl:for-each select="sitemap:urlset/sitemap:url">
								<xsl:variable name="sitemap_loc"><xsl:value-of select="sitemap:loc" /></xsl:variable>
								<li>
									<a href="{$sitemap_loc}">
										<xsl:value-of select="sitemap:loc" />
									</a>
								</li>
							</xsl:for-each>
						</ul>
					</div>
				</main>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
