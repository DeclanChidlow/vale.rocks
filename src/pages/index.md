---
title: "Vale.Rocks"
description: "Personal website of Declan Chidlow, writer and front-end web developer specialising in HTML, CSS, and JavaScript, known mononymously as Vale. Contains thoughts, musings, and otherwise unhinged ramblings. Long-form structured writings, portfolio items, photography, hosted services, links, microblog posts, and much more."
og_description: "The hippest site this side of MySpace."
stylesheet: "pages/index.css"
canonical: ""
---

<div id="puddle-container" aria-hidden="true"></div>

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

I'm both a front-end developer and writer. As a developer I have a skew towards the front of the front-end. My expertise lies in core web technologies – HTML, CSS, and JavaScript – and leveraging them to craft digital experiences that are both functional and visually appealing. As a writer, I span an assortment of topics, though they are oft technical.

When not bodging together scripts (both the kind you run and the kind you read), you may find me cruising around on unicycle, browsing the crevices of cyberspace, or inadvertently converting an otherwise functional piece of tech into a paperweight.

</section>

<section data-pagefind-ignore="all" class="readable">

## Explore My Site

<div id="container" aria-hidden="true">
    <canvas id="canvas"></canvas>
    <div id="info"></div>
    <button id="fullscreen-btn">
        <svg viewBox="0 -960 960 960">
            <title>Open fullscreen</title>
            <path d="M144-144v-192h72v120h120v72H144Zm480 0v-72h120v-120h72v192H624ZM144-624v-192h192v72H216v120h-72Zm600 0v-120H624v-72h192v192h-72Z"/>
        </svg>
    </button>
    <div id="zoom-controls">
        <button id="zoom-in-btn" title="Zoom In">
            <svg viewBox="0 -960 960 960" >
                <title>Zoom in</title>
                <path d="M765-144 526-384q-30 23-65.79 35.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm-36-60v-72h-72v-72h72v-72h72v72h72v72h-72v72h-72Z"/>
            </svg>
        </button>
        <span id="zoom-level">80%</span>
        <button id="zoom-out-btn">
            <svg viewBox="0 -960 960 960">
                <title>Zoom out</title>
                <path d="M765-144 526-384q-30 23-65.79 35.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm-96-132v-72h192v72H288Z"/>
            </svg>
        </button>
    </div>
    <button id="recenter-btn">
        <svg viewBox="0 -960 960 960">
            <title>Recenter view</title>
            <path d="M444-72v-150l-33 33-51-51 120-120 120 120-51 51-33-33v150h-72ZM240-360l-51-51 33-33H72v-72h150l-33-33 51-51 120 120-120 120Zm480 0L600-480l120-120 51 51-33 33h150v72H738l33 33-51 51Zm-240-60q-25 0-42.5-17.5T420-480q0-25 17.5-42.5T480-540q25 0 42.5 17.5T540-480q0 25-17.5 42.5T480-420Zm0-180L360-720l51-51 33 33v-150h72v150l33-33 51 51-120 120Z" />
        </svg>
    </button>
</div>

This site has a _lot_ of stuff on it. Notably, [polished long-form structured writings](/posts), [my portfolio](/portfolio), [a range of photography](/photography), [videos](/videos), [short-form, often ephemeral, micro-posts](/micros), [a list of my external writings, contributions, and appearances](/elsewhere), and a [huge collection of links](/links).

You can also access my stream of consciousness via the <a href="/firehose">firehose</a>, and ways to follow and subscribe to my output are indicated on my <a href="/syndication">syndication page</a>.

If you wish to know more about the specifics of this site, you can read [The Design of This Site](/posts/the-design-of-this-site) and [The Implementation of This Site](/posts/the-implementation-of-this-site).

</section>

<section data-pagefind-ignore="all" class="readable">

## Supporting Me

If you enjoy or otherwise benefit from the content on this site and/or any of the other things I've made, including my open-source work, I'd appreciate if you considered [supporting me financially](/support).

</section>
</div>

<script type="module" src="/assets/scripts/puddle.js"></script>
<script type="module" src="/assets/scripts/graph.js"></script>
