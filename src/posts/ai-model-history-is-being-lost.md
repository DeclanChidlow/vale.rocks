---
title: AI Model History is Being Lost
description: We're losing vital AI history as properitary, hosted models like the original ChatGPT are retired and become completely inaccessible. This essay examines the rapid disappearance of proprietary AI systems, why preservation matters for research and accountability, and the challenges in archiving these technological milestones. A critical look at our vanishing AI heritage and what it means for future understanding of this transformative technology's development.
og_description: Models are being retired and history is going with them.
pub_time: 2025-03-16
section: Essay
---

I fear that we may lose -- and are already losing -- the modern history of AI, particularly with regard to the ability to use models that are/were only available in hosted capacities. As AI models are retired and become inaccessible, we're losing crucial historical context about AI development that we will be unable to go back and reference in the future.

This essay examines the disappearance of proprietary hosted AI models and the implications of that on research, accountability, and overall historical documentation and preservation.

I fear this is a very under-analysed topic, with [New methods for deprecating artificial intelligence systems will preserve history and facilitate research](https://www.nature.com/articles/s41467-024-54758-1) <sub>(Johnson T, Obradovich N. 2024)</sub> being the only notable discussion I have found.

> [!NOTE]
> OpenAI calls models that are no longer available for usage 'deprecated,' while Anthropic reserves that term for models that are only available for existing users and uses the term 'retired' for models that are no longer available in any capacity. For the sake of clarity, I'll refer to them as retired or non-hosted models.

## What We're Losing

We are losing proprietary AI models only available in hosted capacities without much hope for preservation. The unprecedented speed of AI development has unfortunately also spurred an unprecedented speed of discontinuation. We are not just losing large language models but also image/video generation[^2] and audio models.

For instance, the launch of ChatGPT in 2022 is and will remain a notable event for its influence on the public perception of AI. ChatGPT launched with a model fine-tuned from GPT-3.5. This model isn't available for the public to use anymore -- it is gone, remaining in our minds, in news reports, and in papers, but unavailable to be used.

It cannot be tested or experimented with, and we cannot evaluate it or run fresh benchmarks to compare it with new, emerging models. It is a fundamental part of the history of large language models that is completely unavailable. We will not be able to go back and inspect the early days of AI like we do the early days of computing. We've very much entered a period of technological advancement where the original technology is unavailable for inspection and only available via the artefacts it produced and writing it provoked. [^1]

OpenAI has already retired a wide array of their own models and plans to retire more, [as evidenced by their deprecations page](https://platform.openai.com/docs/deprecations). Anthropic is the same, with [many of their models having hit the end of their life cycle](https://docs.anthropic.com/en/docs/about-claude/model-deprecations).

Especially because so many changes are quick and iterative, I fear there is not sufficient inclination to preserve each step and snapshot, only the final product, and often not even that by the time the next model comes around.

Even now we see that older models are mainly only kept around to avoid breakages and inconvenience, not for the sake of preservation. It is a technology evolving just as fast as it is disappearing.

Thankfully, there are models with open weights and sources that one can host themselves and are thus unaffected, but these don't represent proprietary models that _are_ only (or _were_ only) available in a hosted capacity. Open-source models only represent some of the overall progression of model development; it's just part of the picture.

## Reasons for Retirement

There are numerous reasons a model is retired. The most plain is that the model is inferior and has been superseded. Beyond that, there are plenty of other reasons, including legal considerations, reputational risks, and the maintenance burdens.

From a legal standpoint, the training of AI models on copyrighted content continues to be a point of contention, and some models are more prone to leaking or regurgitating content verbatim, which prompts their hurried retirement.

The same is true for models that lack comprehensive safeguards, engaging in illegal or morally dubious activities, such as informing users how to create pipe bombs, which are a reputational risk to the company and their products.

Then there is the case of the maintenance burden involved with keeping obsolete models around and hosted, often at increased expense and compute compared to newer, more capable models. This compounds with the risk that users may opt to cling to 'undesirable' models when superior ones are available, which could act to make a company look bad and isn't advantageous from a business perspective.

These all create incentive for AI companies to dispose of their history and helps them skirt accountability. You can't verify facts with a model you can't test.

## Why It Matters

Whether you like artificial intelligence or not, it has influence on our culture and will continue to. It is a transformative technology that is important to document and, to some extent, preserve for the future. It is important for the sake of research, education, benchmarking, analysis, and general historical documentation. Things are moving with swiftness such that models are not comprehensively documented during their life cycle.

Should somebody wish to test, compare, or document the progress of AI, they're limited. Benchmarking progress and understanding development paths for research purposes is important. An independent cannot compare a retired model to a new one.

There is a risk of 'technological amnesia' where we lose context for how we arrived at current AI capabilities and the failings that have already been identified. As the quote goes, 'Those who cannot remember the past are condemned to repeat it.'

Being able to simply retire models and have them disappear also reduces accountability by removing access to that which may provide bad press and leaving third parties unable to track biases and behaviours across generations of models.

I have no doubts that models in the future will be very different from the ones we have now, and I can foresee that there will be things that we wish to compare and contrast, but that won't be possible. It stands to reason that, in hindsight, there will be characteristics discovered that we will wish to analyse in older models. This might not be possible.

I don't know what models will look like in a few months, let alone years from now, nor what the application of models will look like. Given the rapid pace of development in the AI space, I don't think it is realistic to make assumptions about what forms AI will take in the future, which makes the ability to run retroactive tests all the more important.

Completely retiring models also makes them unavailable as artefacts from a cultural perspective. People collect, play with, learn from, and continue to experiment with old technology -- both hardware and software. We are moving towards a lineage of models completely removed from analysis in this style. Will future generations be able to go back and experience early proprietary models for themselves?

## Solutions

Johnson and Obradovich argue that it could be ensured that 'commercial developers of LLMs do not face penalties for providing ongoing access to outdated models' and that models could be deployed upon request and 'Users, reasonably, would need to fund this monitoring and pay the costs associated with gaining access to outdated models.' As they note, this cost would introduce a barrier to entry likely sufficient to prevent issues with people using models without appropriate reason.

While they are reasonable suggestions, I don't think they are realistic suggestions.

I don't think we should expect legal change to accommodate these models, [^3] and even if there was an embargo, what incentive would AI companies have to do this? I've already outlined [the reputational risks](#reasons-for-retirement).

There is also the case that access would be restricted exclusively to those with the finances and position to enter such an agreement, which could cause issues if a company refuses to permit access (such as to a journalist aiming to do an exposé). I also think it would be a shame if history is restricted only to those with the necessary finances.

They also propose other suggestions, such as a public or third party designated to host the models and benefiting from economies of scale, but I can't see these being financially viable. I'm not convinced demand is, or will be, high enough to justify it.

In my mind, open sourcing models would be the best solution from a preservation standpoint (as they also note), but companies have no real incentive to do so. It doesn't benefit them, [^4] and could very well aid their competitors if newer models haven't sufficiently diverged and thus obsolete ones still contain some 'special sauce.' Even if retired models were available to be hosted, there is a good chance that consumer hardware would not be equipped to handle them.

There is also the possibility of replicating models, such as what EleutherAI is doing with their [GPT-Neo](https://researcher2.eleuther.ai/projects/gpt-neo/) project, but that is replication which isn't representative and is not archival of the original.

There unfortunately isn't a single clean solution -- at least not one that I can see -- but I think the issue is evident.

---

We are in very much early days at the moment, and retirement hasn't yet shown much negative impact from a historical perspective, but what will the story be in five years? What about in a decade? How about a century from now?

Will our AI models be lost to time? We will still have the papers and analysis, but we likely won't have the models themselves unless something changes, and I think that is an unfortunate loss.

[^1]: Similar is true for other software that was offered as a service or that depended on a server. See projects such as [Stop Killing Games](https://www.stopkillinggames.com).

[^2]: People are already going out of their way to specifically use old models for their abstract, non-Euclidean, and ethereal stylings.

[^3]: Not least because many early models lack proper safeguards and gaolbreak protections, which permits the generation of illegal content. Governments seem to be working towards censorship, not away from it.

[^4]:
    Perhaps the largest benefit of open sourcing a model is acquiring talent. The other is helping with exposure. The big players are already big players. They're known, and talent is already drawn to them. There is also the benefit of attracting users that will experiment and work on the model for free. This isn't necessary given just how much

    Meta open-sourced their Llama models, but it wasn't benefiting their competition. Their models were not better than what was available, so couldn't be used to improve other language models. It also reduced the moat of competitors, but the leaders already have a moat, so this is a moot point. It also has a chance to entice people to their models and keep them there when they close them off, but why do this when you already have people captured?
