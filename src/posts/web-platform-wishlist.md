---
title: Web Platform Wishlist
description: A list of features I'd personally like to see added to web platform standards or better implemented in browsers. Improvements to HTML, new CSS, other web systems, or wider parts of the web platform that I think could be improved or expanded on to make the web a better place for users to use and for developers to develop on.
og_description: Collaborators grow tired of my magic hacks.
pub_time: 2026-06-29
section: Essay
tags: ["development", "front-end", "HTML", "CSS"]
standardsite_rkey: 3mpfexrhotf2a
---

The web platform is a wonderful thing. A collection of standards and implementations that power the ever-wondrous World Wide Web -- HTML, CSS, ECMAScript, SVG, WebAssembly, HTTP, etc. However, it can always be better. As such, here is my wishlist. This page documents what I'd love to see added to the standards or better implemented in browsers. Importantly, this isn't just a collection of cool things I think could conceptually be great, but are instead actual features I've found myself wishing for and wanting while developing.

From this wishlist I've opted to omit features I'm excited for but which I'm already aware that all major browsers are actively implementing or working towards.

## HTML

- I would like `<abbr>` to not be awful. You can't access the `title` attribute, into which an expansion of the abbreviation can optionally be included, and [assistive technologies handle it poorly (and inconsistently)](https://adrianroselli.com/2024/01/using-abbr-element-with-title-attribute.html).

## CSS

- Logical versions of everything. I want everything that can have a logical version to have a logical version. That means more logical properties. I love logical properties -- can't get enough of them. I also wish lots of functions had logical versions. For example, `translate`, `scale`, `skew`, and `rotate`. Could be `translateInline` as a logical version of `translateX`, and so forth. Extend this to shadows and such too.

  Maybe some sort of system to opt-in to logical mappings could be introduced, similar to `color-scheme: light dark;` to opt-in to light/dark modes?

- Shorthand for logical properties. Regardless of one's feelings on shorthand, I don't think it should only interpret values as physical. For example, I shouldn't have to write:

  ```css
  margin-block: 1rem;
  margin-inline: 2rem;
  ```

- Allow logical properties for media queries. `@media (max-inline-size: 45rem) {` is not valid at present, and I think it should be.

- Fit text to width. Sometimes I want to fit text to the width of the page, but that can be an exercise in frustration and dealing with complex fluid type systems or breakpoints. Something akin to `font-size: fit` would be lovely.

- A native way to expose content exclusively to screen readers. Something along the lines of `display: visually-hidden;`. `.sr-only` and `.visually-hidden` classes everywhere indicate there is a solid desire for the feature, but those classes are [extremely messy](https://dbushell.com/2026/02/20/visually-hidden/). There are so many potential footguns here, however, which makes their potential inclusion risky.
  Visually hiding content and only displaying it to screenreaders is also usually a bad user interface smell, as what must be conveyed to screenreaders by use of such hacks is usually beneficial to all users. Take, for example, labels for what a button with only an icon does.

- Gradient shadows. Where a shadow's colour can currently be set, gradients should be able to be set. This is a simple feature but an extremely versatile one with many applications that people currently use hacks to achieve.

- [Gradient easing](https://github.com/w3c/csswg-drafts/issues/1332). Gradients already have rather comprehensive syntax for controlling their appearance, but I'd love to see the ability to change the easing of a gradient. I've previously used generators to achieve an easing effect, with messy code such as this:

  ```css
  background: linear-gradient(
  	180deg,
  	color-mix(in oklch, oklch(18% 0.003 17.5) 100%, transparent) 0%,
  	color-mix(in oklch, oklch(18% 0.003 17.5) 45%, transparent) 25%,
  	color-mix(in oklch, oklch(18% 0.003 17.5) 15%, transparent) 50%,
  	color-mix(in oklch, oklch(18% 0.003 17.5) 5%, transparent) 75%,
  	color-mix(in oklch, oklch(18% 0.003 17.5) 0%, transparent) 100%
  );
  ```

- [Better blurs](https://github.com/w3c/csswg-drafts/issues/11134). Currently we've only got Gaussian blurs, which are good, but imperfect. I'd love to see radial blurs and directional blurs. You can use SVG filters to achieve such effects, but they are unnecessarily clunky.

- Allow multiple pseudo-elements. Only having `::before` and `::after` seems arbitrary, and while not a limit I hit often is a limit I hit sometimes (especially when hacking on HTML I cannot edit). Allowing more seems minimally disruptive. It could, however, promote bad coding practices via poor separation of concerns.

- Style the handle on resizeable elements, such as text areas.

- Text overflow truncation from centre. A most wonderful UX consideration that Apple famously introduced in Finder is the truncation of text in the centre, rather than the end. Compare `a_really_long_file_name...` to `a_really_lo...or_a_file.md`. The latter preserves the extension and gives more contextual clues to the user.

- Hanging punctuation. A lovely little typographic flourish that places punctuation off the start and ends of lines. It has been in WebKit since 2016.

- Better stroked text. `-webkit-text-stroke` exists, but it is vendor-prefixed, limited, and for most fonts looks awful. It should accept gradients and allow placing the stroke inside, outside, or along the edge.

- A better `@supports`. `@supports` is borderline useless. Often features (especially new ones) are only partially implemented, but `@supports` has no concept of partial implementation and thus returns true. New features are the ones you especially need the supports at-rule for! Not to mention all [the other issues](https://alvaromontoro.com/blog/68095/supports-lies-css-says-yes-browsers-say-lol-no).

- More pseudo-classes. `:sticky` for if an element is currently sticky, `:overflow` for if overflowing, etc. These are things that people commonly use JavaScript to detect just so they can pass it on to CSS. To cut out the JavaScript middle man would be much cleaner.

- [Allow scale to accept absolute lengths](https://github.com/w3c/csswg-drafts/issues/5273). Rarely, but occasionally, I need the power to change the scale of an element to a precise size, and that is currently either only achievable with considered maths, or is just impossible.

## SVG

- SVG filters are amazing. You can do so much with them, <span style="filter: url(#distort);">like beautiful distortion of elements or other such filters.</span> Just have a look at how effectively they're used on the absolutely gorgeous [Strangers By Spring](https://strangersbyspring.com). Unfortunately, they're rather unperformant in browsers, especially at scale, such as over a whole page. If there is a single thing I'd like to see changed on the web platform, it is this.

<svg aria-hidden="true" class="svg-filter">
	<defs>
		<filter id="distort">
			<feTurbulence baseFrequency="0.01 0.03" numOctaves="2" />
			<feDisplacementMap in="SourceGraphic" scale="10" xChannelSelector="R" yChannelSelector="R">
		</filter>
	</defs>
</svg>

- Better support for accessibility technologies via semantics and ARIA roles. I often use SVGs for graphs and diagrams, so the ability to better expose that content without having to impose rigid alt text would be brilliant.

- Native text wrapping. This seems like a very obvious inclusion. It shouldn't be necessary to manually break a paragraph of text into new lines.

## Miscellaneous

- I want WebXR supported across more browsers on more platforms. Spatial computing for productivity is steadily becoming more viable, and I hope more browsers take advantage of this.

- I want more diversity in browser engines. I want to see more engines thrive and [less Chromium everywhere](/posts/everything-is-chrome). I'm excited to see how Servo and Ladybird's LibWeb influence this.

- I want [XSLT to stay](https://xslt.rip). So many people use it for styling RSS and Atom feeds, as I've noted while reviewing submissions to [PersonalSit.es](https://personalsit.es). It'll be a shame for the accessibility of feeds and all the very many sites which rely on XSLT.
