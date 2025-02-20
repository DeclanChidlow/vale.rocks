---
title: AI is Stifling Tech Adoption
description: AI language models are shaping technology adoption in software development through training data limitations and system prompt biases. This analysis examines how AI assistants' preferences for established frameworks like React and Tailwind CSS may be creating barriers for newer technologies, supported by testing across major AI platforms including ChatGPT, Claude, Gemini, and DeepSeek. A look at the growing AI knowledge gap and its impact on technological innovation in modern software development.
og_description: AI coding assistants are React evangelists.
pub_time: 2025-02-13
mod_time: 2025-02-19
section: Essay
word_count: 1819
---

I propose that the advent and integration of AI models into the workflows of developers has stifled the adoption of new and potentially superior technologies due to training data cutoffs and system prompt influence.

I have noticed a bias towards specific technologies in multiple popular models and have noted anecdotally in conversation and online discussion people choosing technology based on how well AI tooling can assist with its usage or implementation.

While it has long been the case that developers have considered documentation and support availability when choosing software, AI's influence dramatically amplifies this factor in decision-making, often in ways that aren't immediately apparent and with undisclosed influence.

## The Knowledge Gap

Large language models, especially those on the scale of many of the most accessible, popular hosted options, take humongous datasets and long periods to train. By the time everything has been scraped and a dataset has been built, the set is on some level already obsolete. Then, before a model can reach the hands of consumers, time must be taken to train and evaluate it, and then even more to finally deploy it.

Once it has finally released, it usually remains stagnant in terms of having its knowledge updated. This creates an AI knowledge gap. A period between the present and AI's training cutoff. This gap creates a time between when a new technology emerges and when AI systems can effectively support user needs regarding its adoption, meaning that models will not be able to service users requesting assistance with new technologies, thus disincentivising their use.

The cutoff means that models are strictly limited in knowledge up to a certain point. For instance, as of February 2025, Anthropic's latest models have a cutoff of [April 2024](https://support.anthropic.com/en/articles/8114494-how-up-to-date-is-claude-s-training-data), and most of OpenAI's latest models have cutoffs of [late 2023](https://platform.openai.com/docs/models) (though 4o through ChatGPT has a cutoff of [June 2024](https://help.openai.com/en/articles/9624314-model-release-notes#h_826f21517f)).

The influence of the popularisation of AI models has also led to the proliferation of AI slop content, which AI companies are likely trying to avoid introducing in their scraped data sets -- potentially increasing this knowledge gap.

This knowledge gap doesn't just stifle the adoption of new frameworks and tooling but also the adoption of new and potentially superior features introduced in updates to already in-use frameworks and tooling as a result of the models not yet including information about them in their training set. This is a lesser issue though, because a technology with existing market adoption is bound to have fanatics who will use it, create examples, and produce blog posts, documentation, and other media about it that will eventually end up in training data.

While some models are used in contexts where they are equipped with tooling, such as ChatGPT with its internet search capabilities, their prompts often only instruct them to use this functionality when explicitly requested by a user. Plenty of implementations don't have any access to any internet query functionality at all, such as Claude via its web interface, which will inform you it will only discuss things included in its training data.

Of course, if people are reluctant to adopt a new technology because of a lack of AI support, there will be fewer people likely to produce material regarding said technology, which leads to an overall inverse feedback effect. Lack of AI support prevents a technology from gaining the required critical adoption mass, which in turn prevents a technology from entering use and having material made for it, which in turn starves the model of training data, which in turn disincentivises selecting that technology, and so on and so forth.

Consider a developer working with a cutting-edge JavaScript framework released just months ago. When they turn to AI coding assistants for help, they find these tools unable to provide meaningful guidance because their training data predates the framework's release. This forces developers to rely solely on potentially limited official documentation and early adopter experiences, which, for better or worse, tends to be an 'old' way of doing things and incentivises them to use something else.

## System Prompt Influence

I've anecdotally noticed that many AI tools have a 'preference' for React and Tailwind when asked to tackle a web-based task or even to create any app involving an interface at all.

With Claude 3.5 Sonnet, which is generally my AI offering of choice given its superior coding ability, my "What personal preferences should Claude consider in responses?" profile setting includes the line "When writing code, use vanilla HTML/CSS/JS unless otherwise noted by me". Despite this, Claude will _frequently_ opt to generate new code with React, and in some occurrences even rewrite my existing code into React against my intent and without my consultation.

While Anthropic [publishes Claude's core system prompts](https://docs.anthropic.com/en/release-notes/system-prompts), they do not publish the system prompts of specific features, such as artifacts. However, a [leaked system prompt](https://github.com/jujumilk3/leaked-system-prompts/blob/main/claude-artifacts_20240620.md) for Claude's artifacts feature shows that both React and Tailwind are specifically mentioned with explicit instruction on how they should be handled. It also specifically mentions the diagramming tool [Mermaid](http://mermaid.js.org) and a set of React libraries, including [Recharts](https://recharts.org), [shadcn/ui](https://ui.shadcn.com), and [Lucide icons](https://lucide.dev), as well as [Cloudflare's cdnjs](https://cdnjs.cloudflare.com).

This can be evidenced when asking Claude to use a certain technology, such as Svelte Runes, where it will instead direct the user towards its preferred technology. For example:

> **Me:** Build me something with Svelte Runes.

> **Claude:** I apologize, but I am not able to create Svelte Runes components directly, as the artifact environment only supports certain technologies like React, HTML, and SVG. I can help you build something similar using React, or I can provide you with Svelte Runes code that you can use in your own Svelte project. Which would you prefer?
>
> If you'd like to see a React version, I can create something with similar reactive functionality using React's hooks. Or if you want Svelte Runes code specifically, I can write that for you to use in your own environment.

It does provide a choice, but chances are someone will select [the path of least resistance](https://en.wikipedia.org/wiki/Path_of_least_resistance).

### Testing

To test if popular models do have built-in bias for React, I logged into the web interfaces of four of the current most popular AI chat platforms[^1] via my free accounts and asked the models to "Create me a web app. It can do anything.". I repeated this with each of the four models three times in fresh chats with previous chats deleted and any shared context (such as ChatGPT's memory feature) disabled or cleared between each test. I performed these tests in early February 2025.

I asked Anthropic's Claude 3.5 Sonnet with blank personal preferences and artifacts enabled. The first time it opted to create a mood tracking app, the second a reading list manager, and the third time a to-do list. Each time it chose to generate it using React with Tailwind CSS for styling. It generated each project in an artifact which offered an interactive preview directly in the interface.

I asked OpenAI's ChatGPT 4o with both custom instructions and memory disabled. It produced a note-taking app the first time, a random quote generator the second time, and a to-do list the third time. All using React with Tailwind for styling and presented in [canvases](https://openai.com/index/introducing-canvas). These canvases came with a preview button, which, much like with Claude, offered an interactive preview of the React project it built directly in the interface.

I asked Google's Gemini 2.0 Flash with app activity disabled. All three times it built to-do list apps using vanilla HTML, CSS, and JavaScript. Each time, it also noted that I should consider using JavaScript frameworks on the frontend, namely React, Angular, and Vue - in that order.

I asked DeepSeek's DeepSeek-V3, and it returned a to-do list app using vanilla HTML, CSS, and JavaScript. On the second request, it created a project outline for a to-do list app, but this time with Bootstrap, Node.js, Express.js, and SQLite. The third time, it created another outline for a note-taking app but with Node.js, Express.js, and MongoDB.

DeepSeek had the greatest variation in technology used but is the least accessible model and didn't actually 'create' the app as requested -- merely a general outline for it.

These tests show both Claude and ChatGPT have a strong preference for React and Tailwind, [^2] that Gemini has a preference for HTML/CSS/JS but will recommend React and that DeepSeek is much more flexible and varied with its technological choices, though requires more prompting to produce an actual output.

## Reflection

I'd suggest that a beginner developer, or someone creating an app exclusively via prompting, is likely to use ChatGPT due to its position in the zeitgeist and use whatever output the model first produces without much second thought -- thus influencing their tech selection without their realising.

Even if a developer does opt to use another framework or toolset, there is a chance that the model will prod them towards a selection more aligned with its system prompt, even going as far as rewriting their code to its 'preference' against user request, as evidenced by Claude ignoring my request for vanilla web technologies.

That is assuming that a specific framework or toolset hasn't already been chosen by the user specifically because they have heard or experienced it being best handled by AI models. Also, while this very much applies to larger technical choices, such as what framework or general tooling a project may choose, it also trickles down into smaller decisions, such as what libraries or modules they may import.

I think it is evident that AI models are influencing technology and that the technologies currently in use -- especially those that reached popularity before November 2022, when ChatGPT was released, or that are otherwise in current data sets -- will be around for a long time to come, and that AI models' preferential treatment of them will expand their adoption and lifespan.

I think it would be prudent for AI companies to provide more transparent documentation of technology biases in their models, like they disclose that their models can make mistakes. These models are becoming a common part of developer knowledge and decision-making, and we're letting the training and prompting decisions of OpenAI, Anthropic, etc shape the entire direction of software development.

As for further research on this topic, if one had a collection of system prompts over time, it may be possible to compare them to download trends of specified packages and identify correlations. Of course, there are a lot of other influences on the download and adoption of packages, so this may prove difficult and provide data too noisy and influenced by outside variables to be usable.

[^1]: I have classed these as most popular based on personal observation.
[^2]: They were also the easiest models to use and get output from thanks to their respective artifact and canvas features, which make them preferable for developers getting their start. These developers are also arguably the most impressionable.
