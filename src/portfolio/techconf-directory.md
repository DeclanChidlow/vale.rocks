---
title: TechConf.Directory
description: A global technology conferences directory featuring advanced filtering and a custom public API. Built to solve the logistical challenges of event discovery, prioritising data accessibility and a high-performance static architecture.
og_description: Technology conference listing site.
accent_colour: "#b88b41"
repository: DeclanChidlow/techconf.directory
tags: [design, development, front-end development]
hoisted: false
---

Frustrated by the difficulty of discovering conferences and finding information about them in a central location, I created [TechConf.Directory](https://techconf.directory), a site listing technology conferences across the globe.

After [failing to find existing listing sites matching my needs](/micros/20260115-0520), I set about creating my own. I created the first version of the site over the course of a manic 12-hour development sprint after gauging community interest.

<figure class="right">
<img src="https://techconf.directory/assets/og-image.webp" alt="The title 'TechConf.Directory' and the tagline 'Find your next tech conference' on a speckled card with gradients.">
<figcaption>The website's embed image.</figcaption>
</figure>

Living at time of initial development in what has been dubbed the most isolated city in the world, Perth, Western Australia, local opportunities for conferences without significant travel are limited. I designed TechConf.Directory to address the difficulty of not only finding conferences but also the challenges of planning trips to attend multiple conferences consecutively.

The project quickly gained traction, with conference organisers and community members providing positive feedback, sharing the directory on social media, and submitting events via the defined GitHub issue templates. What began as a small selection has quickly grown to encompass hundreds of conferences.

I designed it with a minimal visual style, taking inspiration from Gothic design by making use of High and Late Middle Ages inspired textura blackletter type to form a distinctive identity. The light and dark mode adaptive palette was purposely kept simple, with the employment of rubrication for emphasis.

<!-- The site not only lists conferences but also meetups and speakers in the hope that it assists folks in being discovered and booked to talk at events. -->

## Technical Details

The directory is completely statically generated using [Web Origami](https://weborigami.org) and deployed dynamically via a **continuous deployment (CD)** pipeline. Every update to the **Git** version-controlled [repository on GitHub](https://github.com/DeclanChidlow/techconf.directory) is deployed to the edge via a **Cloudflare Worker**. This is complemented by automatically triggered deployments at specified intervals.

All of the data is stored in **YAML** files, which are then transformed and manipulated to populate the site. This makes the site extremely fast, easily machine parseable, **SEO-optimised**, and accessible in a static state without JavaScript. It achieves Lighthouse scores of 100 across the board.

To facilitate the filtering functionality, I created a complete **API** providing the data. Though very much a front-of-the-front-end developer, I pushed beyond my comfort zone into designing and developing the robust API to support my requirements. Beyond supporting the filtering functionality, the API makes the site's data open and available for all to use by being public and provided without authentication. I further supported third-party use cases by writing [full documentation](https://techconf.directory/docs).
