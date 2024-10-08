<head>
    <title>Building Sites With iFrames | Vale.Rocks</title>
    <meta property="og:title" content="Building Sites With iFrames"/>
    <meta name="description" content="A look at putting iframes to use for seamlessly displaying content and implementing micro-frontends." />
    <meta property="og:description" content="Putting websites in websites." />
    <meta property="article:published_time" content="2024-10-08" />
    <meta property="article:modified_time" content="2024-10-08" />
    <meta property="article:section" content="Tutorial" />
</head>

<article>
<header>
	 Tutorial
	<h1>
		Building Sites With iFrames
	</h1>
	<ul>
		<li><time datetime="2024-10-08">08 Oct, 2024</time></li>
	    <li>1146 words</li>
		<li>4 minute read</li>
	</ul>
</header>

<div class="readable-width">

When I first entered the bloody fray that is the web development sphere, I did plenty of very dumb stuff thanks to not knowing any better. Before I figured out what a static site generator was or the concept of PHP's `include`, I copied a lot of code between sites. Namely, navs and footers.

Each and every page of my site would have a duplicate copy of my navbar and footer copied into it, meaning that whenever I wanted to do something like add a new item, I had to jump across pages and update each instance individually.

In my endless genius, I decided the solution to my woes was to use [iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe). My initial implementations circa 2018 were rather poor, as you might imagine from an inexperienced, 12 year old, me.

They were incredibly clunky and relied on JavaScript to show and hide them. They also didn't really mesh with the page and were constantly overflowing, causing a lack of cohesion and inconvenient scrollbars.

Both my knowledge and the web have come a long way since those days, and my recent reading up about [micro-frontends](https://martinfowler.com/articles/micro-frontends.html) led me to give iframes another spin.

## Uses

Front-end development isn't the simple craft it was years ago, and it's reached a point where the micro-service architecture that's grown in popularity for backends has become worth considering for frontends. There are plenty of ways to implement them, but iframes are perhaps the easiest.

Each independent part of an application can be split up and reconstituted by embedding them in their own iframes.

## Implementing

Getting started is simple. All you need to do is place `<iframe src="https://example.com"></iframe>` on a page, substituting `example.com` for the URL of your required resource.

That's a start, but it's limited. The iframe won't scale to the size of its content; it looks ugly, and the parent can't communicate with it. Thankfully, we can sort this out.

### Styling

First, let's remove the border put around them by the default user-agent styling on most browsers. Gecko, Blink, and WebKit default to this styling:

```css
iframe {
	border: 2px inset;
}
```

Given our needs, I think it sane to remove that border for better visual cohesion with the rest of the page, like so:

```css
iframe {
	border: none;
}
```

### Sizing

Now we need to sort out some sizing. There are a few ways to go about this. We can use some CSS to set the frame to a fixed size, or we can write some simple JavaScript that handles sizing it for us. Either way you do it, it's worth noting that all iframes have a width of 300 and height of 150.

If we want to do it with CSS, then we can just apply a `width` and `height` like we would to any other element, but we run into an issue fairly quickly. There is no easy way to get the dimensions of a page in an iframe via CSS alone. This makes it a write-off unless we know the exact dimensions of the page or are happy with it being clipped and presented with a scrollbar.

Thankfully, we can use a bit of the ol' JavaScript.

The simplest way is to grab the size of the iframe's contents when it loads, although that won't dynamically handle changes in the size of the iframe's contents.

```html
<iframe src="https://example.com" onload="this.style.height=(this.contentWindow.document.body.scrollHeight)+'px';" width="100%"> </iframe>
```

We can improve this by setting up a script to run in our iframe that tells our parent page when its size changes. Definitely host the pages you're embedding and your parent pages on the same domain to avoid Cross-Origin Resource Sharing (CORS) errors.

First, we'll need to give our iframe an id so we can reference it. We can also remove the onload JavaScript, as we'll be separating that out.

```html
<iframe id="exampleIframe" src="https://example.com"></iframe>
```

On the page we're embedding, we can add this script, which will send a message to the parent window stating its height and width.

```javascript
window.parent.postMessage(
	{
		type: "resize",
		height: document.body.scrollHeight,
		width: document.body.scrollWidth,
	},
	"https://example.com",
);
```

Back on our parent, we can give it a script that listens for a message of the type 'resize', at which point it can update the dimensions of the iframe with the values sent in the message.

```javascript
window.addEventListener("message", function (e) {
	if (e.data.type === "resize") {
		document.getElementById("exampleIframe").style.height = e.data.height + "px";
		document.getElementById("exampleIframe").style.width = e.data.width + "px";
	}
});
```

And voila, we should now have dynamically sized iframes regardless of the child's content.

Alternatively, you can use an existing library like [iframe-resizer](https://iframe-resizer.com) to do it without the hassle of rolling it yourself. Do consider first if you _need_ another dependency in your project, though.

### Communicating With Our iFrame

This is the least fun bit of iframes, trying to communicate with them. It's doable, just a bit finicky -- mainly because of our old friend CORS -- but it shouldn't be too much of a hassle assuming they're on the same domain.

We'll use JavaScript's [`post-message`(https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) API to facilitate sharing information. In fact, we've already used this for sending the page dimensions from our iframe to the parent. The postMessage API allows you to send objects, arrays, etc, but for the scope of this article we'll stick to simple stings.

#### From iFrame to Parent

To send a message from the embedded iframe to the parent document, use this code in the iframe's document:

```javascript
window.parent.postMessage("Hello from iframe!", "https://example.com");
```

To receive and handle messages in the parent document, add this code to the parent document:

```javascript
window.addEventListener("message", function (event) {
	if (event.origin !== "https://example.com") return;
	console.log("Message from iframe:", event.data);
});
```

If you open your browser console, you should see the messages coming through.

## Why?

So, all that is a lot of work, which may make you ask, 'why bother?'. Why not implement micro-frontends another way, such as by using web components, route segmentation, or the like? Well, iframes have one big benefit that is possibly also their biggest weakness. **Every iframe is isolated.** This is good in the sense that iframes won't clash. You'll have no CSS conflicts, no JavaScript variable collisions, and no worries about one component affecting another unintentionally. This is great for:

- Sandboxing third-party content: You can safely embed external widgets or tools without worrying about them interfering with your main page.
- Legacy system integration: When modernising an application piece by piece, iframes can help you gradually replace old components with new ones without a complete overhaul.
- Fault isolation: One iframe failing doesn't kill the entire site or app.

But not so great for:

- SEO: Search engines may have difficulty indexing content within iframes, which could impact search rankings.
- User experience: Navigation can become tricky, as each iframe essentially has its own browsing context.
- Accessibility: Screen readers and other assistive technologies may have difficulty navigating between iframes.
- Performance overhead: While iframes can help with perceived performance, they do introduce some overhead, as each iframe requires its own resources and DOM.

<section class="giscus"></section>

</div>
</article>
