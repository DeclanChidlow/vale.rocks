---
title: Syndication
description: An index of all Declan Chidlow's syndication feeds in various formats, including RSS, JSON Feed, and Atom, that users can subscribe to for easy subscription and updates. Also includes social media profiles for those inclined.
og_description: Index of feeds for following my output.
canonical: /syndication
---

<h1 class="section" data-pagefind-filter="Content Type:Page">Syndication</h1>

<div class="readable">

This website is home to a lot of stuff, and I also publish elsewhere on the web. This page shows ways to follow and stay up to date on the ongoings of this site and my other endeavours. If you'd just like to view everything all in one place, then check out [the firehose](/firehose).

Feeds originating from this site are available in both RSS and JSON Feed formats, but availability may vary with external feeds.

<details>
<summary>What are syndication feeds and how do I use them?</summary>

Instead of manually visiting sites to check if they've published new content, syndication feeds allow you to subscribe and get updates from sites in a so-called feed reader (also called an RSS reader or aggregator). Your feed reader checks the syndication feeds you've subscribed to for any changes and then shows all the new content for your perusal.

You end up with what is in essence a curated newspaper based on exactly what you want to read. It is similar to subscribing to newsletters, but with far less cruft clogging up your email inbox.

To use a feed, you'll first need to get a feed reader. There are plenty of free options available, with [FeedFlow](https://www.feedflow.dev) and [Croissant](https://croissantrss.com) being my favourites. Lots of email clients like [Thunderbird](https://blog.thunderbird.net/2022/05/thunderbird-rss-feeds-guide-favorite-content-to-the-inbox/) and [Outlook](https://support.microsoft.com/en-au/office/subscribe-to-an-rss-feed-73c6e717-7815-4594-98e5-81fa369e951c) also have support for subscribing to feeds.

In your selected feed reader there will be a way to input the URL of a feed. Some sites even have auto-detection, so you can just paste in the normal link and the feed will be found. For others, you'll need to track down a direct link to the feed. They're often represented with a white wireless icon on an orange background.

Syndication feeds come in a few different formats. The three most widely used are RSS (Really Simple Syndication), Atom, and JSON. They're slightly different on a technical level but largely identical in usage. They're all just big text files that list content and some information about them. You only need to provide one format if there are multiple provided. For instance, you don't need to provide a JSON Feed and an RSS feed, just one of them.

Below is an example of what a raw RSS feed with one item looks like, though you'd never need to interact with one of these directly. You'd just copy the link into your chosen feed reader.

```xml
<rss version="2.0">
    <channel>
        <title>Vale.Rocks Posts</title>
        <description>Long form writings about assorted topics.</description>
        <link>https://vale.rocks/posts</link>
        <atom:link href="https://vale.rocks/posts/feed.xml" rel="self" type="application/rss+xml"/>
        <item>
            <pubDate>Mon, 25 Nov 2024 00:00:00 GMT</pubDate>
            <title>Lorem Ipsum</title>
            <link>https://vale.rocks/posts/lorem-ipsum</link>
            <guid>https://vale.rocks/posts/lorem-ipsum</guid>
            <description>A page for testing and trialing formatting, features, and typography by seeing how they interact in complex arrangements to catch edge cases at scale.</description>
            <content:encoded>...</content:encoded>
        </item>
    </channel>
</rss>
```

Then, depending on how your feed reader is configured, it'll fetch each feed automatically or on demand and list all the new content. There are no algorithms dictating what you see, and you're served everything you've subscribed to.

Lots and lots of sites have syndication feeds, even if they don't always make it obvious. They're widely used by everyone from [NASA](https://www.nasa.gov/feed/), to [Apple](https://www.apple.com/newsroom/rss-feed.rss), to small sites like this one, as is evidenced below.

</details>

## Articles

I [write long-form on this site](/posts), which you can subscribe to via:

- RSS: <https://vale.rocks/posts/feed.xml>
- JSON Feed: <https://vale.rocks/posts/feed.json>

## Microblogging

I also publish [short snippets and notes](/micros).

I store a microblog feed on my site, which mostly serves as a loosely curated mirror of my Fediverse, Bluesky, and LinkedIn posts that can be accessed at:

- RSS: <https://vale.rocks/micros/feed.xml>
- JSON Feed: <https://vale.rocks/micros/feed.json>

### Fediverse

You can find me on the Fediverse at [@vale@fedi.vale.rocks](https://fedi.vale.rocks/vale). Follow me directly or via the feed:

- Atom: <https://fedi.vale.rocks/users/vale/feed.atom>

### Bluesky

I also have a profile on Bluesky at [@vale.rocks](https://bsky.app/profile/vale.rocks). Follow me there or subscribe via its RSS feed:

- RSS: <https://bsky.app/profile/did:plc:7qg6mz2xtzozxkgbcvf4pdnu/rss>

## Photography

I [take photos](/photography) sometimes. If you'd like to know when I release new ones, you can subscribe through:

- RSS: <https://vale.rocks/photography/feed.xml>
- JSON Feed: <https://vale.rocks/photography/feed.json>

## Videos

Occasionally I [publish videos](/videos), which you can stay up to date with via these feeds:

- RSS: <https://vale.rocks/videos/feed.xml>
- JSON Feed: <https://vale.rocks/videos/feed.json>

### YouTube

You can find me on YouTube as [@outervale](https://www.youtube.com/@outervale). Subscribe to me there or subscribe to one of the feeds:

- All Content RSS: <https://www.youtube.com/feeds/videos.xml?channel_id=UC8hQBcgwkZiG-cqhE1TDvzA>
<!-- - Full Videos Only RSS: <https://www.youtube.com/feeds/videos.xml?playlist_id=UULF8hQBcgwkZiG-cqhE1TDvzA> -->
- Shorts Only RSS: <https://www.youtube.com/feeds/videos.xml?playlist_id=UUSH8hQBcgwkZiG-cqhE1TDvzA>

## Elsewhere

Sometimes I work on, contribute to, or am otherwise directly involved with publications [external to this website](/elsewhere). You can follow this content via:

- RSS: <https://vale.rocks/elsewhere/feed.xml>
- JSON Feed: <https://vale.rocks/elsewhere/feed.json>

</div>
