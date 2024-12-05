---
title: Uses
description: Details of the tools, software, and hardware powering my workflow. Information on my setup, development environment, self-hosting, and multimedia management.
---

<h1 id="section">Uses</h1>

<div class="readable-width">

This page details some of the many things I use. Generally, my selections align with the philosophies [outlined by Gwern](https://gwern.net/choosing-software). Everything is outlined in my [dotfiles repository on GitHub](https://github.com/DeclanChidlow/dotfiles).

## Laptop

Day to day I run a Framework Laptop 13. More information about my specific device and my experience with it is available in [my review](/posts/a-year-with-the-framework-laptop-13).

It runs [NixOS](https://nixos.org), which I'm a huge fan of thanks to its declarative configuration. The ability to run things in an ephemeral shell with `nix-shell -p` is also core to my iterative development processes.

### Environment

I run [Sway](https://swaywm.org) as my window manager, [swaylock](https://github.com/swaywm/swaylock) as the screen locker, and [Yambar](https://codeberg.org/dnkl/yambar) as my status panel. I use [bemenu](https://github.com/Cloudef/bemenu) (a Wayland equivalent of dmenu) for launching programs and displaying my clipboard history (with the help of cliphist). My notifications are all handled by [Dunst](https://dunst-project.org).

[Kitty](https://sw.kovidgoyal.net/kitty) is my preferred terminal, pretty much exclusively for it's support for ligatures and images, and it's [SSH kitten](https://sw.kovidgoyal.net/kitty/kittens/ssh).

All my file exploring is handled by the very excellent [Vifm](https://vifm.info). My configurations for it are quite extensive, and it works for me as a full stand-in for any 'conventional' file explorer such as Dolphin or Nautilus.

### Shell

I spend a lot of my time in the terminal and, as such, have a pretty smooth config. I run [ZSH](https://www.zsh.org) as my shell, with a custom prompt and some default tools replaced. [Eza](https://eza.rocks) takes the place of `ls` and `tree`, [Bat](https://github.com/sharkdp/bat) takes the place of `cat`, [BTOP++](https://github.com/aristocratos/btop) takes the place of `top`, and [ugrep](https://ugrep.com) takes the place of `grep`.

### Browsers

- [Firefox](https://www.mozilla.org/firefox/new): For general browser usage.
- [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer): For development on Firefox and testing Gecko compatibility.
- [Chromium](https://www.chromium.org/Home): For testing Blink compatibility.
- [Epiphany](https://apps.gnome.org/Epiphany): For testing WebKit compatibility.
- [Tor](https://www.torproject.org): For the occasional dark web browsing session or increased anonymity. I don't use any extensions with Tor.

I use a [custom search engine wrapper I made](https://search.vale.rocks) to allow for easily switching engines and a few quality of life improvements conducive to my workflow. I also usually roll with these extensions:

- [Facebook Container](https://www.mozilla.org/en-US/firefox/facebookcontainer) (Firefox only): Isolates Facebook from the rest of my browsing.
- [uBlock Origin](https://ublockorigin.com): Allows blocking adverts, content, fonts, scripts, etc. I switch this out for [the lite variant](https://github.com/uBlockOrigin/uBOL-home) on browsers that have dropped Manifestv2 support.
- [SponsorBlock for YouTube](https://sponsor.ajay.app): Can filter out unwanted parts of YouTube videos.
- [Web Developer](https://chrispederick.com/work/web-developer): Adds tons of handy tools and checkers.
- [React Developer Tools](https://react.dev/learn/react-developer-tools): Makes developing with React so much nicer.

### Development

I've already touched on some of my preferred development tools, but I also have many more that I rely on for my front-end development needs.

As you'd expect, I use [Git](https://git-scm.com) for version control, with [GitHub](https://github.com) for hosting. In most situations, I use [Deno](https://deno.com) in place of Node for the performance benefit and convenient feature set, although I obviously keep around all the expected other tools for working on other projects. I'm also quite fond of using [httplz](https://github.com/thecoshman/http) as a basic http server during development.

Central to all my development is my editor, [Neovim](https://neovim.io). I've extensively customised it, and it serves as the bulk of my editing environment. It is setup alongside a long list of language servers and plugins that would best be assessed by consulting my [dotfiles](https://github.com/DeclanChidlow/dotfiles). I hope to eventually do a write-up of my specific configuration.

### Virtualisation

Sometimes I find myself needing to use Adobe's Creative Cloud or other software that simply refuses to run on Linux. For that reason I've got a Windows 11 virtual machine setup with KVM/[QEMU](https://www.qemu.org), [Spice USB Redirection](https://www.spice-space.org/usbredir.html), [Windows guest drivers](https://github.com/virtio-win/kvm-guest-drivers-windows), [libvirt](https://libvirt.org), [Virtual Machine Manager](https://virt-manager.org), and other things of that nature. It generally works and runs pretty smoothly.

### Miscellaneous

I use [PrusaSlicer](https://www.prusa3d.com/page/prusaslicer_424) for my 3D printing slicing needs, dabble with 3D in [Blender](https://www.blender.org), and use [LibreOffice](https://www.libreoffice.org) for dealing with all the Microsoft Office file formats I have to deal with. Otherwise, I tend to use Neovim paired with [Pandoc](https://pandoc.org) for most document creation.

Video and loose audio files are run through [mpv](https://mpv.io), and [imv](https://sr.ht/~exec64/imv) serves as my image viewer.

---

## Phone

My current phone is a Google Pixel 7a. Nothing too special, but it's one of the only phones on the market with a good camera and, more importantly, an open bootloader. Being a Pixel, it also has support for the excellent [GrapheneOS](https://grapheneos.org). GrapheneOS is pretty much stock Android with a myriad of security and privacy improvements.

I generally look for apps that I can customise, that are open source, and that adhere to Material You. The apps I've currently got installed include:

- [Bluesky](https://bsky.social/about)
- [Breezy Weather](https://github.com/breezy-weather/breezy-weather)
- [Fossify Calculator](https://github.com/FossifyOrg/Calculator)
- [Pixel Camera](https://play.google.com/store/apps/details?id=com.google.android.GoogleCamera): I bought my phone partly for the camera, and no third-party app comes close in processing, so with the stock Pixel Camera app I roll, albeit with revoked network permissions.
- [Fossify Clock](https://github.com/FossifyOrg/Clock)
- [Vanadium](https://grapheneos.org/features#vanadium): Vanadium is a privacy-focused fork of Chromium bundled with GrapheneOS. As much as I dislike playing into Chrome's market dominance, Firefox on Android is very poor security wise, plays badly with PWAs, and there isn't much point having two separate browser engines installed, among other issues.
- [FlorisBoard](https://florisboard.org): Excellent and very customisable FOSS keyboard.
- [Glider](https://github.com/Mosc/Glider): Slick Hacker News client.
- [Kvaesitso](https://kvaesitso.mm20.de): Feature-rich, search-focused launcher.
- [Google Messages](https://www.android.com/google-messages/): Google's SMS/MMS/RCS app. I'd prefer to use a FOSS alternative, but RCS is pretty locked down, so I'm left without alternatives.
- [Moshidon](https://github.com/LucasGGamerM/moshidon): Wonderful Fediverse client with plenty of quality of life features.
- [Neo Store](https://github.com/NeoApplications/Neo-Store): Modern, feature-rich F-Droid client
- [Fossify Notes](https://github.com/FossifyOrg/Notes)
- [OsmAnd+](https://osmand.net): Navigation app based on OpenStreetMap.
- [Phone by Google](https://play.google.com/store/apps/details?id=com.google.android.dialer): Google's Phone app that I've chosen to use as it complements Google Messages.
- [Google Photos](https://photos.google.com): Not my preference, but it's one of the only options with good editing capabilities. I keep it disconnected from the internet.
- [phyphox](https://phyphox.org): Allows for doing all sorts of really cool things using the many sensors in phones.
- [Proton Calendar](https://proton.me/calendar)
- [Proton Drive](https://proton.me/drive)
- [Proton Mail](https://proton.me/mail)
- [Proton Pass](https://proton.me/pass)
- [Proton VPN](https://protonvpn.com)
- [Revolt](https://revolt.chat): Currently using the work-in-progress [native Android app](https://github.com/revoltchat/android).
- [Signal](https://signal.org): Excellent chat app for when I need privacy.
- [Telegram](https://telegram.org): Not my preference but kept around for people who refuse to switch to Signal.
- [YouTube](https://youtube.com): I use YouTube with [Revanced](https://revanced.app) for quality of life improvements.
- [YouTube Music](https://music.youtube.com): I use YouTube Music on my phone for discovering new music. Much like the main app, I use it with [Revanced](https://revanced.app).

---

## Home Server

While I do have some remote VPS', I also maintain a home server for self-hosting a range of services, some of which are detailed on my [services page](https://vale.rocks/services).

Much like my laptop, it runs NixOS. Everything it hosts is containerised with Docker. I use [Oxker](https://github.com/mrjackwills/oxker) as a nice TUI container manager, but it's all otherwise pretty boring, though that is probably a good thing for what should be a stable server.

---

## Multimedia

I've got quite an extensive media library and an equally extensive process for sorting and organising it.

### Images/Videos

I self host [Jellyfin](https://jellyfin.org) for all my movies and televisual needs. It's got an intuitive design and feels at home next to commercial streaming services.

All my personal photos, home videos, etc are handled by a self-hosted deployment of [Immich](https://immich.app). It handles everything quite simply and works well.

### Music

Music libraries devolve into a mess with disturbing ease. I convert all my music to OPUS, process them with [beets](https://beets.io), then play them with [Music Player Dameon (MPD)](https://www.musicpd.org). I can then use a frontend of my choosing, such as [ncmpcpp](https://rybczak.net/ncmpcpp), and pair it with tools like [mpc](https://github.com/MusicPlayerDaemon/mpc) for assigning keybinds.

### Books

Currently I manage my extensive e-book collection with [Calibre](https://calibre-ebook.com), although it is showing its age in a few places. I pair it with [The StoryGraph](https://www.thestorygraph.com) for tracking read books and sourcing recommendations.

### Gaming

I like to do a bit of gaming in my 'spare' time, so I've got a bit setup. I end up spending the bulk of my games on my Xbox Series S simply as a result of convenience. I do also keep some other consoles around, including my Xbox 360 E, PlayStation Vita 2K, and Nintendo DS, although they see scarce use.

My preferred platform, even if not the most played, is PC. Most of my PC games live on [Steam](https://steampowered.com), although I've got pretty extensive libraries on GOG, Epic Games, and Amazon Gaming, which I manage through the [Heroic Games Launcher](https://heroicgameslauncher.com). I also have [Prism Launcher](https://prismlauncher.org) for my occasional Minecraft needs and [GameMode](https://feralinteractive.github.io/gamemode) to keep everything running smoothly.

I also emulate many games. I use [Ryujinx](https://ryujinx.org) for Switch, [MelonDS](https://melonds.kuribo64.net) for DS, [Dolphin](https://dolphin-emu.org) for Wii/GameCube, [PCSX2](https://pcsx2.net) for PlayStation 2, [xemu](https://xemu.app) for the original XBOX, [Xenia](https://xenia.jp) for the Xbox 360, and [Mupen64Plus](https://mupen64plus.org)/[Rosalie's Mupen GUI](https://github.com/Rosalie241/RMG) standalone, with everything else handled by RetroArch for convenience.

</div>
