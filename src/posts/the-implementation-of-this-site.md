---
title: The Implementation of This Site
description: A breakdown and overview of the implementation of Vale.Rocks, how it used to be built, how it's built now, and its associated infrastructure.
og_description: No bodging here. None at all. Nope.
pub_time: 2024-12-12
mod_time: 2025-01-13
section: Meta
word_count: 2054
---

> [!NOTE]
> I very much recommend you read my post ["The Design of This Site"](/posts/the-design-of-this-site) prior to this one.

## Previous Iterations

This site has been around for a fair few years, and as someone who enjoys burning their time tinkering and refining, I'm powerless to avoid rebuilding it at least a few times in the quest for whatever it is I'm trying to achieve by rebuilding it.

The very earliest versions of this site were built with completely hand-coded standard HTML/CSS. No build step or automation. Slightly later it incorporated JavaScript and iframes so that content would be shared across pages rather than hard-coded -- still devoid of any automation. As you'd imagine, it didn't take long to reach the limits of what is possible with this approach.

The limit wasn't entirely a tech one. After all, the underlying tech was just web standards, and that allows for all you can think of. The limits I hit were my willingness to manually implement and hard code every single thing without any real ability to automate.

Thus, I moved on to using a static site generator. Given that I was already a GitHub user and had opted to deploy my site with GitHub Pages, I opted to use [Jekyll](https://jekyllrb.com). Jekyll is nice, and its support for Shopify's [Liquid templating language](https://shopify.github.io/liquid) made it wonderfully flexible -- but it wasn't necessarily exactly conducive to my preferred workflow, and dealing with Ruby proved a pain.

From that, came my own static site generator, [Adduce](https://adduce.vale.rocks). Adduce is wonderful, and I love the flexibility allotted by being able to use it as a tool with a scripting language to build my site, rather than a framework, but it has limitations that I'm ill-equipped to address with my current Rust capabilities.

With Adduce, I had the issue that lacking functions meant many parts of the site had to be hand-coded and modified, which was time-consuming, and I [came to realise](https://www.lesswrong.com/posts/Nq2BtFidsnhfLuNAx/?commentId=Xby4NTqhC3DzWKt9P) that _something_ needed to change. Thanks to my commitment to building things on web foundations such as HTML, CSS, and JS and not abstracting them, it was pretty easy to migrate as needed.

## Current Version

When I saw [a post from Jan Miksovsky](https://fosstodon.org/@JanMiksovsky/113516427582479669) looking "for people to playtest a programming language for making websites", I sent him a message expressing my interest. I avoided doing too much research and went into it with a fresh mind and no preformed opinions.

The language, [Origami](https://weborigami.org), didn't take long to win me over. It's a full programming language with all the bells and whistles you'd expect that makes it easy to do everything you'd need from a static site generator and allows you to fall back on JavaScript if needed. It also comes with helpful errors and a full interactive explorer for development, which is lovely for debugging and visualising exactly how things are working.

In the hours following the playtest, I worked on porting my site over, and by the end of the day, I already had the broad strokes down. Now, my site is fully functioning on Origami with many additive bells and whistles that weren't previously possible with Adduce. The language is still maturing, but I'm loving it!

### Footnotes/Endnotes/Sidenotes

I like being able to add extra information, tangents, or conjecture to my writing, but I don't always wish to clutter or disrupt the main flow of text. Footnotes [^1] are great for this, but the typical implementation is less than ideal as it has users jumping all over the page every time they wish to read one.

Thus, I've come up with my own implementation. By default, footnotes are marked up as anchors to the definition at the end of the page in standard HTML, but the experience of this is greatly improved by some JavaScript-based progressive enhancement. Assuming the JavaScript is available and active, clicking a footnote reference in a horizontally challenged viewport will open it in a popover. If the viewport is sufficiently wide, then the footnotes also manifest as sidenotes in the page's right margin.

This overall experience is very much influenced by [Gwern's implementation and research](https://gwern.net/sidenote) and is implemented on my site via my own [`footnotes.js`](https://vale.rocks/assets/scripts/footnotes.js), though I've also provided a [reference implementation on CodePen](https://codepen.io/OuterVale/pen/ogvGVdq).

### Hero Puddle

On the [landing page](/) of my site, I have an interactive fluid simulation. Very much inspired and based on [the one by Arjun Nair](https://batmannair.com/puddle.js), my implementation ([`puddle.js`](/assets/scripts/puddle.js)) is greatly simplified and provides greatly improved performance.

### Comments

Given that this is a static site and my readership is generally of the variety that frequents GitHub, I've employed [Giscus](https://giscus.app) for comment functionality. This essentially uses the [discussion page](https://github.com/DeclanChidlow/vale.rocks/discussions) of my website's repo on GitHub as a database.

### Link icons

Hyperlinks are the backbone of the web, and I employ some rudimentary CSS regex to prefix most links with icons to indicate if they link to an anchor within the page, a page within this site, or an external location. While it would be possible to extend beyond this and start fetching favicons for each link as seen in [TurnTrout's 'The Pond'](https://turntrout.com), I feel that is beyond scope for my site and adds unnecessary complexity.

### Advanced Figures

Without JavaScript, my figures will display as you'd expect of any other site, with the content followed by a `figcaption` when available. With JavaScript, a bit more is possible.

Figures containing images get a quite literal glow up. The image of the figure is duplicated, aligned behind the actual image, and blurred to permit a glow effect. This glow effect helps figures feel more like part of the page, rather than something slapped into it.

For applicable cases, figures will open into full-screen lightboxes when clicked. These lightboxes display the caption, attribution, and alt text as available.

I've got a [reference implantation on CodePen](https://codepen.io/OuterVale/pen/QwLOyPM) of the glow and lightbox functionality, which is used in production on this site as [`figures.js`](https://vale.rocks/assets/scripts/figures.js).

Also, as part of my figures, I have classes set up that allow for censoring or allowing inversion of images. On posts like [My Experience Biohacking](/posts/my-experience-biohacking), where there are some slightly bloody images, or situations where I may need to hide a spoiler, I can blur the content until hovered or focused.

As for inversion, certain images such as graphs may have solid white backgrounds, so it can be beneficial to invert them if the user has selected a dark mode presentation so as to not flashbang them. I achieve this with the very simple CSS `filter: invert(95%) hue-rotate(180deg)`. This inverts an item but keeps the colours more or less as they should be by flipping the hue back.

### Scroll Indication

When perusing the content of an article, a scroll progress bar appears, with indicators of heading locations for ease of navigation. This implementation is inspired by the one on [LessWrong](https://lesswrong.com). Headers are noted and immediately jumpable, and it has two possible appearances that swap out based on breakpoints for a responsive experience best tailored to the user.

On viewports with sufficient horizontal space, the indicator is displayed vertically and has a thumb that represents the height of the user's viewport. On narrower viewports, the indicator manifests as a horizontal progress bar at the top of the screen.

Ideally, the base of this effect could be achieved using scroll-driven animations with additional JavaScript-based functionality considered progressive enhancement, but that has restrictions if the page has content beyond the main article, such as comments, where one must start implementing `overflow: scroll` hackery, so, alas, it currently requires JavaScript to achieve.

Once again, you can view my [reference implementation on CodePen](https://codepen.io/OuterVale/pen/MYgoYzR) and the code as used on this site in [`scroll-indicator.js`](/assets/scripts/scroll-indicator.js).

### Search

My entire site is [fully searchable](/search) thanks to the wonderful [Pagefind](https://pagefind.app). Each page on my site includes well-defined metadata that permits further filtering and exclusion from results as necessary, which is excellent for being able to narrow down a result.

As Pagefind is implemented client-side as a script, I've taken inspiration from [David Bushell's site](https://dbushell.com/2024/11/21/static-search-page-find), and implemented a fallback that does a site-specific search with Google should JavaScript be unavailable. I'd have preferred a better, more privacy-adhering search engine, but unfortunately none have indexed by site as well as Google. I've also added in support for URL query parameters thanks to [Kristof Zerbe's post about it](https://kiko.io/post/Pagefind-UI-and-URL-Parameters).

### 404 Handling

Occasionally, I break links. [I'm sorry](https://www.w3.org/Provider/Style/URI). Hosting my site statically does come with a few challenges, dynamic redirects being one of them. I could somewhat combat it with [Origami's redirect builtin](https://weborigami.org/builtins/site/redirect), but it's more hassle than I care for.

Thus, I've got my client-side [`404-guesser.js`](/assets/scripts/404-guesser.js) script, which is once again shamelessly inspired by Gwern. It has some hard-coded handling for certain page structures I've moved in the past, but otherwise just tries to suggest the correct page if someone has made a typo. It'll look for similar URLs and spit out a list of suggestions.

Beyond trying to get you to the right page, my 404 page also has a style tag with the `contenteditable` attribute, which allows one to write their own CSS that'll apply to the page. It's a lot of fun and a bit of an Easter egg for people who get lost.

### IndieWeb Integration

In an effort to integrate open web concepts into this site, I've applied much of that outlined on the [IndieWeb wiki site](https://indieweb.org).

One part of this is making use of [Microformats](https://developer.mozilla.org/en-US/docs/Web/HTML/microformats) whenever possible to define extra structure and semantics, and another part is embracing <abbr title="Publish on your Own Site, Syndicate Elsewhere">POSSE</abbr>/<abbr title="Publish Elsewhere, Syndicate (to your) Own Site">POSOS</abbr> syndication models as applicable. This places my site as the centre of my web presence, with everything else revolving around it. Ideally it should be considered the canonical source for everything I do.

### Development & Deployment

My development workflow for this site is pretty trivial. I run a local Origami dev server via [Bun](https://bun.sh) on my laptop and make my edits via Neovim. It's more or less the standard development flow you'd expect of any web-based project. All writing on the site is done with the exact same flow.

For more info about the software of my development environment, my [uses page](/uses) is worth a read.

I very much treat this site as a testing ground for my learning and therefore generally start using new features as soon as they are newly available in [Baseline](https://web.dev/baseline). My readership is generally technical, so they _should_ know how to update their browsers, and I love being on the bleeding edge, so the minor inconvenience of things perhaps not looking quite right to some people is a trade-off I'm willing to make.

I handle source control via Git with GitHub serving as a repository host. In fact, the code for this site is source-available [in its entirety](https://github.com/DeclanChidlow/vale.rocks) if you'd like to have a look.

As everything is hosted on GitHub, I make use of [GitHub Pages](https://pages.github.com), which has a generous free plan. I have an [automated workflow configured using GitHub Actions](https://github.com/DeclanChidlow/vale.rocks/blob/main/.github/workflows/build-site.yml) that builds and deploys the site when I push to the main branch of my repository.

### Analytics

I collect some anonymous analytics on my site. Not because I feel the need to spy on my users every move, but because I rather enjoy nerding out about statistics. I _love_ being able to see what country people are showing up from (so many Hacker News clients), what devices they're using [^2] and their browsers. Being able to see view counts tick up also does wonders for my motivation.

I also find it endlessly interesting to go have a look at where people are finding my site. Sometimes I'll find that one of my posts has ended up in some obscure non-English newsletter, or other times on some niche forum straight out of the last century. It's lovely being able to go down little rabbit holes inspecting such cases.

As for _how_ analytics are collected, I do it via [GoatCounter](https://www.goatcounter.com), which provides simple, lightweight, and open-source analytics. It'll be blocked by pretty much every content blocker, which probably has some significant skews on the data, such as hiding my more technical audience, who are likely to make use of such tools, or bolstering the number of mobile users as they might be unable to install extensions. I make all that collected data public at [stats.vale.rocks](https://stats.vale.rocks).

[^1]: Or perhaps more accurately for the web, endnotes.
[^2]: Being able to see people showing up on obscure devices like [Windows Phones](https://fedi.vale.rocks/notice/AhZNOGmyxVKCXHtW5I) always prompts a chuckle.
