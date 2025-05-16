---
title: How I'm Using AI
description: An overview of my personal usage of Large Language Models (LLMs) and other generative AI from 2022 onwards. Tracking my experiences with AI tools, specific models (ChatGPT, Claude, Gemini, etc), applying them practically, and realistic perspective on their strengths and limitations over time, from coding attempts to language learning assistance.
og_description: As long as AI isn't using me...
pub_time: 2025-05-02
section: Essay
---

I thought it'd be very interesting to write about how I use AI and to keep track of that over time. The AI space is a fast-moving beast, and I think it interesting to keep tabs on how my usage changes. This post isn't entirely comprehensive but fairly representative.

AI is a divisive technology, and it has a lot of flaws. I'm not an AI evangelist, but I don't think it is a useless technology. I think we need more people being realistic about the technology and about how they can and do use it. This post is me trying to be part of the change I'd like to see.

## 2022

I referenced the output of GPT-3 via OpenAI's Playground prior to ChatGPT's release when writing assignments and spent a lot of time experimenting with the technology. I was conscious that GPT-3 was very limited in capabilities but that it was exciting and good for writing generic boilerplate.

I switched to using GPT-3.5 via ChatGPT's shortly after its launch. Fairly capable, but still extremely flawed.

I gave [Craiyon](https://www.craiyon.com) a test, but its output was a garbled mess and interesting only as a proof of concept.

## 2023

I experimented with DALL·E 2 for generating concepts and inspiration. It gave me a vague source of inspiration for some specific concepts that hadn't been explored before but was overall extremely poor in quality and not particularly useful.

I created [Jarg](https://jarg.vale.rocks) at this time to interact and experiment with models not yet available in ChatGPT for free users, such as GPT-4, though I kept using ChatGPT as my primary interface.

My main usage throughout 2023 remained testing, experimenting, and extraordinarily menial tasks rather than actual usage, though I could see genuine applications of the technology beginning to form and approach viability. I did find genuine applicable usage as a really good context regarding thesaurus and rhyme machine.

## 2024

In 2024 I began seriously using LLMs for code generation, although under strict supervision. I wasn't confident enough to permit them to work unsupervised, but I was happy to use them for generating one-off, non-mission-critical tools or for doing menial but verifiable tasks such as [writing regular expressions](/micros/20250320-1225). They do well with languages such as BASH, JavaScript, PHP, and Python, but I find them exceedingly poor for HTML and CSS.

I tried briefly to use LLM editor integrations such as GitHub Copilot but disliked the user experience. I felt I lost granular control over their actions and that they were sloppy in pulling in useful context when attempting to solve problems -- which was the main benefit as far as I was concerned. I continued to use web interfaces and copy in any necessary code. I tried LLM line completions but found them slow and inferior to non-AI implementations.

Mid-year, I moved over to Anthropic's Claude 3.5 Sonnet. Like many others, I found its coding abilities incredibly impressive, though was disappointed by its [continuous bias towards more complex technologies](/posts/ai-is-stifling-tech-adoption#system-prompt-influence) when I just wanted it to use HTML/CSS/JS. I remained using ChatGPT as a fallback when I ran out of messages thanks to its strict usage limitations.

I locally hosted several models, but my computer wasn't capable of running anything reasonable with any degree of speed.

I experimented with DeepSeek V3 and found it capable but inferior to Claude 3.5 Sonnet.

I tested Perplexity and found it interesting but prone to hallucinations and therefore completely unfit for use as a general search engine. ChatGPT Search was equally poor as a general search engine, but I found utility in ChatGPT pulling in web content to avoid the limitations of its knowledge cutoff.

Late in the year I began using LLMs for help with my Japanese learning. Mainly for the purpose of quizzing me on words and phrases or to converse with me and offer corrections as necessary. Language is the bread and butter of a Large _Language_ Model, and it did a very good job. I used [DeepL](https://www.deepl.com) on occasion to verify it wasn't just spouting rubbish, and it wasn't any of the times I verified.

## 2025

I switched to Claude 3.7 Sonnet when it released in February, though didn't find it a particularly impressive upgrade and noted it seemed a tad overzealous -- introducing unnecessary complexity and being too verbose. The remaining lack of web search capabilities left it feeling behind the curve.

LLMs continue to be poor in HTML and CSS with a huge amount of unnecessary complexity and massive accessibility flaws in their implementations. Claude in particular goes [way overboard with ARIA](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/#noariaisbetterthanbadaria).

In March 2025 I transitioned over to using Google's Gemini 2.5 models, which were hugely superior in most regards except for 'personality'. Their swift response times and fantastic use of web content makes them incredibly useful. Shortly after my switch to Gemini, I began informing it (and ChatGPT, when I occasionally use it) who I am, which [prompts it to pull in useful context](/micros/20250424-0345).

I tested ChatGPT's image generation (`gpt-image-1`) via ChatGPT and found it very impressive, but I don't have a need for image generation and found that its images tend to have a certain undesirable look, even when trying to avoid it.

In April I began using Gemini's writing editor Gem for getting feedback on my grammar and flaws. I disagree with many of its suggestions and find it often tries to neuter any character, but it does act like a fresh pair of eyes and points out structural issues.

I love writing, and I _don't_ want an LLM to do my writing for me. However, I do appreciate it providing feedback like a human reviewer would. Things such as picking up on wordiness or less-than-ideal grammar are fantastic use cases.

Towards the conclusion of April, [I began experimenting with the freshly released Qwen3](/micros/20250429-0321). It is the first model I've found that runs reasonably locally on my laptop and has output worth using compared to current flagships.
