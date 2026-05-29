---
title: Lessons From Tech Support
description: Details and knowledge pertaining to providing tech support for people on a professional basis. Various tips and tricks, as well as advice on effectively communicating with clients to effectively provide help with minimal confusion and without needless effort, while ensuring a smooth and productive outcome.
og_description: Tech support support.
pub_time: 2026-05-19
section: Tutorials
---

I've done a lot of tech support, previously operating a tech support business which had me helping all varieties of people, both at their homes and remotely. Here is an attempt to catalogue some of the tips and tricks I picked up. Worth noting is that the primary demographic I found myself helping was the elderly. They usually have all-in-ones, though sometimes laptops, and are more often than not running Windows. Naturally, my notes therefore have a skew in the direction of the older cohort.

## Know The Problem

You should ask for the problem ahead of time, ideally while booking the appointment and the issue is fresh in the client's mind. People are forgetful -- the elderly doubly so. I have found clients on more than one occasion befuddled as to exactly what they needed help with.

If possible, have them text through their problem with as much detail as possible. Otherwise, call them and ask them questions (ensuring you write it down). Even just knowing the general realm of the problem is useful for getting the process started. Otherwise, run through the typical list:

1. Malware
2. Email
3. Printer/Scanner
4. Microsoft Office (Word, Excel, PowerPoint, etc)

## Help Articulate

Your job isn't just to fix problems; it is largely to understand what the problem is in the first place. If someone is having trouble with simple functions of their computer, there is a decent chance they don't know all appropriate technology. You must explain jargon, for throwing around technobabble is useless. Much like when speaking to someone in another language, if there is a communication barrier you should be ready to use different terminology to convey a point.

Refer to it not as 'Google Chrome' but as the coloured beach ball and not as 'settings' but as 'the grey cog'. Icons and colours are more memorable and identifiable. These associations are much clearer than terms which are undecipherable without context. Always prioritise clarity over technical accuracy.

If receptive, you can gently educate the client on the correct terms. Don't force it, however. Some people don't want to learn; they just want the problem to go away. I've personally found a lot of older folks want to understand computers but think they're too old to comprehend them. If you work through it with them, they'll probably appreciate it.

Some people are very curious and wish to learn. Since you're going through the motions anyway, it is worth explaining the steps you're taking. You might educate them such that they can fix the same problem occurring again in the future, thus removing a chance for you to get another call back, but you make up for this by establishing a rapport with the client that will make you their first pick if another problem occurs.

## Provide More Help

While you're working on a computer, there can be periods of dead air. Waiting for something to install, for software to update, for files to delete, etc. If someone is struggling with their computer in one way, there is a decent chance they're struggling in multiple ways. Ideally, ask at the head end of the job so you can fill up this dead time with solving their other problems.

My go-to is a quick disk cleanup and checking that software updates are installed. If those are already done, I'll write down some documentation for the client which they can reference and refer to when fixing problems in the future. It can also be a good opportunity to pick some fluff out of charging ports, speakers, or fans, or to install a remote access solution.

## Configure Remote Access

It isn't rare for someone to recall something they meant to ask or request after the fact, or to need help with a quick or minor issue. For such cases, a remote desktop setup can be very effective. You can save a lot of travel time by performing remote support. My personal go-to is [RustDesk](https://rustdesk.com), though any remote desktop solution will work. RustDesk can be self-hosted, and it is trivial to apply your own branding.

A remote desktop is also effective in cases where you are interacting with people who use eye-tracking or other assistive input methods, even if you're physically present in the same location as them. Physically interacting with their input device often means making them uncomfortable and taking away their means of communication, even if temporarily. It'd be like someone reaching over and disabling your mouth so they can fiddle with it. On top of that, it can take a lot of time to get some input methods tuned in, so disrupting their device can be a major inconvenience.

It can be tempting to exclusively rely on remote device control, but in-person interactions are valuable. Especially the first interaction should optimally be conducted in person, as it builds a lot of trust. If you're troubleshooting physical items such as printers or scanners (I hate printers), make sure that is in person too. You can't remotely plug in a USB cable or press the reset combination on a printer.

## Tools

If you're doing tech support, there are some tools you should possess. A [Flipper Zero](/posts/i-got-a-flipper-zero) or another BadUSB device can also be very useful for running commands or actions. A set of precision screwdrivers can come in handy, both for dismantling parts of devices if necessary and for more menial tasks like digging crap out of a device's orifice or general MacGyver behaviour. You'll want a variety of cables, as you should never assume anyone charges their devices, much less that they know where their device charging cables are. A pen and notepad (especially one with perforations so you can break off pages) are very useful for leaving details.

You'll also want some USBs. You'll want some blank ones for backing up or copying data (keep these in a state such that you can sell them to a client) and some with utilities such as memory checkers and Linux live USBs. Live USBs are great for checking if a device problem is a hardware fault when Windows is acting up. If you're so inclined, install media for the latest version of Windows is also a pretty good idea.

Using a laptop for searching seems much more professional than your phone. Of course, most laptops don't have their own cellular plans, and you shouldn't expect a connection at a client's home. Bring something capable of providing a mobile hotspot. Sometimes you'll find yourself on your back under a desk fishing for a port or loose cable, so a flashlight is a must-have (the one in your phone should do the job).

## Never Assume

Don't assume anything. As the saying goes, 'to assume makes an _ass_ out of _u_ and _me_'. There will forever be some random person who keeps their most important files in the recycle bin for safekeeping. You must never put too much faith in people using their computers correctly.

Likewise, don't rearrange or modify anything more than is necessary. People settle into understanding that a program is located in a certain position on their desktop. Don't move it. [Every change breaks someone's workflow.](https://xkcd.com/1172/)

## Store Client Details

Set up a secure place to store client details, and ensure you communicate that you're storing them to the client. People sometimes forget their own emails, or you can forget their email. Especially if you've just created a new address for them. Don't expect anyone to remember anything. Write it down. A lot of people will go off to perform other tasks while you are addressing their problem. Bringing them over to request their phone number or email or code or password or whatever else is a hindrance that stretches out the interaction and inconveniences you both.

This information also makes booking appointments quicker and more seamless. Asking a repeat client for their address each time they're booking an appointment is repetitive and suggests that you're either disorganised or not caring about the client. A much nicer interaction (which saves a back and forth) is 'Are you still on Street Lane?'. It is still important to ask as people change addresses.

## Ignore Adult Content

You will probably discover <abbr title="Not Safe For Work">NSFW</abbr> content. Whether that be saved nudes or pornography in the browser search history, you're best to just not mention it. Be professional and gloss over it. People find it embarrassing, so you should move on quickly. I've worked on a lot of personal computers, and regardless of age, people have NSFW content saved. If they're viewing their history or saved photos, look away if appropriate to do so.

If you're dealing with malware from a malicious adult site, edge around the topic while still informing them of the risks posed by less scrupulous sites. How much you avoid the topic depends on your client. Some people will get very defensive and dismissive if you mention their consumption of pornography, even if in a non-confrontational way. One method of skirting the topic is to mention dodgy download links on gambling websites and other 'mature' sites.
