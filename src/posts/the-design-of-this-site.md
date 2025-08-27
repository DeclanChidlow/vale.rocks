---
title: The Design of This Site
description: A breakdown and overview of the design choices of Vale.Rocks, as well as its influences and brief touchings on the site's philosophy.
og_description: The thought behind the experience.
pub_time: 2022-09-12
mod_time: 2025-06-22
section: Meta
tags: [design, front-end development]
---

The web used to embody its name -- a spider's web, a network of unique, interconnected sites woven together to construct a larger, open ecosystem. Unfortunately, we seem to have strayed from this vision. The focus has shifted from the freedom of independent sites to centralised, walled gardens, where profit takes precedence over user experience.

Though a minority may still cherish the uniqueness of independent sites, their rarity makes standing out even more crucial to draw people away from the comfort of their algorithm-driven feeds. I think a site needs two things to attract attention: content worth reading and a design worth experiencing. This site is my attempt to offer both—a unique, accessible experience.

Perhaps the greatest contributor to the philosophy behind my site is taken from the website of notable synth pioneer Wendy Carlos. Her site houses a page [describing how her website 'lives'](https://www.wendycarlos.com/live.html):

> I'm happy to report that this page (like most housework) will never be finished. It is a living document that grows and matures, just like most of real life. It is not a "work in progress", for this would imply not much intrinsic value until that magic day it is completed.
>
> A novel is a work of art that, once completed may continue to exist forever in that finished state. An encyclopedia must be published at regular intervals to reflect new information gathered since the day it was published. Periodicals are timely only when first printed, then fall behind the times -- get the latest issue to keep up. The technology behind web documents allows us to update information as often as is necessary. In this context, publishing dates become an outdated concept.
>
> While it is possible to "finish" a web document, the fixed information becomes stagnant, thus abolishing any desire for a return visit. This is something I call a cob-web page.

Following that ethos, this site will continue to evolve as I tweak, edit, and break it as time goes on. In that way, it is almost closer to a wiki, albeit a single-user one, than a traditional blog site where one publishes a post then moves on to the next without intent to revise or alter existing media.

It's a [digital garden](https://maggieappleton.com/garden-history). I come back to previous posts frequently to prune them, touch them up, replace their soil, and refine them.

## Personas

This site is crafted with three distinct user groups in mind: [^1]

1. Visitors who arrive via a link to one of my articles, intent on reading. I expect this will be the majority of this site's visitors, so it's generally who I keep at the forefront of my mind, not just when I'm designing and implementing features but also when writing. It's imperative that the site is quick to load for people coming from social media to ensure reader retention [^2]. This demographic is probably the most likely to read an article the full way through.

2. Potential employers who would like to learn about me, view my portfolio, and get in contact. They likely won't read the contents of an article, but it should look good at first glance.

3. People who I interact with online that come to my site to find out more about me. These people are likely to have a quick prod around and check out the contents of the site but don't necessarily have a defined reason for their visit and, as such, likely won't return without reason.

## Fundamentals

Every decision made for this site is weighted on both the personas above and these fundamentals:

1. **Design like print:**

   Print design has a long and rich history, with centuries of systematic improvements, subtle enhancements, and steady refinements that have defined what works and constructed a solid foundation for how type should be set and presented. However, I feel like much of this gained knowledge has failed to migrate to the web.

   Well-established rules are often overlooked, and while readers may not consciously notice them, they matter and subtly shape the user experience. Where possible, I attempt to incorporate well-defined typographic and layout principles.

2. **Function over form:**

   While functionality should always dictate form, form shouldn't necessarily dictate functionality. Notably, semantic elements and implementations are a priority, even if it comes at the cost of form. The web is for everyone, and I'm firmly of the belief that sites should respect that.

3. **JavaScript is optional:**

   JavaScript has crept its tendrils into every facet of the web. This isn't necessarily a bad thing; JavaScript has its place. However, that place _isn't_ everywhere, and users should be able to opt out and still experience the site, albeit in a potentially degraded state.

   While visiting this site with JavaScript enabled merits access to optional features, it _isn't_ required for the core reading experience, and everything will operate cleanly in its absence.

As for the fundamental design aesthetic, my intent is something that feels *sleek*. Sections of the site should fit together with purpose, as if they are interlocking. In the design of this site I aim to mimic the precision achieved by expert woodworkers who refine their creations until they slot together with tolerances so tight the join is imperceptible.

Corners are sharp, not rounded. Borders are generally avoided, instead preferring contrast between background colours. Depth is achieved with layers, blur, and gradients which also enhance visual interest.

The site should feel sharp, and the design of animations and transitions should mirror this. They should be quick, snappy, and not inhibit user action.

## Features

Vale.Rocks is home to many non-standard features and some notable implementations of expected ones:

- Footnotes/Endnotes/Sidenotes help to isolate tangents, so as not to clutter pages or confuse readers.

- Link icons help provide more inline detail for users as they navigate between pages on my site and traverse externally.

- Image figures open into lightboxes on click, allowing for inspection on any device, and image figures are provided with a nice outer glow so they better integrate with the site regardless of content.

- Dynamic scroll indication and table of contents to help people move around and orient themselves within pages.

- A warm colour palette that is readable for extended periods.

- A ton more of tiny little quality-of-life bits and bobs.

If you'd like to see most of the site's numerous features and stylings in one place, you can do so on my [Lorem Ipsum page](/posts/lorem-ipsum). It contains a complex assortment of most possible different formattings and layouts for testing and trialling interactions of elements in complex arrangements.

If you'd like detailed information about the implementation of the features on this site (and this site itself), then you should consult my post [The Implementation of This Site](/posts/the-implementation-of-this-site).

## Typography

I'm a text-heavy person, and that shows in this site, so I have put a huge amount of effort into its typography. A huge source of inspiration and reference for the typography on this site is Richard Rutter's [Web Typography](https://book.webtypography.net) and his [Typography and Opentype Default Stylesheet (TODS)](https://clagnut.com/blog/2433).

Previously, this site used [Lexend](https://www.lexend.com), which, while extraordinarily readable, lacks support for many OpenType features. After [asking for worthy alternatives](/micros/20250612-0701), [Marko Bajlovic](https://marko.tech) suggested [Work Sans](https://weiweihuanghuang.github.io/Work-Sans/). It maintains Lexend's sans serif appearance (though skewing more grotesque than geometric), is variable, and has support for fractions, sub/super scripts, old-style numbers, small caps, and a huge assortment of other font features. I do feel the default weight is too light though, so set it to `430`.

I really love and value the refined appearance these OpenType features offer, but they aren't always easy to implement in a reasonable way. There are countless typography-related bugs and flaws in CSS and the larger web platform, as well as many expected features that simply haven't yet seen support or consideration. There is also the matter of some typographic features being so uncommon on the web that users are confused in their use.

### Small Caps

Much of my writing is technical and therefore heavy on the use of acronyms. Type is not designed for extended sequences of uppercase characters. They draw the eye unnecessarily and look out of place in most body text.

To address this, I make use of small caps. Unfortunately, small caps aren't a common feature on the web -- even on sites which take care with their typography -- which can confuse users. As such, I only use small caps for acronyms and not as a way to emphasise text like _italics_ or **bold**.

### Code

[Fira Code](https://github.com/tonsky/FiraCode) is used for all code content on this site. It is incredibly clear and legible, with tons of features such as context-aware punctuation and technical glyphs. It also has fantastic ligatures which, while not everyone's cup of tea, I am a huge fan of in my programming fonts.

### Reading Checkpoints

Walls of text can be off-putting and disorienting -- especially on the web. Books and tablets are paginated. Scrolls are furled and unfurled, or otherwise present over a long physical space.

The web is a single continuous document, and it can be difficult to keep your place while scrolling. As such, I make an effort to place 'checkpoints' throughout my writing. Checkpoints being visual indicators that one can use to anchor themselves within a post -- a visual reference point for orienting oneself.

Although images are the largest and most obvious document-level checkpoints, I tend not to use many of them. Tables are also big and obvious, though I tend not to use many of them either. I do use a fair amount of block quotes, code blocks, lists, and callouts/alerts, however, which help with staying oriented.

As for helping people keep their position within a paragraph, links are simple but effective. The same goes for `inline code blocks` and to a lesser extent, _italics_, **bold text**, and ~~strikethroughs~~.

Headings also help readers place themselves (as well as reference their location), and this is further benefited by [scroll indication](/posts/the-implementation-of-this-site#scroll-indication).

## Inspirations

Like all endeavours, and especially creative ones (which I would argue this site is), I've _borrowed_ many ideas from external sources.

Perhaps most notable is [the site of Gwern Branwen](https://gwern.net), a slick blend of expertly written content and minimalist design. Despite stumbling upon Gwern's site long after starting the development of this one, many of its eccentricities have made their way over, as you've no doubt noticed if you've ever paid Gwern's site a visit.

Another huge source of inspiration is [LessWrong](https://www.lesswrong.com/). A bit of a mix of blog and forum, LessWrong has some lovely typesetting, unique layouts, and many slick flourishes.

In the same vein as the previous two, [TurnTrout's 'The Pond'](https://turntrout.com) incorporates many print-like typographic features and is very carefully crafted to create an experience that is a joy to read and interactive where it matters.

In the very early stages of this site's current iteration, the design was very much inspired by [The Verge](https://www.theverge.com). Some vestiges of this include the right-aligned navigation menu and vertical text, although much of the influence has been diluted in the years since.

---

[^1]: It is also, to some extent, built with me in mind as a user. Rather than maintaining a separate knowledge base, journal, or index of my creations, much of that content is instead published here, where I can search and reference it. This is especially valuable paired with the [search page](/search), which makes it trivial to search and reference pretty much everything I've deemed noteworthy enough to release on the internet.

[^2]: [Google suggests](https://www.thinkwithgoogle.com/intl/en-emea/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/) that 53% of visitors will bail on a site if it takes over three seconds to load. Pages should be fast, not only to prevent users from leaving but also to avoid inconveniencing users and to provide them a good experience.
