---
title: Developer Embeds
description: Rich, deeply customisable embed cards for various developer services, resources and materials. Built with web components, these cards cover npm/npmx, PyPI, and a wide assortment of Git forges for repository embeds. A WordPress plugin is also built for making it easy to use the components in the CMS.
og_description: Rich embed cards for developer materials.
tags: [development, WordPress]
accent_colour: "#51c8fc"
repository: tangled.org/vale.rocks/developer-embeds
---

A high-quality set of rich, customisable **web components** providing cards for various developer related materials, including packages and code repositories for embedding on websites. Perfect for blog posts or documentation with construction that means they'll stay up-to-date as the information they display changes.

The first is [Npmx Embed](https://tangled.org/vale.rocks/npmx-embed), which embeds details about npm packages in an npmx-esque way. Exactly what fields are shown are entirely configurable so it is easy to show exactly what information one desires to convey. All of the components have this capability for optimal presentation and control depending on context.

Here is the web component embedding its own npm package:

<npmx-card package="npmx-embed"></npmx-card>

<script src="https://cdn.jsdelivr.net/npm/npmx-embed/npmx-embed.js"></script>

The second is [PyPI Embed](https://tangled.org/vale.rocks/pypi-embed), which embeds details about packages on the Python Package Index.

Here it is embedding the famous requests HTTP library for Python from PyPI:

<pypi-card package="requests"></pypi-card>

<script src="https://cdn.jsdelivr.net/npm/pypi-embed/pypi-embed.js"></script>

Finally, I created [Repository Embed](https://tangled.org/vale.rocks/repository-embed), which embeds details about repositories on various Git forges, including GitHub, GitLab, Gitea, Forgejo, Codeberg, Bitbucket, Tangled, SourceHut, and Azure DevOps. Given the distinct visual identities of each forge, the cards have custom styling for each.

Here is it embedding the Repository Embed repository on the Git forge Tangled:

<repo-card repo="tangled:vale.rocks/repository-embed"></repo-card>

<script src="https://cdn.jsdelivr.net/npm/repository-embed/repository-embed.js"></script>

This project began as my first proper time developing my own general-use web components from scratch. I'd worked with them before but had never owned the creation from start to finish. The components are all customisable, with a plethora of options specifiable via attributes. You can plop them directly on a page, straight out of the box, and they'll look brilliant -- they even have light and dark mode support. However, if one wants more control, then they can use the variety of CSS custom properties on offer to change border styles, fonts, and palettes to suit their needs. It can be made to perfectly match a site's visual identity.

The web components are open-source under the MIT License and are distributed on npm for use in whatever projects benefit from them. Being web components, they work regardless of stack, and I built them _without dependencies_, so they're lean and performant.

Wanting to ensure their availability and to ensure convenience in using them, I developed first-class WordPress support by authoring [a **WordPress plugin**](https://tangled.org/vale.rocks/developer-embeds/). In the future I intend to port the plugin to other content management systems (CMS) for more universal access. The clean structure of the code makes this easily possible.

<figure class="shorter">
<img src="https://tangled.org/vale.rocks/developer-embeds/raw/main/WordPress/.wordpress-org/screenshot-1.png" alt="The WordPress post editor with three different embeds shown on a page. To the right is a sidebar for managing the Repository Card.">
<figcaption>Cards embedded being previewed in the WordPress post editor.</figcaption>
</figure>
