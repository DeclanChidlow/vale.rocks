---
title: CSS Curiosities of the Past
description: Summary of the various CSS syntaxes, parsing bugs, hacks, bespoke features, and implementations used across browsers and the web to achieve specific goals in the days before browser vendors became more adherent to a single solid specification. Particularly focusing on the non-compliant, bespoke implementations of functionality seen in Microsoft's Internet Explorer.
og_description: Contrived Standards Skirting.
pub_time: 2026-09-11
section: Essay
tags: ["CSS", "front-end", "development"]
standardsite_rkey: 3mv7sbr7jxp2c
---

The ebbs and flows of the web have gotten us to where we stand today. We simply wouldn't have the web we do without the journey it has taken us to get here. However, some of the steps it has taken to get here have been interesting to say the least.

CSS is how we style things on the web, but since its inception it has been made, on occasion, to wear a few more hats. It has taken on odd roles and picked up behaviours it probably ought not to have. Such is life.

As I've detailed [odd and context-specific HTML](/posts/html-relics), this is a look at CSS largely outside the specifications. Browser-specific hacks, technology-scoped syntax, and engine-exclusive snippets forged from questionable circumstances, corporate complications, and esoteric implementations.

## Property Parsing

```css
width: 300px;
*width: 250px;
_width: 200px;
-width: 200px;
```

Most browsers, correctly, would treat a property prefixed with an asterisk as invalid. However, Internet Explorer 7 and earlier would treat it as valid. It was so famous it garnered the name 'star hack' for the shape of the asterisk. Likewise, when prefixing a property with an underscore or hyphen, _only_ Internet Explorer 6 would treat it as valid. There were _many_ more similar hacks used, the vast majority of which are best documented at the eponymous [browserhacks.com](http://browserhacks.com). The main gist is that some browsers would incorrectly parse properties, selectors, and values, and that could be used for gain in an era where browser behaviour was rather varied.

Limiting CSS to apply only in certain browsers with conditional comments, such as could be done in HTML, wasn't possible.[^1] Therefore, this exploitation of questionable parsing of what is and isn't valid was commonplace for targeting specific browsers.

## Important

```css
background: red !interesting;
```

Internet Explorer 7 and earlier would treat almost any textual string prefixed by an exclamation mark as `!important`. Most commonly, people would make use of this by writing `!ie` to have a style only override specificity in Internet Explorer. As far as Internet Explorer was concerned, the arbitrary `!banana` and the specced `!important` were the same, while other browsers correctly only accepted the latter.

There was another related bug in Internet Explorer 6 and lower where a later declared style would overwrite an `!important` value. For example, here the colour would be black rather than white, as it should be:

```css
color: white !important;
color: black;
```

## Document Level Browser Detection

There were [so many ways](https://web.archive.org/web/20071005221259/http://www.javascriptkit.com/dhtmltutors/csshacks2.shtml) in which you could identify what browser was in use on a document level via CSS. Some examples include:

- In Internet Explorer 6 and earlier you could write `* html {}`.
- For only Internet Explorer 7 you could use `*:first-child+html {}`.
- Browsers other than Internet Explorer 7 support `html > /**/ body {}`.
- Early versions of Firefox would apply styles within `body:empty {}` (even when the body had contents).

This approach was often messy to use, as it meant writing multiple descending selectors to try to target elements in specific browsers only.

## Clearfix

```css
.clearfix {
	zoom: 1;
}
```

Until version 8, Internet Explorer [had a concept called `hasLayout`](https://www.haslayout.net/haslayout.html). An internal flag, it would designate whether an element was responsible for rendering itself (`true`) or if a parent element would be responsible for it (`false`). Naturally, this was an obtuse and confusing system. Some elements, such as `<img>`, `<iframe>`, and most things input-related, would intrinsically 'have layout'. Other elements wouldn't have layout, [unless it was specifically given via specific CSS declarations being present](<https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa752723(v=vs.85)#remarks>).

An element without layout could encounter weird margin and border behaviours, positioning complications, and general odd rendering and, most importantly, would cause parent containers to collapse when their children were floated. This caused all sorts of problems in an age where floating elements was the de facto way to lay out pages.

The `zoom` property changes the size at which its target appears. With a value of `1`, the target appears at its existing size. This may seem useless, but `zoom` gives an element layout, so it would be used as a simple way to do so without otherwise changing an element's visual appearance.

## Hand Cursor

```css
cursor: pointer;
cursor: hand;
```

Prior to Internet Explorer 6, Internet Explorer didn't respect the `pointer` value for the `cursor` property. Instead, it only supported the non-standard `hand` value, which provided a pointing hand. Therefore, sites [would commonly write both values in their CSS](https://boyet.com/blog/dumb-css-cursor-pointer-or-hand/) with the expectation that `cursor: hand` would be considered invalid in browsers other than Internet Explorer, thus prompting them to use `pointer` while Internet Explorer uses `hand`.

## CSS Expressions

```css
top: expression(eval(document.documentElement.scrollTop));
```

Formally called 'Dynamic Properties', CSS expressions were a way to execute JavaScript in CSS. It was non-standard behaviour introduced in Internet Explorer 5 to patch up lagging styling capabilities, such as missing support for `position: fixed` (which the above snippet addresses), or `min-width` and `max-width`, among others. This made making layouts rather difficult. CSS Expressions were hacky and awkward while exposing a lot of complexity. You could go as far as to change what styles were applied based on the time of day using `Date()`. CSS expressions were constantly re-evaluated, making them extremely performance taxing. As was noted by Steve Souders on the [Yahoo! Developer Network blog](https://web.archive.org/web/20080808113459/http://developer.yahoo.net/blog/archives/2007/07/high_performanc_6.html):

> The problem with expressions is that they are evaluated more frequently than most people expect. Not only are they evaluated when the page is rendered and resized, but also when the page is scrolled and even when the user moves the mouse over the page.

Microsoft ended support for them with Internet Explorer 8, as announced in their dramatically titled post '[Ending Expressions](https://learn.microsoft.com/en-us/archive/blogs/ie/ending-expressions)'.

## Filters

Internet Explorer had a number of iffy behaviours and lagged behind other browsers for many visual effects, even regarding basic properties like `opacity`. Thus, Microsoft brought in [bespoke filter functionality](https://webplatform.github.io/docs/concepts/proprietary_internet_explorer_techniques/#filters:~:text=Filters%20present%20a%20way%20to%20apply%20certain%20visual%20effects%20either%20to%20page%20elements%20or%20to%20the%20page%20as%20a%20whole%2E). Filters used DirectX-based components of Windows, far away from web platform standards. Internet Explorer first introduced its filter functionality with version 4. The syntax was rather simple, with an example of lowering an element's opacity looking like this:

```css
filter: alpha(opacity=50);
```

It was far from perfect but allowed addressing many of Explorer's shortcomings. Filters required that an element [had layout](#clearfix) and also annoyingly stripped ClearType font anti-aliasing for small text, making it look jagged. Sometimes they'd cause issues with interactivity, too. In version 5.5 filter syntax became more complex, looking like this:

```css
filter: progid:DXImageTransform.Microsoft.Alpha(opacity=50);
```

Note the presence of `DX` referring to DirectX. Filters could [even be animated](<https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/ms532847(v=vs.85)#transitions>). In the last update to filter functionality, Microsoft vendor-prefixed their filter property in version 8 to better comply with CSS standards. They also made it so that filters would not strip font anti-aliasing, and it became necessary to wrap the value in quotes:

```css
-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=50)";
```

`-ms-filter` was finally removed with Internet Explorer 10. This removal extended to Internet Explorer's legacy modes too. By version 10's release, most popular uses for filters had received support from the browser, such as the `opacity` property which was added in version 9.

Aside from opacity, two of the other very common uses for Explorer's filter capabilities were handling transparent PNG images and applying gradients. Transparent sections of PNGs in Internet Explorer 6 and earlier were replaced with a grey background. Even in later versions, PNGs could encounter issues usually related to gamut. Therefore, people would often load images via `AlphaImageLoader`:

```css
filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='image.png');
```

Gradients would be applied with `filter` as an alternative to using background images (`linear-gradient()` would not receive support until Internet Explorer version 10).

```css
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='red', endColorstr='green', GradientType=0);
```

People would often implement simple reusable filters for commonly encountered situations using the aforementioned [CSS Expressions](#css-expressions) functionality.

## Scrollbars

```css
body {
	scrollbar-face-color: #333333;
	scrollbar-highlight-color: #666666;
	scrollbar-3dlight-color: #000000;
	scrollbar-darkshadow-color: #000000;
	scrollbar-shadow-color: #111111;
	scrollbar-arrow-color: red;
	scrollbar-track-color: #222222;
}
```

Internet Explorer version 5.5 introduced the ability to customise the appearance of scrollbars.

<figure class="right">
<img src="/assets/posts/css-relics/ie-11-scrollbars.avif" alt="An Internet Explorer 11 windows with dark coloured scrollbars and red arrows.">
<figcaption>The above scrollbar styles in Internet Explorer 11.</figcaption>
</figure>

For the arrow buttons and thumb, `face-color` set background, `highlight-color` set the inner left highlight, `3dlight-color` set the outer right highlight, `darkshadow-color` set the inner right shadow, `shadow-color` set the inner right shadow, and `arrow-color` set the arrow icons themselves. `track-color` obviously set the scrollbar track. There were even [full applications for generating the styles](https://www.yaldex.com/PadFiles/ColoredScrollBarsPad.htm).

Much like today, styling scrollbars was considered somewhat gaudy and over-the-top, so it was mostly used for minor tweaks in professional contexts. The functionality was of course utilised to its fullest potential by people customising their MySpace profiles.

## HTML Components

```css
.item {
	behavior: url(csshover.htc);
}
```

HTML Components (not to be confused with contemporary [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)) were an Internet Explorer exclusive feature added in version 5 and expanded greatly in version 5.5, which allowed attaching scripting logic to HTML elements via CSS. Though many languages were supported, JavaScript was almost always used.

Here is an example of a HTML Component that would be used to add hack-in hover behaviour on elements other than links, which is the only place `:hover` was supported in Internet Explorer prior to version 7. Note that the language specified is 'JScript' -- Microsoft's diverging implementation of JavaScript which Internet Explorer supported.

```html
<PUBLIC:COMPONENT NAME="CSSHover">
	<PUBLIC:ATTACH EVENT="onmouseover" ONEVENT="hoverOn()" />
	<PUBLIC:ATTACH EVENT="onmouseout" ONEVENT="hoverOff()" />

	<script language="JScript">
		// Append a class when the mouse enters
		function hoverOn() {
			if (!/\bhovered\b/.test(element.className)) {
				element.className += " hovered";
			}
		}

		// Remove the class when the mouse leaves
		function hoverOff() {
			element.className = element.className.replace(/\b\s?hovered\b/g, "");
		}
	</script>
</PUBLIC:COMPONENT>
```

A particular popular usage of this functionality was [Progressive Internet Explorer](http://css3pie.com), which ported then-modern CSS features to Internet Explorer versions 6 through 9. From Internet Explorer 8, `behaviour` is available as the vendor prefixed `-ms-behavior`, and [support was removed in Internet Explorer 10](<https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/hh801216(v=vs.85)>).

## Box Model Hack

<!-- prettier-ignore -->
```css
div {
	width: 400px;
	voice-family: "\"}\"";
	voice-family: inherit;
	width: 300px;
}
```

A [rather famous hack from Tantek Çelik](https://tantek.com/CSS/Examples/boxmodelhack.html). The `voice-family` property was used for specifying which voice family should be used when reading content aloud. The property wasn't supported by older browsers of the time, and the value was provided as a string. Due to a parser bug, Internet Explorer 5 would interpret `"\"}\""` as the closing of the current CSS block, leaving the other declarations invalid and allowed to slip past the browser undetected. This was important, as implementations of the [box model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model) were differing.

The Internet Explorer versions caught by the hack -- 5 and 5.5 -- handled the box model incorrectly. They would include padding and borders inside the declared width, rather than outside as they should have. Meanwhile, standard-compliant browsers which parsed the CSS correctly (with the exception of Opera, for which a further snippet would be included) supported the box model and would correctly handle borders and margins as being outside of the element's width.

## Double Margin Float

```css
div {
	float: left;
	margin-left: 5px;
	display: inline;
}
```

Internet Explorer would display the above margin as 5px. However, without a `display` value of `inline`, it'd be rendered as 10px -- not 5px. As explained in Position Is Everything's Explorer Exposed article, [The IE Doubled Float-Margin Bug](https://web.archive.org/web/20080907120231/http://www.positioniseverything.net/explorer/doubled-margin.html):

> Why is this happening? Don't ask such silly questions! This is IE, remember? Conformance with the specs is only to be hoped for, not expected. The simple fact is it does happen.

## Toolbars

Before the [Skype Toolbar opt-out meta tag](/posts/html-relics#skype-toolbar) was introduced -- and even as a fallback after it was -- some site owners would stop Skype's Toolbar from displaying Skype buttons on their page directly with CSS:

```css
span.skype_pnh_container {
	display: none !important;
}

span.skype_pnh_print_container {
	display: inline !important;
}
```

In a very similar case, the [Ask Toolbar](https://web.archive.org/web/20120222191153/http://about.ask.com/apn/toolbar/docs/default/faq/en/chrome/chrome.html) would appear at the top of the page and sometimes break pages, leading to developers targeting `#apn-null-toolbar` and `#apn-body-style` to remove it. Many other extensions, often installed by applications without users really understanding them, would introduce similar issues that browsers would have to target and remove.

## Vendor Prefixes

Vendor prefixes were mainly used for non-standard or experimental CSS features so that developers could test new features and give feedback to browser vendors before their implementation or specification is finalised. 'Prefix' refers to the browser-specific mark preceding the property, pseudo, at-rule, or media feature. `-webkit-` was used for WebKit and Blink-based browsers, `-moz-` for Gecko-based browsers, `-o-` for Presto-based browsers, `-khtml-` for KHTML (and kept around for early WebKit versions), and `-ms-` for MSHTML/Trident-based browsers, [as well as others](https://www.w3.org/TR/CSS2/syndata.html#vendor-keyword-history).

However, these vendor prefixes would sometimes be prematurely adopted beyond experimenting. Developers would include them in production sites such that removing support for these testing features would break them. As such, browser vendors found themselves having to keep support for these testing implementations.

As a result, browser vendors no longer use vendor prefixes, instead placing features behind flags which must be enabled on each individual browser. Most vendor prefixes are obsolete in the face of non-prefixed implementations. However, some stick around as proper implementations haven't been specced. Perhaps most famously, [`-webkit-text-stroke`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/-webkit-text-stroke), which is supported across all major browsers and not just those using WebKit.

---

This article isn't comprehensive. These are only the more popular or notable non-standard bits. Many more curious CSS oddities from time passed linger out there on the web, collecting dust and growing creaky. Even in 2005 Microsoft was [trying to get people to stop using many of these hacks](https://learn.microsoft.com/en-us/archive/blogs/ie/call-to-action-the-demise-of-css-hacks-and-broken-pages). At least (outside of legacy contexts) we don't have to fret about the questionable behaviour of Internet Explorer and other stone-age browsers any longer.

[^1]: People would sometimes get around this limitation by wrapping styles in conditional comments where they were imported, using conditional comments to selectively apply classes, or by wrapping inline styles within conditional comments, all within their HTML.
