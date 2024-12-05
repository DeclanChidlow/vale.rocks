---
title: The Design of This Site
description: A breakdown and overview of the implementations and styling of Vale.Rocks, as well as its influences and brief touchings on the site's philosophy.
og_description: The thought behind the experience.
pub_time: 2022-09-12
mod_time: 2024-11-27
section: Meta
---

The web used to embody its name—a spider's web, a network of unique, interconnected sites woven together to construct a larger, open ecosystem. Unfortunately, we seem to have strayed from this vision. The focus has shifted from the freedom of independent sites to centralised, walled gardens, where profit takes precedence over user experience.

Though a minority may still cherish the uniqueness of independent sites, their rarity makes standing out even more crucial to draw people away from the comfort of their algorithm-driven feeds. I think a site needs two things to attract attention: content worth reading and a design worth experiencing. This site is my attempt to offer both—a unique, accessible experience.

Perhaps the greatest contributor to the philosophy behind my site is taken from the website of notable synth pioneer Wendy Carlos. Her site houses a page [describing how her website 'lives'](https://www.wendycarlos.com/live.html):

> I'm happy to report that this page (like most housework) will never be finished. It is a living document that grows and matures, just like most of real life. It is not a "work in progress", for this would imply not much intrinsic value until that magic day it is completed.
>
> A novel is a work of art that, once completed may continue to exist forever in that finished state. An encyclopedia must be published at regular intervals to reflect new information gathered since the day it was published. Periodicals are timely only when first printed, then fall behind the times -- get the latest issue to keep up. The technology behind web documents allows us to update information as often as is necessary. In this context, publishing dates become an outdated concept.
>
> While it is possible to "finish" a web document, the fixed information becomes stagnant, thus abolishing any desire for a return visit. This is something I call a cob-web page.

Following that ethos, this site will continue to evolve as I tweak, edit, and break it as time goes on.

## Personas

This site is crafted with three distinct user groups in mind:

Firstly, visitors who arrive via a link to one of my articles, intent on reading. I expect this will be the majority of this site's visitors, so it's generally who I keep at the forefront of my mind, not just when I'm designing and implementing features but also when writing. It's imperative that the site is quick to load for people coming from social media to ensure reader retention [^1]. This demographic is probably the most likely to read an article the full way through.

Secondly, potential employers who would like to learn about me, view my portfolio, and get in contact. They likely won't read the contents of an article, but it should look good at first glance.

Finally, people who I interact with online that come to my site to find out more about me. These people are likely to have a quick prod around and check out the contents of the site, but don't necessarily have a defined reason for their visit, and as such, likely won't return without reason.

## Fundamentals

Every decision made for this site is weighted on both the personas above and these fundamentals:

1. **Design like print:**
   Print design has a long and rich history, with centuries of systematic improvements, subtle enhancements, and steady refinements that have defined what works and constructed a solid foundation for how type should be set and presented. However, I feel like much of this gained knowledge has failed to migrate to the web.

   Well-established rules are often overlooked, and while readers may not consciously notice them, they matter and subtly shape the user experience. Where possible, I attempt to incorporate well-defined typographic principles.

   This isn't always an easy thing to do. There are countless typography-related bugs and flaws in CSS and the larger web platform, as well as many expected features that simply haven't yet seen support or consideration. There is also the matter of some typographic features, like smallcaps, being so uncommon on the web that users are confused in use.

2. **Function over form:**
   While functionality should always dictate form, form shouldn't necessarily dictate functionality. Notably, semantic elements and implementations are a priority, even if it comes at the cost of form. The web is for everyone, and I'm firmly of the belief that sites should respect that.

3. **JavaScript is optional:**
   JavaScript has crept its tendrils into every facet of the web. This isn't necessarily a bad thing; JavaScript has its place. However, that place _isn't_ everywhere, and users should be able to opt out and still experience the site, albeit in a potentially degraded state.

   While visiting this site with JavaScript enabled merits access to optional features, it _isn't_ required for the core reading experience, and everything will operate cleanly in its absence.

## Features

Vale.Rocks is home to many non-standard features and some notable implementations of expected ones. These include:

- **Footnotes/Sidenotes:**
  Without JavaScript enabled, the footnotes (or perhaps more accurately, endnotes) are simply anchors to the definition at the end of the page. Assuming JavaScript is enabled, clicking a footnote opens a popover. If the viewport is sufficiently wide, then the footnotes also manifest as sidenotes in the page's margin.

- **Comments:**
  Given that this is a static site and my readership is generally of the variety that frequents GitHub, I've employed [Giscus](https://giscus.app) for comment functionality.

- **Link icons:**
  Hyperlinks are the backbone of the web, and I employ some rudimentary CSS regex to prefix most links with icons to indicate if they link to an anchor within the page, a page within this site, or an external location.

- **Figure lightboxes:**
  While JavaScript is enabled, clicking on a figure opens it in a full-screen lightbox that allows users to view imagery in larger sizes alongside captions, attributions, and alt text.

- **Scroll indicator:**
  When perusing articles, a scroll progress bar appears at the top of the screen, with indicators of heading locations for ease of navigation. I'd like to improve this so that it plays nicer with additive content such as comments, is moved to a more advantageous position or larger viewports, and can be better used for swift navigation through articles by users.

If you'd like to see all of the site's numerous features and stylings, you can do so on my [Lorem Ipsum page](/posts/lorem-ipsum). It contains a complex assortment of most possible different formattings and layouts for testing and trialling interactions of elements in complex arrangements.

## Tooling

This site is built with my static site generator, [Adduce](https://adduce.vale.rocks), and custom-written HTML, CSS, and JS. The source code is available in its entirety on [GitHub](https://github.com/DeclanChidlow/vale.rocks). Previously, this site was built without the help of any generator, and later with [Jeckyll](https://jekyllrb.com).

The site itself uses very little in the way of external resources, with the exception of [GoatCounter](https://www.goatcounter.com) for simple, lightweight, and open source analytics.

Everything is hosted on [GitHub Pages](https://pages.github.com), thanks to their generous free plan, and Cloudflare runs in front of the hosting to permit caching and some more dynamic handling of requests.

## Inspirations

Like all endeavours, and especially creative ones (which I would argue this site is), I've _borrowed_ many ideas from external sources.

Perhaps most notable is [the site of Gwern Branwen](https://gwern.net), a slick blend of expertly written content and minimalist design. Despite stumbling upon Gwern's site long after starting the development of this one, many of its eccentricities have made their way over, as you've no doubt noticed if you've ever paid Gwern's site a visit.

Another huge source of inspiration is [LessWrong](https://www.lesswrong.com). A bit of a mix of blog and forum, LessWrong has some lovely typesetting, unique layouts, and many slick flourishes.

In the same vein as the previous two, [TurnTrout's 'The Pond'](https://turntrout.com) incorporates many print-like typographic features and is very carefully crafted to create an experience that is a joy to read and interactive where it matters.

In the very early stages of this site's current iteration, the design was very much inspired by [The Verge](https://www.theverge.com). Some vestiges of this include the right-aligned navigation menu and vertical text, although much of the influence has been diluted in the years since.

Another source of inspiration for this site is [Josh W Comeau's site](https://www.joshwcomeau.com). Not really in terms of visual design, but in influence from his concept of small and unique features he dubs UI 'sparkles'.

---

## Footnotes

[^1]: [Google suggests](https://www.thinkwithgoogle.com/intl/en-emea/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks) that 53% of visitors will bail on a site if it takes over three seconds to load. Pages should be fast, not only to prevent users from leaving but also to avoid inconveniencing users and to provide them a good experience.
