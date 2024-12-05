---
title: Index
description: The personal website of Declan Chidlow, known mononymously as Vale, containing my thoughts, musings, and otherwise unhinged ramblings.
og_description: The hippest site this side of MySpace.
---

<link rel="stylesheet" href="/assets/styles/pages/index.css">
<div id="puddle-container"></div>

<section class="hero">
	<h1>Vale</h1>
    <p>Developer</p>
    <p>Designer</p>
    <p>Dabbler</p>
</section>

<div class="content">
<section class="about">

## Ahoy!

I'm Declan Chidlow, a passionate front-end developer. I like to believe I've got an eye for aesthetics, and I've most definitely got a love for learning. My ultimate aspiration is to create digital experiences that are both functional and visually appealing.

When I'm not bodging together some script or reinventing the wheel, you might find me cruising around on my unicycle. Alternatively, you may find me writing up some form of article for this very website, doing some gaming, inadvertently converting an otherwise functional piece of tech into a paperweight, or browsing the crevices of cyberspace.

Apart from being a home for my thoughts and musings, this website acts as a gateway to all sorts of horrific abominations I concoct. Some of them won't even cause internal haemorrhaging.

</section>

<a href="/posts" class="cta-link">
    <h2>Read my writings<span aria-hidden="true"> →</span></h2>
</a>

<a href="/portfolio" class="cta-link">
    <h2>Peruse my portfolio<span aria-hidden="true"> →</span></h2>
</a>

<a href="/contact" class="cta-link">
    <h2>Get in contact<span aria-hidden="true"> →</span></h2>
</a>

</div>

<script>
	if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		const script = document.createElement("script");
		script.src = "/assets/scripts/puddle.js";
		script.onload = function () {
			const puddle = new Puddle("#puddle-container");
			puddle.setNodeStyle("ascii");
		};
		document.body.appendChild(script);
	}
</script>
