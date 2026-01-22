---
title: My Opinionated CSS Reset
description: A CSS reset for modern web development to provide a consistent and high-quality base for projects. Low-specificity and very opinionated to provide a strong foundation allowing seamless use in projects of varying scales and complexity.
og_description: "* { all: unset; }"
pub_time: 2026-01-22
section: Essay
tags: [front-end development, CSS]
---

As years have stretched on, browser user-agent styles have grown somewhat estranged from how many developers use the web platform. I am no exception to this rule and find my own needs at odds with the predefined user-agent stylesheets of major browsers:

- Chromium - <https://chromium.googlesource.com/chromium/src/+/refs/heads/main/third_party/blink/renderer/core/html/resources/html.css)>
- Firefox - <https://searchfox.org/firefox-main/source/layout/style/res/html.css>
- WebKit - <https://github.com/WebKit/WebKit/blob/main/Source/WebCore/css/html.css>

As such, I, like many others[^1], have a CSS reset that I apply to many projects as part of an effort to ensure comfortable development. 'Reset' is perhaps not quite the correct diction, as much of this is opinionated and not purely returning to a clean slate. We're mostly past the days of rogues like Internet Explorer, and browsers are _mostly_[^2] consistent with their styling.

Despite 'reset' not being the most accurate term, the more correct title of 'Preferred CSS defaults and user-agent overrides' just doesn't come with quite the same panache.

Here is my complete unabridged reset:

```css
@layer {
	*,
	*::before,
	*::after {
		box-sizing: border-box;
		background-repeat: no-repeat;
	}

	* {
		padding: 0;
		margin: 0;
	}

	html {
		-webkit-text-size-adjust: none;
		text-size-adjust: none;
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
        hanging-punctuation: first allow-end last;
        block-size: 100%;
	}

	body {
		min-block-size: 100%;
	}

	img,
	iframe,
	audio,
	video,
	canvas {
		display: block;
		max-inline-size: 100%;
		block-size: auto;
	}

	svg {
		max-inline-size: 100%;
	}

	svg:not([fill]) {
		fill: currentColor;
	}

	input,
	button,
	textarea,
	select {
		font: inherit;
	}

	textarea {
		resize: vertical;
	}

	fieldset,
	iframe {
		border: none;
	}

	p,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		overflow-wrap: break-word;
	}

	p {
		text-wrap: pretty;
		font-variant-numeric: proportional-nums;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-variant-numeric: lining-nums;
	}


	input,
	label,
	button,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
        line-height 1.1;
    }

	math,
	time,
	table {
		font-variant-numeric: tabular-nums lining-nums slashed-zero;
	}

	code {
		font-variant-numeric: slashed-zero;
	}

	table {
		border-collapse: collapse;
	}

	abbr {
		font-variant-caps: all-small-caps;
		text-decoration: none;

		&[title] {
			cursor: help;
			text-decoration: underline dotted;
		}
	}

	sup,
	sub {
		line-height: 0;
	}

	:disabled {
		opacity: 0.8;
		cursor: not-allowed;
	}

	:focus-visible {
		outline-offset: 0.2rem;
	}
}
```

## Breakdown

The first thing you may notice in my reset is that it is entirely contained within an anonymous layer. Placing the reset on an anonymous cascade layer using the `@layer` at-rule [gives every declaration a low specificity](https://www.matuzo.at/blog/2026/lowering-specificity-of-multiple-rules).

```css
*,
*::before,
*::after {
	box-sizing: border-box;
	background-repeat: no-repeat;
}
```

I find `content-box` to be unintuitive and confusing. I much prefer `border-box`'s inclusion of an element's padding and border in the width and height as a default.

Backgrounds repeating has always seemed to me like an unreasonable default that is overwritten more often than not, so I disable it.

```css
* {
	padding: 0;
	margin: 0;
}
```

When working with custom CSS, I find browser default margins and paddings to be a hindrance rather than a help. They provide somewhat of a reasonable default when working with unstyled documents[^3] but get in the way more often than not when writing my own styling.

```css
html {
	-webkit-text-size-adjust: none;
	text-size-adjust: none;
	line-height: 1.5;
	-webkit-font-smoothing: antialiased;
	hanging-punctuation: first allow-end last;
	block-size: 100%;
}
```

`text-size-adjust` stops mobile browsers from trying to adjust text sizes for mobile, which is more harm than help when already designing with mobile in mind. Kilian Valkhof covers it nicely in [Your CSS reset needs text-size-adjust (probably)](https://kilianvalkhof.com/2022/css-html/your-css-reset-needs-text-size-adjust-probably/).

The user-agent default line-height is just too small. It makes text cramped and difficult to read.

`-webkit-font-smoothing` is a [very specific fix to the way macOS renders fonts](https://dbushell.com/2024/11/05/webkit-font-smoothing/). Adding it stops type from appearing thicker than it should on macOS.

Hanging punctuation just looks better. At time of writing no browsers support it, but they will one day, and I'll be ready.

`block-size` is set to compliment the `min-block-size` on the body:

```css
body {
	min-block-size: 100%;
}
```

Stops the body from collapsing, which is useful if the content is less than it takes to fill the viewport.

```css
img,
iframe,
audio,
video,
canvas {
	display: block;
	max-inline-size: 100%;
	block-size: auto;
}

svg {
	max-inline-size: 100%;
}
```

The vast majority of the time when using media, I don't intend for it to display inline (SVGs being the exception). I also very rarely wish for content to be larger than the container, so a `max-inline-size` is a reasonable method of addressing inline overflows. Setting the `block-size` to `auto` stops the aspect ratio from being changed.

```css
svg:not([fill]) {
	fill: currentColor;
}
```

It is reasonable for the fill colour of an SVG to default to the current colour rather than black if there is no fill already defined.

```css
input,
button,
textarea,
select {
	font: inherit;
}
```

Input elements should not use different font styling by default. It makes them immediately feel out of place.

```css
textarea {
	resize: vertical;
}
```

`textarea`s usually only need vertical resizing, not horizontal.

```css
fieldset,
iframe {
	border: none;
}
```

Fieldsets are good for grouping, but the border is ugly. I personally always opt for another method of visual clustering, so I default to removing the border. I used to manually remove the border on a case-by-case basis but eventually realised that cases of me keeping it were outliers.

iframes are usually presented to integrate with a page, not stand out. Thus, I think no border is a more reasonable default.

```css
p,
h1,
h2,
h3,
h4,
h5,
h6 {
	overflow-wrap: break-word;
}
```

A common cause of horizontal overflows -- especially given the rave popularity of large font sizes -- it is only reasonable to break them.

```css
p {
	text-wrap: pretty;
	font-variant-numeric: proportional-nums;
}
```

Not very well supported, but I'm a typography snob, and any improvement helps.

`proportional-nums` enables numerals whose widths vary naturally instead of all taking up the same fixed width.

```css
h1,
h2,
h3,
h4,
h5,
h6 {
	font-variant-numeric: lining-nums;
}
```

I like to make sure that I don't have `oldstyle-nums` in my headings, as they always look out of place. As an aside, I really am looking forward to `:heading`.

I don't set any further rules on my headings as I configure them on a per-project basis. `text-wrap: balance;` is a common addition.

```css
input,
label,
button,
h1,
h2,
h3,
h4,
h5,
h6 {
    line-height 1.1;
}
```

Headings and inputs should have smaller line heights. Headings so that they don't appear split, and inputs because there is such a small amount of text it offends legibility. While this is a reasonable default, if large ascenders/descenders are present on a heading font, it may need to be re-evaluated.

```css
math,
time,
table {
	font-variant-numeric: tabular-nums lining-nums slashed-zero;
}

code {
	font-variant-numeric: slashed-zero;
}
```

When clarity is necessary, such as with times, maths, or code, some typographical changes are always necessary. `tabular-nums` and `lining-nums` keep numbers aligned and consistent, making data easier to read.

Slashed zeros (<span style="font-variant-numeric: slashed-zero;">0</span>) remove visual ambiguity.

```css
table {
	border-collapse: collapse;
}
```

Non-collapsed borders feel very 90s and are visually overwhelming.

```css
abbr {
	font-variant-caps: all-small-caps;
	text-decoration: none;

	&[title] {
		cursor: help;
		text-decoration: underline dotted;
	}
}
```

`<abbr>` is an odd element, really. The `title` attribute aspect isn't well exposed and is [only really usable with a pointer](https://adrianroselli.com/2024/01/using-abbr-element-with-title-attribute.html). I still like to cover it, but this should be kept in mind.

```css
sup,
sub {
	line-height: 0;
}
```

Superscript and subscript annoyingly meddle with line heights, which I dislike. This overrides that behaviour.

```css
:disabled {
	opacity: 0.8;
	cursor: not-allowed;
}
```

Firefox is the only major browser that doesn't reduce the opacity of disabled elements, so I reduce it for parity. I also apply a `not-allowed` cursor for some further clarity. Care must be taken here, as this could cause text to have insufficient contrast.

```css
:focus-visible {
	outline-offset: 0.2rem;
}
```

Focus outlines are good, but when they're too close, they're often difficult to see. A slight offset helps address this.

[^1]: To specifically name a few: Andy Bell's [A (more) Modern CSS Reset](https://piccalil.li/blog/a-more-modern-css-reset/), Eric Meyer's [Reset CSS](https://meyerweb.com/eric/tools/css/reset/), Josh W Comeau's [A Modern CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/), and Manuel Matuzović's [uaplus.css](https://fokus.dev/tools/uaplus/).

[^2]: _Cough, cough._ Safari.

[^3]: This isn't to say I agree with the default styling, for I have strong disagreements with the typographical choices. Headings having an equal block margin is a typographical sin and leaves them in no-man's-land -- insufficiently distanced from the previous content but insufficiently associated with what proceeds it.
