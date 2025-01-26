---
title: Improving Early Kindles
description: A guide wrapper about how to bring old Kindles, such as the Kindle Keyboard, as well as the Kindle 4, and Kindle 5 up to speed a bit to be usable in the modern era. Covering screensaver hacks, improved font handling, and more comprehensive customisablity.
og_description: I will never let it rest.
pub_time: 2025-01-26
section: Tutorial
word_count: 790
---

In July 2010, Amazon released the Kindle 3, also known as the Kindle Keyboard. With a smaller footprint than the Kindle 2, more internal storage, and an improved display, the Kindle 3 was a marked improvement. Even now, over a decade past its release, it's still a joy to use.

My mother gifted me one she acquired for cheap a few years back, but it was in a non-operational state. Cosmetically it looked mint, yet it refused to turn on, even after charging for extended periods of time.

I went out on a limb and purchased a battery from Amazon. Following [iFixit's Kindle 3 Battery Replacement guide](https://www.ifixit.com/Guide/Kindle+3+Battery+Replacement/29844) I managed to get things sorted. It wasn't too difficult of a process. The hardest part was simply prying off the back which I ended up achieving with the edge of a butter knife.

With the replaced battery and a bit of charge, the Kindle was up and running. I put it to use immediately but identified a few gripes. Thankfully, the [MobileRead Forums](https://www.mobileread.com) exist and play host to a whole collection of hacks and tweaks.

It took me a while to trawl through all the information required to get things up and operational - thanks largely due to the age of the device meaning most resources have fallen victim to link rot - so this is a brief write-up of my chosen tweaks and modifications. These notes describe the process on the Kindle 3, but some of the information is transferable and I've also taken very similar actions on a Kindle 4 and a Kindle 5.

This isn't a guide for the technically inexperienced, merely a collection of notes to wrap the fantastic but fractured works done by others into something a bit more comprehensible.

## Resetting and Updating

If you haven't already, it's worth resetting your Kindle prior to modding it, just to be certain it doesn't have existing cruft. It's especially worth doing if the Kindle previously belonged to someone else.

It's really simple to do. Hit the <kbd>Home</kbd> button to go to the main menu screen. Then press <kbd>Menu</kbd> and then select <kbd>Settings</kbd>. Press the <kbd>Menu</kbd> key once again and select <kbd>Reset to Factory Defaults</kbd>. Note that this will wipe all content on the Kindle. Then wait, as it takes a while for it to reset itself.

The next step is to make sure you're on the latest software available. Open Amazon's [Kindle E-Reader Software Updates page](https://www.amazon.com/gp/help/customer/display.html?nodeId=GKMQC26VQQMM8XSW) and follow the instructions for your model.

## Hacks

First things first, you'll need the gaolbreak. The MobileRead Wiki has [a short little guide](https://wiki.mobileread.com/wiki/Kindle_Screen_Saver_Hack_for_all_2.x,_3.x_%26_4.x_Kindles#How_to_install_the_Jailbreak_Hack) on how to gaolbreak your Kindle.

### Custom Screensavers

If you continue on with the guide, it will instruct you on installing the screen-saver [^1] hack, which allows you to set a custom image when the Kindle is off, including the cover of the book you're currently reading.

### Fonts Hack

Now you can take control of your font customisation. You'll want to jump over to [NiLuJe's comprehensive thread](https://www.mobileread.com/forums/showthread.php?t=88004) and scroll down to the fonts section. Follow the instructions to install the hack, but don't start fiddling with settings yet.

### KUAL

The Kindle Unified Application Launcher (KUAL) is a very handy little application which various hacks and things can hook into. You'll want to install this so you can have a graphical interface to change your settings.

You'll first need to install the Mobileread Kindlet Kit (MKK). This will let you open and use custom Kindlets, such as KUAL. [^2] You can grab the install from [NiLuJe's Snapshot thread](https://www.mobileread.com/forums/showthread.php?t=225030) and then follow the installation guide halfway down [the MKK page](https://www.mobileread.com/forums/showthread.php?t=233932) to install it.

Next, you'll want to install KUAL itself. Grab it from the Snapshot thread, then follow the installation guide on the [KUAL thread](https://www.mobileread.com/forums/showthread.php?t=203326). After that, check that it opens fine by selecting it from your main library page.

Now, you can jump back to the Snapshots thread, grab all of the extensions, and install them as outlined on the KUAL page. Opening KUAL now, you should see that you have lots of settings and options. Congrats, you've got your Kindle ready to go! You now have advanced control over your Kindle and hopefully the potential for a better reading experience.

I recommend having a look through the MobileRead Forums and all the cool stuff it has to offer. I also recommend switching off wireless unless you're using it, as I've found it can be quite the battery hog. I've also found great value in a magnetic cable that helps minimise wear to the fragile Micro USB connector.

[^1]: Not really much of a screen-"saver" considering e-ink displays don't suffer from burn-in like a CRT or OLED display might, but I digress.
[^2]: A Kindlet is a little app for the Kindle.
