---
title: Antiquated HTML Snippets and Artefacts
description: Overviews of the very many snippets of HTML that were once commonly included on websites to address specific cases with certain technologies, browsers, operating systems, or extensions. Fragments dating back to the days of Internet Explorer and Netscape, to more modern bits that are nonetheless obsolete.
og_description: We can mostly blame Internet Explorer, as always.
pub_time: 2026-09-08
section: Essay
tags: ["HTML", "front-end", "development"]
standardsite_rkey: 3muyazqfpvx2c
---

With ever-changing devices, browsers, operating systems, form factors, specifications, personal preferences, tooling, and corporate interests, the web is in a constant state of flux. As a result, so is the HTML we write. For every line of the HTML specification itself that has changed since the language's inception, there are many more bits of HTML that have seen what I'll call 'environmental' changes. Adaptations to differing browsers, extensions, integrations, and systems which we find HTML existing in.

This article doesn't cover [once-specced but now obsolete bits of HTML](https://www.htmhell.dev/adventcalendar/2025/22/) but instead looks at all the snippets that have wormed their way into websites as result of, or in combat against, third-party integrations, browser competition, vendor extensions, and platform-specific hacks. The bits of HTML that were included for reasons, and which have been forgotten for present irrelevance. The snippets that live on only in the markup of sites from bygone eras and in the minds of those who fought during the browser wars.

## X-UA-Compatible

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

In an age where browsers changed quickly and version-specific behaviours weren't unheard of, it was deemed necessary to signal compatibility with specific versions of browsers with the `X-UA-Compatible` meta tag. Here the content attribute reads `IE=edge`, meaning that the target is the highest supported document mode in Internet Explorer (IE).

As [outlined in the documentation](https://learn.microsoft.com/en-us/openspecs/ie_standards/ms-iedoco/380e2488-f5eb-4457-a07a-0cb1b6e4b4b5), there are other values than `edge`. One can also supply a value of `5` through `11` to correspond with the associated Internet Explorer version, or `EmulateIE7` through `EmulateIE11` to enter into that version's mode, but only if a valid `DOCTYPE` is declared, otherwise falling back to quirks mode.

```html
<meta http-equiv="X-UA-Compatible" content="chrome=1">
```

Before Chrome took over the market, Google released an Internet Explorer plugin called [Google Chrome Frame](https://en.wikipedia.org/wiki/Google_Chrome_Frame). Installable in Internet Explorer versions 6 through 9, it rendered websites in Chrome's modified WebKit engine rather than Internet Explorer's Trident engine if they had the tag set.

```html
<meta http-equiv="X-UA-Compatible" content="requiresActiveX=true">
```

`requiresActiveX` was used to prompt Internet Explorer 10 to switch to desktop mode if in Metro mode, which didn't support plugins.

## ICBM Coordinate

```html
<meta name="ICBM" content="-31.9548, 115.8602">
```

ICBM (an abbreviation of 'intercontinental ballistic missile') is hacker slang for one's geographical location that dates back to Usenet days. The meta tag was used for identifying the location of a website's subject and was referenced by the service [GeoURL](https://web.archive.org/web/20060701025123/http://geourl.org/) for plotting sites on the globe and helping people find sites of geographical proximity.

## Conditional Comments

```html
<!--[if gte IE 6]>
	<p>Only shown in Internet Explorer 6 and higher.</p>
<![endif]-->
```

In an era where browsers changed regularly and the vicious browser wars were in full force, it was sometimes important to target a specific browser or version of one. Microsoft handled this in Internet Explorer with specially formatted comments as seen in the snippet. There were a number of operators that could be used to further refine the condition:

| Operator | Description                                                            |
| :------: | :--------------------------------------------------------------------- |
|   `IE`   | Denotes Internet Explorer. Can also include a version, such as `IE 7`. |
|   `lt`   | Less than.                                                             |
|  `lte`   | Less than or equal.                                                    |
|   `gt`   | Greater than.                                                          |
|  `gte`   | Greater than or equal.                                                 |
|   `!`    | NOT.                                                                   |
|   `&`    | AND.                                                                   |
|   `\|`   | OR.                                                                    |
|   `()`   | Subexpression operator.                                                |
|  `true`  | Always evaluates to true.                                              |
| `false`  | Always evaluates to false.                                             |

```html
<!--&{navigator.appName == 'Netscape'};
	<p>Only shown in Netscape.</p>
-->

<!--&{navigator.platform == 'win95'};
    <p>Only shown in Netscape on Windows 95.</p>
-->
```

Netscape [had its own way of handling conditional comments](https://www.masswerk.at/nowgobang/2019/object-handle-event#:~:text=A%20special%20use%20case%20were%20conditional%20comments) using JavaScript entities immediately following an opening comment tag. If evaluated to `true`, the comment would be included. If `false`, it'd just be a comment. Browsers other than Netscape would always treat it as just a comment.

## Microsoft Smart Tags

```html
<meta name="MSSmartTagsPreventParsing" content="TRUE">
```

[Smart Tags](https://web.archive.org/web/20010625111031/http://www.microsoft.com/windows/ie/preview/smarttags/default.asp) was a system Microsoft introduced in Internet Explorer 6 which would automatically inject hyperlinks into pages.[^1] An example given by Microsoft was that 'a Smart Tag might detect the names of major companies on the Web and tag them, allowing you to access stock quotes and company information.'. Site owners were outraged, and the `MSSmartTagsPreventParsing` meta tag was introduced to allow opting out. Microsoft later dropped it from Internet Explorer entirely.

## PICS

```html
<meta
	http-equiv="PICS-Label"
	content='
 (PICS-1.1 "http://www.gcf.org/v2.5"
    labels on "1994.11.05T08:15-0500"
           until "1995.12.31T23:59-0000"
           for "http://w3.org/PICS/Overview.html"
    ratings (suds 0.5 density 0 color/hue 1))
'
>
```

In the mid-90s the World Wide Web Consortium (W3C) attempted to establish a set of technical specifications for labelling internet content, called [Platform for Internet Content Selection (PICS)](https://www.w3.org/PICS/). PICS was incorporated into many filtering products, as well as Internet Explorer as of version 3. The shown meta tag could be included on a page to label it.

Rather unsurprisingly, many site owners just lied and miscategorised their sites. More still just never added the tags. The [Protocol for Web Description Resources (POWDER)](https://www.w3.org/2007/powder/) succeeded PICS but was also unsuccessful in its intentions. PICS was more or less completely dropped by 2003.

## Interpage Transitions

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=12)">
<meta http-equiv="Page-Exit" content="revealTrans(Duration=2.0,Transition=12)">
```

Much like slide deck applications such as Microsoft PowerPoint or Apple Keynote have the ability to set transitions, Internet Explorer from version 4 to version 8 [supported the above tags for transition style effects](<https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/ms532847(v=vs.85)#interpage-transitions>). This feature wouldn't officially reach the web platform until the adoption of the [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API). Web developer Bramus has ported Internet Explorer's [transitions to the new View Transition API](https://page-transitions.style).

## Frame Buster

```html
<meta http-equiv="Window-target" content="_top">
```

Starting in Netscape Navigator in the mid-90s and then working its way over to Internet Explorer and other browsers, this non-standard meta tag would cause a page to break free of the parent page and open as a standalone browser window if it was loaded in a frame. It was popularly used by people to stop their pages from being embedded in frames on other sites. The `_top` `Window-target` specifies that a page should load in a _top_ level window. In the modern age people use security headers to prevent pages from being embedded.

## Baidu Page Transcoding

```html
<meta name="applicable-device" content="pc,mobile">
<meta http-equiv="Cache-Control" content="no-siteapp,no-transform">
```

The Baidu Browser (<ruby>百<rt>bǎi</rt>度<rt>dù</rt>浏<rt>liú</rt>览<rt>lǎn</rt>器<rt>qì</rt></ruby>) included a page 'transcoding' feature on mobile which was immensely unpopular. Websites would be routed through `transcoder.baidu.com` and modified. Layouts would be restructured, styles stripped, images compressed, branding removed, and adverts on the site would be removed while Baidu Union (<ruby>百<rt>bǎi</rt>度<rt>dù</rt>联<rt>lián</rt>盟<rt>méng</rt></ruby>) adverts would be injected. It [heavily disrupted sites](https://zzz.buzz/zh/2017/04/10/baidu-mobile-seo-and-baidu-siteapp/). One of these tags would be added to sites from 2012 through to 2018 to opt out of this transcoding taking place.

## Skype Toolbar

```html
<meta name="skype_toolbar" content="skype_toolbar_parser_compatible">
```

There was an add-on for Internet Explorer, Chrome, and Firefox called 'Skype Toolbar' (later 'Skype Click to Call'). Available from the mid-2000s until the mid-2010s, it was automatically installed alongside Skype and would attempt to detect phone numbers on pages and show a clickable icon. This icon allowed calling a number via Skype, adding it to one's Skype address book, and assorted other Skype-related functionality. In inserting an icon, it would often cause page breakages, so developers would include the above tag to disable it on their sites.

The extension was also extremely unstable in Firefox, to the extent that [Mozilla explicitly blocked it](https://blog.mozilla.org/addons/2011/01/20/blocking-the-skype-toolbar-in-firefox/) in 2011.

## Image Toolbar

```html
<meta http-equiv="imagetoolbar" content="no">
```

Internet Explorer 6 added an Image Toolbar, which would appear over images and show buttons for actions such as saving or sharing an image. Developers naturally hated this intrusion on their site and could disable the functionality with the above meta tag.

## ClearType

```html
<meta http-equiv="cleartype" content="on">
```

ClearType is Microsoft's system [for improving the legibility of typography](https://learn.microsoft.com/en-us/typography/cleartype/). This tag could be included on pages to make typography look better on low-resolution devices, namely those running Pocket Internet Explorer / Internet Explorer Mobile.

## AJAX Crawling

```html
<meta name="fragment" content="!">
```

Google previously didn't run JavaScript when crawling pages, so sites which had AJAX-based content would not be indexed. This meta tag told Google's crawler to request a page with the `_escaped_fragment_` query parameter, which was expected to return a HTML version of the page's contents. Google began recommending this approach in 2009 and [stopped advising it in 2015](https://web.archive.org/web/20180707074702/https://webmasters.googleblog.com/2015/10/deprecating-our-ajax-crawling-scheme.html).

## Directory

```html
<meta name="robots" content="noodp, noydir">
```

Web directories used to be immensely popular as a way for people to find content on the internet. Two of the most popular were Yahoo Directory and DMoz (named for the URL `directory.mozilla.org`). The directories would sometimes write their own titles and descriptions for sites, which would be used by some search engines. To signal to search engines that they should use the metadata provided on the page and not the metadata from the directories, developers would include the above meta tag. Both directories are defunct now, making this snippet irrelevant.

## Web App Name

```html
<meta name="application-name" content="App Title">
```

`application-name` was used by various web app implementations across various browsers before Progressive Web Apps (PWAs) became established. If missing, systems usually fell back to `<title>`.

## Internet Explorer Pinned Sites

```html
<meta name="msapplication-tooltip" content="Visit our site!">
<meta name="msapplication-starturl" content="./">
<meta name="msapplication-window" content="width=1024;height=768">
<meta name="msapplication-navbutton-color" content="#FF3300">
<meta name="msapplication-task" content="name=Blog;action-uri=/blog;icon-uri=/favicon.ico">
```

Internet Explorer 9 and higher on Windows 7 had a function to [pin sites to the taskbar](<https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/samples/gg491738(v=vs.85)>). When pinned, sites could expose some site features on an operating system and browser level, almost like a modern progressive web app. `msapplication-tooltip` was text shown when hovering a site's icon, `msapplication-starturl` set the root URL of the pinned site, `msapplication-window` set the initial size of the pinned site's window when opened (minimum width of 800px and height of 600px), `msapplication-navbutton-color` set a custom colour for the browser chrome's back and forward navigation buttons, and [`msapplication-task`](<https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/samples/gg491725(v=vs.85)#using-msapplication-task>) was used to define quick actions which could be accessed by secondary clicking a pinned site in the taskbar. For example, a quick link to a blog page.

## Microsoft Web Apps

```html
<meta name="msapplication-TileColor" content="#FF3300">
<meta name="msapplication-TileImage" content="/mstile-144x144.png">
<meta name="msapplication-square70x70logo" content="/images/small-tile.png">
<meta name="msapplication-square150x150logo" content="/images/medium-tile.png">
<meta name="msapplication-wide310x150logo" content="/images/wide-tile.png">
<meta name="msapplication-square310x310logo" content="/images/large-tile.png">
<meta name="msapplication-config" content="/browserconfig.xml">
```

Very similar to the previously mentioned Pinned Site functionality, these values were used for presentation. `msapplication-TileColor`, `msapplication-TileImage`, and the various `msapplication-square*` and `msapplication-wide*` attribute carrying tags were used for setting the theming of the tiles across the assorted versions of Windows, including the desktop UI, Metro UI, and Windows Mobile.

```html
<meta name="msapplication-badge" value="frequency=360;polling-uri=https://contoso.com/BadgeUpdate.aspx">
```

`msapplication-badge` was used [to define a web address to be polled for notifications](<https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/samples/jj152137(v=vs.85)>) which would display on a site's Live Tile.

## Chrome Pinned Sites

```html
<meta name="application-url" content="https://vale.rocks">
```

Google Chrome had some pinned web app functionality which would use `application-url` for the start URL.

## Safari Pinned Sites

```html
<link rel="mask-icon" href="icon.svg" color="green">
```

Pinned Sites/Tabs in Safari allowed 'users to keep their favorite websites open, running, and easily accessible.'. An SVG icon for the Pinned Tab could be declared alongside a colour which the icon would use.

## CRX-less Web Apps

```html
<link rel="chrome-application-definition" href="application_definition.json">
```

[CRX-less Web Apps](https://web.archive.org/web/20120303234427/http://code.google.com/intl/en-US/chrome/apps/docs/no_crx.html) were applications in Google Chrome which allowed using an online manifest to describe a hosted app. The above meta tag would link to a JSON file with the manifest:

```json
{
	"name": "Application",
	"description": "Description describing the app.",
	"launch_url": "index.html",
	"launch_container": "panel",
	"icons": {
		"128": "128.png"
	},
	"permissions": ["notifications"]
}
```

These CRX-less apps could be distributed on the Chrome Web Store with just the JSON manifest and an icon, with no need for the full `.crx` format Chrome uses for extensions. This type of app was later renamed to 'Chrome Apps', which are [being phased out](https://developer.chrome.com/docs/apps/overview).

## iOS Web Apps

```html
<link rel="apple-touch-icon" href="/custom_icon.png">
<link rel="apple-touch-startup-image" href="/splash.png">
<meta name="apple-mobile-web-app-title" content="App Name">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

To allow site owners to customise the experience of their websites when added to a user's homescreen on iOS, Apple [introduced the above meta tags](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html). The icon, startup image, and title are self-explanatory, while `apple-mobile-web-app-capable` disabled the browser chrome, and `apple-mobile-web-app-status-bar-style` allowed setting the operating system status bar to one of three possible values:

- `default` - White background with black text and icons.
- `black` - Black background with black text and icons.
- `black-translucent` - Background colour sourced from the webpage background colour with white text and icons.

These meta tags are now rendered obsolete by modern PWA definitions.

```html
<meta name="apple-touch-fullscreen" content="yes">
```

`apple-touch-fullscreen` was used in some early demos for iOS 2, however, Apple's documentation only reflects `apple-mobile-web-app-capable`. Due to its presence in those early demos, `apple-touch-fullscreen` was popularised before the feature released, seemingly prompting Apple to make it an alias of `apple-mobile-web-app-capable`.

## UC Browser and QQ Browser

```html
<meta name="screen-orientation" content="portrait">
<meta name="x5-orientation" content="portrait">
<meta name="full-screen" content="yes">
<meta name="x5-fullscreen" content="true">
```

UC Browser and QQ Browser were particularly popular browsers in Asia through the early to mid-2010s due to their heavy data savings and optimisation for cheap devices. UC Browser would use `screen-orientation` to force a specific display orientation and `full-screen` to hide the browser's chrome. QQ Browser would do the same, though with `x5-orientation` and `x5-fullscreen`. 'X5' in those meta names refer to Tencent's X5 browser engine. The meta tags are no longer needed due to the standard fullscreen and orientation APIs and popularisation of more capable browsers.

## PDA Optimised

```html
<meta name="HandheldFriendly" content="true">
<meta name="MobileOptimized" content="320">
```

Before the proliferation of `<meta name="viewport" content="width=device-width">` for making sites cleanly scale to small screens, these tags were widely used for mobile content. `HandheldFriendly` was created for [AvantGo](https://getoutofmyhead.dev/handheld-friendly) and then [spread to the Blackberry Browser](https://web.archive.org/web/20150306230553/https://developer.blackberry.com/playbook/html5/documentation/handheldfriendly.html), while `MobileOptimized` was a [Microsoft concoction](<https://learn.microsoft.com/en-us/previous-versions/bb431690(v=msdn.10)>) for old versions of [Windows Mobile](/posts/pda-browsers#windows-mobile).

## Internet Explorer Tap Highlight

```html
<meta name="msapplication-tap-highlight" content="no">
```

This snippet stops links from highlighting when tapped in Internet Explorer 11. It was similar to [`-webkit-tap-highlight-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/-webkit-tap-highlight-color), though unlike that property it was a boolean and didn't allow changing the colour.

## Revisit-After

```html
<meta name="revisit-after" content="7 days">
```

A website called [Vancouver Webpages](http://vancouver-webpages.com) ran a niche regional search system called 'searchBC' (the BC standing for 'British Columbia') which used the tag to know how often it should re-scrape a site. However, this was the only known use of the tag. There is no evidence that it has ever been used by any major search engine, [including Google](https://developers.google.com/search/blog/2007/12/answering-more-popular-picks-meta-tags#revisit-after-sitemap-lastmod-and-changefreq). Despite this, it somehow caught on like some sort of SEO myth and was perpetuated across the web.

## Page Prerendering

```html
<link rel="prerender" href="https://example.com">
```

Only fully supported in Chrome between versions 13 and 62 and never specced, this would fetch and process a page so it would be ready when users navigate to it. The functionality was replaced by the [Speculation Rules API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API).

## Accelerated Mobile Pages Version

```html
<link rel="amphtml" href="https://example.com/amp.html">
```

Accelerated Mobile Pages (AMP) were restructured versions of pages optimised for faster content loading. This tag was used to link to an AMP version of a page, however, Accelerated Mobile Pages are no longer widely used, and Google no longer pushes for them, making the tag unneeded.

## Internet Explorer Reading View

```html
<meta name="IE_RM_OFF" content="true">
```

Starting with Internet Explorer 9, 'Reading View' was introduced. By pressing a button which would appear in the browser chrome, you could get a simplified version of a page suited for reading. Pages could opt out of having this button shown by including the aforementioned meta tag.

## Really Simple Discovery

```html
<link rel="EditURI" href="https://example.com/xmlrpc.php?rsd" type="application/rsd+xml" title="RSD">
```

[Really Simple Discovery (RSD)](https://cyber.harvard.edu/blogs/gems/tech/rsd.html) was a system for exposing services for managing a blog to clients. The link in the head would direct clients to an XML document which would include endpoints to which tools such as Windows Live Writer, BlogJet, or MarsEdit could connect. It was implemented across platforms, including WordPress, Blogger, LiveJournal, TypePad, and MediaWiki. Modern publishing systems have generally deprecated it.

## Pingbacks

```html
<link rel="pingback" href="https://example.com/xmlrpc.php">
```

Pingbacks were a system where sites would alert other sites when they linked to them. The site receiving the 'ping' would check that a link was actually present on the site sending the ping, then make a note on the page saying something to the effect of '[Website] linked to this page'. They functioned somewhat similarly to how [WebMentions](https://indieweb.org/Webmention) do.

Unfortunately, pingbacks rather quickly became an avenue for spam and SEO-gaming, so fell out of fashion. Vulnerabilities allowing sites to be tied up in <abbr title="Distributed Denial of Service">DDoS</abbr> attacks also became widely exploited.

## Share Partners

```html
<link rel="image_src" href="https://example.com/post/image.png">
<link rel="audio_src" href="https://example.com/post/audio.mp4">
<link rel="video_src" href="https://example.com/post/video.mp4">
```

Before Facebook created [Open Graph](https://ogp.me), they had a 'Share Partners' system for defining metadata to be used in embeds. Many additional sites adopted it as an ad hoc standard and implemented the tags. For example, [Digg](https://web.archive.org/web/20120511044923/https://about.digg.com/thumbnails).

`rel="image_src"` would be referenced for an image to embed, `rel="audio_src"` would be referenced for audio to embed, and likewise ` rel="video_src"` for video. There were [a number of these meta tags](https://web.archive.org/web/20061114042416/https://www.facebook.com/share_partners.php) which were supported to varying degrees.

## Twitter Embeds

```html
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@account">
<meta name="twitter:creator" content="@writer_account">
<meta name="twitter:url" content="https://example.com/posts/hello-world">
<meta name="twitter:title" content="Title">
<meta name="twitter:description" content="Page description">
<meta name="twitter:image" content="https://example.com/hello-world-embed-image.png">
<meta name="twitter:image:alt" content="Alternative text for the image.">
```

These meta tags (and some other, less frequently used ones) were used on Twitter when generating link embeds. However, the documentation and card validator are no longer accessible (previously at `https://dev.twitter.com/cards/getting-started` and `https://cards-dev.twitter.com/validator` respectively). X falls back to the widely respected Open Graph meta tags, making the Twitter-specific declarations largely useless. They should be removed in favour of Open Graph tags. Further, they should be removed because X is an awful site with poor moderation that is owned by a man who publicly performed a Nazi Sieg Heil salute and has directly contributed to the rise of fascism in the United States of America and globally, among other horrors.

```html
<meta name="twitter:dnt" content="on">
```

Twitter also had a Do Not Track meta tag for opting out of tracking when using Twitter for Websites widgets. Again, the documentation (previously at `https://dev.twitter.com/web/overview/privacy`) is now inaccessible, and it seems the tag is no longer respected.

---

This article isn't comprehensive. These are only the more popular or notable non-standard bits. There are so many more obscure bits drifting through the shatters of cyberspace. For the curious mind, some more are listed -- albeit without associated detail -- on [the WhatWG Wiki](https://wiki.whatwg.org/wiki/MetaExtensions).

[^1]: Google tried something very similar in late-2024 with a feature called '[Page Annotations](https://web.archive.org/web/20241121124222/https://support.google.com/websearch/thread/308719098/page-annotation-in-google-app-browser-for-ios?hl=en)' in their Google app on iOS. It was hated and ultimately discontinued in March 2025.
