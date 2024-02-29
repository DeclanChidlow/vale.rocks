<head>
    <title>Vale.Rocks</title>
    <meta property="og:title" content="Vale.Rocks"/>
    <meta name="description" content="The internet website of Declan Chidlow, known online as Vale. Within this digital domain, I document my thoughts, musings, and otherwise unhinged ramblings. I hope you stick around and find at least something intriguing here. I've put a lot of time into it. " />
    <meta property="og:description" content="The hippest site this side of MySpace." />
</head>

<style>
#heroouter, #landingbody {
	margin-left: -7rem;
    position: relative;
    z-index: 1;
}

#heroouter {
    pointer-events: none;
}

#hero {
	height: 85dvh;
	font-size: 2.5rem;
	line-height: 2.5rem;
    display: flex;
    align-items: center;
}

#herotext {
	display: block;
}

#herotext h1 {
	font-size: 6rem;
	line-height: 6rem;
}

#puddle-container {
    color: var(--bright_grey);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    pointer-events: auto;
    cursor: default;
	user-select: none;
}

#puddle-container::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(transparent, var(--black));
    pointer-events: none;
}

@media (max-width: 700px) {
    #heroouter, #landingbody {
	    margin: 0;
    }
}
</style>

<div id="puddle-container"></div>

<div id="heroouter">
<div id="hero">
    <div id="herotext">
        <h1>Vale</h1>
        Developer<br>
        Designer<br>
        Dabbler
    </div>
</div>
</div>

<div id="landingbody">

## About

Ahoy! I'm Declan Chidlow, a passionate student of frontend software development and graphic design. I like to think I've got an eye for aesthetics, and I've most definitely got a love for learning. My goal is to create digital experiences that are both functional and visually appealing.

When I'm not bodging together some script or reinventing the wheel, you might find me cruising around on my unicycle. Alternatively, you may find me writing up some form of article for this very website, doing some gaming, inadvertently converting an otherwise functional piece of tech into a paperweight, or browsing the crevaces of cyberspace. Within this digital domain, I document my thoughts, musings, and otherwise unhinged ramblings. I hope you stick around and find at least _something_ intriguing here. I've put a lot of time into it.

## Let's Connect

Impressed by my work? Have a project in mind? I'd love to hear about it! Don't hesitate to reach out. Visit my [contact page](/contact) and let's start a conversation.

</div>

<script>
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var script = document.createElement('script');
    script.src = "/assets/puddle.js";
    script.onload = function() {
      var puddle = new Puddle("#puddle-container");
      puddle.setNodeStyle("ascii");
    };
    document.body.appendChild(script);
  }
</script>
