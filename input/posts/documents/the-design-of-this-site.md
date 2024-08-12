<head>
    <title>The Design of This Site | Vale.Rocks</title>
    <meta property="og:title" content="The Design of This Site"/>
    <meta name="description" content="A breakdown and overview of the implementations and styling of Vale.Rocks, as well as its influences and brief touchings on the site's philosophy." />
    <meta property="og:description" content="The thought behind the experience." />
    <meta property="article:published_time" content="2022-09-12" />
    <meta property="article:modified_time" content="2024-08-12" />
    <meta property="article:section" content="Meta" />
</head>

<article>
<header>
	 Meta
	<h1>
		The Design of This Site
	</h1>
	<ul>
		<li><time datetime="2022-09-12">12 Sep, 2022</time></li>
	    <li>1186 words</li>
		<li>4 minute read</li>
	</ul>
</header>

<div class="readable-width">

The web used to embody its name—a spider's web, a network of unique, interconnected sites woven together to construct a larger, open ecosystem. Unfortunately, we seem to have strayed from this vision. The focus has shifted from the freedom of independent sites to centralised, walled gardens, where profit takes precedence over user experience.

Though a minority still cherish the uniqueness of independent sites, their rarity makes standing out even more crucial to draw people away from the comfort of their algorithm-driven feeds. I think a site needs two things to attract attention: content worth reading and a design worth experiencing. This site is my attempt to offer both—a unique, accessible experience.

Perhaps the greatest contributor to the philosophy behind my site is taken from the website of notable synth pioneer Wendy Carlos. Her site houses a page [describing how her website 'lives'](https://www.wendycarlos.com/live.html):

> I'm happy to report that this page (like most housework) will never be finished. It is a living document that grows and matures, just like most of real life. It is not a "work in progress", for this would imply not much intrinsic value until that magic day it is completed.
> A novel is a work of art that, once completed may continue to exist forever in that finished state. An encyclopedia must be published at regular intervals to reflect new information gathered since the day it was published. Periodicals are timely only when first printed, then fall behind the times -- get the latest issue to keep up. The technology behind web documents allows us to update information as often as is necessary. In this context, publishing dates become an outdated concept.
> While it is possible to "finish" a web document, the fixed information becomes stagnant, thus abolishing any desire for a return visit. This is something I call a cob-web page.

Following that ethos, this site will continue to evolve as I tweak, edit, and break it as time goes on.

## Personas

This site is crafted with three distinct user groups in mind:

First, visitors who arrive via a link to one of my articles, intent on reading. I expect this will be the majority of this site's visitors, so it's generally who I keep at the forefront of my mind, not just when I'm designing and implementing features but also when writing. It's imperative that the site is quick to load for people coming from social media to ensure reader retention [^1]. This demographic is probably the most likely to read an article the full way through.

Secondly, potential employers who would like to learn about me, view my portfolio, and get in contact. They likely won't read the contents of an article, but it should look good at first glance.

Finally, people who I interact with online that come to my site to find out more about me. These people are likely to have a quick prod around and check out the contents of the site, but don't necessarily have a defined reason for their visit, and as such, likely won't return without reason.

## Fundamentals

Every decision made for this site isn't just based on the personas above, but also on these fundamentals:

1. **Design like print**
   Print design has a long and rich history, with centuries of systematic improvements, subtle enhancements, and steady refinements that have defined what works and constructed a solid foundation for how type should be set and presented. However, I feel like much of this gained knowledge has failed to migrate to the web.

   Well-established rules are often overlooked, and while readers may not consciously notice them, they matter and subtly shape the user experience. Where possible, I attempt to incorporate well-defined typographic principles.

2. **Function over form**
   While functionality should always dictate form, form shouldn't necessarily dictate functionality. Notably, semantic elements and implementations are a priority, even if it comes at the cost of form. The web is for everyone, and I'm firmly of the belief that sites should respect that.

3. **JavaScript is optional**
   JavaScript has creeped its way into every facet of the web. This isn't necessarily a bad thing; JavaScript has its place. However, that place _isn't_ everywhere, and users should be able to opt out and still experience the site, albeit in a potentially degraded state.

   While visiting this site with JavaScript enabled merits access to optional features, it _isn't_ required for the core reading experience and everything will operate cleanly in its absence.

## Features

Vale.Rocks is home to some non-standard features and notable implementations of standard ones. Some of these include:

- **Footnotes/Sidenotes**
  Without JavaScript enabled, the footnotes (or perhaps more accurately, endnotes) are simply anchors to the definition at the end of the page.
  Assuming JavaScript is enabled, the footnotes open a popover when clicked. If the viewport is sufficiently wide, then the footnotes also manifest as sidenotes in the page's margin.

- **Comments**
  Given that this is a static site and my readership is generally of the variety that frequents GitHub, I've employed [Giscus](https://giscus.app) for comment functionality.

- **Link icons**
  Hyperlinks are the backbone of the web, and I employ some rudimentary CSS regex to prefix most links with icons to indicate if they link to an anchor within the page, a page within this site, or an external location.

- **Figure lightboxes**
  Clicking on images within figures with JavaScript enabled will open them in a lightbox that allows users to view the caption and alt text.

- **Scroll indicator**
  When viewing articles, a scroll progress bar appears at the top of the screen, with indicators of heading locations for ease of navigation.

## Tooling

This site is built with my static site generator, [Adduce](https://adduce.vale.rocks), and custom-written HTML, CSS, and JS. Previously, it was built without the help of any generator, and later with [Jeckyll](https://jekyllrb.com).

The site itself uses very little in the way of external libraries, with the exception of [Shiki](https://shiki.style) for syntax highlighting of codeblocks and [GoatCounter](https://www.goatcounter.com) for simple, lightweight, and open source analytics.

Everything is hosted on [GitHub Pages](https://pages.github.com), thanks to their generous free plan.

## Inspirations

Like all endeavours, and especially creative ones (which I would argue this site is), I've _borrowed_ many ideas from external sources.

Perhaps most notable is [the site of Gwern Branwen](https://gwern.net), a slick blend of expertly written content and minimalist design. Despite stumbling upon Gwern's site long after starting the development of this one, many of its eccentricities have made their way over, as you've no doubt noticed if you've ever paid Gwern's site a visit.

Another huge source of inspiration is [LessWrong](https://www.lesswrong.com). A bit of a mix of blog and forum, LessWrong has some lovely typesetting, unique layouts, and many slick flourishes.

In a bit of a departure from the sites above, another source of inspiration for this site is [Josh Comeau's site](https://www.joshwcomeau.com). Not really in terms of visual design, but in the sense of his idea of small and unique little features he dubs UI 'sparkles'.

---

## Footnotes

[^1]: [Google suggests](https://www.thinkwithgoogle.com/intl/en-emea/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks) that 53% of visitors will bail on a site if it takes over three seconds to load. Pages should be fast, not only to prevent users from leaving, but also to ensure a good user experience.

<section class="giscus"></section>

</div>
</article>
