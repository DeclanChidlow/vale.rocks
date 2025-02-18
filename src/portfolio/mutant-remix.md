---
title: Mutant Remix
description: Explore my web development portfolio featuring Mutant Remix, a distinctive emoji pack I designed for the Revolt chat platform. Discover how I transformed concept designs into an interactive website using my static site generator Adduce, implemented dynamic GitHub API integration, and created playful animations that perfectly capture the emoji pack's unique personality.
og_description: A website and branding for an emoji pack so good, you'll never want to use another.
accent_colour: var(--orange)
hoisted: false
---

Mutant Remix is an emoji pack built for the chat platform [Revolt](https://revolt.chat), of which I am a core member. It combines the blobby shapes of Android's emojis of old with the crisp, bold style of Mutant Standard, creating something new, fresh, and distinct.

I was tasked with building a website for the pack. A previous contributor already had a design in mind, which I fleshed out in Figma, cleaned up, and put to code. I used my static site generator, [Adduce](https://adduce.vale.rocks), and constructed a site that introduces people to the project.

The goal was to keep it simple and to build on the style created by the emojis themselves. This meant keeping things flat, keeping the same palette, and keeping the playful tone.

One of my favourite features that captures the playful feeling are the buttons [on the download page](https://mutant.revolt.chat/downloads) (and the ones on the landing). They rise to your cursor when hovered and depress when clicked with a springy motion.

The [releases page](https://mutant.revolt.chat/releases) is implemented dynamically with some client-side JavaScript that hooks into the GitHub API to ensure that the data is always up-to-date and that contributors needn't manually publish updates.

Along with the site, I also updated some of the branding by cleaning things up and creating embed images for the related GitHub repositories.
