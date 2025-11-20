---
title: I Got A Flipper Zero
description: My review of the Flipper Zero and the things I've done with it. Encompassing everything from the initial purchase to setup and usage, as well as the community and some cool projects.
og_description: A fantasmagorical planet flipping oracle.
pub_time: 2024-06-14
mod_time: 2025-11-14
section: Review
---

I like computers, and I like tinkering. I also don't mind stretching rules a little if it means I can do something not intended. I've burnt hours customising CFW on consoles, tinkering with the inner workings of computers (not always mine), and gaolbreaking iPhones.

I've been a fan of the sort of stuff [Hak5](https://hak5.org) produces for a while, but I'm no professional pentester, and I honestly can't see myself using their offerings all that often. That's why the Flipper jumped out to me. A device that condenses the functionality of many of their gizmos into a sleek, pocketable device.

It struck me as just the sort of thing to scratch my itch, so I went about getting one.

## Buying

When looking to buy a Flipper on the [official Flipper Zero website](https://flipperzero.one), I was redirected to Joom Geek, Flipper's official Australian distributor and 'tech' sub-brand of Joom.

Joom is very much like Aliexpress, Wish, or Temu. Lots of plastic gadgets of objectionable quality at prices so low that you can't help but wonder what questionable labour practices have been employed. In the case of the Flipper Zero though, these cheap prices didn't apply, and the cost came out to $322 AUD with shipping.

I ordered the Flipper on March 19th, 2024, but it wasn't until a month later, on April 20th, that I was updated with the information that my 'package departed the seller's warehouse'. Funnily enough, a day previously, on April 19th, I had submitted a query asking the status of my order, given that a month had passed with no update.

Anywho, I did eventually receive it on May 20th. I will say that Joom's slow shipping, bad reputation, and lack of communication did sketch me out a bit, but in fairness, I did receive it in one piece. I'd have preferred to buy from the official marketplace, but I'm really just glad I got it in the end.

## Setup

After removing the shipping packaging, I extracted the compact cardboard box that contained the quick start guide, a short USB-C to USB-A cable, a sticker, and the Flipper itself. Everything was packed in the box snug with foam.

All I had to do was peel off the plastic screen cover and hold the back button, and it sprang to life.

I had done quite a bit of research prior to pulling the trigger on purchasing the Flipper, and even more in the time it took for it to arrive, so I had a pretty good idea of what I was gonna do once I got it.

I had the briefest of plays with the official firmware, which was fine, but I knew that the limitations of the firmware were going to hold back my plans for the device. That's why I jumped to the Momentum firmware.

Thanks to the Flipper's [open-source firmware](https://github.com/flipperdevices/flipperzero-firmware), there are many community-led forks. During my initial research, [Xtreme](https://flipper-xtre.me) seemed to be the best available, but internal conflicts led to it being forked and rebranded as [Momentum](https://momentum-fw.dev).

Momentum has several benefits over the stock firmware. Standouts for me include improved customisation options through the management app, better menus, battery charge capping, and a sane set of bundled apps. It also allows bypassing artificial limitations, such as the ones imposed by the sub-GHz region lock, although this is something I most definitely don't do as a responsible and law-abiding citizen.

It isn't hard to install and can be done via a web browser, the qFlipper desktop management program, or the mobile app. I've done it via web and mobile with no issues. It's just as smooth as installing the standard firmware.

## Features and Capabilities

Once I had the Flipper properly setup, I dove straight into mischief. First action was cloning the TV remote so I'd be able to mildly inconvenience anyone at my discretion. This sort of IR cloning is super easy. Open the necessary app, set it to learn, point the relevant remote at the Flipper's sensor, and press whatever button you want to capture.

<figure class="right">
<img src="/assets/posts/i-got-a-flipper-zero/flipper-zero-on-table.avif" alt="A picture of a Flipper Zero sitting on a table.">
<figcaption>My Flipper Zero</figcaption>
</figure>

This sort of interaction has defined my usage of the Flipper. Receive a signal and play it back. It's a real-world copy-paste. In fact, that is probably the best way to describe the Flipper for anyone curious about what exactly it is. It's a copy and paste for the world's signals.

One thing I was worried about was that the novelty of the device would wear off quickly, and I wouldn't touch it again. Well, the novelty did wear off, but what it was replaced with is arguably better. Utility. The Flipper has taken the position of my keys and wallet in my right jean pocket.

The device is slated as a 'multi-tool device for geeks' on the official website, and I don't think a better description could be written. Much like a multitool, it's something I _always_ want on me.

I think the multitool branding also sets expectations right. You don't buy a multitool expecting it to replace your toolbox. You buy a multitool expecting a compact jack of all trades that is convenient to pocket. It isn't a replacement for specialised tools; it's a convenient, versatile supplement to them.

## Utility

Part of always wanting it on my person is down to just how handy it's been. I haven't had it long, but it is such a useful little nugget and does so much. I've noted some of my favourite uses for it here, but the list is far from exhaustive. It can do _so_ much.

Perhaps one of the most common uses is as a remote control for TVs, set-top boxes, VHS players, DVD players, hi-fi systems, air conditioners, lights, etc. If it's been in my proximity and has infrared capabilities, then I've captured its signals. Being able to change the volume on the TV without having to send a search party out for the remote is one thing, but there are many devices I encounter with absent remotes where the Flipper is invaluable. I can either try brute force the codes or consult the [very comprehensive IRDB](https://github.com/logickworkshop/Flipper-IRDB), which contains remotes for everything from clocks to bidets.

The feature of the Flipper that has saved me the most time is by far the BadUSB functionality. I can write scripts and, by emulating a USB keyboard, execute them on devices at my discretion. It's handy for automating a slew of tasks, but perhaps the most useful I've set up runs a quick Windows Update, a Windows Security scan, and does a disk cleanup.

In the same vein as the BadUSB functionality, it's handy as a remote for computers. You can pair it over Bluetooth or using its USB-C cable and do anything you might need. Acting as a clicker during presentations, as a media control, or as a mouse jiggler to feign activity are all super useful.

The sub-GHz functionality is something I want to do more with. Most devices have [rolling codes](https://en.wikipedia.org/wiki/Rolling_code), which makes it difficult for the Flipper to interface with them, but there are definitely use cases I want to explore. Worth noting is that the charge port caps on Teslas respond to a sub-GHz signal and have no authentication or rolling codes. Do with this information as you will.

The NFC functionality is also pretty neat. Most cards are encrypted, but things like Amiibo are fair game. Sure beats carrying a plastic figure around.

## Build and Battery

One of the first things that struck me about the Flipper was just how solid it is. It has a bit of weight to it, with a robust plastic case that doesn't creak nor flex. I can feel pretty confident that it won't fail during normal usage.

The only issue with the build that I can point to is the pogo pins included for the iButton functionality. They're perhaps a bit fragile, which leads to worry whenever I find them catching on my pants when sliding it in and out of my pockets.

As for the battery, I can only say good things. When Flipper claims it can last for ['up to one month'](https://docs.flipper.net/zero/basics/power), they aren't kidding. I was initially worried about battery life, so I turned off Bluetooth when not in use, but that wasn't really necessary. I can happily use the Flipper and place it in standby mode with Bluetooth on without concern that the battery will be dead the next time I go to use it.

## Ethics and Legality

The Flipper Zero is a hacking tool. The term 'hacking' comes with a bad rep. The second somebody mentions hacking, it's assumed you're trying to bust into the Gibson, steal the nuclear codes, or something of that nature. The Flipper should be used responsibly. To bring up the multitool analogy once again, I could use the knife on a multitool to hold someone hostage or horrifically injure them, but that doesn't mean I have intention to, and it certainly doesn't mean multitools should be blanket banned.

There are many a lawmaker and 'journalist' of the impression that the Flipper is a tool of evil. It can certainly be used for evil by the malicious few, but on the whole it is an educational and utility device for learning about, experimenting with, and manipulating devices. I'd quite reasonably suggest that the vast majority of Flipper Zero owners aren't using it maliciously. The device comes with some restrictions to stop it from being used outside of the law.

We've seen previously that the Flipper can [identify and highlight exploitable weaknesses](https://www.theverge.com/2023/11/3/23944901/apple-iphone-ios-17-flipper-zero-attack-bluetooth), and that the knowledge gained from its usage [can lead to fixes](https://www.theverge.com/2023/12/15/24003406/apple-iphone-flipper-zero-fix-ios-17-2). There are vulnerabilities everywhere, and one doesn't need a Flipper Zero to exploit them. Computers as a whole aren't banned or chastised because a select few individuals write malware and exploit software security failings. If Flippers were banned, another device would certainly take its crown of being the 'evil malicious hacking tool used for no good'. There are already plenty of devices on the market with similar abilities that are just slightly lesser known or differently featured.

The Flipper Zero is a tool -- a very fun tool -- and it should be treated as such. Inherently, it's no more evil than a pocket knife. It's how it's used and the intent behind that usage that matters. People who use it with malice and ill intent absolutely should and are held to the standards of the law and receiving of appropriate consequences.

## Community

One thing that both inspires and disappoints me is the community surrounding the Flipper. Through Reddit and, to a lesser extent, the forums, there is a hostile culture.

I think fake viral posts on platforms such as TikTok have perhaps skewed expectations and embellished the Flipper's capabilities. This has attracted novice users with warped understandings, who are at odds with the more technical crowd that tends to push the limits of the device and lead community support efforts.

There tends to be a <abbr title="Read The Fucking Manual">RTFM</abbr> approach slung at users unfamiliar with support etiquette and a general culture of downvoting those that ask simple questions. While I do think it is important to direct people towards the proper documentation instead of spoon-feeding them, the hostility should be left at the door. The echo chamber that is Reddit is particularly guilty of this, and better must be done.

Separate from the negativity, there is a thriving community that dedicates their time to expanding and experimenting with the Flipper's feature set. As discussed with the Momentum firmware previously, much of the Flipper is open-source, and the tooling to hack and build on it is readily available. This has led to a [thriving app ecosystem](https://lab.flipper.net/apps) and countless hardware add-ons and modifications. Not that I have any need of them, but my favourite class of which are the [Geiger](https://github.com/nmrr/flipperzero-geigercounter) [counters](https://github.com/eried/flipperzero-flippenheimer).

## Modifications

In January of 2025, I purchased a miniature Wi-Fi board, transparent shell, and RGB mod from Ray J, a member of the Flipper community who [has a YouTube channel dedicated to the Flipper Zero](https://www.youtube.com/@rayj1988).

The Wi-Fi board I purchased is [of Ray's own design](https://www.youtube.com/watch?v=bQva-mA0Q1c) and has an ESP32-WROOM-32D-4M chip within a 3D-printed shell. It expands the utility of the Flipper greatly. It really shines a light on how fallible networks are when you can shut them down with a pocket-sized tool by sending de-authentication packets or performing a denial-of-service. I've also used it to educate people on the threats of twin attacks.

I've put together a collection of small handy tools similar to the ones I host at [tools.vale.rocks](https://tools.vale.rocks) which I can access by connecting to a wireless network hosted by my Flipper Zero. Perfect for using with older devices that can't access modern networks, when internet access isn't available, or when needing to do something on a device without wanting to have to figure out a way to transfer data.

The process of performing the shell swap was fairly hands-on, but not too difficult. The most difficult part was undoubtedly removing the antenna PCB at the base of the Flipper. It is adhered to the case and very thin. To remove it, one must bend it and slowly pry it out without straining it too much as to cause it to snap. The case isn't perfect tolerance-wise on account of being 3D-printed, and the plastic feels a tad tacky, but it looks fantastic.

During the shell swap I chose to remove the iButton pogo pins because they were snagging on my pockets as mentioned previously. I considered installing the RGB mod I purchased, which would add LEDs that'd shine through the case, but opted not to, as the soldering is reasonably complex and beyond my ability. I think if I were to choose a shell now, I'd opt for a harder, slightly frosted plastic.

Ray also threw in a diabolical little PCB with a button cell battery and speaker attached that, when on, emits a beep at irregular intervals between 5 and 45 minutes. A purely evil little prank device with no relevance to the Flipper Zero but which I've none the less got great use out of.

## Overall Evaluation

The Flipper Zero is a neat bit of tech. It's an all-in-one, pocket-sized tinkerer's toolbox. No, it isn't better than buying specialised hardware for each of its features, but that isn't its purpose. It fills the niche encapsulated by the ethos behind the quote, 'the best camera is the one you have with you'. It's built well and fulfils its purpose.

If the Flipper Zero has made it onto your radar and piqued your interest, then chances are the only negative you'll find in buying it is the impact on your wallet.
