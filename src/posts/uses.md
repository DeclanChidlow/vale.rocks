---
title: Technology I Use
description: Details of the tools, software, and hardware powering my workflow. Information on my setup, development environment, self-hosting, and multimedia management. Collates most of what I use on my laptop, servers, and phone.
og_description: The tools, software, and other such things I use.
pub_time: 2024-08-05
mod_time: 2025-07-09
section: Meta
---

This post details some of the many things I use. Generally, my selections align with the philosophies [outlined by Gwern](https://gwern.net/choosing-software). All my configs are provided and somewhat documented in my [dotfiles repository on GitHub](https://github.com/DeclanChidlow/dotfiles).

## Laptop

Day to day, I run a Framework Laptop 13. More information about my specific device and my experience with it is available in [my review](/posts/a-year-with-the-framework-laptop-13).

It runs [NixOS](https://nixos.org), which I'm a huge fan of thanks to its declarative configuration. The ability to run things in an ephemeral shell with `nix-shell -p` is also core to my iterative development processes.

### Environment

I run [Sway](https://swaywm.org) as my window manager, [swaylock](https://github.com/swaywm/swaylock) as the screen locker, and [Yambar](https://codeberg.org/dnkl/yambar) as my status panel. I use [bemenu](https://github.com/Cloudef/bemenu) (a Wayland equivalent of dmenu) for launching programs and displaying my clipboard history (with the help of [cliphist](https://www.cliphist.com)). My notifications are all handled by [Dunst](https://dunst-project.org).

[Kitty](https://sw.kovidgoyal.net/kitty/) is my preferred terminal, pretty much exclusively for its support for ligatures and images and its [SSH kitten](https://sw.kovidgoyal.net/kitty/kittens/ssh).

All my file exploring is handled by the very excellent [Vifm](https://vifm.info). My configurations for it are quite extensive, and it works for me as a full stand-in for any 'conventional' file explorer, such as Dolphin or Nautilus.

### Shell

I spend a lot of my time in the terminal and, as such, have a pretty smooth config. I run [ZSH](https://www.zsh.org) as my shell, with a custom prompt and some default tools replaced. [Eza](https://eza.rocks) takes the place of `ls` and `tree`, [Bat](https://github.com/sharkdp/bat) takes the place of `cat`, and [BTOP++](https://github.com/aristocratos/btop) takes the place of `top`.

### Browsers

- [Firefox](https://www.firefox.com/en-US/): For general browser usage.
- [Firefox Developer Edition](https://www.firefox.com/en-US/channel/desktop/developer/): For development on Firefox and testing Gecko compatibility.
- [Chromium](https://www.chromium.org/Home/): For testing Blink compatibility.
- [Epiphany](https://apps.gnome.org/Epiphany/): For testing WebKit compatibility.
- [Tor](https://www.torproject.org): For the occasional dark web browsing session or increased anonymity. I don't use any extensions with Tor.

I use a [custom search engine router I made](https://search.vale.rocks) to allow for easily switching engines and a few quality-of-life improvements conducive to my workflow. I also usually roll with these extensions:

- [Facebook Container](https://www.mozilla.org/en-US/firefox/facebookcontainer/) (Firefox only): Isolates Facebook from the rest of my browsing.
- [uBlock Origin](https://ublockorigin.com): Allows blocking adverts, content, fonts, scripts, etc. I switch this out for [the lite variant](https://github.com/uBlockOrigin/uBOL-home) on browsers that have dropped Manifest v2 support.
- [SponsorBlock for YouTube](https://sponsor.ajay.app): Can filter out unwanted parts of YouTube videos.
- [Fontanello](https://fontanello.app): Provides information about the typographic stylings of selected text.

### Development

I've already touched on some of my preferred development tools, but I also have many more that I rely on for my front-end development needs.

As you might expect, I use [Git](https://git-scm.com) for version control, with [GitHub](https://github.com) for repository hosting and project management. In most situations, I use [Bun](https://bun.sh) in place of Node for the performance benefit and convenient feature set, although I obviously keep around all the expected other tools for working on other projects.

Central to all my development is my editor, [Neovim](https://neovim.io), which serves as the bulk of my development environment. I've extensively customised it and [documented my entire configuration](/posts/neovim).

### Virtualisation

Sometimes I find myself needing to use Adobe's Creative Cloud or other software that simply refuses to run on Linux. For that reason I've got a Windows 11 virtual machine setup with KVM/[QEMU](https://www.qemu.org), [Spice USB Redirection](https://www.spice-space.org/usbredir.html), [Windows guest drivers](https://github.com/virtio-win/kvm-guest-drivers-windows), [libvirt](https://libvirt.org), and other things of that nature, which I access via [Virtual Machine Manager](https://virt-manager.org).

I 'enhance' (salvage) the Windows experience with [Microsoft's PowerToys](https://github.com/microsoft/PowerToys). The general setup largely works _alright_ for my needs.

### Miscellaneous

I usually do video editing in [Kdenlive](https://kdenlive.org), though will opt for [Shotcut](https://www.shotcut.org) instead for projects of a lesser scope.

Raster image manipulation is usually conducted in [Photopea](http://www.photopea.com/), and vector editing in [InkScape](https://inkscape.org). Unfortunately I haven't found anything better than [Lightroom Classic](https://www.adobe.com/products/photoshop-lightroom-classic.html) for developing photographs. I also haven't found anything comparable to [InDesign](https://www.adobe.com/products/indesign.html) for print layout and am sometimes unfortunately forced to use other offerings of Adobe's Creative Cloud due to compatibility issues and absent/inadequate features.

I use [Blender](https://www.blender.org) for 3D modelling and animation. My [Creality Ender 3 V3 SE](https://store.creality.com/products/ender-3-v3-se-3d-printer) 3D printer is complemented by [PrusaSlicer](https://www.prusa3d.com/page/prusaslicer_424/), which I use for slicing and has extensive custom configuration for my needs.

For document creation and editing, I tend to use Neovim paired with [Pandoc](https://pandoc.org) for most document creation, though fallback to [LibreOffice](https://www.libreoffice.org) with [my set of modifications](/posts/the-ultimate-libreoffice-setup) for dealing with Microsoft Office file formats.

My email/contact/calendar/task client is [Thunderbird](https://www.thunderbird.net/en-US/). It isn't perfect but is generally alright. Video and loose audio files are played through [mpv](https://mpv.io), and [imv](https://sr.ht/~exec64/imv/) serves as my image viewer.

---

## Hosting/Cloud

I have some remote VPS', most notably one with [Hetzner](https://www.hetzner.com). My emails, contacts, calendar, and task lists are all handled by [Runbox](https://runbox.com), who allow me to hook into all my stuff with the various Web<abbr title="Distributed Authoring and Versioning">DAV</abbr> systems.

### Home Server

I also maintain a home server for self-hosting a range of services. Much like my laptop, my home server runs NixOS. Everything it hosts is containerised with Docker. I use [Oxker](https://github.com/mrjackwills/oxker) as a nice TUI container manager, but it's all otherwise pretty boring, though that is probably a good thing for what should be a stable server.

---

## Phone

My current phone is a Google Pixel 7a. Nothing too special, but it's one of the only phones on the market with a good camera and, more importantly, an open bootloader. Being a Pixel, it also has support for the excellent [GrapheneOS](https://grapheneos.org). GrapheneOS is pretty much stock Android with a myriad of security and privacy improvements.

I generally look for apps that I can customise, that are open-source, and that adhere to Material You. The apps I've currently got installed include:

- [Bluesky](https://bsky.social/about)
- [Pixel Camera](https://play.google.com/store/apps/details?id=com.google.android.GoogleCamera): I bought my phone partly for the camera, and no third-party app comes close in processing, so with the stock Pixel Camera app I roll, albeit with revoked network permissions.
- [Vanadium](https://grapheneos.org/features#vanadium): Vanadium is a privacy-focused fork of Chromium bundled with GrapheneOS. As much as I dislike playing into Chrome's market dominance, Firefox on Android is very poor security-wise, plays badly with PWAs, and there isn't much point having two separate browser engines installed, among other issues.
- [FlorisBoard](https://florisboard.org): Excellent and very customisable FOSS keyboard.
- [FeedFlow](https://www.feedflow.dev): A very nice feed reader. Posts open in browser rather than being displayed in-app.
- [Harmonic](https://github.com/SimonHalvdansson/Harmonic-HN): Slick Hacker News client.
- [Kvaesitso](https://kvaesitso.mm20.de): Feature-rich, search-focused launcher.
- [Google Messages](https://www.android.com/google-messages/): Google's SMS/MMS/RCS app. I'd prefer to use a FOSS alternative, but RCS is pretty locked down, so I'm left without alternative.
- [Moshidon](https://github.com/LucasGGamerM/moshidon): Wonderful Fediverse client with plenty of quality-of-life features.
- [Droid-ify](https://droidify.eu.org): Modern, feature-rich F-Droid client
- [OsmAnd+](https://osmand.net): Navigation app based on OpenStreetMap.
- [Phone by Google](https://play.google.com/store/apps/details?id=com.google.android.dialer): Google's Phone app that I've chosen to use as it complements Google Messages.
- [Google Photos](https://www.google.com/photos/about/): Not my preference, but it's one of the only options with good editing capabilities. I keep it disconnected from the internet.
- [Thunderbird](https://www.thunderbird.net/en-US/): Email client connected to my Runbox email addresses.
- [DAVx<sup>5</sup>](https://www.davx5.com): CalDAV/CardDAV sync adapter to sync my contacts and calendar/tasks.
- [jtx Board](https://jtx.techbee.at): Provides a synchronised task list.
- [Fossify Calendar](https://github.com/FossifyOrg/Calendar): Provides a synchronised calendar.
- [Fossify Clock](https://github.com/FossifyOrg/Clock)
- [Ares Dark](https://www.one4studio.com/apps/icon-packs/ares-series): Provides some very nice-looking icons.
- [Proton Drive](https://proton.me/drive): Cloud storage that I use to quickly move files between my phone and computer.
- [Flipper](https://flipperzero.one): For interacting with [my Flipper Zero](/posts/i-got-a-flipper-zero).
- [Stoat](https://stoat.chat)
- [Xed-Editor](https://github.com/Xed-Editor/Xed-Editor): Advanced text editor for when I'm in a pinch.
- [Signal](https://signal.org): Excellent chat app for when I need privacy.
- [YouTube](https://www.youtube.com) and [YouTube Music](https://music.youtube.com): Both patched with [ReVanced](https://revanced.app) for quality-of-life improvements.

---

## Multimedia

I've got quite an extensive media library and an equally extensive process for sorting and organising it.

### Images/Videos

I self-host [Jellyfin](https://jellyfin.org) for all my movies and televisual needs. It's got an intuitive design and feels at home next to commercial streaming services.

All my personal photos, home videos, etc, are handled by a self-hosted deployment of [Immich](https://immich.app). It handles everything quite simply and works well.

### Music

Music libraries devolve into a mess with disturbing ease. I convert all my music to OPUS, process them with [beets](https://beets.io), and then play them with [Music Player Daemon (MPD)](https://www.musicpd.org). I can then use a frontend of my choosing, such as [Inori (いのり)](https://github.com/eshrh/inori), and pair it with tools like [mpc](https://github.com/MusicPlayerDaemon/mpc) for assigning keybinds.

### Books

Currently I manage my extensive e-book collection with [Calibre](https://calibre-ebook.com), although it is showing its age in a few places. I pair it with [The StoryGraph](https://www.thestorygraph.com) for tracking read books and sourcing recommendations. I read my books on my Kindle 3 running [modified software for a better reading experience](/posts/improving-early-kindles).

### Gaming

I like to do a bit of gaming in my 'spare' time, so I've got a bit setup. I end up spending the bulk of my games on my Xbox Series S simply as a result of convenience. I do also keep some other consoles around, including my Xbox 360 E, PlayStation Vita 2000, and Nintendo DS, although they see scarce use.

My preferred platform, even if not the most played, is PC. Most of my PC games live on [Steam](https://store.steampowered.com/), although I've got pretty extensive libraries on GOG, Epic Games, and Amazon Gaming, which I manage through the [Heroic Games Launcher](https://heroicgameslauncher.com). I also have [Prism Launcher](https://prismlauncher.org) for my occasional Minecraft needs and [GameMode](https://feralinteractive.github.io/gamemode/) to keep everything running smoothly.

I also emulate many games. When playing on my computer, I use Ryujinx for the original Nintendo Switch, [MelonDS](https://melonds.kuribo64.net) for the Nintendo DS/DSi, [Dolphin](https://dolphin-emu.org) for Wii/GameCube, [PCSX2](https://pcsx2.net) for PlayStation 2, [xemu](https://xemu.app) for the original XBOX, [Xenia](https://xenia.jp) for the Xbox 360, and [Mupen64Plus](https://mupen64plus.org)/[Rosalie's Mupen GUI](https://github.com/Rosalie241/RMG) standalone, with pretty much everything else handled by RetroArch for convenience.
