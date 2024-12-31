---
title: The Implementation of This Site
description: A breakdown and overview of the implementation of Vale.Rocks, how it used to be built, how it's built now, and its associated infrastructure.
og_description: No bodging here. None at all. Nope.
pub_time: 2024-12-12
mod_time: 2024-12-31
section: Meta
word_count: 1088
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

When I saw [a post from Jan Miksovsky](https://fosstodon.org/@JanMiksovsky/113516427582479669) looking "for people to playtest a programming language for making websites" I sent him a message expressing my interest. I avoided doing too much research and went into it with a fresh mind and no preformed opinions.

The language, [Origami](https://weborigami.org), didn't take long to win me over. It's a full programming language with all the bells and whistles you'd expect that makes it easy to do everything you'd need from a static site generator and allows you to fall back on JavaScript if needed. It also comes with helpful errors and a full interactive explorer for development, which is lovely for debugging and visualising exactly how things are working.

In the hours following the playtest, I worked on porting my site over, and by the end of the day, I already had the broad strokes down. Now, my site is fully functioning on Origami with many additive bells and whistles that weren't previously possible with Adduce. The language is still maturing, but I'm loving it!

### Search

My entire site is fully indexed and searchable. This is achieved using [Pagefind](https://pagefind.app). Each page includes well-defined metadata that permits further filtering and exclusion from results as necessary, which is excellent for being able to narrow down a result.

### IndieWeb

In an effort to integrate open web concepts into this site, I've applied much of that outlined on the [IndieWeb wiki site](https://indieweb.org).

One part of this is making use of [Microformats](https://developer.mozilla.org/en-US/docs/Web/HTML/microformats) whenever possible to define extra structure and semantics.

Another part is embracing <abbr title="Publish on your Own Site, Syndicate Elsewhere">POSSE</abbr>. This means my content lives here first, then gets shared to other platforms while maintaining this site as the canonical source. My site is the centre of my web presence, and this helps it remain as such. 

### Development & Deployment

My development workflow for this site is pretty trivial. I run a local Origami dev server via [Bun](https://bun.sh) on my laptop and make my edits via Neovim. It's more or less the standard development flow you'd expect of any web-based project. All writing on the site is done with the exact same flow.

For more info about the software of my development environment, my [uses page](/uses) is worth a read.

I very much treat this site as a testing ground for my learning and therefore generally start using new features as soon as they are newly available in [Baseline](https://web.dev/baseline). My readership is generally technical, so they _should_ know how to update their browsers, and I love being on the bleeding edge, so the minor inconvenience of things perhaps not looking quite right to some people is a trade-off I'm willing to make.

I handle source control via Git with GitHub serving as a repository host. In fact, the code for this site is source-available [in its entirety](https://github.com/DeclanChidlow/vale.rocks) if you'd like to have a look.

As everything is hosted on GitHub, I make use of [GitHub Pages](https://pages.github.com), which has a generous free plan. I have an [automated workflow configured using GitHub Actions](https://github.com/DeclanChidlow/vale.rocks/blob/main/.github/workflows/build-site.yml) that builds and deploys the site when I push to the main branch of my repository.

### Analytics

I collect some anonymous analytics on my site. Not because I feel the need to spy on my users every move, but because I rather enjoy nerding out about statistics. I _love_ being able to see what country people are showing up from, what devices they're using [^1] and their browsers. Being able to see view counts tick up also does wonders for my motivation.

I also find it endlessly interesting to go have a look at where people are finding my site. Sometimes I'll find that one of my posts has ended up in some obscure non-English newsletter, or other times on some niche forum straight out of the last century. It's lovely being able to go down little rabbit holes inspecting such cases.

As for _how_ analytics are collected, I do it via [GoatCounter](https://www.goatcounter.com), which provides simple, lightweight, and open-source analytics. It'll be blocked by pretty much every content blocker, which probably has some significant skews on the data, such as hiding my more technical audience, who are likely to make use of such tools, or mobile users who might be unable to install extensions. I make all that collected data public at [stats.vale.rocks](https://stats.vale.rocks).

[^1]: Being able to see people showing up on obscure devices like [Windows Phones](https://fedi.vale.rocks/notice/AhZNOGmyxVKCXHtW5I) always prompts a chuckle.
