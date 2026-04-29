---
title: AI Terminology is Poorly Defined and Oft Misused
description: Words and terms used when describing artificial intelligence are often misused, inaccurate, or generalised to the point of losing all meaning. How terms like 'LLM', 'Agent', and 'AGI' have lost meaning and turned into semantically meaningless buzzwords that are applied liberally without care or appropriate intent, leading to unnecessary confusion and unnecessary need for clarification.
og_description: Did that stand for 'Apologetic Interface' or 'Algorithmically Incoherent'?
pub_time: 2026-04-28
section: Essay
tags: [AI, LLMs]
---

Tune into any discussion of the technologies widely referred to as 'artificial intelligence', and you'll find that terminology is all over the place. Language is forever fluid and evolving, and with a field as quickly moving and with as much marketing influence and buzzwords as artificial intelligence, it isn't surprising that things are a mess.

What was a deeply technical community with generally agreed-upon terminology was largely burst open with the wide release of ChatGPT. Suddenly, a lot more people were exposed to modern AI, and marketing-led commentary thrust a deeply technical topic haphazardly into simple terms. Now we're stuck with a linguistic debt.

I'd suggest part of this is due to resources. With most major systems, progress is slowly made with resources coming along with it as well, and then a takeoff happens. With AI, the takeoff happened concurrently with the creation of resources aimed at the general public, so natural selection didn't have time to occur before adoption.

Te ultimate purpose of any jargon is to simplify communication. Rather than saying something super complex and informative, such as 'Large-Scale Transformer-Based Natural Language Pattern Recognition and Generative Model', we say 'large language model', and rather than 'large language model', we say 'artificial intelligence', and rather than 'artificial intelligence', we say 'AI'.

The International Standards Organisation has made an effort to standardise terminology in [ISO/IEC 22989](https://www.iso.org/standard/74296.html), but things are still lacking, and confusion is common.

## AI

AI in general is poor as a term. It is pointlessly broad. The term 'AI' is used to refer to the non-player opponents in Super Mario Kart and ChatGPT with little distinction. Some people go to the lengths of always specifying 'generative AI', but even that is poor. Most AI is arguably generating _something_.

AI is a buzzterm that companies want to see, so it is applied everywhere without discretion. What does it even mean for a washing machine to have AI? At a certain point, a word is so broadly used that it doesn't mean anything.

## LLM

'Large Language Model' is a specific term but is used generally. When people are discussing LLMs, they often mistakenly refer to the interface itself. For example, ChatGPT, Claude, or Gemini. These are offerings which house multiple models of differing types. They're presented as a single interface, but behind the scenes there are multiple parts at play.

Commonly, people are not referring to LLMs in isolation but instead wrapped up with other technologies, tools, or models. This is messy, because there is Anthropic's Claude, the interface, and Anthropic's Claude, the set of AI models including Claude Opus, Claude Sonnet, and Claude Haiku. Likewise, there is Google Gemini, the interface, and Google Gemini, the set of AI models, including LLMs, vision models, and image generation models.

To use ChatGPT as an example, you're interacting with an interface. ChatGPT itself is not a 'model' per se but instead a wrapper to interact with models[^1]. When you make a request in ChatGPT, your message is fed to a model router, which determines which model it should be forwarded to. GPT-5 is architected to contain multiple different levels of 'thinking'. There is also a step where the result is evaluated and moderated.

It can also call on 'tools', such as tools to query the internet, interact with external applications, or generate images. When it generates images, it takes the user-provided prompt, runs it through an LLM to understand how to handle it, then feeds it through the actual image generation model.

The term 'LLM' doesn't adequately describe the multi-modality of most AI systems in use today. Commonly, one model can handle not only text but also other media inputs. Different terms have been proposed, such as LMM (Large Multimodal Model) or Foundation Models, but their usage is uncommon.

It also doesn't really specify the size of the model. 'Large language model' is the commonly used term for language models of all sizes. Small Language Models (SLMs) are models that are smaller in scope and scale than LLMs but are often regarded under the LLM banner for ease of description. Just 'language model' would be the most fitting title but has become a bit generic. A very basic Markov chain is arguably a language model, but no reasonable person would consider them anywhere comparable to even a small language model. The issue is only exacerbated by the reality that the size of models is ever-increasing, so what used to be an LLM could be argued to be a SLM now. There is no defined cutoff.

## AGI & ASI

'Artificial General Intelligence' and 'Artificial Superintelligence' are popular terms for describing advanced AI systems, but everyone seems to have different criteria.

The [AI effect](https://en.wikipedia.org/wiki/AI_effect) is alive and well. If you showed someone in the 1950s our current technology and an LLM, they'd probably take it as full computer intelligence. It'd likely be difficult to convince them otherwise, even when presenting them with details. Does this make our current AI AGI/ASI?

Maybe? There is no real widely agreed upon definition. One person's AGI is another person's GPT-3. ISO/IEC 22989 defines it as a 'type of AI system that addresses a broad range of tasks with a satisfactory level of performance', following it up with the note that 'AGI is often used in a stronger sense, meaning systems that not only can perform a wide variety of tasks, but all tasks that a human can perform.'.

I'd suggest that AI systems have been able to address a 'broad range of tasks' to a 'satisfactory level of performance' for a while now. The addressing of a potential interpretation that AGI can perform 'all tasks that a human can perform' opens further questions. Humans are physical, and many tasks we do involve physical interactions. I interpret this as the definition meaning that AGI would require a physical manifestation.

The October 2025 paper, [A Definition of AGI](https://arxiv.org/abs/2510.18212), attempted to come to a definition. They put forward the definition: 'AGI is an AI that can match or exceed the cognitive versatility and proficiency of a well-educated adult.' I take issue with this. How does one measure cognitive versatility and proficiency? Humans have tried to quantify intelligence with measures such as IQ, but it is an impossible task. IQ is a (rather flawed) measure, and having a high IQ does not necessarily indicate being well-educated. What is a well-educated adult? There is so much variation in people.

A highly educated person is rarely highly educated in many fields and certainly not in all fields. AI models can fail simple spatial and logic puzzles, yet solve complex mathematics problems that humans cannot manage. A person can be poor with computers but extremely skilled at writing. 'Well-educated' is an extremely subjective measure to the point of being useless as a checkpoint or definition.

## Vibe Coding

Andrej Karpathy coined the term 'vibe coding' in early 2025:

<blockquote cite="https://x.com/karpathy/status/1886192184808149383">
There's a new kind of coding I call "vibe coding", where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. [...] I ask for the dumbest things like "decrease the padding on the sidebar by half" because I'm too lazy to find it. I "Accept All" always, I don't read the diffs anymore. When I get error messages I just copy paste them in with no comment, usually that fixes it. The code grows beyond my usual comprehension, I'd have to really read through it for a while. Sometimes the LLMs can't fix a bug so I just work around it or ask for random changes until it goes away. It's not too bad for throwaway weekend projects, but still quite amusing. I'm building a project or webapp, but it's not really coding - I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works.
</blockquote>

As the coinage gained popularity, it transitioned into being used by some people as a catch-all term for any LLM-assisted development. This is a case of semantic broadening, which is typical in language, though this was a particularly swift instance.

Many people use 'vibe coding' in its original definition, many people use it just for LLM-assisted development in general while being aware of the original definition, and many people are unaware of the original definition at all. Like much of the rest of AI terminology, this makes the term a mess in usage, with different people interpreting it wildly differently. Those who use AI for assistance in writing code are often branded 'vibe coders' just the same as those who slop out all their code with AI without checking it.

## Agent

'Agent' and 'agentic' have been the follow-up buzz terms in tech circles following the saturation of 'AI' as a term. Generally, an agent is presented as an AI system which takes action like a human using human mediums, but as with seemingly all AI-related terminology, the specifics are fuzzy.

Simon Willison [describes agents](https://simonwillison.net/2025/Sep/18/agents/) by saying: 'An LLM agent runs tools in a loop to achieve a goal.' I think this is the best definition to date, but there are still many other interpretations out there, and people can opt to apply it in other contexts.

'AI Agent' is the buzz phrase that one-ups 'AI', so marketing sees that it is applied widely and broadly. Much like the term 'AI' itself, 'Agent' has been applied so liberally that it has lost meaning. 'Agentic Toilet' is meaningless technobabble marketing speak.

## Open-Source & Open-Weights

There are some open-weight AI models, which can be run and used locally on one's own compute. This is often confused with a model being open-source. Some people state that open-weight models are open-source, mistakenly arguing that open-weight is the closest thing.

Open-source models do exist, though are fairly uncommon. They include the training data, the training code, the full weights, and a permissive licence. If you wanted to, you could dive in and modify an open-source model at any step during its creation. Open-weight models are much more common but only provide the weights. Your only options for modification are upon the final result, and you're more limited regarding what you're permitted to do.

It is the difference between receiving a pre-baked cake you can decorate (fine-tune) and eat (host) as you wish, but whose creation remains a mystery, versus receiving the recipe, the raw ingredients, the kitchen utensils, and the total freedom to bake it yourself from scratch.

The Open Source Initiative has tried to clarify the difference by publishing [The Open Source AI Definition](https://opensource.org/ai/open-source-ai-definition) and [clarification on open-weights](https://opensource.org/ai/open-weights) to middling success in swaying the zeitgeist.

## Anthropomorphising

With a technology that is built to replicate (or replace) and mimic human output and intelligence, it is no surprise that people treat it like a human.

Read any mainstream media coverage, and you'll see AI offerings treated as humans. In 2025, when Grok was called out for generating non-consensual sexual imagery en masse, including of minors, [news outlets turned directly to the AI model for comment](https://arstechnica.com/ai/2026/01/no-grok-cant-really-apologize-for-posting-non-consensual-sexual-images/). It may speak like a human, but an AI model is not one. To quote the 1979 IBM Training Manual: 'A computer can never be held accountable. Therefore a computer must never make a management decision.'

If we're taking issue with anthropomorphism, then machine _learning_ is a misnomer as well, as machines cannot 'learn'. 'Training' fails for the same reason. Thinking and reasoning models cannot 'think' nor 'reason' in the human sense. They cannot 'hallucinate' -- 'confabulate' would be a more apt term but somewhat falls victim to the same anthropomorphism.

We use biological metaphors (learning, neurones) for mathematical processes (gradient descent, weighted matrices), which invites the public to misinterpret maths as magic. We reach for biological metaphors because they are what we experience ourselves, are easy for the layperson to understand, and have applicable terminology, even if not entirely accurate.

Companies have much to benefit from AI being anthropomorphised. Models are intentionally designed to drive user engagement and build emotional connections. Not only are having 'emotions' and 'opinions' beneficial to human interaction with AI models from a utility perspective, but they also keep users engaged. Many people consider themselves to be in relationships with AI and are distraught when their 'personalities' are altered. They are locked in, because to leave means to 'kill' their partner and their bond. Even people not in that deep will still speak of their favourite model with affection. Claude (which is a human name) is often spoken about like a development friend rather than a development tool.

Even if we were to collectively act against anthropomorphising machines, then what terminology do we use instead? It is extremely difficult to succinctly describe these words we use for human experiences, given that all our language is designed specifically around the experiences of living beings. Do we create new language entirely to address these points? I think we're so far along now that even if new terms were devised, it would be near impossible to transition people to them.

---

Terminology is messy. There isn't a way around that. Language is a flowing, moving, undulating mass of entangled ideas and concepts. To attempt to straighten it and force it to conform to a design is a fool's errand. However, if we can't come up with specific definitions, then it makes regulation and policy difficult. It spurs miscommunication. It makes every explanation longer and requiring of a definition lest confusion arise. Even in technology circles, terms are used fast and loose. What hope is there for people outside the tech sphere to understand?

I think the only way this would realistically be cleared up is if major AI companies collectively agreed upon given technology, but that seems extremely unlikely. You certainly aren't going to convince people to stop anthropomorphising AI.

[^1]: The models used by ChatGPT are slightly altered versions of the main ones and are available via the API. For example, [GPT-5.3 Chat](https://platform.openai.com/docs/models/gpt-5.3-chat-latest)
