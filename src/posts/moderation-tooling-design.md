---
title: Design Considerations for Moderation Tooling
description: Overview of thoughful and protective design of tooling for moderating user-generated content, placing emphasis on minimising the psychological effects of exposure to heinous content, while balancing efficiency, accuracy, and the long-term wellbeing of trust and safety teams. Covering techniques for the mitigation of impact where applicable.
og_description: Ensuring protection of the protectors.
pub_time: 2026-02-26
section: Essay
tags: [design, UI/UX, development, front-end development]
---

I have dedicated substantial amounts of time moderating communities on the internet. One of the duties I fulfil at [Stoat](https://stoat.chat) has been to moderate content, and in doing so I've seen a great number of horrific things. The sort of things that no person should have to see, but which nonetheless must be seen in pursuit of protecting users.

I have developed the most popular moderation bot on the platform, [AutoMod](https://automod.vale.rocks), and contributed to work on the internal moderation tooling and procedures. The accessible online coverage of design considerations for constructing moderation tooling intended to handle sensitive and unsavoury content is lacking; hence, the creation of this article covering, primarily, how to minimise negative psychological effects in the design of moderation tooling.

I wish to be clear; these are techniques for mitigation. Mitigation is reduction, not elimination. There is no baseline zero. Exposure to high-impact content is bad regardless of the situation, and the best we can do is minimise impact. When allowing user-generated content, it is a certainty that some people will abuse the system and do the wrong thing, and the job of a content moderator is to keep people safe from such occurrences.

> [!WARNING]
> This article covers a number of distressing topics. I strongly advise reader discretion.

## Automated Systems

Ideally, humans would at no point be exposed to egregious content, and offending content would be handled by machines in its entirety. As of early 2026, that is unfortunately not feasible, though there is potential for automated systems to contribute in part despite the problems.

Standard human-defined heuristics-based systems are rigid, and while they may provide a rough filter, they completely lack nuance. More complex machine learning, or artificial intelligence-based systems, have proven extremely popular, though are largely disliked by users due to concerns regarding privacy and effectiveness. There is also great potential for introducing further-reaching problems, as discussed in [Algorithmic content moderation: Technical and political challenges in the automation of platform governance](https://journals.sagepub.com/doi/10.1177/2053951719897945) <sub>(Gorwa, Binns, & Katzenbach. 2020)</sub>.

In extremely plain and obvious cases, ML/AI detection systems are often effective and work well for identifying content and removing it without requiring human intervention. However, they aren't perfect. AI systems cannot necessarily detect the context or nuance. For example, they may fail to discern rough, consensual sex from rape or a youthful-appearing of-age woman from a mature-appearing underage girl.

Violating content being flagged as acceptable is extremely detrimental, and content being incorrectly flagged can be extremely disruptive and distressing for the accused. Further, reported content is often _extremely_ sensitive in nature, so privacy is beyond paramount. The benefits are not to be ignored, though. Completely automated systems come with the benefit of being able to work faster than any human possibly could, allowing particularly egregious or illegal material to be purged before it has the chance for any user exposure.

Separate from entirely automated action, which remains flawed, is assistive automation. A confidence score could, for example, be assigned to content and provided to moderators so they can make informed decisions quicker, limiting exposure and workload.

## Blurring and Obscuring Content

Method of content delivery has significant effect on the impact. Compare viewing a film on your phone to viewing a film in theatres.

Visual size, resolution, clarity, and other such factors influence how we respond to content. This effect has been evaluated in [Fast, Accurate, and Healthier: Interactive Blurring Helps Moderators Reduce Exposure to Harmful Content](https://mattlease.com/papers/das_hcomp20.pdf) <sub>(Das, Dang, & Lease. 2020)</sub>. The paper found that giving moderators a blur slider or mouse-over reveal significantly reduced emotional strain while maintaining normal speed and accuracy.

This impact is notable as adjustable content blurring is a simple measure to implement and has significant benefit. A more complex approach can be achieved with machine learning systems, which may take action on specific regions of interest so that content can be acted on without direct exposure. Other visual considerations, such as rounding the corners of media so that it is viewed in context or presenting it in greyscale or a desaturated colour profile, can also provide benefits, as is discussed in [Testing Stylistic Interventions to Reduce Emotional Impact of Content Moderation Workers ](https://ojs.aaai.org/index.php/HCOMP/article/view/5270) <sub>(Karunakaran & Ramakrishan. 2019)</sub>.

Some reported media may come with audio. Tooling must not play audio by default, instead allowing it to be enabled if necessary. Audio is irrelevant for making moderation decisions in the majority of situations.

Where it is necessary, machine-generated textual alternatives, captions, or audio descriptions can be considered. Though extreme care must be taken for all previously mentioned reasons, including potential for hallucination. For example, a human moderator can verify a collection of media is infringing after only inspecting and confirming one, rather than needing to verify them all. This is a low-risk application that limits exposure.

## Content Classification

Moderators should be aware of the category of a report before being exposed to it. This can be achieved by having users select from a pre-defined list of categories when lodging their report, which, though not explicitly required by most distribution systems, is also optimal for grouping and managing reports more generally.

This data can be used to introduce appropriate variation in report handling. Handling multiple reports of the same type in succession avoids cognitive switching cost but can impact wellbeing -- especially if high-impact. Inversely, handling the same type of reports in succession can also lead to an outcome similar to [highway hypnosis](https://en.wikipedia.org/wiki/Highway_hypnosis) and lead to non-critical thinking when acting on reports.

In any case, moderators should not be performing extended shifts handling egregious content such as child sexual assault material (CSAM), grooming, harassment, sexual assault, or gore and other graphic violence. Though there are some individuals who are willing to do extended shifts, this should be specifically disallowed by the software to minimise cumulative trauma.

Moderators are also presented with cases of a lesser impact on mental health, including spam, ban evasion, malware, underage users, and impersonation. Moderation tooling should not serve moderators extreme content repetitively -- it should rotate.

## Expose Relevant Content Only

Though a service may have significant amounts of content associated with a given user, this should not necessarily be exposed to the moderator. Beyond the obvious privacy implications, exposure to content unnecessary to handling a given case should be avoided for a number of reasons.

The personal details of perpetrators or victims can lead moderators to investigative rabbit holes or personal fixation. Seeing a perpetrator's real name, location, or personal profile picture risks humanising them in a way that can lead to obsessive monitoring or vigilante feelings in moderators.

Moderators should not be acting on prejudice or biases, but it is unavoidable that it will happen. For this purpose, not presenting content unnecessary for handling the report can prevent changes for this to occur.

If a moderator deems more information necessary for acting upon the report, there should be a clear method to escalate and request further information. This avoids situations where necessary information is not immediately available and a case is therefore considered 'difficult' and handled improperly.

## Efficient Software

Where we cannot eliminate exposure altogether, we are best to limit the length of the exposure. We can do this with careful interactions and efficient software that minimises the amount of time moderators must spend on a report or case. Hotkeys and other workflow optimisers should be implemented.

Performance of tooling is paramount here. Content should load quickly, and pages should also be swift to navigate _away_ from. While this should be a baseline for any software, it is of utmost importance in this context. Making the application interface easy to use to prevent length of exposure. There is a balance here with making things convenient and exposed to the moderator while ensuring there is enough friction that no exposure is unnecessary.

As covered in [Wellbeing-Centered UX: Supporting Content Moderators](https://arxiv.org/abs/2509.07187) <sub>(Mihalache & Szostak. 2025)</sub>, efficient systems which take the aforementioned design considerations, such as reasonable exposure and preventing repetitive action, into consideration while enforcing appropriate mental health practices are of great importance. The paper also stresses the importance of moderation tooling being maintained and not being neglected or left in a scrappy state. Presentational specifics are more vital for moderation software than most other software.

## Visual and Auditory Design

The user interface of an administration panel must be visually distinct from common user interface themes. It is important that associations between moderation and other contexts are not fostered, as failure to do so can position the moderator to feel like the target of the content, rather than the reviewer. It can also cause them associative distress when using other tools with UI similar to the moderation tooling's design.

The interface as a whole should be designed in such a way that it presents 'data to process', rather than 'media to consume', like end-user-facing programs do. Commonly this is achieved with high-contrast interfaces with utility-focussed, brutalist design -- heavy use of borders and data-focussed layouts.

System sounds (pings, alerts, error buzzes) can become trauma triggers if they are associated with seeing egregious content. Sound, in particular, is very effective at establishing Pavlovian responses. For this reason, moderation tooling should be silent.

A primary goal in the design of moderation tooling should be to present a clear difference of environment and to avoid the creation of triggers.

---

For as well designed as tooling may be, it cannot comprehensively address or prevent the potential impacts. Content moderators exposed to extreme content can develop symptoms consistent with experiencing repeated trauma, as discussed in [The psychological impacts of content moderation on content moderators: A qualitative study](https://cyberpsychology.eu/article/view/33166) <sub>(Spence, Bifulco, Bradbury, Martellozzo, & DeMarco. 2023)</sub>.

In operating a platform with user-generated content, you have a duty of care to do right by your moderators. Not just in ensuring that tooling protects them, but also by communicating with them and directly ensuring their mental health. Content moderation is a job prone to anxiety, post-traumatic stress disorder (PTSD), detachment, burnout, and compassion fatigue, among other impacts.

This article hasn't covered solutions; it has covered mitigations. No person should have to be exposed to the worst of the worst content, but for as long as there are people who create and distribute such material, it must be dealt with.

By designing moderation tooling with care, good intent, and awareness of psychological impacts and knowledge of how to minimise them, we can act to protect people working to keep our platforms and communities safe.
