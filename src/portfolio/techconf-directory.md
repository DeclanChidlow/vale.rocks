---
title: TechConf.Directory
description: A global technology conferences directory featuring advanced filtering and a custom public API. Built to solve logistical challenges of event discovery, prioritising data accessibility and high-performance static architecture.
og_description: Technology conference listing site.
accent_colour: "#b88b41"
repository: DeclanChidlow/techconf.directory
tags: [design, development, front-end development]
hoisted: true
---

Frustrated by the difficulty of discovering conferences and finding information about them in a central location, I created [TechConf.Directory](https://techconf.directory), a site listing technology conferences across the globe.

After [failing to find existing listing sites matching my needs](/micros/20260115-0520), I set about creating my own. I created the first version of the site over the course of a manic 12-hour development blitzkrieg after gauging community interest.

<figure class="right">
<img src="https://techconf.directory/assets/og-image.webp" alt="The title 'TechConf.Directory' and the tagline 'Find your next tech conference' on a speckled card with gradients.">
<figcaption>The website's embed image.</figcaption>
</figure>

Living at time of initial development in what has been dubbed the most isolated city in the world, Perth, Western Australia, there are limited local opportunities for conferences without significant travel.

I designed TechConf.Directory to address the difficulty of not only finding conferences but also planning trips to attend multiple conferences consecutively.

The site not only lists conferences but also speakers in the hope that it assists folks in being discovered and booked to talk at events.

## The Technical Details

The directory is completely statically generated using [Web Origami](https://weborigami.org). All of the data is stored in **YAML** files, which are then transformed and manipulated to populate the site. This makes it extremely fast, easily machine parseable, **SEO-optimised**, and accessible in a static state without JavaScript.

To facilitate the filtering functionality, I created a complete **API** providing the data. Though very much a front-of-the-front-end developer, I pushed beyond my comfort zone into designing and developing the robust, public-facing API to support my requirements.

The API also serves the secondary purpose of making the data open and available for all to use. For this purpose, I [fully documented it](https://techconf.directory/docs) to allow others to utilise it as they wish.

The site is deployed dynamically via a **continuous deployment (CD)** pipeline. Every update to the **Git** version-controlled [repository on GitHub](https://github.com/DeclanChidlow/techconf.directory) is deployed to the edge via a **Cloudflare Worker**. Automatic deployments at specified intervals also occur.

By making it open and accessible, data can be crowdsourced and provided by the community. Conference organisers and attendees alike have used the submission templates on GitHub to submit items for inclusion.
