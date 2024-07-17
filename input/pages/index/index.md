<div id="puddle-container"></div>

<div id="hero">
    <div id="herotext">
        <h1>Vale</h1>
        Developer<br>
        Designer<br>
        Dabbler
    </div>
</div>

<div id="landingbody">

## About

Ahoy! I'm Declan Chidlow, a passionate frontend developer. I like to believe I've got an eye for aesthetics, and I've most definitely got a love for learning. My ultimate aspiration is to create digital experiences that are both functional and visually appealing.

When I'm not bodging together some script or reinventing the wheel, you might find me cruising around on my unicycle. Alternatively, you may find me writing up some form of article for this very website, doing some gaming, inadvertently converting an otherwise functional piece of tech into a paperweight, or browsing the crevices of cyberspace.

Apart from being a home for [my thoughts and musings](/posts), this website acts as a gateway to all sorts of horrific abominations I concoct. Some of them won't even cause internal haemorrhaging.

## Let's Connect

Impressed by my work? Have a project in mind? I'd love to hear about it! Don't hesitate to reach out. Visit my [contact page](/contact) and let's start a conversation.

</div>

<script>
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const script = document.createElement('script');
    script.src = "/scripts/puddle.js";
    script.onload = function() {
        const puddle = new Puddle("#puddle-container");
        puddle.setNodeStyle("ascii");
    };
    document.body.appendChild(script);
}
</script>
