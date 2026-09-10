---
title: My HTML Boilerplate
description: A document outlining and explaining my general structure for HTML pages to use. A slim general markup template that applies to almost all HTML documents on the web and forgoes anything unnecessary. It is a general framework to build upon for individual sites.
og_description: You don't need much going on in your head.
pub_time: 2026-09-09
section: Essay
tags: [front-end, HTML]
standardsite_rkey: 3mv2rr7m7zu2r
---

When HTML was first created, a document could be very simple indeed. A valid document could look like this:

<!-- prettier-ignore -->
```html
<TITLE>HTML document</TITLE>
<H1>Heading</H1>

<P>This is a paragraph with a <A HREF="https://example.com/">link</A>.
```

It wasn't until HTML 2.0 -- the first formalised standard -- that a proper document structure came into being. A `DOCTYPE` declaration to explain a document's type and to handle compatibility became an expected inclusion, as did head and body sections:

<!-- prettier-ignore -->
```html
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">

<HEAD>
    <TITLE>HTML document</TITLE>
</HEAD>

<BODY>
    <H1>Heading</H1>
    <P>This is a document.
</BODY>
```

In the years since HTML 2.0's 1995 debut, the web has changed massively. However, there is a saying in the web standards world: _'Don't Break The Web'_. There are some exceptions, but on the whole a website developed at the web's inception should work in a modern browser, regardless of how much time has passed. To keep this compatibility, however, risks making changes impossible for fret of breaking existing sites.

One way the web combats this is with certain elements that are expected in HTML documents. If the element is present, then it uses the new functionality. If not, it simply falls back to the old functionality. Pair that with what different integrations and systems across the web expect, and it means that there is rather a lot of 'boilerplate' -- code that is repeated across almost every new or maintained site. HTML boilerplate commonly both opts in to modern functionality and also sets site preferences and details. Assorted things such as how the site should embed on social media, what styles should be loaded, how the browser should theme surrounding the site, and other such details.

## Boilerplate

Much like [I maintain my own CSS reset](/posts/css-reset), which provides me a clean slate for my styles, I maintain my own boilerplate, which I use as a base structure and reference when creating HTML documents. Much like my CSS reset, it is very opinionated. Here it is in full:

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width">
		<meta name="text-scale" content="scale">
		<title>Name of Page | Name of Website</title>

		<link rel="stylesheet" href="/styles.css">

		<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

		<meta property="og:title" content="Name of Page">
		<meta name="description" content="Description of this page.">
		<meta property="og:description" content="Description of this page for embeds.">

		<link rel="icon" type="image/svg+xml" href="https://example.com/favicon.svg">

		<meta property="og:image" content="https://example.com/embed-image.webp">
		<meta property="og:image:alt" content="A picture of something.">
		<meta property="og:image:type" content="image/webp">
		<meta property="og:image:width" content="1200">
		<meta property="og:image:height" content="630">

		<link rel="canonical" href="https://example.com/page">
		<meta property="og:url" content="https://example.com/page">

		<meta property="og:site_name" content="Website Name">

		<meta name="author" content="A N Other">

		<meta name="color-scheme" content="light dark">
		<meta name="theme-color" content="red" media="(prefers-color-scheme: light)">
		<meta name="theme-color" content="green" media="(prefers-color-scheme: dark)">

		<link rel="alternate" type="application/rss+xml" title="RSS feed of posts on Website Name." href="/posts/feed.xml">
		<link rel="alternate" type="application/feed+json" title="JSON feed of posts on Website Name." href="/posts/feed.json">

		<link rel="search" type="application/opensearchdescription+xml" title="Website Search" href="https://example.com/opensearch.xml">
		<link rel="manifest" href="/app.webmanifest">
	</head>

	<body>
		<header><nav></nav></header>
		<main id="main"></main>
		<footer id="footer"></footer>
	</body>
</html>
```

## Breakdown

It should be noted that there is order to my HTML boilerplate. The order of the document head in particular has great influence on performance. [Capo.js](https://rviscomi.github.io/capo.js/) is a brilliant tool for evaluating the order of elements in a document's head from a performance perspective.

```html
<!doctype html>
```

This is the document type declaration for the living HTML standard, as introduced in HTML 5. I always include it to avoid falling into quirks mode.

```html
<html lang="en"></html>
```

Opens the `html` tag which wraps the document and defines the document language using an [RFC 5646](https://www.rfc-editor.org/info/rfc5646/) compliant tag with the `lang` attribute. The language provided the default for the full page and can be overwritten on a per-element basis. Providing the language is important for automatic translation, typography such as hyphens, and for assistive technologies (especially screen readers).

```html
<meta charset="UTF-8">
```

The first element I place in the `head` is always the `charset` `meta` tag with a value of `UTF-8`, which is the only valid encoding as of HTML 5. It is always top of the `head`, as it must occur within the first 1024 bytes of a document, and it should be before any elements liable to get mangled.

```html
<meta name="viewport" content="width=device-width">
```

When the first iPhone launched in 2007, it rendered desktop sites with the expectation of the user to zoom in and pan around. Apple introduced the above `meta` tag for sites that were actually optimised for mobile, and it was eventually picked up more widely across browsers such that now it is supported widely to make a site responsive.

Many people will include `initial-scale=1`, however, after extensive testing and research, I've identified that [it isn't necessary to include any more](/micros/20260902-1350). It can be included to change the page's presentation if an element horizontally expands beyond the viewport width, but that should never be allowed to happen [and I advise against it](/micros/20260908-1315).

`minimum-scale`, `maximum-scale`, and `user-scalable` all greatly harm accessibility and should never[^1] be used. They should generally be stripped from sites whenever noticed.

```html
<meta name="text-scale" content="scale">
```

Makes text [scale in accordance with the system setting](https://matuzo.at/blog/2026/text-scaling-meta-tag). If this tag is present, then a page's styles must expect it and be written accordingly. This is especially important to avoid accessibility pitfalls with content scaling.

```html
<title>Name of Page | Name of Website</title>
```

The title of the page. It is a required value which is shown on many surfaces. It is used as the name of the page when bookmarked, the name of the tab in search engines, and anywhere else a name for the page is needed. I'll generally show the page title followed by the site's title.

```html
<link rel="stylesheet" href="/styles.css">
```

Whatever styles must be imported can be imported here. Styles should generally be imported in the page head rather than using the `@import` CSS at-rule within a stylesheet to avoid a waterfall, where the stylesheet must first be fetched to then fetch additional stylesheets.

```html
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

Complex variable fonts can be rather large in size, even after subletting and other optimisations, so I preload fonts that I know will be used on the page. Even if a font is located on the same-origin, [the `crossorigin` attribute is still necessary](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload#cors-enabled_fetches). I always serve fonts as <abbr title="Web Open Font Format">WOFF</abbr>2, as it is the most performant widely supported font format.

```html
<meta property="og:title" content="Name of Page">
```

The `og:title` is used for embeds, such as those seen on social media. It is one of the many metadata values of [the Open Graph protocol](https://ogp.me). While I'll typically include the site name at the end of the `<title>` element, I leave it absent in the `og:title`. In the majority of cases embeds will show the domain or `og:site_name` next to the title, rendering it a duplicate.

```html
<meta name="description" content="Description of this page.">
```

I mainly treat this meta description field as an exercise in search engine optimisation. Previously major search engines would expose the description to users on search pages, however they mostly fetch directly from the document itself now.

```html
<meta property="og:description" content="Description of this page for embeds.">
```

The `og:description` is sometimes shown in embeds. If absent, embeds usually forgo a description or fall back to the meta description. I like to write short, often quippy content here that strikes intrigue and fits in social media or chat feeds.

```html
<link rel="icon" type="image/svg+xml" href="https://example.com/favicon.svg">
```

A favicon is an important bit of branding for all websites -- especially when it comes to identifying tabs when you have many open. I serve favicons as SVGs, as they're [well supported](https://caniuse.com/link-icon-svg), can be made to dynamically adapt to light/dark mode, look good at all sizes, and remove the need for maintaining a set of raster favicons in different sizes.

```html
<meta property="og:image" content="https://example.com/embed-image.webp">
<meta property="og:image:alt" content="A picture of something.">
<meta property="og:image:type" content="image/webp">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

The image defined in the `og:image` is often shown in a site's embed on the likes of social media or chat platforms. It is advantageous to include on almost every site, as it adds context and usually increases an embed's size for better presence. Support for alt text on embedded images is middling, so it shouldn't be relied upon. Some sites support it, some ignore it, and some support it in odd ways. I make the effort to include it but keep it brief. 1200px by 630px is a widely supported size, and WebP is the best supported of the modern image formats I've tested.

```html
<link rel="canonical" href="https://example.com/page">
<meta property="og:url" content="https://example.com/page">
```

A canonical link to the authoritative version of the page is important for indicating what should be considered the source of truth. This is especially important if content is duplicated.

```html
<meta property="og:site_name" content="Website Name">
```

The name of the website to be shown in embeds. As aforementioned, some embeds will show this name near the page's title.

```html
<meta name="author" content="A N Other">
```

The `author` tag obviously indicates the author of a page. It isn't strictly necessary but is useful for developers to identify who is responsible for a page.

```html
<meta name="color-scheme" content="light dark">
```

Setting the `color-scheme` meta tag with a content attribute value of `light dark` tells the browser that a site supports both light and dark modes. Having it defined in the head prevents a Flash of Unstyled Content (FOUC), such as a screen of bright white when the site and browser are set to dark mode.

```html
<meta name="theme-color" content="red" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="green" media="(prefers-color-scheme: dark)">
```

Used for theming the browser chrome of sites installed as progressive web apps (PWAs) and for theming the browser chrome in Chrome for Android (but only in light mode). Some other browsers also interpret these values in various ways. I use the media attribute to set the colour independently for both light and dark modes.

```html
<link rel="alternate" type="application/rss+xml" title="RSS feed of posts on Website Name." href="/posts/feed.xml">
<link rel="alternate" type="application/feed+json" title="JSON feed of posts on Website Name." href="/posts/feed.json">
```

If a site has syndication feeds, then including these in the head [permits autodiscovery of them](https://piccalil.li/blog/a-quick-guide-to-creating-syndication-feeds/#auto-discovery).

```html
<link rel="search" type="application/opensearchdescription+xml" title="Website Search" href="https://example.com/opensearch.xml">
```

If a site has integrated search functionality, then establishing an [opensearch.xml](https://github.com/dewitt/opensearch/blob/master/opensearch-1-1-draft-6.md) file and referencing it from your document head exposes it to browsers so they can provide a rich searching experience. The exact experience differs by browser, but in many cases it allows searching with a site via the browser's own address bar and also provides a simple way to add a search engine.

```html
<link rel="manifest" href="/app.webmanifest">
```

I'm a progressive web app evangelist. I love them, and many sites benefit from being PWAs, even if a site is not a typical 'app'. I'll [define a manifest](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest) for most sites even if the only benefit is that the presentation is nicer if people add the site to their homescreen. This declaration helps browsers discover the manifest.

```html
<header><nav></nav></header>
<main id="main"></main>
<footer id="footer"></footer>
```

This defines any site's general `body` structure. The `header` holds a navigation element for general site navigation. The `main` holds the primary page content and has an `id` attribute to provide an anchor, which is important for 'skip to' links. The `footer` holds information about the current site and page. Like `main`, I give it an `id` for anchoring purposes. I don't get any more detailed with my HTML body boilerplate, as there is so much variance depending on the site.

---

This is just boilerplate. It is a template for what I'll include on roughly every site, with some light alterations. Every site is sure to deviate from this depending on its requirements, but this is a reasonable foundation.

If a page is expected to be cited academically, then you'd consider including Google Scholar's `citation_*` meta tags and [Dublin Core](https://www.dublincore.org/specifications/dublin-core/)'s `dc` meta tags. If a page represents an article, then you'd include the tags from the Open Graph Protocol's [article namespace](https://ogp.me/#type_article) and perhaps tags pertaining to a publishing system. A video, audio, book, or other content type would similarly be marked up differently. Many sites will also benefit from [`JSON-LD` structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).

For a larger boilerplate that outlines some more optional inclusions, I recommend Manuel Matuzović's brilliant article, [My HTML boilerplate in 2026](https://matuzo.at/blog/2026/html-boilerplate).

[^1]: There are cases where they can be used, but you'll know those extremely rare cases when you come to them. Take great and extreme care.
