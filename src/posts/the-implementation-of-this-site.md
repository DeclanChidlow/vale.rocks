---
title: The Implementation of This Site
description: A breakdown and overview of the implementation of Vale.Rocks, how it used to be built, how it's built now, and its associated infrastructure.
og_description: No bodging here. None at all. Nope.
pub_time: 2024-12-12
mod_time: 2025-08-28
section: Meta
tags: [design, front-end development]
---

> [!NOTE]
> I very much recommend you read my post ['The Design of This Site'](/posts/the-design-of-this-site) prior to this one.

## Previous Iterations

This site has been around for a fair few years, and as someone who enjoys burning their time tinkering and refining, I'm powerless to avoid rebuilding it at least a few times in the quest for whatever it is I'm trying to achieve by rebuilding it.

The very earliest versions of this site were built with completely hand-coded standard HTML/CSS. No build step or automation. Slightly later it incorporated JavaScript and iframes so that content would be shared across pages rather than hard-coded -- still devoid of any automation. As you'd imagine, it didn't take long to reach the limits of what is possible with this approach.

The limit wasn't entirely a technological one. After all, the underlying tech was just web standards, and that allows for all you can think of. The limits I hit were my willingness to manually implement and hard-code every single thing.

Thus, I moved on to using a static site generator. Given that I was already a GitHub user and had opted to deploy my site with GitHub Pages, I opted to use [Jekyll](https://jekyllrb.com). Jekyll is nice, and its support for Shopify's [Liquid templating language](https://shopify.github.io/liquid/) made it wonderfully flexible -- but it wasn't necessarily exactly conducive to my preferred workflow, and dealing with Ruby proved a pain.

From that came my own static site generator, [Adduce](https://adduce.vale.rocks). Adduce is wonderful, and I love the flexibility afforded by using it as a tool with a scripting language to build my site, rather than a framework, but it has limitations that I'm ill-equipped to address with my Rust capabilities.

With Adduce, I had the issue that lacking functions meant many parts of the site had to be hand-coded and modified, which was time-consuming, and I [came to realise](https://www.lesswrong.com/posts/Nq2BtFidsnhfLuNAx/?commentId=Xby4NTqhC3DzWKt9P) that _something_ needed to change. Thanks to my commitment to building things on web foundations such as HTML, CSS, and JS and not abstracting them, it was pretty easy to migrate as needed.

## Current Version

When I saw [a post from Jan Miksovsky](https://fosstodon.org/@JanMiksovsky/113516427582479669) looking 'for people to playtest a programming language for making websites', I sent him a message expressing my interest. I avoided doing too much research and went into it with a fresh mind and no preformed opinions.

The language, [Origami](https://weborigami.org), didn't take long to win me over. It's a full programming language with all the expected bells and whistles, making it easy to do everything you'd need from a static site generator while also allowing you to fall back on JavaScript if needed. It also comes with helpful errors and a full interactive explorer for development, which is lovely for debugging and visualising exactly how things are working.

In the hours following the playtest, I worked on porting my site over, and by the end of the day, I already had the broad strokes down. Now, my site is fully functioning on Origami with many additive bells and whistles that weren't previously possible with Adduce.

### Footnotes/Endnotes/Sidenotes

I like being able to add extra information, tangents, or conjecture to my writing, but I don't always wish to clutter or disrupt the main flow of text. Footnotes [^1] are great for this, but the typical implementation is less than ideal, as it has users jumping all over the page every time they wish to read one.

Thus, I've come up with my own implementation. By default, footnotes are marked up as anchors to the definition at the end of the page in standard HTML, but the experience of this is greatly improved by some JavaScript-based progressive enhancement. Assuming the JavaScript is available and active, clicking a footnote reference in a horizontally challenged viewport will open it in a popover. If the viewport is sufficiently wide, then the footnotes also manifest as sidenotes in the page's right margin.

This overall experience is very much influenced by [Gwern's implementation and research](https://gwern.net/sidenote) and is implemented on my site via my own [`footnotes.js`](https://vale.rocks/assets/scripts/footnotes.js). I've also provided a [reference implementation on CodePen](https://codepen.io/OuterVale/pen/ogvGVdq).

### Hero Puddle

On the [landing page](/) of my site, I have an interactive fluid simulation triggered by touch and mouse movement. Very much inspired and based on [the one by Arjun Nair](https://batmannair.com/puddle.js/), my implementation ([`puddle.js`](/assets/scripts/puddle.js)) is simplified and provides greatly improved performance. You can play with it [over on CodePen](https://codepen.io/OuterVale/pen/emOeyQM).

### Graph View

Also on the landing page is a global graph view of all content on my site. This is inspired by the graph views implemented in [Quartz](https://quartz.jzhao.xyz/features/graph-view) and [Obsidian](https://help.obsidian.md/plugins/graph). I chose to roll my own implementation from scratch, making use of the HTML `<canvas>` element to render the nodes.

Most graph view systems show the association between individual pages based on how they link to one another, but, as my site is already rather complex, I chose to forgo this. Any system capable of identifying all these relationships would incur significantly longer build times that would quadratically increase as the amount of content grows. Speaking of which, given the amount of content on this site, it would also be extremely visually noisy, making it almost useless on a global scale.

As such, my implementation does not show direct associations between pages beyond hierarchy and is perhaps better described as a visual sitemap [^2] -- especially as it pulls in my [`sitemap.xml`](/sitemap.xml) for data. I have excluded paginated pages, as I don't see any benefit from them appearing in the graph.

Groups of nodes are coloured based on the accent colours of the section of my site they belong to, and the size of each parent node is proportional to the number of child nodes it has. Nodes without child nodes ignore this and are made bigger for visibility. All nodes are presented with their URL slugs, though these slugs are only visible when you sufficiently zoom in to ensure readability. The full URL is exposed when interacting with them, so one can see what page they represent and navigate to their destination.

All nodes on the graph are computed with a rudimentary physics system. Nodes are attracted to their parents, lightly repulse each other, and spring forces keep them from overlapping or being too spread apart to achieve a usable and aesthetically coherent appearance. To avoid all the nodes shooting off into the aether on initial layout, their velocity is limited, and there is some damping to avoid jittering. There is also a centre force which gently pulls nodes towards the graph's origin point if they're too far out.

You can also drag them around to rearrange and manipulate them -- this isn't particularly useful, but is a lot of fun. While a user is moving a node, it is 'pinned' to avoid physics interfering.

You can see my full implementation in [`graph.js`](/assets/scripts/graph.js).

### Comments

This site does not currently have any comment functionality, and it isn't particularly easy to add any due to the site's static nature.

Given that my readership is generally of the variety that frequents GitHub, I've previously employed [Giscus](https://giscus.app) for comment functionality, which used the [discussion page](https://github.com/DeclanChidlow/vale.rocks/discussions) of my website's repo on GitHub as what is essentially a database. I [ultimately removed this comment implementation](/micros/20250828-0200) due to my growing distaste for GitHub.

### Link Icons

Hyperlinks are the backbone of the web, and I employ some rudimentary CSS regex to suffix most links with icons to indicate if they link to an anchor within the page or an external location. Links within this site aren't suffixed. While it would be possible to extend beyond this and start fetching favicons for each link as seen in [TurnTrout's 'The Pond'](https://turntrout.com), I feel that is beyond scope for my site and adds unnecessary complexity.

### Advanced Figures

Without JavaScript, my figures will display as you'd expect of any other site, with the content followed by a `figcaption` when present, but with JavaScript, they do a bit more.

Figures containing images get a glow inspired by [YouTube's ambient mode](https://support.google.com/youtube/answer/12827017). To achieve this, the image of the figure is duplicated, aligned behind the actual image, scaled up a tad, and blurred to permit a glow effect. This glow effect helps figures feel more like part of the page, rather than something slapped into it.

For applicable cases, figures will open into full-screen lightboxes when clicked. These lightboxes display the figcaption and alt text as available.

I've got a [reference implementation on CodePen](https://codepen.io/OuterVale/pen/QwLOyPM) of the glow and lightbox functionality, which is used in production on this site as [`figures.js`](https://vale.rocks/assets/scripts/figures.js).

Also, as part of my figures, I have classes set up that allow for censoring or allowing inversion of images. On posts like [My Experience Biohacking](/posts/my-experience-biohacking), where there are some slightly bloody images, or situations where I may need to hide a spoiler, I can blur the content until hovered or focused.

As for inversion, certain images, such as graphs, may have solid white backgrounds, so it can be beneficial to invert them if the user has selected a dark mode presentation so as to not flashbang them. I achieve this with the very simple CSS `filter: invert(95%) hue-rotate(180deg)`. This inverts an item but keeps the colours more or less as they should be by flipping the hue back.

### Scroll Indication

When perusing the content of an article, a scroll progress bar appears with markers of heading locations for ease of navigation. This implementation is inspired by the one on [LessWrong](https://www.lesswrong.com/). It has two possible appearances that swap out based on breakpoints for a responsive experience best tailored to the user.

On viewports with sufficient horizontal space, the indicator is displayed vertically and has a thumb that represents the height of the user's viewport. When the vertical indicator is hovered, a percentage value representing progress and heading labels are displayed like a table of contents. Clicking a heading label allows jumping to it.

On narrower viewports, the indicator manifests as a horizontal progress bar at the top of the screen and a button to open a table of contents. When triggered, the table of contents appears at the top of the screen with a percentage value indicating overall progress.

Ideally, the base of this effect could be achieved using scroll-driven animations with additional JavaScript-based functionality considered progressive enhancement, but that has restrictions if the page has content beyond the main article (such as comments and navigation), where one must start implementing `overflow: scroll` hackery, so, alas, it currently requires JavaScript to achieve.

Once again, you can view my [reference implementation on CodePen](https://codepen.io/OuterVale/pen/MYgoYzR) and the code as used on this site in [`scroll-indicator.js`](/assets/scripts/scroll-indicator.js).

### Heading Anchors Copying

Tying in somewhat with the scroll indication functionality, my client-side [`copy-heading-anchor.js`](/assets/scripts/copy-heading-anchor.js) script adds a button to copy anchor links to headings.

### Search

My entire site is [fully searchable](/search) thanks to the wonderful [Pagefind](https://pagefind.app). Each page on my site includes well-defined metadata that permits further filtering and exclusion from results as necessary, which is excellent for being able to narrow down a result.

As Pagefind is implemented client-side as a script, I've taken inspiration from [David Bushell's site](https://dbushell.com/2024/11/21/static-search-page-find/) and implemented a fallback that does a site-specific search with DuckDuckGo should JavaScript be unavailable. I've also added in support for URL query parameters thanks to [Kristof Zerbe's post about it](https://kiko.io/post/Pagefind-UI-and-URL-Parameters/).

### 404 Handling

Occasionally, I break links. [I'm sorry](https://www.w3.org/Provider/Style/URI). Thus, I've got my client-side [`404-guesser.js`](/assets/scripts/404-guesser.js) script, which is once again shamelessly inspired by Gwern. It has some hard-coded handling for certain page structures I've moved in the past, but otherwise just tries to suggest the correct page if someone has made a typo. It'll look for similar URLs and spit out a list of suggestions.

Beyond trying to get you to the right page, my 404 page also has a style tag with the `contenteditable` attribute, which allows one to write their own CSS that'll apply to the page. It's a lot of fun and a bit of an Easter egg for people who get lost.

### Dynamic Timezone Display

All times on this site are provided in UTC, but using some client-side JavaScript, the times for micros are altered to be in the user's chosen timezone as set by their browser/OS.

### Optimising Assets

Vector content in the form of SVGs are preferred to raster images and used whenever possible. Despite their file sizes already being far lower than raster images, I still opt to optimise them manually to minimise their size.

Where SVGs aren't applicable, images are served as AVIFs, which I found to have the smallest file size without sacrificing browser compatibility.

I convert all my fonts to WOFF2 and serve them with my site rather than using an external CDN. WOFF2 comes with great size reductions and good font feature support, and avoiding CDNs helps with performance and reduces dependency.

### Markdown Parsing

Content on this site is authored in Markdown and parsed during the initial build step by [`parse-markdown.js`](https://github.com/DeclanChidlow/vale.rocks/blob/main/src/functions/parse-markdown.js) which uses [Marked](https://marked.js.org) under the hood alongside a few extensions and self-implemented handlers.

This script does several things. As well as the expected Markdown features, headings are given IDs using `marked-gfm-heading-id`, code blocks are highlighted with `marked-highlight` which uses `highlight.js`, proper orthotypography is aided by `marked-smartypants`, GitHub Flavoured Markdown style admonitions and footnotes are achieved with `marked-alert` and `marked-footnote`, respectively, and relative URLs are prefixed with a base URL using `marked-base-url`.

It also handles in-text abbreviations by marking up sets of three or more sequential capital letters and capital letters which directly follow numbers with the `<abbr>` element. This is fairly complex and is designed to handle a few edge cases by ignoring Roman numerals, code (inline or block), element attributes, and content already wrapped in an `<abbr>` element.

I take care not to incorporate too many transformations during Markdown parsing, as it very quickly adds up, negatively impacting build time. This only becomes more of an issue as additional content is published.

### IndieWeb Integration

In an effort to integrate open web concepts into this site, I've applied much of that outlined on the [IndieWeb wiki site](https://indieweb.org).

One part of this is making use of [microformats](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Microformats) whenever possible to define extra structure and semantics, and another part is embracing <abbr title="Publish on your Own Site, Syndicate Elsewhere">POSSE</abbr>/<abbr title="Publish Elsewhere, Syndicate (to your) Own Site">PESOS</abbr> syndication models as applicable. This places my site as the centre of my web presence, with everything else revolving around it. Ideally, it should be considered the canonical source for everything I do web-wise.

### Read on Site Recommendation

All of my posts are made available over syndication formats like RSS, though I do believe this provides an inferior experience. In the case of some posts though, they simply can't be experienced off-site, as they rely on this site for full presentation and functionality.

To address this, I added functionality which allows me to mark long-form posts as `site_recommended`, which will prefix them in syndication with the recommendation to read them on site. I got this idea from [a comment left by Tyler Sticka](https://social.lol/@tylersticka/114653781572200337).

### Progressive Web App

Vale.Rocks is configured as a [PWA](https://en.wikipedia.org/wiki/Progressive_web_app) so that users can install it as a standalone app. I very much doubt many people will install this site as a PWA, but the option is there for those that want it. It has [shortcuts](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/shortcuts) configured to the major site sections that someone might want to visit on demand.

In the future I wish to extend the functionality to allow notifications when new posts go live and caching for offline reading.

### Development & Deployment

My development workflow for this site is pretty trivial. I run a local Origami dev server via [Bun](https://bun.sh) on my laptop and make my edits via Neovim. It's more or less the standard development flow you'd expect of any web-based project. All writing on the site is done with the exact same flow.

For more info about the software of my development environment, my [article on the technology I use](/posts/uses) is worth referencing.

I very much treat this site as a testing ground for my learning and therefore generally start using new features as soon as they are newly available in [Baseline](https://web.dev/baseline). My readership is generally technical, so they _should_ know how to update their browsers; furthermore, I love being on the bleeding edge, so the minor inconvenience of things perhaps not looking quite right to some people is a trade-off I'm willing to make.

I handle source control via Git with GitHub serving as a repository host. In fact, the code for this site is source-available [in its entirety](https://github.com/DeclanChidlow/vale.rocks) if you'd like to have a look.

This site is hosted via a Cloudflare Worker which rebuilds and redeploys each time I push an update to my site's Git repository. Previously I hosted my site on [GitHub Pages](https://pages.github.com), but the lack of any advanced configuration, such as redirects, was holding me back.

### Analytics

I collect analytics on Vale.Rocks. You can [check out my analysis and some info about why I choose to collect them](/posts/traffic-analysis).

As for _how_ analytics are collected, I do it via [GoatCounter](https://www.goatcounter.com), which provides simple, lightweight, and open-source analytics. It is imported via a link in my page heads. It'll be blocked by pretty much every content blocker, which has some significant skews on the data.

## Information Architecture

Vale.Rocks is implemented following my own [Strong Opinions On URL Design](/posts/strong-opinions-on-url-design). Chiefly, this means that there _aren't_ [useless paths](/posts/strong-opinions-on-url-design#useless-paths).

The site is split up into sections for each type of content (eg, posts, micros, photography, etc) with (sometimes paginated) top-level pages for each of them displaying a list of the content.

Individual pages (eg, contact, support, etc) are served as top-level pages and are not unnecessarily nested.

### Firehose

Given my decently high output, there are people who wish to be able to see everything in one place and then filter through it themselves. My [firehose page](/firehose)[^3] serves this purpose by providing a reverse-chronological list of things I publish and release. The firehose has no actual content of its own; it merely indexes other content.

It is implemented by taking the data for each content type and merging it into a single tree which is then split up for pagination and piped into a template for firehose pages.

All the content going into the firehose data tree is given a `type` property [^4] which is referenced in the template for firehose pages for the purpose of styling and displaying content of each type differently.

[^1]: Or perhaps more accurately for the web, endnotes.

[^2]: Or, if you will, a collection of [floating amoeba dot links](https://bsky.app/profile/alanwsmith.com/post/3ls7g3zxjy22r).

[^3]: The terminology of firehose was inspired by the [AT Protocol's usage of the term](https://atproto.com/specs/sync#firehose).

[^4]: For example, [micros](/micros) get a `type` property of 'micro', and [posts](/posts) are given a `type` property of 'post'.
