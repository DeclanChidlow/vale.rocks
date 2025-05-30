---
title: The Ultimate LibreOffice Setup
description: My comprehensive tutorial aimed at optimizing LibreOffice to match the functionality of Microsoft Office. Elevate your document editing experience with tips, tools, and enhancements for seamless and efficient productivity.
og_description: A guide to sorting the office suite solution.
pub_time: 2023-06-16
mod_time: 2023-11-22
section: Tutorial
---

Document editing is a horrible business that I wouldn't wish on my worst enemy. Fighting formats, muddled margins, puzzling paragraph breaks, annoying autocorrect, and stumbling spell checking leads to a mess of text that can't be combated by even the most confident keyboard cowboys.

I've spent a lot of time trying to wrangle my word editing and perfect my proofreading performance by configuring and tweaking my LibreOffice setup to perfection. First thing to look at is why I chose LibreOffice over any other document suite.

## Best Suite

I feel it'd be wrong to write this article without at least mentioning the many document editing suites available and how I came to decide on LibreOffice. I've highlighted what I feel are reasonable choices that are under support. This means I've excluded suites such as KOffice, AbiWord, and OpenOffice.

[Microsoft Office](https://www.office.com) is obviously the biggest and arguably the best. It really needs no introduction; everyone uses Microsoft Office, and it has near endless features. It's backed by a huge corporation and works pretty well. The caveat is that it's locked behind an expensive subscription service and has telemetry built in. It's also not available on Linux, which completely writes it off for me.

[Calligra](https://calligra.org) was another I looked at. It seemed rather nice, but is lacking many features that I would expect and was designed for KDE, a desktop environment I don't use. I do quite like it for mobile document editing though and I recommend it for Android tablet users.

[iWork](https://www.apple.com/iwork) is Apple's offering. I used it on my iPad 4, circa 2015. It's alright. I don't own a MacBook.

[OnlyOffice](https://www.onlyoffice.com) is a pretty fully featured option, but it gave me a lot of popups and is web based, rather than native, which affects integration with my computer. It does have very nice support for Microsoft Office's formatting out of the box, though.

The best office suite I've found has to be [LibreOffice](https://www.libreoffice.org). It integrates well with my computer, is fast, and is pretty fully featured. It's seen good support and shows little indication of slowing down. For that reason, it's my number one choice.

## Installation

LibreOffice comes in two main versions: still and fresh. Still, is a stable version that doesn't get very frequent updates and lags behind in features, so I recommend Fresh. It has modern features and is much more stable than they give it credit for. On Arch Linux (my Linux distro of choice), it can be installed with `libreoffice-fresh`.

## General Setup

The Arch Wiki has a wonderful guide, as always, on how to setup LibreOffice for general use. You can read it [here](https://wiki.archlinux.org/title/LibreOffice) and I very much recommend following it before the rest of my setup. It is Arch specific, but most can be translated for your distro. If you don't use Linux, then you can skip this section and move directly onto the next step. A few things I'd like to point out for my ultimate setup is that I use GTK for theming, disable the startup logo, and install texmaths for LaTeX support as outlined in the guide. I don't install the fonts as outlined in the Arch Wiki as I do it a different way for improved Microsoft Office compatibility.

## Theming

Out of the box, LibreOffice isn't perfect. It looks alright but some work is needed. If, like me, you chose to use GTK for theming, then you can use [Gradience](https://gradienceteam.github.io) to get it looking just how you want. That said, do read [this](https://stopthemingmy.app) before using it. If you don't use GTK (or use something other then Linux) then you can ignore that and just change the icons. For this, you can navigate to `Tools > Options` in the menubar of any of the applications. In the popup window, navigate to `LibreOffice > View` and change the icon theme. I recommend the SVG version of Sukapura. You can choose the light or dark variant, depending on your theme.

## Improving Microsoft Office Compatibility

If you're coming from Microsoft Office or have to interact with Microsoft's formats, then you may struggle with adapting your workflow or dealing with Office files. You should note that applications in LibreOffice have different names to those in MS Office. Word is Writer, PowerPoint is Impress, and Excel is Calc. To follow this next section of the guide, open up one of the applications within the suite, such as Writer.

### Changing the Ribbon

By default, the ribbon (that collection of icons at the top of the program) in LibreOffice is more reminiscent of MS Office 9x than MS Office 365. There is, fortunately, an easy fix. In the top menubar, click `View > User Interface`. In the popup window that appears, select 'Tabbed' and then 'Apply to all'. This ensures that it will apply not just to the current program you're using but to the entire suite.

### Installing Fonts

Microsoft have a lot of their own fonts. You can skip this section if you use Windows, but you'll likely want to acquire them if you use Linux, as they don't come pre-packaged. Luckily for us, they can generally be installed with relative ease. If using Arch Linux, then there is a very useful Arch Wiki article on it [here](https://wiki.archlinux.org/title/Microsoft_fonts). If you aren't using Arch, then I wish you the best of luck.

### Removing Format Warnings

LibreOffice often screams at you if you use MS Office file types. You can hide these warnings when saving files by navigating to the `Tools > Options` (if you can't find `Tools` then try pressing `alt`). In the popup, you can then navigate to `Load/Save > General` and then untick 'Warn when not saving in ODF or default format'.

### Improving Embeds

Many embedded objects from MS Office don't have perfect compatibility by default; to fix this, we can navigate to the `Tools > Options > Load/Save > Microsoft Office` and ensure all the boxes in the Embedded Objects section are ticked.

### Reorganising Forms and Adding Trailing Spaces

Navigate to `Tools > Options > LibreOffice Writer > Compatibility` and ensure `Reorganise Form menu for Microsoft compatibility` and `Word-compatible trailing blanks` are ticked. Once done, click `Use as Default` and then `Yes` in the subsequent popup box.
