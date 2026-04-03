---
title: Stay Away From Accessibility Overlays
description: Accessibility overlays are poor solutions to accessibility issues and in the majority of cases, inflict more problems than they solve. They don't provide legal protection and overall harm the usability of websites. They should not be used and must be avoided, with focus instead being placed on addressing the core problems.
og_description: All the costs with none of the compliance!
pub_time: 2026-04-03
section: Essay
tags: [accessibility, development]
---

Accessibility overlays (sometimes called 'accessibility plugins' or 'accessibility widgets') are tools placed on websites that claim to improve accessibility. They usually appear as a small icon on the side or in a corner of a website's viewport. Clicking on them usually presents a set of options such as the ability to resize text, alter contrast, enlarge the cursor, toggle a preference for motion, and sometimes read the contents of the page aloud.

Yet, ask any accessibility expert and they will tell you to stay far, far away from them. Over a thousand professionals and people with disabilities have signed the [Overlay Fact Sheet](https://overlayfactsheet.com) and the consensus is clear -- almost unanimous: _accessibility overlays do more harm than good_.

## Superficial Solutions

I have heard it first hand when I've referenced issues with websites. Bringing up poor contrast I've been met with 'Oh, we don't need to improve that, there is an option in the overlay'. Take whatever analogy you want: bogging over a rusted car frame, putting a band-aid over a bullet hole, or painting over black mold. You aren't fixing the actual issues at hand, just making it vaguely seem like you have.

The underlying accessibility issues are not fixed by an overlay and become less likely to be addressed given the presence of what looks like a solution. An overlay can't automatically label a form field properly, fix missing headings, or add meaningful alternate text to an image. It won't wholesale solve imperfect focus orders or other genuine problems. It might make you feel better about the state of your site for now, but it doesn't actually help in the long term. You're building your house on a foundation of sand and paying a subscription to have people shoddily jack it up as it sinks. Unless you fix the underlying issues, there is only one way this ends.

## Questionable Incentives

You don't need to be a mathematician to see that with most subscriptions starting at hundreds of dollars annually, thousands of customers, and backing from venture capital firms, there is pressure to scale and to keep people using their products. The overlay business model prioritises quick-fix marketing over the long-term, structural accessibility work that experts recommend. There is a conflict of interest here. If every accessibility issue is fixed, then the overlay is necessary no longer, as evidenced by Chris Yoong's [attempt to educate an accessibility company from the inside](https://chrisyoong.com/blog/educating-accessibility-overlay-companies).

Accessibility overlays also operate on the flawed system of giving people with disabilities separate experiences, rather than ensuring a universal base experience that is accessible to all. Psychologically, this places a burden on the user to fix their experience, rather than on the developers to provide a universal experience. As I've said before, [you can't opt-out of accessibility](/posts/accessibility-importance).

I went through the websites of a few accessibility providers. Getting past the typos and uncanny AI-generated images, I found glaring issues. I found links and buttons without focus states. I found elements which did have focus states, but whose outlines were cut off. I found inert focusable elements. I got stuck in a focus trap which I had to use my mouse to get out of. I wasn't even digging or performing an in-depth audit! I quite simply used my keyboard to navigate through the site.

I followed this up by enabling `prefers-reduced-motion` in my browser. Did this stop elements fading in and moving across the screen on these websites? The answer is no for most of them. Not to mention the sheer number of carousels. If there was one thing I _wouldn't_ put on a site trying to showcase great accessibility, it'd be a carousel, which are notorious to the point of infamy for commonly being implemented poorly and inaccessibly.

On one particular site I was shocked to see that _the accessibility overlay widget button didn't have focus styling_. Did _anyone_ test _any_ of this? Were _any_ people with disabilities consulted? If a website offering a tool designed to enhance accessibility can't even hit the basic A level of conformance to the WCAG, what hope is there for the technology they're spruiking? This is bare minimum stuff.

## Interference

Everything these overlays do is already better handled by the browser or operating system. Reinventing the wheel -- or rather, reimplementing accessibility technologies -- is a waste of effort and time. Do you expect a random overlay company to build better assistive technologies than the collective effort of the entire planet's legitimate web and accessibility professionals working together to build and improve the web platform?

As overlays often try to take assistive technologies into their own hands, they often interfere with the actual technologies people need. Trying to reimplement someone's screen reader doesn't help them it gets in their way. As does fiddling with their input methods. I once tested a site using the screen reader NVDA and performed a keyboard shortcut to tell NVDA to start reading from that point. Some misguided developer had implemented a system page-side which also interpreted this input and began reading the content. This created an uncomfortable and overwhelming cacophony of text-to-speech voices that I couldn't stop, and I ultimately had to close the tab to make it cease. Overlays meddling with screen readers is a common occurrence.

Further, overlays are often closed-source and imported from a third-party location. That leaves performance on the table and introduces a dependence on a third party. Widgets often import heavy JavaScript files that slow down the page and many have inbuilt telemetry and tracking. This tracking can introduce complications with the GDPR, CCPA, and similar legislation. Because they're tacked on as additional JavaScript, they also don't have the same power and versatility that native browser and operating system features provide.

Overlays are expensive as well. They're usually offered as subscription, and for the cost some of them charge, it can even be more financially responsible to pay an accessibility professional to audit your site. Not only will they do a better job of finding issues, but they also do a better job of telling you how to actually fix the root cause, which often comes with further benefits from the perspective of general user experience and search engine optimisation (SEO) [^1].

If a user really decides they want an overlay, then they can make that choice themself and install an overlay browser extension.

## Legal Liabilities

The European Accessibility Act (EAA), the Americans with Disabilities Act (ADA), and [other such legislation](https://www.lflegal.com/global-law-and-policy/) have requirements for some baseline levels of web accessibility. Their introductions have sent many businesses and organisations scrambling, and many accessibility providers have latched onto this as an advertising opportunity, greeting them with open arms. I can't say I've ever seen a legitimate, trustworthy business with a litigation support page featured on their homepage.

Many people mistakenly think that accessibility overlays will protect them from law suits. Indeed, such claims are often promoted across overlay's websites (though often with an obscured fine print 'we can't actually guarantee this'). Those that flock to overlays hoping for protection can be in for a surprise. In many cases, the opposite of protection is true, and the presence of an overlay can _attract_ lawsuits. Overlays are easily detectable with automated scripts and usually indicate a site has underlying accessibility issues they're trying to hide with the bodge job of tacking on an overlay.

There are law firms out there that scan the web looking for sites using overlays. Nearly one and a half thousand ADA digital accessibility lawsuits were [made against companies using accessibility widgets throughout 2025](https://info.usablenet.com/hubfs/Remediated%20-%202025_Year-End_Digital_Accessibility_Lawsuit_Report_FINAL.pdf), and that number has steadily been increasing over previous years. Not to mention there has been action taken against the accessibility overlay providers themselves. Most notably, the United States of America's Federal Trade Commission [required accessiBe to pay one million dollars](https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-approves-final-order-requiring-accessibe-pay-1-million) for making misleading claims.

---

I understand that accessibility overlays are often adopted with great intentions, but they also come with great harms. Don't use them. If you're a business owner or developer who has bought into an overlay, you might fall into the sunk cost fallacy and try to justify overlays. It is not the solution to your needs, and it also isn't your fault that you were tricked into thinking it was. You were likely sold a false bill of goods by aggressive marketers.

If you need to convince someone not to use an overlay, web developer Alistair Shepherd has written a fantastic [anti-overlay client letter](https://alistairshepherd.uk/writing/accessibility-overlays-email/). If you're incensed and wishing to dig deeper, Adrian Roselli has [critically covered overlays for _years_](https://adrianroselli.com/tag/overlay).

[^1]: Worth keeping in mind is that web crawlers don't click accessibility overlays. If the semantic structure of your page relies on some overlay hacks, you're harming your rankings.
