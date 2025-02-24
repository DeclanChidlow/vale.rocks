---
title: Strong Opinions on URL Design
description: A collection of strong opinions on URL design and structure covering topics including use of capitalisation, use of IDs, spaces, hyphens instead of underscores, trailing slashes, hierarchy, and other gripes and particulars I hold.
og_description: i-have-some-thoughts
pub_time: 2025-02-24
section: Rant
word_count: 1031
---

I came to realise the other day that, for reasons unbeknownst to me, I have very strong opinions on URL structures. Most of my thoughts are related to culling the obsolete and implying away the superfluous. URL structure is as much a part of your website's design as anything else -- treat it with the same care and attention you give your visual design and user experience.

## Keep It Simple

There is no reason for a URL to be stupidly long. Keep things short and memorable. There will be cases where people have to manually write down a URL, and then someone else will have to manually type that URL into their browser. Eliminate _all_ possible points of failure by reducing needless complexity.

## No Capitals

It is hard to remember the exact capitalisation of a URL, I personally think it looks ugly, and people have to copy it out with all the relevant capitalisation which takes extra time -- especially on phones. Also, there is a non-zero chance that some developer has flubbed their URL handling behaviour and that something will go wrong somewhere.

Lowercase domains are required anyway by [RFC 3968](https://www.rfc-editor.org/rfc/rfc3986), so uppercase anything is always going to look out of place next to the domain.

## No IDs

URLs are fantastic in that they're human-readable. That is, unless you've committed the atrocity of using an ID instead of a readable slug. _Why would you do this?_ You might get the slightest benefit from it being a few characters smaller, but it makes it impossible for anyone to glean the content of the page when a link to it is just slapped somewhere online. Especially if embeds aren't available or your Open Graph values are bungled. It also makes it significantly less memorable.

Of course, there are exceptions here for certain cases, such as dashboards with automatically generated content, but they should be obvious exceptions.

## No Spaces

People have used spaces in URLs before. This isn't a terrible idea in and of itself, but it seems that developers really struggle to handle it nicely in implementations. It can also introduce the issue of there being no clear end to the URL, so certain content after a space can be left behind by users when copying or referencing it elsewhere.

Some search engines and other user input cases get away with using spaces by encoding them with the relevant encoding of `%20`, but even they usually give up on this and just use `+` now.

## Hyphens, Not Underscores

Underscores are usually placed less ergonomically on keyboards due to their infrequent use. Hyphens are usually placed far more advantageously. Underscores also have potential for markdown muckery.

Snake case isn't fit for URLs, and both camel case and Pascal case have no place in URLs because you [shouldn't be using capitals](#no-capitals) (also because you're writing a URL, not JavaScript). Kebab case is where it's at.

Further, it is common convention that links are underlined, which often obscures underscores and can cause undue confusion. Hyphens encounter no such issue unless someone hates you and has done a ~~strikethrough~~.

## No WWW

It isn't '95 anymore. It adds unnecessary length (and at the start of the URL as well, which is particularly impactful given that many platforms and search engines truncate links when displaying them). Please get with the times.

## No .HTML

This is a personal thing. I just dislike seeing `.html` stuck on the end of URLs. It adds unnecessary length and feels cheap/messy. If somebody _really_ needs to know if a page is made with HTML, they can probably figure it out themselves. This also goes for `.php`.

## Trailing Slash On An End

I can somewhat understand a trailing slash on a path with content within it. For example, `example.com/posts/` is fine if there is content within `posts/`. The slash makes sense here, as it indicates there is further content within the posts path.

`example.com/posts/post-title/` is a crime against humanity unless there are further items under `post-title`, which we'll say there aren't for this example. It serves no purpose. It doesn't indicate sub-content. It is completely superfluous and misleading.

## Useless Paths

This is my real gripe with URL design. Each layer of a URL should correspond to a path and have worth in and of itself. A URL's structure should work as breadcrumbs, with the user being able to make their way back along the path without error at any stage. *Any section of a URL working backwards should be removable while still presenting relevant information.*

I _hate_ seeing this structure:\
`https://example.com/posts/58473/post-title`

What does the `58473` add to the URL? The user sees _no_ benefit from it. It is presumably a post ID or the likes, but there is [no reason that should be exposed in the URL](#no-ids). It usually isn't implemented as a hierarchical item, so I probably can't go to `example.com/posts/58473` and see anything beyond a 404 page. It is useless and only serves to make the URL longer and more difficult for humans -- especially when truncation hides the actual readable slug (assuming there even is one). It could be designed as `https://example.com/posts/post-title` with no negative impact.

### Date Paths

Depending on context, I usually dislike this structure as well:\
`https://example.com/posts/2025/02/24/post-title`

I can accept it on news sites where there are multiple items releasing daily, and I can go to `example.com/posts/2025/02/24` and see the posts released that day. Unfortunately, this is barely ever done. Just don't use date-based paths unless dates are meaningful navigation elements.

On small blogs or in other contexts where publications are infrequent, this is often even more pointless because if a page at `example.com/posts/2025/02/24` even does exist, chances are it only contains the one post.

Having the date in the URL serves to add unnecessary extra length to the URL containing pointless hierarchy and information that is likely duplicated on the page itself anyway. It is like having a filing cabinet and nesting a single document within three otherwise empty folders. There is no benefit; it just means you've got a more cumbersome file collection and a bloated, confusing file cabinet.

It indicates a fail in information architecture. If your URL doesn't make sense, your information architecture doesn't either.
