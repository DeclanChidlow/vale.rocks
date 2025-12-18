---
title: You Can't Opt-Out of Accessibility
description: A rant of frustration about accessibility being a undervalued yet critically important part of building digital experiences. Complaining about the industry's apathy and the true human cost of neglecting accessibility.
og_description: Shiny exclusion all the way down.
pub_time: 2025-12-18
section: Rant
tags: [accessibility, development]
---

I'm frustrated, and I'm angry at the state of accessibility on the web. I'm usually not much one for profanity, but I'm fucking pissed off.

I've been worn down slowly by thing after thing -- death by a thousand cuts. I feel powerless and overwhelmed, and I'm dismayed to know I'm not the only one feeling as such.

Accessibility is so fundamental that this shouldn't even be a post I feel compelled to write, yet I feel like some fanatical obsessive whenever I have to try convince someone to do something as simple as care about their fellow humans.

## A Lack of Value

There is a look that certain individuals give you when you explain that a slightly different approach would be optimal for accessibility or that some changes are necessary. It's a sort of sneer. The same thinly veiled look of discontent that one might pull while subtly investigating the dog poo smell originating from the base of their shoe as they arrive at a dinner party.

They rarely say it aloud, but they're thinking, 'Who cares?', 'What does this matter?'. I get a look that implies I'm naïve for even suggesting accessibility to be a consideration. As if accessibility is some nerd thing that I'm juvenile to even proffer in serious work.

I'm conscious I've had clients turned away from me because I've put such an emphasis on accessibility. I've seen the look on their faces and felt the wind leave the sails of the conversation as I make it clear that accessibility isn't something I compromise on.

I take pride in my work, and creating something inaccessible is not something I can be proud of in good conscience. Inaccessible work isn't a minor inconvenience or something to be fixed later but is a strict blocker. _An inaccessible product is a broken product._

Yet, even the people who write the standards seem to have forgotten this, as we saw with the [CSS carousel fiasco](/micros/20250524-1145), which prioritised developer convenience over essential inclusive practices. The problems still haven't been addressed, and the Chrome team [only continues to double down](https://developer.chrome.com/blog/accessible-carousel).

Alice Boxhall [has gone into great detail](https://alice.boxhall.au/articles/a-threat-model-for-accessibility-on-the-web/) about how standards have neglected to ensure accessible content and how great and continued efforts from accessibility professionals to identify failings and address problems have been approached not with intent to improve, but with a desire to disprove.

No accessibility professional is offering this advice with even a hint of malice, and yet heels are dug in against them. Perhaps the entire industry is so jaded and cynical that the idea of someone genuinely caring and acting without ulterior motives seems an impossibility.

After years and years of successive abstractions, we have prioritised the comfort of the person writing the code over the survival and agency of the people using it. _Innovation that excludes people isn't innovation; it's just shiny exclusion._

Accessibility is _everyone's_ responsibility, always. It should be baked into every part of the process. From the initial concepts to the design to the development, through to testing, it is as much a part of building something as 'building something'. Accessibility should be ingrained in every fibre of every step, process, and output such that it is inseparable. You can't bake a cake without flour and expect to add it later.

There must be no bystander effect, where everyone else expects someone else to do something. Nobody should expect someone else to make the system accessible or for accessibility to be some part of another process. Each person, team, process, system, checkpoint, sprint, etc, must take action and contribute, not idly sit around hoping someone else steps up.

## Universal Design

A common rebuttal I hear is that accessible design is ugly or boring. This is a lie told to excuse poor craftsmanship. More than anything, the inability to design or develop accessible content reflects on one's own poor skills and inability. A significant portion of the time, improving accessibility improves the experience for everyone.

Take closed captions. They're usually created with the intent to be used by deaf and hard-of-hearing people, but they help people in noisy situations or when audio isn't an option. Take sloped footpaths. Originally intended for helping people with mobility aids, they're extremely useful for wheeled recreational devices, people with luggage, strollers, and more. Take alternative text. Usually provided as a textual alternative to visual content, alt text can often be used to gain context or further information.

If your creation caters to people with cognitive disabilities, then everyone gets a more intuitive experience. If you design with good contrast, then you help the user looking at a screen in the glaring sun. If you implement the ability to switch between light and dark palettes, then people can choose whichever option they prefer. Accessibility work may be done for addressing the needs of those who need it but it ultimately raises up everyone.

Accessibility is to the benefit of all.

## Setbacks and Legal Mandates

For every foe vanquished in the pursuit of accessibility progress, two more seem to throw their hat in the ring to drag it back once more. Take the case of OpenAI telling everyone to [add ARIA](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq#h_30e9aae450) rather than to just adhere to semantics -- violating [the first rule of ARIA](https://www.w3.org/TR/using-aria/#firstrule). Or take the countless and infuriating cases of ['accessibility' overlays](https://overlayfactsheet.com/en/) rearing their ugly heads with tactics of deceit.

Trying to get anywhere with accessibility is the Sisyphean task of forever pushing a boulder up a mountain, except there is a further team of people inventing new and novel ways to make a quick buck while pushing it back down.

In the face of enterprise neglect, we've seen digital accessibility become more and more of a legal mandate. The European Accessibility Act (EAA), the Americans with Disabilities Act (ADA), and [other such legislation](https://www.lflegal.com/global-law-and-policy/) demand some level of digital accessibility where companies are otherwise completely content to disregard it. Requiring experiences be accessible is no doubt a good thing, but only when it brings about genuine, positive change.

Unfortunately, companies have adopted these baselines as the ceiling, not the floor. With intent driven by avoiding lawsuits rather than addressing problems, a culture of checkbox compliance is fostered. What represents the absolute bare minimum is rarely exceeded and is infrequently even met at all, leaving many disabled users with vaguely or 'technically' functional but deeply suboptimal experiences.

You can try an angle of explaining that a more accessible product means more potential users or that an accessible product is fundamentally better for each and every user, but to convince someone who is set in their ways to change their mind is a difficult thing.

It is nigh impossible to convince someone without compassion to care. You can hit them in the coffer, but the impact of that is negligible when they can take it on the chin. A small fine to a big organisation can be addressed as little more than a cost of doing business, not a reason to make actual changes. Malicious compliance is the frequent outcome.

Frankly, the appeal to the bottom line shouldn't be necessary. The 'business case' ought to be irrelevant in the face of the human cost.

## The Cost of Indifference

Let me tell you who pays the price for accessibility negligence.

I spent some time configuring some assistive technology for a man with motor neurone disease. Almost completely paralysed, his eyes are the only computer input available to him. From the discomfort of his wheelchair, he could poorly and imprecisely focus his gaze on specific positions on the screen of an expensive and specialised tablet to make inputs. Each individual 'click' costly in time and effort.

When your life is measured in days and weeks, each fleeting moment is a significant portion of one's existence. When you're unwell and slowly dying, each morsel of effort and each individual decision is physically draining. A less than optimal interface is not a minor inconvenience but a direct cause of physical exhaustion.

After helping him for a little while, I very briefly had to disable some accessibility technologies on another computer he no longer had the capacity to operate. We'd been at it for a while, so he was tired and drained when he recaptured my attention with a strained, borderline unintelligible groan of my name. When I turned my attention to his screen, I found that he had written, painstakingly, letter by letter, 'thank you Declan'.

Now, look me in the eyes and tell me that accessibility doesn't matter. Look him in the eyes and tell him accessibility doesn't matter. Tell the billions of people on this planet who require accessibility considerations directly to their face that accessibility doesn't matter. Tell each person that you don't care. Tell each person that you don't feel the need to consider them and that you can't be bothered to do the bare minimum for them.

Look each one of the billions of people you're betraying in the face and tell them that they don't matter enough for you to give them the slightest modicum of dignity or care.

But don't you dare -- don't you fucking dare -- make up an excuse. Don't try to justify your betrayal of them. Make the necessary changes and do better.

Six months prior, this man was fully able. Now he is stuck in his body. What is to say that a similar event doesn't happen to you? You may currently be able-bodied, but what is to say that age, illness, or other circumstances beyond your control don't change that? Do you want to find yourself in a world that has turned its back on you, or to find that people care and have built a world that welcomes you? It is up to you to create a world that would care for you in this situation, not one that will leave you by the wayside.

## Solutions

I will not kid you that accessibility is easy, for it is often difficult (in no small part due to the industry's deprioritisation and animosity). There are many moving parts and so very much to learn. I struggle to create accessible work myself and am conscious that nothing I create will be [perfectly accessible for all people](https://adrianroselli.com/2025/12/you-cant-make-something-accessible-to-everyone.html). However, in the face of adversity, we do not give up; we persevere -- we adapt to overcome the challenges. We do the best we can with the cards we are dealt. We care because it is the correct thing to do.

You can hire dedicated accessibility professionals (auditors, consultants) from the start. They are frequently underpaid and underappreciated. You must pay them what they are worth. There is a common rhetoric that even large organisations lean on: 'If you don't like it, show us the right way to do it'. This is all well and good, but they should be paid for their service, as you'd pay a UI/UX developer to fix an interface or a product manager to lead a team.

You can bake accessibility into every process. Accessibility is not an afterthought or a 'fix it later' step. It must be baked into every phase from initial concept and design through development and launch. A coat of paint over a rusty frame might look okay, but it'll very quickly flake off.

You can educate yourself and those around you. Resources created by the brightest and most caring minds are plentiful on the web. Both free and paid courses can give you or a team you lead a strong foundational grasp.

You can consult actual people on how to make improvements. Stop relying on lazy, [performative personas](https://ericwbailey.website/published/on-inclusive-personas-and-inclusive-user-research/) or sloppy overlays. Test your products with actual people who use assistive technologies. Developers should not only be testing with assistive technologies such as screen readers but must also know how to use them proficiently. There exists not an automated test suite in this world that is equivalent to the actual experiences of human people.

You can remember that accessibility is everyone's responsibility, always. It is not the job of some unknown other.

Accessibility matters, so give a damn, embrace it, and start enacting change.

<br>
<br>

<small>_With thanks to [Eric Bailey](https://ericwbailey.website) for his feedback on a draft of this post._</small>
