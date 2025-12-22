---
title: "Vale.Rocks"
description: "Personal website of Declan Chidlow, writer and front-end web developer specialising in HTML, CSS, and JavaScript, known mononymously as Vale. Contains thoughts, musings, and otherwise unhinged ramblings. Long-form structured writings, portfolio items, photography, hosted services, links, microblog posts, and much more."
og_description: "The hippest site this side of MySpace."
stylesheet: "pages/index.css"
canonical: ""
---

<div id="puddle-container" aria-hidden="true"></div>

<div class="reasonable-width">
<section class="hero" data-pagefind-filter="Content Type:Page">
    <h1>Vale</h1>
    <p>Developer</p>
    <p>Designer</p>
    <p>Writer</p>
</section>

<div class="content">
<section class="readable">

## Ahoy!

I'm Declan Chidlow; I often go by Vale online, and this site is the gateway to all the horrific abominations I concoct.

I'm both a front-end developer and writer. As a developer I have a skew towards the front-of-the-front-end. My expertise lies in core web technologies – HTML, CSS, and JavaScript – and leveraging them to craft digital experiences that are both functional and visually appealing. As a writer, I span an assortment of topics, though they are oft technical.

When not bodging together scripts (both the kinds you run and the kinds you read), you may find me cruising around on a unicycle, browsing the crevices of cyberspace, or inadvertently converting an otherwise functional piece of technology into a paperweight.

</section>

<section data-pagefind-ignore="all">

## Explore My Site

</div>
</div>

<div id="container" aria-hidden="true">
    <canvas id="canvas"></canvas>
    <div id="info"></div>
    <button id="fullscreen-btn">
        <svg viewBox="0 -960 960 960">
            <title>Open fullscreen</title>
            <path d="M144-144v-192h72v120h120v72zm480 0v-72h120v-120h72v192zM144-624v-192h192v72H216v120zm600 0v-120H624v-72h192v192z"/>
        </svg>
    </button>
    <div id="zoom-controls">
        <button id="zoom-in-btn" title="Zoom In">
            <svg viewBox="0 -960 960 960" >
                <title>Zoom in</title>
                <path d="M765-144 526-384q-30 23-66 36-36 12-76 12-100 0-170-70t-70-170 70-170 170-70 170 70 70 170q0 40-12 76-13 36-35 66l239 239zM384-408q70 0 119-49t49-119-49-119-119-49-119 49-49 119 49 119 119 49m-36-60v-72h-72v-72h72v-72h72v72h72v72h-72v72z"/>
            </svg>
        </button>
        <span id="zoom-level">80%</span>
        <button id="zoom-out-btn">
            <svg viewBox="0 -960 960 960">
                <title>Zoom out</title>
                <path d="M765-144 526-384q-30 23-66 36-36 12-76 12-100 0-170-70t-70-170 70-170 170-70 170 70 70 170q0 40-12 76-13 36-35 66l239 239zM384-408q70 0 119-49t49-119-49-119-119-49-119 49-49 119 49 119 119 49m-96-132v-72h192v72z"/>
            </svg>
        </button>
    </div>
    <button id="recenter-btn">
        <svg viewBox="0 -960 960 960">
            <title>Recenter view</title>
            <path d="M444-72v-150l-33 33-51-51 120-120 120 120-51 51-33-33v150zM240-360l-51-51 33-33H72v-72h150l-33-33 51-51 120 120zm480 0L600-480l120-120 51 51-33 33h150v72H738l33 33zm-240-60q-25 0-42.5-17.5T420-480t17.5-42.5T480-540t42.5 17.5T540-480t-17.5 42.5T480-420m0-180L360-720l51-51 33 33v-150h72v150l33-33 51 51z"/>
        </svg>
    </button>
</div>

<div class="reasonable-width">
<div class="readable right-block">

There is much here to explore and observe, and it is my hope that your curiosities will be catered to. Please mind the rabbit holes.

- [**Posts**](/posts) - polished long-form structured writings
- [**Portfolio**](/portfolio) - showing off
- [**Micros**](/micros) - short-form, often ephemeral, micro-posts
- [**Photography**](/photography) - captures of the world
- [**Videos**](/videos) - pictures in motion
- [**Elsewhere**](/elsewhere) - my external writings, contributions, and appearances
- [**Library**](/library) - record of pretty much all the media I've consumed
- [**Links**](/links) - directory of links

You can also access my stream of consciousness via the <a href="/firehose">firehose</a>, and ways to follow and subscribe to my output are indicated on my <a href="/syndication">syndication page</a>.

If you wish to know more about the specifics of this site, you can read [The Design of This Site](/posts/the-design-of-this-site) and [The Implementation of This Site](/posts/the-implementation-of-this-site).

</div>
</div>

<p class="pleasure">It is my true and great pleasure to have you here<span id="period"></span>.</p>

<svg aria-hidden="true" class="svg-filter">
	<defs>
		<filter id="distort">
			<feTurbulence baseFrequency="0.01 0.03" numOctaves="1" />
			<feDisplacementMap in="SourceGraphic" scale="5" xChannelSelector="R" yChannelSelector="R">
		</filter>
	</defs>
</svg>

</section>
</div>

<script type="module" src="/assets/scripts/puddle.js"></script>
<script type="module" src="/assets/scripts/graph.js"></script>
<script>
    const hour = new Date().getHours();
    const period =
        hour >= 4 && hour < 6
            ? " in these hours of the sun's first blush"
            : hour >= 6 && hour < 12
                ? " this effulgent morn"
                : hour >= 12 && hour < 13
                    ? " this beautiful midday"
                    : hour >= 13 && hour < 17
                        ? " this ambrosial post meridiem"
                        : hour >= 17 && hour < 20
                            ? " on this vespertine eventide"
                            : hour >= 20 && hour < 23
                                ? " this sidereal nocturne"
                                : " at these late hours";
    document.getElementById("period").textContent = period;
</script>
