---
title: Build, Use, and Improve Tools
description: Why developers should create custom tools for repetitive tasks and one-off needs, with discussion of how LLMs can accelerate tool development, the learning benefits of building utilities, and how personal tools become valuable assets in your workflow and beyond.
og_description: "&quot;The best investment is in the tools of one's own trade.&quot; - Benjamin Franklin"
pub_time: 2025-03-21
section: Essay
tags: [development]
---

A developer should, in my opinion, create (or modify) tools and utilities fit for their use and needs. Both for repeated tasks and one-off needs.

Shawn Wang wrote a post titled [My Three Strikes Rule for Blogging](https://www.swyx.io/three-strikes) in which he proposes, 'The third time you use an idea in a conversation, you have to blog about it.' As much as this applies to writing, I think it applies to development and building tools. If you find yourself completing a menial task or trying to achieve the same thing three or more times, a tool should be built.

That doesn't mean a tool should only be built for repeated tasks though. There is also a case for spur-of-the-moment creations: small little bodged-together hacks that solve a one-off problem. The equivalent of bending a wire into a rudimentary hook to extract a spatula from the gap it fell down behind the oven.

Large language models are fantastic at building these small, focused utilities. It is in handling large, complex, and multi-file projects that current AI shows its limitations, but this isn't relevant to single-purpose tools.

The main reason people opt not to automate is because it [often takes longer to automate something than it does to just do it manually](https://xkcd.com/1319/). Handing a task off to a LLM where it can complete it with minimal input from you and likely without the requirement of further prompting if your task is sufficiently simple shaves off a lot of development time. It is true that you might need to make some tweaks, but I've personally found it to be much faster than creating things from scratch.

It is worth doing a quick evaluation to identify if you're going to spend more time fighting AI than you'll save. AI itself is a tool -- a tool that does a good job creating other tools in the right situations.

Of course, there is another fantastic side to building tools and utilities. You can learn tons! A tool, especially a throwaway one, doesn't necessarily need to be carefully considered and future-proofed -- especially if you're only being built at a small scale (both in terms of features and usage).

You can experiment with new technologies or try something that wouldn't work at scale just for the hell of it. It is a fantastic opportunity to learn something, be productive, and end up with something tangible at the end. Further, it provides wonderful chance for bodging things if the situation calls for it.

Occasionally I put this all together by learning from experimenting with new LLMs to create tools incorporating new technologies. [^1] Though, if I'm expecting repeat usage, I'll stick to basic HTML/CSS/JS with no or minimal dependencies where applicable. It is simple, what I'm best at, and the web platform is reliable.

You don't just have to build tools from the ground up. You can also build on existing ones. There are also plenty of open-source offerings out there. Hack on them. Meliorate. Make alterations to help them fit your needs. Feel free to publish your changes, and if they might benefit others, submit them as pull requests. Contribute back if you can.

## Examples

[Simon Willison](https://simonwillison.net) uses large language models -- namely Anthropic's Claude -- to [create a range of tools](https://tools.simonwillison.net). He includes links to transcripts of him prompting models and is transparent in his use of AI. He specifically prompts the LLMs to use HTML/CSS/JS and avoid abstraction layers and dependencies such as React. This, of course, comes with the benefits of keeping things simple and easy to maintain.

[My tools site](https://tools.vale.rocks) has an assortment of handy bits and bobs on it. Many of them LLM produced and then tweaked by myself. Everything is built to fit a genuine need I have or had and are devoid of any complexity beyond that which is strictly required.

Beyond dedicated sites, there are tons of people building and sharing little tools all over sites like GitHub and CodePen and even more people that are building throwaway tools that they don't bother sharing.

---

Over time, building utilities for your needs leads to a personal toolbox of utilities perfectly suited to your workflow. These tools become extensions of your capabilities, allowing you to work more efficiently and tackle problems that would be tedious or inconvenient without them. Beyond being solutions to problems, they're also representative of one's knowledge and expertise.

Regardless of how you build a tool, if it is handy for yourself, there is a good chance it'll be handy for someone else. You can open-source it and make it available to the masses, and you could expand upon it and have it be the start of a business if you've got the entrepreneurial flair.

[^1]: As the sort of tools I'm building are often simple, it isn't difficult to identify if things have gone wrong, and the lack of complexity lets me see the benefits of a new technology in a vacuum, unhampered by surrounding context. It also lets me evaluate LLMs, and asking multiple models to build tools simultaneously lets me compare their outputs with minimal additional time usage.
