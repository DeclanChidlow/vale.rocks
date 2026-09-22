<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width" />
				<meta name="text-scale" content="scale" />
				<title>Sitemap | Vale.Rocks</title>

				<script data-goatcounter="https://stats.vale.rocks/count" async="true"
					src="//gc.zgo.at/count.js"></script>

				<link rel="stylesheet" href="/assets/styles/base/reset.css" />
				<link rel="stylesheet" href="/assets/styles/base/body.css" />
				<link rel="stylesheet" href="/assets/styles/type/links.css" />
				<link rel="stylesheet" href="/assets/styles/type/type.css" />


				<link rel="preload" href="/assets/typefaces/WorkSans.woff2"
					as="font" type="font/woff2" crossorigin="true" />

				<meta property="og:title" content="Sitemap" />

				<link rel="icon" type="image/svg+xml" href="https://vale.rocks/assets/favicon.svg" />

				<meta property="og:image" content="https://vale.rocks/assets/og/standard.webp" />
				<meta property="og:image:alt"
					content="The name 'VALE' with the link 'https://vale.rocks'." />
				<meta property="og:image:type" content="image/webp" />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />

				<link rel="canonical" href="https://vale.rocks/sitemap.xml" />
				<meta property="og:url" content="https://vale.rocks/sitemap.xml" />

				<meta property="og:site_name" content="Vale.Rocks" />

				<meta name="color-scheme" content="light dark" />
				<meta name="theme-color" content="oklch(94.75% 0.04 73)"
					media="(prefers-color-scheme: light)" />
				<meta name="theme-color" content="oklch(18% 0.003 17.5)"
					media="(prefers-color-scheme: dark)" />

				<link rel="alternate" type="application/rss+xml"
					title="RSS feed of long-form articles on Vale.Rocks." href="/posts/feed.xml" />
				<link rel="alternate" type="application/feed+json"
					title="JSON feed of long-form articles on Vale.Rocks." href="/posts/feed.json" />
				<link rel="search" type="application/opensearchdescription+xml"
					title="Vale.Rocks Search" href="https://vale.rocks/opensearch.xml" />
				<link rel="manifest" href="/app.webmanifest" />
			</head>
			<body>
				<main id="main">
					<div>
						<h1>Vale.Rocks Sitemap</h1>
						<a href="/">Return to main site content.</a>
						<br />
						<br />
						<p><xsl:value-of select="count(sitemap:urlset/sitemap:url)" /> total pages.
	Also check out the interactive, visual sitemap <a href="https://vale.rocks/#explore-my-site">on the landing
	page</a>.</p>
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
