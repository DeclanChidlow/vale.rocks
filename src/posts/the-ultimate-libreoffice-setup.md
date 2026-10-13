---
title: The Ultimate LibreOffice Setup
description: My comprehensive tutorial aimed at optimizing LibreOffice to match the functionality of Microsoft Office. Elevate your document editing experience with tips, tools, and enhancements for seamless and efficient productivity.
og_description: A guide to sorting the office suite solution.
pub_time: 2023-06-16
mod_time: 2026-10-13
section: Tutorial
tags: [writing]
standardsite_rkey: 3mn2edahbdn2d
---

Document editing is a horrible business that I wouldn't wish on my worst enemy. Fighting formats, muddled margins, puzzling paragraph breaks, annoying autocorrect, and stumbling spell checkers lead to a mess of text that can't be combated by even the most confident keyboard cowboys.

I've spent a lot of time trying to wrangle my word editing and perfect my proofreading performance by configuring and tweaking my LibreOffice setup to perfection. The first thing to look at is why I chose LibreOffice over any other document suite.

## Best Suite

I feel it'd be wrong to write this article without at least mentioning the many document editing suites available and how I came to decide on LibreOffice. I've highlighted what I feel are reasonable choices that are under support. This means I've excluded suites such as KOffice, AbiWord, and OpenOffice.

[Microsoft Office](https://m365.cloud.microsoft) is obviously the biggest and arguably the best. It really needs no introduction; everyone uses Microsoft Office, and it has near-endless numbers of features. It's backed by a huge corporation and works pretty well. The caveat is that it's locked behind an expensive subscription service and has telemetry built in. It's also not available on Linux, which completely writes it off for me.

[Calligra](https://calligra.org) (a continuation of KOffice) was another I looked at. It seems rather nice but is lacking many features that I would expect and is designed for KDE, a desktop environment I don't use.

[iWork](https://www.apple.com/iwork/index.html) is Apple's offering. I used it on my iPad 4, circa 2015. It's alright but completely locked to Apple's platforms.

[OnlyOffice](https://www.onlyoffice.com) is a pretty fully featured option, but when I tested it, it hounded me with popups. It is built using web technologies rather than native ones, which is a performance negative and limits how it can integrate with my computer. It does have very nice support for Microsoft Office's formatting out of the box, though.

The best office suite I've found has to be [LibreOffice](https://www.libreoffice.org). It integrates well with my computer, is open-source, is fast, and is pretty fully featured. It's seen good support, has a community behind it, has solid governance, and doesn't have motive to worsen in pursuit of trends or stakeholder value. For that reason, it's my number one choice.

## Installation

LibreOffice can be [downloaded from the project's website](https://www.libreoffice.org/download/) or your desired package manager and comes with six applications:

- Writer - For word processing. Equivalent to Microsoft Word.
- Calc - For spreadsheets. Equivalent to Microsoft Excel.
- Impress - For slide decks. Equivalent to Microsoft PowerPoint.
- Draw - For diagrams, illustrations, and <abbr title="Portable Document Format">PDF</abbr> editing.
- Base - For database management.
- Math - For authoring mathematics.

## Improving the Interface

The first and most impactful change you can make to LibreOffice is to change the interface. By default, LibreOffice's interface is reminiscent of office suites from the 1990s and early 2000s, though I [much prefer the ribbon interface that Microsoft introduced with Office 2007](/micros/20261009-1055). You can switch to it by selecting 'Tabbed' in the 'User Interface' tab of the welcome window the first time you open an application in the LibreOffice suite. If you've already dismissed this window, then you can switch to it under `View > User Interface` in the top menubar. Select 'Tabbed' and then 'Apply to All', so it applies to all applications in the suite -- not just the one you're currently using.

I personally find the default icons to look a bit dated and find that on many screens they appear pixelated or blurry, so I switch to the pleasant 'Sukapura' set. It is available in <abbr title="Scalable Vector Graphic">SVG</abbr> format, which looks sharp regardless of resolution, and has a dark variant suited for if using dark mode. The set also has a pleasant colourful appearance. It can also be chosen in the welcome window under the 'Appearance' tab. If you've dismissed the welcome window, then you can change the icon set under `Tools > Options`, then `LibreOffice > Appearance` in the window that opens. Here you can both set the icon theme _and_ customise the size of icons.

To clean up the interface, I also like to collapse the sidebar, as it is rarely needed and takes up a decent amount of screen space.

## Improving Microsoft Office Compatibility

If you're coming from Microsoft Office or have to interact with documents authored with Microsoft's suite, then it may be worth slightly adjusting LibreOffice to ensure the best possible compatibility.

### Installing Fonts

Microsoft has a number of their own fonts, and it is advantageous to have them installed. If you're using Windows, then you already have them installed, as they came bundled with your operating system. If you're using Linux, however, then it is worth taking the time to install them. The [Arch Wiki has a quality guide for Arch Linux users](https://wiki.archlinux.org/title/Microsoft_fonts), while for other distros you'll need to perform a search to find out the needed package names. LibreOffice does include some near-equivalent fonts, but they aren't perfect, so it is worth installing the actual fonts.

### Removing Format Warnings

LibreOffice often screams at you if you open or try to save Microsoft Office file types. You can hide these warnings when saving files by navigating to `Tools > Options`, then `Load/Save > General` in the resulting window. Here you should untick 'Warn when not saving in ODF or default format'. Here you can also change 'Always save as' to a Microsoft format like `.docx` if you so choose, though Microsoft Office can open and handle `.odt` without issue. You'll need to change the 'Always save as' separately for each application.

### Reorganising Forms and Adding Trailing Spaces

In Writer, navigate to `Tools > Options`, then `LibreOffice Writer > Compatibility`. Here you should ensure 'Word-compatible trailing blanks' and 'Use Word-compatible font metrics for text grid and Asian text' are ticked. Once ticked, click 'Use as Default' and then `Yes` in the subsequent popup box. This will fix some minor compatibility annoyances.

## Performance

In `Tools > Options`, `LibreOffice > Advanced`, you can probably untick 'Use a Java runtime environment'. Unless using functionality in Base or specific Extensions, removing it has no effect other than reducing LibreOffice's memory footprint and start-up time.

---

With this configuration applied, LibreOffice should be a much superior experience to what is proffered out of the box.
