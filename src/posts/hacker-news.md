---
title: A Great Deal of Information About Hacker News
description: Everything I personally know about the forum and news aggregator Hacker News spanning the site's history, the people behind it, the software that runs it, the site's culture, and its features. Generally undocumented or underdocumented details and features are also included.
og_description: Beyond the front page of the orange site.
pub_time: 2026-07-24
section: Essay
standardsite_rkey: 3mre2a6afio2i
---

[Hacker News](https://news.ycombinator.com) is a popular news aggregator and web forum created and run by United States-based venture capital firm Y Combinator. The site [officially launched on the 20<sup>th</sup> of February 2007](https://news.ycombinator.com/announcingnews.html) as 'Startup News'. The idea of the site was for potential founders to establish themselves and become known to Y Combinator before they applied for funding and to bring back the atmosphere of Reddit (a Y Combinator-funded startup) when it first launched and before it became popular.

The site was also partially a chance for Paul Graham to put to use [the Arc language](http://arclanguage.org), a dialect of Lisp which he co-created with Robert Morris. A news app, known as [news.arc](https://github.com/arclanguage/anarki/tree/master/apps/news) was created to demonstrate the language and was used as the basis for Hacker News. News.arc does not use a conventional database, instead [writing content as files into directories](https://news.ycombinator.com/item?id=3515628). In 2024, Hacker News [moved from using Arc-on-Racket](https://news.ycombinator.com/item?id=44099006) and instead embraced [Steel Bank Common Lisp (SBCL)](https://www.sbcl.org) via a compiler dubbed Clarc.

In August 2007, the site [rebranded from Startup News to Hacker News](https://news.ycombinator.com/hackernews.html), as we know it today. This rebrand saw the expansion of topics from just startups to also including more general 'hacker' topics. 'Hacker' as used in the site's name refers not to people who maliciously exploit systems, but to people who tinker with and explore technology, possibly using it in ways unintended by the creators -- [The Conscience of a Hacker (The Hacker Manifesto)](https://phrack.org/issues/7/3)-style.

## Terms & Jargon

There is a decent amount of jargon on Hacker News. Many are standard forum colloquialisms, though there are also many phrases bespoke to the site.

<dl>
<dt>Upvote</dt>
<dd>A positive vote for a post or comment.</dd>

<dt>Downvote</dt>
<dd>A negative vote for a comment. Posts cannot be downvoted.</dd>

<dt>Karma</dt>
<dd>A point value assigned to users based on the number of upvotes they've received minus the number of downvotes they've received (and some anti-abuse shenanigans). It is possible that stories also have a [slightly different karma system](https://news.ycombinator.com/item?id=29024089). A leaderboard of the users with the most karma can be found at <a href="https://news.ycombinator.com/leaders">https://news.ycombinator.com/leaders</a></dd>

<dt>Parent</dt>
<dd>The item above the current item. Depending on context, it can reference the above post, comment, or user.</dd>

<dt>Grandparent</dt>
<dd>The parent of a parent.</dd>

<dt>OP</dt>
<dd>Short for 'Original Poster'. Usually refers to the person who posted a thread, though is sometimes also used to refer to the parent poster of a commenter.</dd>

<dt>Hug of Death</dt>
<dd>When a linked site falls offline due to the sudden influx of users from Hacker News. People will often follow up when a site has been hugged to death with an archive of the content.</dd>

<dt>Flamewar</dt>
<dd>When conduct moves on from critique and discussion into attacks and anger.</dd>

<dt>Flamebait</dt>
<dd>Similiar in usage to the term 'ragebait'. To flamebait is to intentionally stir angry retorts and unconstructive arguments rather than thoughtful discussion.</dd>

<dt>Shadowban/Hellban</dt>
<dd>To ban a user without informing them they have been banned, such that their content is just not shown (or is shown less).</dd>

<dt>news.yc</dt>
<dd>Another way of referring to Hacker News, which references the site's domain name of `news.ycombinator.com`. It is also a reference to 'news.arc'. It is less commonly used now but was a popular way to refer to the site in its earlier days.</dd>
</dl>

## Voting

Posts can be upvoted by any user of the site. Comments can be upvoted by any user, but only downvoted by users with over 500 karma. The lowest score a comment can have is -4,[^1] and comments cannot be downvoted more than 24 hours after their publication. Users also cannot downvote a comment if it is a direct reply to them. When a comment has a score in the negative, it becomes desaturated. To avoid flamewars, the display of comments is [delayed more the more nested they become](https://web.archive.org/web/20110618105517/http://ycombinator.com/newsnews.html#:~:text=Faster%2C%20Fewer%20Flamewars).

Users with more than 30 karma can flag submissions, which has the effect of a more strongly weighted downvote. Flagging is intended to be used for cases where a submission breaks [the site guidelines](https://news.ycombinator.com/newsguidelines.html).

Submissions marked as 'dead' have been designated as such by either Hacker News' heuristics or by a moderator. They cannot be seen unless `showdead` is set to true on the viewing user's account. In September 2015 it was made so that users with more than 30 karma can vouch for dead submissions, and enough vouches [will unkill it](https://www.ycombinator.com/blog/two-hn-announcements/#:~:text=will%20unkill%20it).

Submissions can be simultaneously both flagged and dead. Posts do not show as '[deleted]' if flagged or killed. They only show as deleted if the post author removed it or if they asked a Hacker News moderator to remove it.

## Posting

Any register user can post on Hacker News, provided that moderation actions haven't been taken against them. The site has two main types of posts: link posts and text posts. Posts with a link in the link fields are considered link posts, and everything else is considered a text post, even if links are included in the post body.

The most common style of text post is [Ask HN](https://news.ycombinator.com/ask), for asking Hacker News users questions. A format commonly used for both link and text posts is [Show HN](https://news.ycombinator.com/showhn.html), for users showing off something they have created. [Polls](https://news.ycombinator.com/newpoll) can also be created by users with over 500 karma, though people very rarely use the feature. It isn't an official content type, but 'Tell HN' is often used for public service announcement-style posts.

Post titles have a maximum length of 80 characters, and the guidelines outline they shouldn't be editorialised unless it is misleading or linkbait. When submitting videos and <abbr title="Portable Document Format">PDF</abbr>s, their title should be appended with '[video]' or '[pdf]', respectively. Titles for posts linking to content over a year old should also be appended with their publication year, for example 'Big News (2020)'. If a user fails to do this when submitting, a site moderator will usually change it for them.

Submissions can be edited by the post author within two hours of posting, but after that time they are unable to be changed. Submissions can be deleted within those two hours, but only if there have been no child comments to avoid discussion from being deleted. Submissions can be replied to within a fortnight of their publication but upvoted at any time.

## Ranking

The Hacker News front page -- especially a top spot -- is a fairly major driver of traffic and discussion. Vale.Rocks has found itself featured there multiple times. The core ranking function (`frontpage-rank`) from the arc.news codebase was written as:

```lisp
(= gravity* 1.8 timebase* 120 front-threshold* 1
   nourl-factor* .4 lightweight-factor* .3 )

(def frontpage-rank (s (o scorefn realscore) (o gravity gravity*))
  (* (/ (let base (- (scorefn s) 1)
          (if (> base 0) (expt base .8) base))
        (expt (/ (+ (item-age s) timebase*) 60) gravity))
     (if (no (in s!type 'story 'poll))  .5
         (blank s!url)                  nourl-factor*
         (lightweight s)                (min lightweight-factor*
                                             (contro-factor s))
                                        (contro-factor s))))
```

If <math><mi>P</mi></math> <mo>=</mo> <mtext>points</mtext> and <math><mi>T</mi></math> <mo>=</mo> <mtext>time in hours</mtext>, this works out to:

<math display="block">
  <mrow>
    <mtext>Rank</mtext>
    <mo>=</mo>
    <mfrac>
      <msup>
        <mrow>
          <mo>(</mo>
          <mi>P</mi>
          <mo>&#x2212;</mo>
          <mn>1</mn>
          <mo>)</mo>
        </mrow>
        <mn>0.8</mn>
      </msup>
      <msup>
        <mrow>
          <mo>(</mo>
          <mi>T</mi>
          <mo>+</mo>
          <mn>2</mn>
          <mo>)</mo>
        </mrow>
        <mn>1.8</mn>
      </msup>
    </mfrac>
  </mrow>
</math>

There are also further complexities in that original code to handle submissions with more nuance, but the main thing is that posts are presented based on the points they receive with a diminishing returns curve to avoid long-term domination of the front page. Text-only posts that do not have a URL are explicitly penalised. Additionally, [tutorials are downranked by moderators](https://news.ycombinator.com/item?id=16485753), and there have historically been [certain terms which have penalties associated with them](https://news.ycombinator.com/item?id=9097596).

The algorithm shown above is a very simple approach, and the ranking system has become more complex with time to avoid gaming of the system. There is voting manipulation such that voting rings are thwarted. Sharing a link with other people or using alt accounts generally doesn't work, nor does telling people to go to the newest page and upvote from there as a bypass. The exact details of Hacker News' protection heuristics are not public, as making them so would allow them to be bypassed trivially, but they do seem to be effective.

In addition to the standard front page, there is also a classic ranked page. It uses the same ranking algorithm as the front page, though only factors in votes from users who registered before the 13<sup>th</sup> of February, 2008. It was originally announced as being '[ranked using only votes from accounts over a year old](https://news.ycombinator.com/item?id=607271)'. There are also a number of [filtered lists for different post types](https://news.ycombinator.com/lists).

Hacker News is editorially independent from Y Combinator and has [a policy](https://news.ycombinator.com/newsfaq.html#cflag:~:text=YC%20suppressed%20on%20HN) of moderating 'less, not more, when YC or a YC startup is the topic.'. Y Combinator does, however, advertise batch applications in the site's footer. Y Combinator-funded companies have the ability to post job advertisements on Hacker News, which appear at position 6 on the front page and have a fixed decay, and may also post [Launch HN](https://news.ycombinator.com/launches) posts.

### Second Chance Pool & Invited Links

Oftentimes Hacker News submissions will be overlooked, even if they are extremely good and of high quality. Moderators often notice these links and will frequently give them another chance. Users can also email the moderators to request that a submission be given a second chance if one really deserves it.

When a submission is given a second chance, its post date is updated, and so are the post dates of any comments. Originally, [comment post dates weren't changed](https://news.ycombinator.com/item?id=48740177), but that led to confusion from users as to how a comment was commented before a post was posted, but the updated approach of bringing forward comment timestamps also confuses users.

Submissions in the second chance pool or those which have been invited for resubmission are added directly to the front page, giving them great visibility and often leading to them remaining there for long periods. Posts included in the second-chance pool are often referred to as having been 're-upped'.

## Moderation

Hacker News was originally moderated by Paul Graham, one of Y Combinator's co-founders and the creator of Hacker News. At the end of March 2014, Graham stepped down from day-to-day operations at Y Combinator.

In his place as moderator, he announced Daniel Gackle would be taking over as primary moderator of the site. In taking on the role, he retired his account 'gruseom' in favour of 'dang'.[^2] Scott Bell [publicly joined Hacker News as a moderator in July 2016](https://news.ycombinator.com/item?id=12073675), though he had been moderating privately before that time. He [ceased working on Hacker News in 2019](https://news.ycombinator.com/item?id=25055115). Tom Howard was publicly announced as a moderator [at the start of April, 2025](https://news.ycombinator.com/item?id=43558671). As dang changed accounts when switching to a moderator position, Tom Howard dropped his 'tomhoward' account for 'tomhow'.

Based upon previous cases, moderators typically act privately before being publicly announced, and their departures are often made without publication.

In addition to moderating Hacker News, it is commonly alluded to that Hacker News' full-time moderators also develop the site and maintain the site's anti-spam and anti-rank-gaming measures. Previously, [Kevin Hale](https://news.ycombinator.com/user?id=kevin) and [Nick Sivo](https://news.ycombinator.com/user?id=kogir) have been [noted as working on the site](https://www.ycombinator.com/blog/meet-the-people-taking-over-hacker-news/). It is also suggested by moderators' use of plural terms that there are more moderators than are publicly known, though they are not full-time.

Moderation actions take a variety of forms. Shadowbanning is one method and involves a user or domain being flagged such that any submissions made are instantly marked as '[dead]'. These submissions can be vouched for, however.

By inspecting the source code of news.arc, a number of unexposed moderation functions which still exist on the site can be identified. Many have been removed, but many still exist. Those which are live at time of publication are:

- `/newsadmin` - Configuration of caching, comment-kill/ignore regexes, lightweights list, kill-all-by-user, and banned IPs.
- `/badips` - IP addresses with dead submissions and one-click ban toggles
- `/badlogins` - Last 100 failed login attempts (time, IP, and attempted username)
- `/goodlogins` - Last 100 successful logins (time, IP, username)
- `/killed` - All dead/killed items (stories and comments)
- `/spurned` - Throttled/blocked IPs. If not an admin, it returns a blank page instead of requesting login like the other pages.

## Name Colours

Under specific conditions, users' names on Hacker News are displayed with specific colours. If a user's account is under two weeks old, they are considered a 'noob', and their name will appear green on any posts or comments they make. This green colour will persist on those posts and comments even after their account ages past two weeks. A similar feature was trialled for domains in 2015, though [the community disliked it and it was promptly removed](https://news.ycombinator.com/item?id=10223645). Alumni of Y Combinator have orange names, though the orange colour is only shown to other Y Combinator alumni.

In February 2009, [there was an experiment](https://web.archive.org/web/20110618105517/http://ycombinator.com/newsnews.html#:~:text=Comment%20Features) where users who had at least 25 comments on their account and an average score of at least 3.5 over their 50 most recent comments would have orangey-grey names. This was later removed.

## Themes

Following the death of significant individuals, the Hacker News navigation bar gains a thin black top border to commemorate them. The black bar was [first used in June 2009](https://news.ycombinator.com/item?id=644954) upon the passing of Rajeev Motwani.

On Christmas day, Hacker News takes a festive colour scheme. The usually orange navigation bar becomes a deep red, and the usually grey numbers indicating a post's ranking alternate between red and green.

Users with karma exceeding 250 can change the colour of Hacker News' top bar from the default of <span style="background: #ff6600; color: var(--black);">#ff6600</span> to another hex code of their choosing. Alpha values are not supported, and attempting to input an invalid value resets the colour back to the default. This feature was [added in early 2008](https://web.archive.org/web/20110618105517/http://ycombinator.com/newsnews.html#:~:text=Change%20Color) as a thanks to people who contribute. A list of top bar colours recently chosen by users is made public at <https://news.ycombinator.com/topcolors>.

## Search

Hacker News has had search functionality provided by a few organisations. The first official support functionality was [launched in mid-2011](https://www.ycombinator.com/blog/hacker-news-news/) and provided by Octopart as a test of their document-oriented datastore with search, ThriftDB, which is now defunct. Paul Graham had mentioned Octopart was working on a search implementation [as far back as July 2007](https://news.ycombinator.com/item?id=36008). This iteration of search was available as HNSearch at `www.hnsearch.com` and was [shut down in March 2014](https://news.ycombinator.com/item?id=7404972).

Before the ThriftDB functionality, the most popular search solution was SearchYC, which launched in 2007. It [stopped operating](https://web.archive.org/web/20110630192029/http://blog.searchyc.com/) shortly after the announcement of the official search. Users were sad to see it go, as SearchYC was extremely well-loved and feature-rich.

Agolia, which was in Y Combinator's Winter 2014 batch, launched a replacement to ThriftDB search in early 2014. Soon after they [made further updates](https://news.ycombinator.com/item?id=7126301) to handle filtering, improve the UI, and more. During this period, it was more of a [full Hacker News client](https://www.algolia.com/blog/product/new-experimental-version-of-hacker-news-search-built-with-algolia) with a then-modern UI, rather than just a search tool.

There were major overhauls [at the start of 2015](https://news.ycombinator.com/item?id=8912684), most notably vastly simplifying the interface. In late 2023, the Agolia search system [received a significant update](https://news.ycombinator.com/item?id=37870077) improving performance and deployment, as well as search filtering options. In 2025, the entire Agolia search was [fully rewritten by Jeff Slentz](https://news.ycombinator.com/item?id=47116557), and the original codebase was [subsequently archived](https://github.com/algolia/hn-search) in February 2026.

Another significant search service for Hacker News was Trieve HN Discovery by Y Combinator winter batch 2024 company, Trieve. Their search system provided many filters and features, including many AI-enabled features. Trieve was [acquired by Mintlify](https://www.trieve.ai/blog/trieve-is-being-acquired-by-mintlify) in mid-2025, and their Hacker News search service was closed as a result. It is likely the [monthly cost of $6835.39](https://web.archive.org/web/20240829174941/https://hn.trieve.ai/about#:~:text=%246835%2E39) was also a contributing factor to the closing. It was available at `hn.trieve.ai`.

As part of research prior to releasing their search service, Trieve wrote a [history of Hacker News Search](https://www.trieve.ai/blog/history-of-hnsearch), which covers more services which I have omitted here.

## API

Being _Hacker_ News and a popular location for a variety of software-developing professionals, the wish to programmatically interact with the site is to be expected. The main benefit of an API being the ability to create custom front-ends. So many front-ends have been created -- especially ones which aggregate Hacker News with other similar sites, such as [Lobsters](https://lobste.rs), or which are native to specific platforms.

Since the site's inception people had been scraping Hacker News for their needs, which is a brittle approach. When Y Combinator looked to make interface improvements and move to a new rendering engine, they realised that it would involve changes to the site's HTML and break people's scrapers. To address this, they [launched a proper Firebase API in early October 2014](https://www.ycombinator.com/blog/hacker-news-api) with a three-week grace period to allow developers to migrate. This API remains current and functional as of initial publication.

Alongside HNSearch's launch was the launch of the HNSearch API and a [contest to create something using it](https://web.archive.org/web/20120709050021/http://www.hnsearch.com/contest), with the best entry as voted by the community receiving a widescreen Dell monitor as a prize. There were 27 submissions, and the [winner was HN Trends by Jerod Santo](https://web.archive.org/web/20130525225904/http://blog.hnsearch.com/hnsearch-contest-winner-hn-trends).

The HNSearch API was succeeded by the Agolia equivalent for handling searches. Many other third-party Hacker News search solutions have also exposed their own APIs, though adoption has been lower than the Firebase API and official search API offering.

## Demographics

Hacker News intentionally doesn't track users too strictly, so the available data is limited. Unsurprisingly, Hacker News is a very United States-oriented website. The below ranges consider if users are logged in, with the United States' representation dropping if looking at all users. These figures seem reasonable considering [the analytics of this site](/posts/traffic-analysis), which has seen significant Hacker News traffic.

<figure>
<div class="table-wrapper">

| Region/Country                       | Share Range | Notes                                                             |
| :----------------------------------- | :---------- | :---------------------------------------------------------------- |
| **United States**                    | 32% - 56%   | Includes Silicon Valley; <45% (or as low as 33%) for total users. |
| **Silicon Valley**                   | 5% - 14%    | Part of US total; <10% if measuring total users only.             |
| **Europe**                           | 28% - 35%   | Total for the region.                                             |
| **United Kingdom**                   | 5% - 8%     | Share of European total.                                          |
| **Germany**                          | 4% - 7%     | Share of European total.                                          |
| **France**                           | 1% - 3%     | Share of European total.                                          |
| **Netherlands**                      | 2%          | Share of European total.                                          |
| **Switzerland**                      | 1%          | Share of European total.                                          |
| **Canada / Australia / New Zealand** | 7% - 8%     |                                                                   |
| **India**                            | 2% - 7%     |                                                                   |
| **China**                            | 0.5% - 3%   | Includes Hong Kong.                                               |

<figcaption>Reported stats as of early 2018. <cite>Credit: <a href="https://news.ycombinator.com/item?id=16633521">Dang</a></cite>.</figcaption>
</figure>

As of 2020, [Dang stated](https://news.ycombinator.com/item?id=22767439) that Hacker News' active user count had been ever uptrending, though with great swings, for the previous decade.

## Notable Posts

In 2007, Drew Houston made a post on Hacker News announcing [Dropbox](https://www.dropbox.com), a Y Combinator summer 2007 batch start-up which was launching. In [a now infamous comment](https://news.ycombinator.com/item?id=9224), user BrandonM replied with issues he had identified with the startup. The 'Dropbox Comment' has become a term to refer to technical users dismissing complex products and multi-billion-dollar ideas as unnecessary or trivial, as well as a symbol of Hacker News' cynicism. dang provided [further discussion of the comment in a 2021 comment](https://news.ycombinator.com/item?id=27068148).

Under a thread about Paul Graham's then-recent essay 'The Equity Equation', user sanj replied to a comment by user cperciva with, 'Did you win the Putnam?', a reference to a [prestigious mathematics competition](https://maa.org/putnam/), to which cperciva in turn replied, 'Yes, I did.'. Paul Graham chimed in to say, 'That has to be the comeback of all time.'.

My own Hacker News claim to fame is that I successfully [made a post on Hacker News that got negative points](/micros/20260512-0652). This is notable, as top-level posts cannot usually be downvoted. As aforementioned, only comments can be downvoted and the option is restricted behind a karma threshold. I am still unsure how this occurred.

## Miscellaneous

The site technically went live [as early as October 9<sup>th</sup>, 2006](https://news.ycombinator.com/front?day=2006-10-09), though this was in a private state only for people related to Y Combinator or known to Paul Graham. Activity quickly petered off after the private launch and didn't pick back up until the site launched publicly. Despite the site being live privately before the public release, the 'Go back a day' link on the archival front page viewer doesn't appear on the page for the 18<sup>th</sup> of February 2007, making previous days inaccessible from the interface and requiring the editing of the day query parameter. If you attempt to [view the front page before Hacker News launched](https://news.ycombinator.com/front?day=2006-10-08), you get a cheeky 'HN didn't exist yet.'.

Starting in 2015, highlights from Hacker News would be [posted on the Y Combinator blog](https://www.ycombinator.com/blog/hacker-news-highlights). Though the series was never officially announced to be discontinued, the last post was [published in December 2018](https://www.ycombinator.com/blog/hacker-news-highlights-august-to-november-2018/).

As Hacker News is not obsessed with extracting value from its users, there are 'noprocrast', 'maxvisit', and 'minaway' values which can be set by users on their accounts to restrict their usage of the site and to help them maintain healthy relationships with it. noprocrast (short for 'no procrastinate') toggles the limits, maxvisit sets the maximum amount of time you can browse before being blocked from the site, and minaway sets the amount of time the block lasts before it lapses. These blocks are trivial to bypass but help in setting limits.

'delay' is another value that can be set by users on their profile, and it defines the amount of time before a comment goes live, giving users time to edit them before they're seen. It can be set to a maximum of ten minutes.

[^1]: There initially was no lower bound for comment score, but it was [set to -8 in February 2009](https://web.archive.org/web/20110618105517/http://ycombinator.com/newsnews.html#:~:text=capped%20the%20minimum%20score%20of%20a%20comment%20at%20%2D8) before later being revised to its current limit.

[^2]: 'dang' being derived from Daniel Gackle (pronounced Gackley), not the exclamation or Asian surname.
