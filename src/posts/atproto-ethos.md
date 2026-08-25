---
title: The AT Protocol Harkens An Old Web Ethos
description: Love for the beauty of the AT Protocol and the older web principles it revitalises with open, public data. The opportunity for integrations and automations as seen of the web from roughly the mid-2000s through to the mid-2010s.
og_description: Out with the new and in with the old.
pub_time: 2026-08-25
section: Essay
tags: ["IndieWeb/SmallWeb", atproto]
standardsite_rkey: 3mtv7sztplj2p
---

Web3, the 'era' of the web supposedly ushering in blockchain technologies and other such fluff, has undoubtedly been a bust. Perhaps not for the bank accounts of manipulators, but a bust in general. Blockchain has very few legitimate applications, <abbr title="Non-Fungible Token">NFT</abbr>s went down like the Hindenburg, and cryptocurrencies have remained a niche with strong ties to crime and corruption.

The hype-driven sham of Web3 followed Web 2.0, which did have substance. With adjacent names such as the 'participative web' or the 'social web', it really gained popularity as a concept in the mid-2000s alongside the establishment of proper social applications like Flickr, Facebook, Last.fm, Twitter, del.icio.us, MySpace, and Foursquare. Part of the beauty of these applications was their rather open <abbr title="Application Programming Interface">API</abbr>s. They made the web feel so alive. Fetching activity from social media and displaying it on articles, people showing their location check-ins on their sites, social bookmarking, the proliferation of RSS feeds, more interactive capabilities, content discovery via tagging, and so on and so forth all became core parts of what made the web the web.

People feeding data through [Yahoo! Pipes](https://en.wikipedia.org/wiki/Yahoo_Pipes) to create automations and mashups of data, [Protopipe](https://www.protopage.com) to create rich custom web dashboards, content aggregators like StumbleUpon, Digg, and Reddit linking out to web curios, and people just hacking together with the data exposed and at their disposal directly. The web felt alive with data flowing freely and platforms largely ungated.

Then, slowly but surely, everything started to close and tighten. Websites became platforms and began to optimise obsessively for keeping people engaged. External integrations or outgoing links became hazards, threatening to reduce time-on-page. Access to data through any means other than the platform's desired gateways became a threat. The APIs became more restricted, then got dropped altogether. Integrations switched off, and the hedges surrounding the gardens grew thicker and taller.

However, there remains hope for this era and ethos of the web, and the AT Protocol is what is bringing it back into vogue.

## The AT Protocol

The 'Authenticated Transfer Protocol', or AT Proto for short, is a very simple system at its core. A user signs up on a Personal Data Server (PDS) on which they're given a data repository. This data repository can hold data in the form of records, which are housed within collections. Each user can be identified via a Decentralised Identifier (DID). The records that are held can take the form of JSON or blobs, for content such as images or video.

<figure>
<svg viewBox="0 0 800 500" role="img">
    <desc>A diagram showing records nested in collections nested in a data repository nested in a Personal Data Server.</desc> 
    <defs>
        <rect id="pds" width="760" height="460" fill="light-dark(var(--white), var(--grey))" stroke="var(--bright_blue)" stroke-width="2" />
        <rect id="repo" width="340" height="390" fill="oklch(from var(--blue) l c h / calc(alpha - 0.9))" stroke="var(--blue)" stroke-width="2" />
        <rect id="collection" width="310" height="145" fill="oklch(from var(--green) l c h / calc(alpha - 0.85))" stroke="var(--green)"
            stroke-width="2" />
        <rect id="record" width="290" height="30" fill="light-dark(var(--bright_white), var(--dark_grey))" stroke="var(--yellow)" stroke-width="2" />
    </defs>
    <!-- Outer Container -->
    <use href="#pds" x="20" y="20" />
    <!-- User 1 Repository -->
    <use href="#repo" x="40" y="70" />
    <use href="#collection" x="55" y="135" />
    <use href="#record" x="65" y="195" />
    <use href="#record" x="65" y="235" />
    <use href="#collection" x="55" y="295" />
    <use href="#record" x="65" y="355" />
    <use href="#record" x="65" y="395" />
    <!-- User 2 Repository -->
    <use href="#repo" x="420" y="70" />
    <use href="#collection" x="435" y="135" />
    <use href="#record" x="445" y="195" />
    <use href="#record" x="445" y="235" />
    <use href="#collection" x="435" y="295" />
    <use href="#record" x="445" y="355" />
    <use href="#record" x="445" y="395" />
    <!-- Titles Group -->
    <g font-weight="600">
        <text x="40" y="50">Personal Data Server</text>
        <text x="55" y="100">Data Repository</text>
        <text x="65" y="160">Collection</text>
        <text x="65" y="320">Collection</text>
        <text x="435" y="100">Data Repository</text>
        <text x="445" y="160">Collection</text>
        <text x="445" y="320">Collection</text>
    </g>
    <!-- Subtitles & Records Group -->
    <g font-family="monospace" font-size="0.8rem">
        <text x="55" y="120">@vale.rocks (did:plc:7qg...)</text>
        <text x="65" y="180">app.bsky.feed.post</text>
        <text x="75" y="215">Record: &quot;The AT Protocol Harkens...&quot;</text>
        <text x="75" y="255">Record: &quot;Atmosphere apps are...&quot;</text>
        <text x="65" y="340">site.standard.document</text>
        <text x="75" y="375">Record:&apos;Web Platform Wishlist&apos;</text>
        <text x="75" y="415">Record:&apos;Overview of Digital...&apos;</text>
        <text x="435" y="120">@jaydip.me (did:plc:dl6...)</text>
        <text x="445" y="180">app.bsky.feed.post</text>
        <text x="455" y="215">Record: &quot;wanna see forums but...&quot;</text>
        <text x="455" y="255">Record: &quot;no adobe tools were used&quot;</text>
        <text x="445" y="340">app.bsky.graph.follow</text>
        <text x="455" y="375">Record: Follow @vale.rocks</text>
        <text x="455" y="415">Record: Follow @goose.art</text>
    </g>
</svg>
<figcaption>A simple diagram of how records, collections, data repositories, and Personal Data Servers fit together.</figcaption>
</figure>

JSON records conform to lexicons, which are schemas that keep data consistently structured and formatted. In addition to the unique DID each user has, they also have a handle, which is defined via a <abbr title="Domain Name System">DNS</abbr> record. My handle is `@vale.rocks`. I've deliberately kept this explanation simple (though not inaccurate) for the sake of brevity, so you should read Dan Abramov's [Open Social](https://overreacted.io/open-social/) if you're interested in further detail.

As an example, here is the record for my Bluesky profile, which is stored under the collection `app.bsky.actor.profile`:

```JSON
{
  "uri": "at://did:plc:7qg6mz2xtzozxkgbcvf4pdnu/app.bsky.actor.profile/self",
  "cid": "bafyreiavinef6pltfb4bxml7mbbq3gf53buben4fwxgaa7af2nxefa7zqa",
  "value": {
    "$type": "app.bsky.actor.profile",
    "avatar": {
      "ref": {
        "$link": "bafkreiav5vj6xi33c7pcr2wtl3bqxsynlgd7rwdpvetnik75nte4ms5xzy"
      },
      "size": 812706,
      "$type": "blob",
      "mimeType": "image/png"
    },
    "banner": {
      "ref": {
        "$link": "bafkreicca3ksn3adp6ixeorlppum5rccani2qjuchs24yq5uilx3z67eyq"
      },
      "size": 941911,
      "$type": "blob",
      "mimeType": "image/jpeg"
    },
    "description": "Front-end developer, designer, writer, and avid user of the superpowered information superhighway.\n\n✧ https://vale.rocks\n✧ https://fedi.vale.rocks/vale",
    "displayName": "Vale"
  }
}
```

This record isn't hidden away anywhere. It is public. It exists on the AT Protocol at `at://did:plc:7qg6mz2xtzozxkgbcvf4pdnu/app.bsky.actor.profile/self`. Bluesky pulls from this record if you [view my profile](https://bsky.app/profile/vale.rocks), and you can view the record for yourself via online AT Proto viewers such as [Taproot](https://atproto.at/uri/at://did:plc:7qg6mz2xtzozxkgbcvf4pdnu/app.bsky.actor.profile/self) or [PDSls](https://pdsls.dev/at://did:plc:7qg6mz2xtzozxkgbcvf4pdnu/app.bsky.actor.profile/self).

This is the beauty of the AT Protocol: your data is under your control. It exists in your data repository on the PDS you select, and unless the data is explicitly made private, it is public. Even data held within 'Atproto Spaces', which is the system for private data, is still stored in repositories on your PDS and remains completely under your control. At any time you can manage records yourself or move to another PDS without everything breaking.

The most popular and well-known AT Protocol application is Bluesky. The AT Protocol stems from Bluesky, which was formed as a research group within Twitter as part of research into decentralising Twitter. However, Elon Musk's acquisition of Twitter and rebranding of it into 'X' saw Bluesky sever ties with Twitter and entirely become its own thing. While I think that Bluesky is flawed, like Twitter before it, the AT Protocol is solid.[^1]

## An Open Atmosphere

I spoke to the open nature of Web 2.0. Of such a variety of open systems which people used to the greatest extents they could. Of people creating a social internet with integrations and dynamic data which could be wielded and transformed to create a living ecosystem across the web.

The Atmosphere, which is the name given to the ecosystem surrounding the AT Protocol, makes this aged reality a present one once again. _Your_ data is openly accessible to _you_. I can access the records for my posts on Bluesky, for my [code on Tangled](https://tangled.org/vale.rocks), for my [reviews on at-store](https://atstore.fyi/profile/vale.rocks), for my [identity verification on Keytrace](https://keytrace.dev/@vale.rocks), for my [professional identity on Sifa](https://sifa.id/p/vale.rocks), for the [npm packages I've liked on npmx](https://npmx.dev/profile/vale.rocks), or anything else I've done across the protocol. In fact, I do access these records regularly. I've got all sorts of automations that tie into Atmosphere, including [integrations here on Vale.Rocks](/posts/the-implementation-of-this-site#at-protocol-integration).

When a new app launches and I log in with my account on the Atmosphere, I'm greeted not by a blank slate but by an interface pre-populated by all my existing records. I don't manage separate account details on every single Atmosphere using service. I update it once, and everything reads that changed record, though in most cases I'm given the affordance to change it on a per-service basis if I so choose.

On people's personal websites I can leave comments using my account on the AT Protocol, and increasingly I've seen people fetching data from their records across the Atmosphere. People publishing articles with [Standard.site](https://standard.site) records on platforms such as [Leaflet](https://leaflet.pub), [pckt](https://pckt.blog), and [offprint](https://offprint.app) and then displaying them on their own site, or showing the bookmarks they've saved with one of many bookmarking solutions, or just creating their own site entirely with something like [Blento](https://blento.app). It is all of the creativity and dynamic integrations of liberal Web 2.0 APIs, but with more data, presented in a way that is standardised and easy to access while being under the complete control of the user without some company able to lock it away.

The AT Protocol puts your data in your hands while making it open and accessible and easy to integrate and manipulate. I can't help but feel that it captures what the World Wide Web once was. In a climate where the web is only becoming more and more locked down in favour of protecting corporate interests and preventing scraping for artificial intelligence, it feels blissful to see a return to owning data and brandishing it without restraint.

[^1]: I'm not sure microblogging can be done 'right' in a social sense. The format itself promotes short, rash responses prone to degradation of context, [which I've bemoaned before](/micros/20260819-0423). However, Bluesky's moderation is also a bit shaky, as is [how they handle public relations](https://techcrunch.com/2025/10/05/waffles-eat-bluesky/). Thankfully the AT Protocol doesn't depend on them. They have the biggest PDS, and the [Public Ledger of Credentials is centralised](https://atproto.com/blog/plc-directory-org). However they're working to change this, and `did:web` doesn't rely upon Bluesky.
