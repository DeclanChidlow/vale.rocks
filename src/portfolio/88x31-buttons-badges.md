---
title: 88x31 Buttons/Badges
description: Exploring modern interpretations of classic 88×31 web badges and buttons within the restraints of the mediums. An assortment of relevant modern buttons designed with contemporary values, an appreciation for the old web, and current brand resources.
og_description: Fun buttons/badges for adorning websites.
accent_colour: "#cccecb"
repository: DeclanChidlow/88x31-Buttons-Badges
tags: [design, IndieWeb/SmallWeb]
---

Emerging in the mid-90s, badges/buttons with a resolution of 88 pixels by 31 pixels spread through the web like wildfire before eventually waning in popularity in the 2000s.

A sure remnant of the olden days of the web, today they have a retro chic. They're a fun, lo-fi visual adornment, so I took it upon myself to design some modern buttons/badges adhering to the limitations of the time. I'm always looking to improve and refine my skills, and a restraint such as a canvas of a mere 2728 pixels proved a great opportunity.

Here is a badge I created to represent this site:

<img src="/assets/buttons/valerocks_button.avif" alt="'Vale.Rocks' badge.">

I've taken the creation of these badges as an opportunity to experiment and thus covered a range of topics and material. It proves difficult to represent a complex or meaningful idea in such a small amount of space.

## Ideology

A core part of any personal website, which is where such badges are most likely to be seen, is to represent one's own thoughts and ideology.

<div class="buttons-badges">
<img src="/assets/buttons/anti-fascism_button.avif" alt="'No Fascism / No Bigotry' badge with crossed-out swastika.">
<img src="/assets/buttons/link-freely_button.avif" alt="'Link Freely' badge with chain links.">
</div>

## Tech

Another common use for badges and buttons is to show off technologies in use. Sharing openly how things are built and what technologies are used led to a strong natural discovery and a natural onboarding for people building their own websites.

<div class="buttons-badges">
<img src="/assets/buttons/web-origami_button.avif" alt="'Built with Origami' badge.">
<img src="/assets/buttons/html5_button.avif" alt="'Hypertext Markup Language' badge.">
<img src="https://github.com/DeclanChidlow/88x31-Buttons-Badges/raw/refs/heads/main/tech/html_button.avif" alt="'&#60;HTML/&#62;' badge.">
<img src="/assets/buttons/made-with-css_button.avif" alt="'Made with Cascading Stylesheets' badge.">
<img src="https://github.com/DeclanChidlow/88x31-Buttons-Badges/raw/refs/heads/main/tech/css_button.avif" alt="'.CSS {}' badge.">
<img src="https://github.com/DeclanChidlow/88x31-Buttons-Badges/raw/refs/heads/main/tech/css-passion_button.avif" alt="'CSS is my passion' badge with text overflowing the badge.">
<img src="https://github.com/DeclanChidlow/88x31-Buttons-Badges/raw/refs/heads/main/tech/tailwind_button.avif" alt="'Tailwind' badge.">
<img src="https://github.com/DeclanChidlow/88x31-Buttons-Badges/raw/refs/heads/main/tech/bootstrap_button.avif" alt="'Bootstrap' badge.">
<img src="https://github.com/DeclanChidlow/88x31-Buttons-Badges/raw/refs/heads/main/tech/css-greater-js_button.avif" alt="'CSS &#62; JS' badge.">
<img src="/assets/buttons/ecmascript_button.avif" alt="'Contains ECMAScript' badge with exclamation points.">
<img src="https://github.com/DeclanChidlow/88x31-Buttons-Badges/raw/refs/heads/main/tech/js_button.avif" alt="'JS()' badge.">
<img src="/assets/buttons/progressively-enhanced_button.avif" alt="Rainbow 'Progressively Enhanced' badge.">
</div>

## Platforms

Online platforms have become a large part of people's lives, even if they may conflict somewhat with many of the ideals of the sort of person that uses 88x31 buttons/badges. As part of making the web as a whole an interlinked place, I made a range of badges for popular platforms.

<div class="buttons-badges">
<img src="https://github.com/DeclanChidlow/88x31-Buttons-Badges/raw/refs/heads/main/platforms/bluesky_button.avif" alt="'Bluesky' badge.">
<img src="https://github.com/DeclanChidlow/88x31-Buttons-Badges/raw/refs/heads/main/platforms/codeberg_button.avif" alt="'Codeberg' badge.">
<img src="https://github.com/DeclanChidlow/88x31-Buttons-Badges/raw/refs/heads/main/platforms/gitlab_button.avif" alt="'GitLab' badge.">
</div>

---

If you're looking to commission an affordable custom badge like the ones above for your site, brand, or project, [get in contact](/contact).

<style>
article {
    .buttons-badges {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;

        @media (max-width: 45rem) {
            justify-content: center;
        }
    }

	img {
		display: inline;
		image-rendering: pixelated;
        width: 132px;

		&:hover {
			scale: 2;

            @media (prefers-color-scheme: dark) {
                filter: drop-shadow(0 0 1rem black);
            }
		}
	}
}
</style>
