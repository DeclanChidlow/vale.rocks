<head>
    <title>I Got A Flipper Zero | Vale.Rocks</title>
    <meta property="og:title" content="I Got A Flipper Zero"/>
    <meta name="description" content="My review of the Flipper Zero and the things I've done with it. Encompassing everything from the initial purchase to setup and usage, as well as the community and some cool projects." />
    <meta property="og:description" content="A fantasmagorical planet flipping oracle" />
	<meta property="og:image" content="https://vale.rocks/assets/blog/I_Got_A_Flipper_Zero/flipper_zero_picture.png" />
    <meta property="article:published_time" content="2024-06-14" />
    <meta property="article:modified_time" content="2024-07-03" />
    <meta property="article:section" content="Review" />
</head>

<article>
<header>
	Review
	<h1>
		I Got A Flipper Zero
	</h1>
	<ul>
		<li><time datetime="2024-06-14">14 June, 2024</time></li>
		<li>1983 words</li>
		<li>7 minute read</li>
	</ul>
</header>

<div class="readable_width">

I like computers, and I like tinkering. I also don't mind stretching rules a little if it means I can do something not intended. I've burnt hours customising CFW on consoles, tinkering with the inner workings of computers (not always mine), and gaolbreaking iPhones.

I've been a fan of the sort of stuff [Hak5](https://hak5.org) produces for a while, but I'm no professional pentester, and I honestly can't see myself using their offerings all that often. That's why the Flipper jumped out to me. A device that condenses the functionality of many of their gizmos into a sleek, pocketable device.

It struck me as just the sort of thing to scratch my itch, so I went about getting one.

## Buying

When looking to buy a Flipper on the [official Flipper Zero website](https://flipperzero.one), I was redirected to Joom Geek, Flipper's official Australian distributor and 'tech' sub-brand of Joom.

Joom is very much like Aliexpress, Wish, or Temu. Lots of plastic gadgets of objectionable quality at prices so low that you can't help but wonder what questionable labour practices have been employed. In the case of the Flipper Zero though, these cheap prices didn't apply, and the cost came out to $322 AUD with shipping.

I ordered the Flipper on March 19th, but it wasn't until a month later, on April 20th, that I was updated with the information that my "package departed the seller's warehouse". Funnily enough, a day previously, on April 19th, I had submitted a query asking the status of my order, given that a month had passed with no update.

Anywho, I did eventually receive it on May 20th. I will say that Joom's slow shipping, bad reputation, and lack of communication did sketch me out a bit, but in fairness, I did receive it in one piece. I'd have preferred to buy from the official marketplace, but I'm really just glad I got it in the end.

## Setup

After removing the shipping packaging, I extracted the compact cardboard box that contained the quick start guide, a short USB-C to USB-A cable, a sticker, and the Flipper itself. Everything was packed in the box snug with foam.

All I had to do was peel off the plastic screen cover, hold the back button, and it sprung to life.

I had done quite a bit of research prior to pulling the trigger on purchasing the Flipper, and even more in the time it took for it to arrive, so I had a pretty good idea of what I was gonna do once I got it.

I had the briefest of plays with the official firmware, which was fine, but I knew that the limitations of the firmware were going to hold back my plans for the device. That's why I jumped to the Momentum firmware.

Thanks to the Flipper's [open source firmware](https://github.com/flipperdevices/flipperzero-firmware), there are many community led forks. During my initial research, [Xtreme](https://flipper-xtre.me) seemed to be the best available, but internal conflicts led to it being forked and rebranded as [Momentum](https://momentum-fw.dev).

Momentum has several benefits over the stock firmware. Standouts for me include improved customisation options through the management app, better menus, battery charge capping, and a sane set of bundled apps. It also allows bypassing artificial limitations, such as the ones imposed by the SubGHz region lock, although this is something I most definitely don't do as a law abiding citizen.

It isn't hard to install and can be done via a web browser, the qFlipper desktop management program, or the mobile app. I've done it via web and mobile with no issues. It's just as smooth as installing the standard firmware.

## Features and Capabilities

Once I had the Flipper properly setup, I dove straight into mischief. First action was cloning the TV remote so I'd be able to mildly inconvenience anyone at my discretion. This sort of IR cloning is super easy, simply open the necessary app, set it to learn, point the relevant remote at the Flipper's sensor, and press whatever button you want to capture.

<figure class="right">
<img src="/assets/blog/I_Got_A_Flipper_Zero/flipper_zero_picture.png" alt="A picture of a Flipper Zero sitting on a table." />
<figcaption>My Flipper Zero</figcaption>
</figure>

This sort of interaction has defined my usage of the Flipper. Receive a signal and play it back. It's a real world copy paste. In fact, that is probably the best way to describe the Flipper for anyone curious about what exactly it is. It's a copy and paste for the world's signals.

One thing I was worried about was that the novelty of the device would wear off quickly, and I wouldn't touch it again. Well, the novelty did wear off, but what it was replaced with is arguably better. Utility. The Flipper has taken the position of my keys and wallet in my right jean pocket.

The device is slated as a "multi-tool device for geeks" on the official website, and I don't think a better description could be written. Much like a multitool, it's something I _always_ want on me.

I think the multitool branding also sets expectations right. You don't buy a multitool expecting it to replace your toolbox. You buy a multitool expecting a compact jack of all trades that is convenient to pocket. It isn't a replacement for specialised tools; it's a convenient, versatile supplement to them.

## Utility

Part of always wanting it on my person is down to just how handy it's been. I haven't had it long, but it is such a useful little nugget and does so much. I've noted some of my favourite uses for it here, but the list is far from exhaustive. It can do _so_ much.

Perhaps one of the most common uses is as a remote control for TVs, set top boxes, VHS players, DVD players, Hi-Fi systems, air conditioners, lights, etc. If it's been in my proximity and has infrared capabilities, then I've captured its signals. Being able to change the volume on the TV without having to send a search party out for the remote is one thing, but there are many devices I encounter with absent remotes where the Flipper is invaluable. I can either try brute force the codes or consult the [very comprehensive IRDB](https://github.com/logickworkshop/Flipper-IRDB), which contains remotes for everything from clocks to bidets.

The feature of the Flipper that has saved me the most time is by far the BadUSB functionality. I can write scripts and, by emulating a USB keyboard, execute them on devices at my discretion. It's handy for automating a slew of tasks, but perhaps the most useful I've set up runs a quick Windows Update, a Windows Security scan, and does a disk cleanup.

In the same vein as the BadUSB functionality, it's handy as a remote for computers. You can pair it over Bluetooth or using it's USB-C cable and do anything you might need. Acting as a clicker during presentations, as a media control, or as a mouse jiggler to fein activity are all super useful.

The subGHz functionality is something I want to do more with. Most devices have [rolling codes](https://en.wikipedia.org/wiki/Rolling_code), which makes it difficult for the Flipper to interface with them, but there are definitely use cases I want to explore. Worth noting is that the charge port caps on Teslas respond to a subGHz signal and have no authentication or rolling codes. Do with this information as you will.

The NFC functionality is also pretty neat. Most cards are encrypted, but things like Amiibo are fair game. Sure beats carrying a plastic figure around.

## Build and Battery

One of the first things that struck me about the Flipper was just how solid it is. It has a bit of weight to it, with a robust plastic case that doesn't creak nor flex. I can feel pretty confident that it won't fail during normal usage.

The only issue with the build that I can point to is the pogo pins included for the iButton functionality. They're perhaps a bit fragile, which leads to worry whenever I find them catching on my pants when sliding it in and out of my pockets.

As for the battery, I can only say good things. When Flipper claims it can last for ["up to one month"](https://docs.flipper.net/basics/power), they aren't kidding. I was initially worried about battery life, so I turned off Bluetooth when not in use, but that wasn't really necessary. I can happily use the Flipper and place it in standby mode with Bluetooth on without concern that the battery will be dead the next time I go to use it.

## Ethics and Legality

The Flipper is a 'hacking' tool. 'Hacking' comes with a bad rep. The second somebody mentions hacking, it's assumed you're trying to bust into a Gibson or something of that nature.

Obviously, the Flipper should be used responsibly. To bring up the multitool analogy once again, I could use the knife on a multitool to hold someone hostage or horrifically injure them. That doesn't mean that I necessarily will though, and it certainly doesn't mean multitools should be blanket banned.

There are many a lawmaker of the impression that the Flipper is a tool of evil. This isn't the case, or at least not if used responsibly. The Flipper isn't just evil, and it isn't just a toy. It's a tool.

We've seen previously that the Flipper can [identify and highlight exploitable weaknesses](https://www.theverge.com/2023/11/3/23944901/apple-iphone-ios-17-flipper-zero-attack-bluetooth), and that the knowledge gained from its usage [can lead to fixes](https://www.theverge.com/2023/12/15/24003406/apple-iphone-flipper-zero-fix-ios-17-2). If Flippers were banned, there is a decent likelihood that such exploits would persist without detection or that a similar device would emerge to take its place.

It is a tool - a very fun tool - and it should be treated as such. Inherently, it's no more evil than a pocket knife. It's how it's used and the intent behind usage that matters.

## Community

One thing that both inspires and disappoints me is the community surrounding the Flipper. Through Reddit and, to a lesser extent, the forums, there is a hostile culture.

I think fake viral posts on platforms such as TikTok have perhaps skewed expectations and embellished the Flipper's capabilities. This has attracted novice users with warped understandings, who are at odds with the more technical crowd that tends to push the limits of the device and handle community led support.

There tends to be a RTFM approach slung at users unfamiliar with support etiquette and a general culture of downvoting those that ask simple questions. While I do think it is important to direct people towards the proper documentation instead of spoon feeding them, the hostility should be left at the door. The echo chamber that is Reddit is particularly guilty of this, and better must be done.

Separate from the negativity, there is a thriving community that dedicates their time to expanding, and experimenting with, the Flipper's feature set.

As discussed with the Momentum firmware previously, much of the Flipper is open source, and the tooling to hack and build on it is readily available. This has led to a [thriving app ecosystem](https://lab.flipper.net/apps) and countless hardware addons that make use of the GPIO pins. Perhaps my favourite class of which are the [Geiger](https://github.com/nmrr/flipperzero-geigercounter) [counters](https://github.com/eried/flipperzero-flippenheimer).

## Overall Evaluation

The Flipper Zero is a neat bit of tech. It's an all in one, pocket sized tinkerer's toolbox. No, it isn't better than buying specialised hardware for each of its features, but that isn't its goal. It fills the niche encapsulated by the ethos behind the quote, "the best camera is the one you have with you". It's built well and fulfils its purpose.

If the Flipper has made it onto your radar and piqued your interest, then chances are the only negative you'll find in buying it is the impact on your wallet.

---

I hope you got something out of my review of the Flipper. If you did, then do consider sharing it, and if you'd like to see me produce more content like this, consider [supporting me](/support).

<section class="giscus"></section>

</div>
</article>
