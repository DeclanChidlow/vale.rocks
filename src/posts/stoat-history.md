---
title: A Complete History of Stoat
description: An in-depth history of the Stoat chat platform. From its precursor Riot, through to all the additions and changes the platform has seen and received as it has grown. Details from when it was once Revolt to the change into Stoat and details of all the bumps and successes along the way.
og_description: Sow discord to reap success.
pub_time: 2026-08-28
section: Essay
tags: [Stoat]
standardsite_rkey: 3mu4s6b3ynk2a
---

In 2019 three students in their mid-teens -- Paul Makles (Insert), [Rene Vinter (Nizune)](https://renevinter.xyz), and [Martin Löffler (FatalErrorCoded)](https://fatalerrorcoded.eu) -- established Riot (stylised RIOT), an online chat platform targeting gaming communities. Funded by donations on Patreon, Riot operated at a small scale and ultimately ceased development in mid-2019.

<figure class="shorter long">
<img src="/assets/posts/stoat-history/riot-landing-page.avif" alt="A purple landing page with multiple sections showcasing Riot's capabilities. It touts being open-source, has the tagline 'Let's riot together', and one section shows off gaming communities.">
<figcaption>Riot landing page.</figcaption>
</figure>

Throughout 2020, the team worked on a new project: Revolt. Starting afresh with the lessons learned from Riot, rather than building upon it. Riot had been developed in ECMAScript, while Rust was chosen for Revolt's back-end as a result of Makles wishing to use the opportunity to learn the language. The name 'Revolt' was originally just the name of the API server in development for the project, but it ended up sticking and becoming the name of the project as a whole. Work on Revolt began in late 2019 and continued through 2020.

The back-end was established with a collection of services:

- January, for proxying images and generating embeds.
- Autumn, a file server.
- Delta, for the <abbr title="Representational State Transfer">REST</abbr> API.
- Bonfire, for WebSocket events.
- Vortex, for voice communication.

A web client called Revite (now referred to as 'For Legacy Web') was created, which was also installable on mobile devices as a <abbr title="Progressive Web App">PWA</abbr> and on desktop operating systems via an [Electron wrapper](https://www.electronjs.org). In January of 2021 the project went live in a closed beta state and in August officially launched in an open beta.

<figure class="left">
<img src="/assets/posts/stoat-history/revolt-pre-servers.avif" alt="A rather barren chat interface showing a 'Testers' group selected from a list of conversations. A member list is shown to the right with a large chat pane in the centre and a message bar down the bottom. The top right corner shows the current user, and underneath it are tabs for 'Home', 'Friends', 'Saved Messages', and 'Developer'.">
<figcaption>A screenshot of Revite from April 2021, prior to the addition of servers.</figcaption>
</figure>

Initially being without servers at all, only group chats and direct messages, servers were eventually added, and in mid-June 2021, Makles created the first proper server on the platform: Revolt Testers. This server replaced the 'Testers' group chat (pictured) and was later rebranded to the 'Revolt Lounge'.

Revolt's first 'influx' -- the name given to mass inpourings of new users -- occurred in September of 2021 when the platform found itself [on the front page of Hacker News](https://news.ycombinator.com/item?id=28434012), reaching 642 upvotes. Nobody from the team posted or was aware of this post until a great deal of users began to show up. Message acknowledgements had to be disabled to prevent the platform from going offline. As result of Hacker News' reach, Revolt saw secondary exposure from additional sources such as [Lobste.rs](https://lobste.rs/s/9tlgop/revolt_new_foss_self_hostable_discord) and [Gigazine](https://gigazine.net/gsc_news/en/20210919-revolt/). [It's FOSS](https://itsfoss.com/revolt/) published a particularly popular article which appeared on Google News.

<figure class="right">
<img src="/assets/posts/stoat-history/revite-2021.avif" alt="A more populated interface, showing many more conversations, in-chat messages from bots, and a newly introduced server list to the far left of the page.">
<figcaption>A screenshot of Revite taken by Insert in June 2021.</figcaption>
</figure>

In very late 2021, the Discover service launched, providing an easy first-party way for people to explore Revolt. Via Discover, users can join servers, invite bots to servers they moderate, and apply themes to Revite.

In May of 2022, a [comprehensive rearchitecturing](https://stoat.chat/updates/architecture-overhaul) of Revolt's back-end was completed, following the effort's beginnings in late January. This greatly improved the reliability and resilience of the platform, while greatly improving both the developer and user experiences. Of particular note was a greatly improved permission system, allowing for private channels in servers and greater control of user permissions by server administrators. A rudimentary GIF sharing service developed by Revolt and called Gifbox launched in August, though was not well supported after launch and eventually stopped working in mid-2024.

In October of 2022, internet influencer and self-proclaimed misogynist facing multiple international charges for rape, human trafficking, and child abuse material Andrew Tate launched 'The Real World'. A successor to his previous platform 'Hustler's University', The Real World is equally as slimy. Part of the 'manosphere', the paid platform instructs users on how to make money by hustling with cryptocurrencies and such.

In November it was discovered by a user in the Revolt Lounge that The Real World was completely built atop of Revolt. Paul Makles looked into it and confirmed that not only was it violating Revolt's AGPLv3 licence, but that he'd been contacted by them prior to launch in an attempt to hire him onto the team. I gained access to the platform myself via a contact and can confirm first-hand that it was a modified version of Revite. The API responses from the back-end made explicit reference to Revolt, too.

The Real World was hacked in May 2024, and almost a million user details were exposed, not due to a vulnerability in Revolt, but because they failed to configure their databases correctly. This was followed in November by another breach in which even more data was leaked and where the hackers flooded chats with LGBTQ+ emojis. Humorously, this November intrusion happened while Andrew Tate was actively live streaming. Unfortunately, with lack of resources to legally tackle The Real World's licence violation, the platform has remained active.

In February 2023, in-app reporting functionality was launched on Revolt as part of a significant push for user safety. This introduced the ability for users to report content to Revolt to be moderated on a platform level, something that had previously been managed across servers by the user-run bot [AutoMod](https://automod.vale.rocks). Alongside this came a major update to [Authifier](https://github.com/stoatchat/rust-authifier), changing its name from 'rAuth' and becoming a more capable system to prevent spam and abuse of the service. Vinter officially departed from Revolt in early 2023, and Löffler's contributions slowed around the same time, later ceasing entirely.

The first major user milestone was reached in June of 2023, when the platform [hit 100,000 registered users](https://stoat.chat/updates/100k-users). This occurred two days following [the launch of discriminators](https://stoat.chat/updates/evolving-usernames), four-digit tags prefixed by an octothorpe which are present at the end of usernames to allow multiple accounts to have the same username and to dissuade a black market of rare username sales. Discord had [announced their intent to remove discriminators](https://discord.com/blog/usernames/) the previous month and was rolling the new system out at this time.

In October, the platform's first official native application -- Revolt For Android -- [was teased](https://stoat.chat/updates/revolt-on-the-go). Following in December came the [beta release of Revolt For Web](https://stoat.chat/updates/refreshing-revolt-web), a new web and desktop client following Google's Material 3 design language intended to replace Revite.

Publicly visible changes were low in early 2024 as lots of work was done behind the scenes. This changed with the short-lived but informative 'Month in Revolt' series. The [May entry](https://stoat.chat/updates/month-in-revolt-may-2024) documented continued work on the Android app, voice and video calling, and an improved developer website. The voice and video work involved replacing Vortex -- the previous voice service whose long-needed 2.0 release had entered a development hell following the departure of Martin Löffler -- with a new [LiveKit](https://livekit.com)-based implementation which would also be able to facilitate video sharing.

The [July entry](https://stoat.chat/updates/month-in-revolt-july-2024) (June was skipped) detailed improvements to the beta web client (specifically in regard to message formatting and settings), some development on a native iOS client, and various changes to the back-end, including conclusion of an architectural overhaul. The [final of the monthly updates](https://stoat.chat/updates/month-in-revolt-august-2024), which released in August, noted more mobile client improvements and work on moderation systems, though development of the new web client stalled due to Paul Makles' unavailability.

In October of 2024, Revolt reached another major milestone: half-a-million registered users. This came following a ban of Discord in Russia by the Roskomnadzor -- the agency concerned with monitoring and controlling media and communications within Russia. The following day, Discord was banned in Turkey too. The huge number of Russian and Turkish speaking users necessitated that Revolt fast-track the onboarding of more moderators to handle the event. October also saw features such as pinned messages and webhooks begin to roll out. A private beta for the native Android app also occurred from mid-2024.

In early 2025 the Revolt landing page was overhauled alongside tweaks to the wordmark and brand palette. The native Android app also launched into a long-awaited early access state on the Google Play Store, replacing the <abbr title="Trust Web Activity">TWA</abbr> version that was previously available. It also ended up on the [front page of Hacker News again](https://news.ycombinator.com/item?id=43277918).

<figure class="shorter">
<img src="/assets/posts/stoat-history/revolt-landing-page-early-2025.avif" alt="A gradient-heavy landing page with a dark blue background. Large text reads 'Find your community', followed by 'Revolt is the chat app that's truly built with you in mind.'. A download button is prominent, with a skewed screenshot of Revite's interface visible behind it.">
<figcaption>The Revolt website in early 2025.</figcaption>
</figure>

As a result of a cease and desist notice regarding the name 'Revolt', the platform changed its name to 'Stoat' after the species of mustelid. Stoat did not publicly divulge the sender of the cease and desist on the grounds of wishing to avoid harming negotiations. Temporary brand resources for the new name were hastily created, and the rebrand [took place at the beginning of October, 2025](https://web.archive.org/web/20260210034916/https://stoat.chat/updates/long-live-stoat). Alongside changes to the brand, the new Stoat For Web client was officially launched and made the default client, replacing Revite. The new LiveKit-based voice system also launched; however, it wasn't initially usable due to issues running it in a production deployment.

On the 9th of February, 2026, [Discord announced global age-verification measures](https://discord.com/press-releases/discord-launches-teen-by-default-settings-globally). Unhappy users, citing the invasion of privacy, their disdain for Discord's chosen age-verification service's ties to American surveillance firm Palantir, and existing grievances with Discord's increasing profit-over-product mentality, moved to Stoat in droves. The resulting influx was intense for the team to handle and very strenuous on Stoat's infrastructure. The drastic sudden increase in email activity saw the platform incorrectly added to spam lists, which caused sign-up delays.

A [new logo and mascot designed by myself](/portfolio/stoat#icon) went live on February 12th, as [announced on Bluesky](https://bsky.app/profile/stoat.chat/post/3memon3azgk22), and by February 19th, [Stoat had reached 1,120,000 users](https://www.reddit.com/r/stoatchat/comments/1r8tfnb/stoat_user_count_and_other_assorted_figures_over/), and the platform continued to grow aggressively. Continued press coverage from the likes of [TechRadar](https://www.techradar.com/computing/social-media/so-many-discord-users-are-flocking-to-this-alternative-platform-its-making-stoat-crash), [Switch and Click](https://www.youtube.com/watch?v=kWcuSvv6v90&), [Linus Tech Tips](https://www.youtube.com/watch?v=bzosJNHD8jI), [Gamers Nexus](https://www.youtube.com/watch?v=kpjcmXbmMVM&t=1882s), and [Windows Central](https://www.windowscentral.com/software-apps/discord-alternative-search-10000-percent-stoat), among others, attracted more and more people.

The biggest events of the following months were the introduction of push notifications, which [came to Stoat For Android in May](https://bsky.app/profile/stoat.chat/post/3mmn7m7gwzg2m); the [launch of a completely overhauled Gifbox](https://stoat.chat/updates/introducing-gifbox) sharing nothing but the name and idea of the original, following the shutdown of Tenor's API; and then [video streaming in mid-July](https://stoat.chat/release-notes/93eb1f4ec77444ca9fb13617e0e6c0b1). Video streaming had been hotly anticipated and was already implemented and available to people self-hosting, but this update saw the experience polished and the feature made widely available. The status page was also moved to [stoatstatus.com](https://stoatstatus.com).

In mid-August of 2026, [Discord was ordered by Brazil to suspend video streaming within the country](https://agenciabrasil.ebc.com.br/en/geral/noticia/2026-08/brazil-orders-discord-suspend-live-streams-country) following abuse of the service. As with previous restrictions of Discord's service availability, this triggered an influx. A mass number of Brazilian users joined the platform, making use of the recently launched video-streaming functionality. An extra production node within the United States of America had been established to improve performance of the service outside of Europe on August 9th, but the unexpected influx saw it removed on the 22nd due to the great associated costs.

<figure class="shorter">
<img src="/assets/posts/stoat-history/stoat-for-web-august-2026.avif" alt="A Material 3-styled client with a purple tint. Left to right is a server list, a list of channels in the current server 'AutoMod', a chat pane showing a rules channel, and then a list of users. Buttons to create a server, open Discover, open settings, go home, pin messages, and search messages can all be seen.">
<figcaption>A screenshot of Stoat For Web in August 2026.</figcaption>
</figure>

It was during late August that Stoat reached another milestone: one-and-a-half million users. It was also during August that the official Stoat server on platform, which had previously been called the 'Revolt Lounge', [switched to allowing topical discussion only](/micros/20260821-1025) rather than allowing all discussion. This was done to avoid centralisation of users in one server and to promote users dispersing across the platform. This brings us to Stoat as it stands as of this article's publication.
