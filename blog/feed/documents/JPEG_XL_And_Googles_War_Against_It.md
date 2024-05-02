<head>
    <title>JPEG XL And Google's War Against It | Vale.Rocks</title>
    <meta property="og:title" content="JPEG XL And Google's War Against It"/>
    <meta name="description" content="My look into the very promicing JPEG XL and why it hasn't seen the adoption it deserves as an innovative new file format." />
    <meta property="og:description" content="The best format you can't use." />
    <meta property="article:published_time" content="2024-05-01" />
    <meta property="article:modified_time" content="2024-05-02" />
    <meta property="article:section" content="Essays" />
</head>

<article>
<header>
	Essay
	<h1>
		JPEG XL And Google's War Against It
	</h1>
	<ul>
		<li><time datetime="2024-05-01">01 May, 2024</time></li>
		<li>2044 words</li>
		<li>7 minute read</li>
	</ul>
</header>

<div class="readable_width">

There is no doubt you're familiar with GIFs, PNGs, and JPEGs. These image formats have been _the_ way to display images on computers for decades. Chances are you see hundreds, if not thousands, of them every day while you browse the web.

Yet these formats aren't quite as ubiquitous as they once were, and we've seen many competing standards materialise in the past few years. Perhaps most promising is JPEG XL, yet its innovation seems to go unrecognised and its adoption is stifled. But why? To get a full picture, I think it's best we start with the advent of displaying images on computers.

## A Brief History

Since we've had computers, we've been trying to display images on them. We started by using various text characters and symbols to bodge things together in terminals. This obviously wasn't ideal and merely means to an end. The first actual image formats to see any real popularity included [PCX](https://en.wikipedia.org/wiki/PCX), [TGA](https://en.wikipedia.org/wiki/Truevision_TGA), [PICT](https://en.wikipedia.org/wiki/PICT), and [BMP](https://en.wikipedia.org/wiki/BMP_file_format).

However, these early formats were rudimentary. They largely lacked compression and weren't widely supported. It was an era when every piece of software rolled their own format and interoperability wasn't a priority. This was an issue, and as the need for greater compatibility grew, some proper standards formed. Of these, GIF, JPEG, and PNG are probably the best known and relevant today.

GIF, short for Graphics Interchange Format, is messy. It released in the '80s, uses the simple Lempel–Ziv–Welch compression algorithm, and is limited to a palette of a meagre 256 colours. In today's landscape, it looks pretty rough, but it's managed to stick around thanks to its great software support and animation capabilities.

JPEG, also referred to as JPG and short for Joint Photographic Experts Group, came out in the early '90s. While it does have a lossless variant, it is largely used as a lossy format. However, the degree of compression can be controlled, unlike many other formats, which allows users to select the trade off between quality and size. It's great compression and early debut led to it becoming the most widely used format.

An attempt was made to supersede JPEG with the very retro futuristic sounding, but ultimately ill fated, "JPEG 2000". It had some neat features and functionality, such as being able to compress specific sections independently, but never saw widespread adoption.

During the '90s, following GIF's widespread adoption, the Unisys Corporation, which owned the patent on the Lempel–Ziv–Welch compression algorithm used by GIFs, attempted to enforce its licensing. This ultimately led to much discourse, and a more open, improved alternative was developed. It was aptly unofficially dubbed "PNG's Not GIF", which, of course, abbreviates to the recursive acronym PNG, though officially, it stands for "Portable Network Graphics". The format spread due to its free, open nature, and good support for transparency by means of an alpha layer.

These three standards all managed to secure footing early in the web's life and defined themselves as _the_ image formats for many years. They haven't been perfect, but they've generally worked and seen great support.

## A New Age

It isn't all sunshine and roses for these ageing formats, though. The world has moved around them. Back when these formats were devised, computing power was a scarce resource. Many devices didn't hold the power to compress things on the fly without performance implications, and the web was in its infancy.

Over the past 30 odd years, our devices, software, and knowledge of them have come a long way, yet these ageing formats still remain. That's why, in recent years, we've seen a shift to new formats. Ones that aren't limited to the compression algorithms of the '90s, and are instead more optimised and usable in the modern age.

### Enter WebP

In 2010, two years after the release of their Chrome browser, Google announced WebP. They proceeded to develop and refine it until its eventual stable release in 2018. The goal was simple. Make a format with the quality of a JPEG, the transparency of a PNG, and the animation of a GIF, in a small package.

As expected for a Google product, it very quickly gained support in Chromium, even prior to its stable release. Safari and Firefox didn't adopt support until after its stable release, but it now sees complete browser support. Once all browsers received support, Google very quickly began working to snuff out other formats. They made several changes, such as updating PageSpeed Insights to suggest that sites serve images as WebP files rather than competing formats.

### Announcing AVIF

About a year after WebP's introduction, a competing standard, AVIF, had its first full release. The intention was for the format to succeed WebP, and while it did implement features such as HDR, which weren't present in WebP, it also lacked features such as multi page support. Realistically, this places it in no man's land. It's not objectively better than the standards it's competing against.

AVIF also uses AV1 video compression. As you might imagine, videos and still images call for different styles of compression. Video is most concerned with compressing information throughout multiple frames, whereas image compression is a lot more concerned with compression within a single picture.

That said, AVIF managed to see quick adoption. In August of 2020, Chromium received support, with Firefox enabling support in October of 2021 and Safari implementing support throughout 2022.

### Introducing JPEG XL

Having been finalised in 2021, JPEG XL is a rather new format, and a good one at that. It's created by the same group as the original JPEG and based off of [Google's Pik proposal](https://github.com/google/pik) and [Cloudinary's FUIF](https://github.com/cloudinary/fuif).

<figure class="right">
<picture>
	<source srcset="/assets/blog/JPEG_XL_And_Googles_War_Against_It/jxl_support.jxl" type="image/jxl">
	<img src="/assets/blog/JPEG_XL_And_Googles_War_Against_It/no_jxl_support.png" alt="Image stating 'Your browser supports JPEG XL' or 'Your browser doesn't support JPEG XL' depending on browser support." />
</picture>
</figure>

Looking at [Wikipedia's Comparison of Graphics File Formats](https://en.wikipedia.org/wiki/Comparison_of_graphics_file_formats), it's evident that it trumps every other raster image format. Some of its many features include:

- Choice of lossy or lossless compression.
- Perfectly reversible, lossless conversion from JPEG with ~20% savings.
- ~60% smaller file sizes than JPEG at the same quality when using lossy compression.
- Negligible compression artefacts when using lossy compression.
- Great colour gamut support, including HDR, and support for other channels.
- Super fast encoding and decoding.
- Support for progressive decoding.
- Tiny file header at a mere 12 bytes.
- Everything WebP and AVIF boasts, including transparency, animations, and such.
- Licensed openly with no royalties.
- Up to 32 bit depth
- Insanely high maximum resolution up to 1,152,921,502,459 megapixels (that's _over a trillion_ pixels total).
- Resilient against generational loss.

From reading those points, you may have gathered that it does everything that could be expected of a format and does it well. Given that it excels in every context, you might expect that it'd be the de facto standard, yet, alas, it sees minimal browser support.

So, why were WebP and AVIF picked up so quickly when JPEG XL wasn't? Well, as you may have surmised from the article's title, it's largely down to Google.

## Google's Exploitation of Their Dominance

<span class="callout note">
I'll be discussing Chrome's dominance and Google's exploitation of it for their own gain. I've written about this at length in my article <a href="/blog/Everything_Is_Chrome">Everything Is Chrome</a>, which I advise you read prior to this section.
</span>

Google has cemented itself as the single controlling force of the web. What they say goes. Google Search is the most popular search engine, and Chromium is the base for the majority of browsers. This means they control both what pages get recommended in search, and how they're displayed in browser.

This leaves them with a lot of power. If they take issue with JPEG XL, then they can single handedly stop its adoption, and that's exactly what they've done. At one point, Google actually did add support for JPEG XL to Chromium behind a flag. It was implemented and functional in Chromium. This prompted Firefox to add their own support.

However, it never made it past the opt in flag support stage, and Google eventually removed it, stating [in the Chromium Issue Tracker](https://issues.chromium.org/issues/40168998):

> "Thank you everyone for your comments and feedback regarding JPEG XL. We will be removing the JPEG XL code and flag from Chromium for the following reasons:
>
> - Experimental flags and code should not remain indefinitely
> - There is not enough interest from the entire ecosystem to continue experimenting with JPEG XL
> - The new image format does not bring sufficient incremental benefits over existing formats to warrant enabling it by default
> - By removing the flag and the code in M110, it reduces the maintenance burden and allows us to focus on improving existing formats in Chrome"

This rightly caused an uproar. Users pointed out many flaws in their claims. Firstly, that there has been a huge interest in the standard from a huge number of individuals and organisations, and secondly, the innovation brought by JPEG XL was most definitely "sufficient incremental benefits", especially as they had recently accepted AVIF, which was more lacking in features than existing standards.

What this really translates to is, "We've created WebP, a competing standard, and want to kill anything that might genuinely compete with it". This would also explain why they adopted AVIF but not JPEG XL. AVIF wasn't superior in every way and, as such, didn't threaten to dethrone WebP.

JPEG XL, however, **is** better than WebP in every quantifiable way and would obsolete it. AVIF also serves as something to point to should they be called out for stifling competition and innovation as they are. They can simply say, "We love other formats. Look, we added another one just the other year".

Interestingly, Firefox, which receives a pretty decent amount of funding from Google, quietly dropped focus on implementing JPEG XL support and now state that they are "neutral" on the matter, although the flag is still present in the nightly version of the browser. Safari, which is developed by Apple separately from Google, managed to implement JPEG XL support with no issues, and it's available in WebKit without limitation.

Many forks of Chromium and Firefox also include support with no ill effect. Firefox based browsers can simply enable the flag, and Chromium based browsers can use the implementation prior to removal as a jumping off point. Some of the forks with support include [Thorium](https://thorium.rocks), [Waterfox](https://www.waterfox.net), and [Pale Moon](https://www.palemoon.org). The code is written and working, and both use external implementations, so the cited "maintenance burden" is more or less nonexistent.

### Why WebP?

So, Google sabotaged JPEG XL in favour of their own format, WebP. The question is, _why?_ Well, I think that's pretty clear. Google wants control, and JPEG XL could take that away from them. They already have unrivalled control over the web, so why not expand that just a bit more?

Should Google decide they need to make some alterations to the format to benefit themselves, there is next to nothing standing in their way. They've got control over the standard and can make tweaks if needed. Especially the sort of business minded tweaks that are employed to better align with stakeholder interests.

Google could also stop supporting the format outside their products and services, leading to them faltering and falling out of compatibility. This could lead to fragmentation and compatibility issues in non-Google software, potentially pushing users to move to Google's offerings where support is offered.

## Taking Action

It may seem futile, but I believe that if we raise awareness of the issue and put enough public pressure on Google and, to a lesser extent, Mozilla, they will reconsider their stance. Use browsers that support the format, or toggle on the flag if possible. Spruik the benefits of the format wherever you can attract attention, and start using it in the [various software that already supports it](https://jpegxl.info/why-jxl#software_support). The more demand, the more adoption.

This is an effort that is worth fighting for. Google has trampled innovation far too many times in the pursuit of control for us to allow them to do it again. We must condemn this behaviour and fight these monopolistic practices at every turn to prevent stifling progress in the name of corporate control.

---

If you liked this article, then do consider sharing it, both for my own benefit and to raise awareness. Also, if you'd like to see me produce more content like this, then consider [sending me a tip](/donate). It'd mean a lot.

<details>
<summary>Sources</summary>

- [JPEG XL decoding support (image/jxl) in blink (tracking bug) [40168998] - Chromium](https://issues.chromium.org/issues/40168998) | Accessed: 23/04/2024
- [Web Review: PNG's NOT GIF!](https://people.apache.org/~jim/NewArchitect/webrevu/1997/05_09/designers/05_09_97_1) | Accessed: 01/05/2024
- ["jpeg webp" | Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/?search=jpeg%20webp)
- [JPEG XL](https://jpegxl.info)| Accessed: 24/04/2024
- [JPEG - JPEG XL](https://jpeg.org/jpegxl) | Accessed: 23/04/2024
- [JPEG XL White Paper 2.0 - jpeg-xl-whitepaper.pdf](https://ds.jpeg.org/whitepapers/jpeg-xl-whitepaper.pdf) | Accessed: 28/04/2024
- [How JPEG XL Compares to Other Image Codecs](https://cloudinary.com/blog/how_jpeg_xl_compares_to_other_image_codecs) | Accessed: 23/04/2024
- [Open Bug 1539075 (JPEG-XL) Implement support for JPEG XL (image/jxl)](https://bugzilla.mozilla.org/show_bug.cgi?id=1539075) | Accessed: 23/04/2024

</details>

<section class="giscus"></section>

</div>
</article>
