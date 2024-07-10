<head>
    <title>Making Windows "Usable" | Vale.Rocks</title>
    <meta property="og:title" content='Making Windows "Usable"' />
    <meta name="description" content="My comprehensive tutorial dedicated to optimising and customising Windows 11 for a somewhat usable user experience. I detail beneficial programs, tips, and essential tweaks to setup Windows 11 as a more or less servicable computer environment, somewhat tailored to your preferences." />
    <meta property="og:description" content="At least we're past Windows ME..." />
    <meta property="article:published_time" content="2023-10-31" />
    <meta property="article:modified_time" content="2023-11-22" />
    <meta property="article:section" content="Tutorials" />
</head>

<article>
<header>
	Tutorial
	<h1>
		Making Windows "Usable"
	</h1>
	<ul>
		<li><time datetime="2023-10-31">31 Oct, 2023</time></li>
		<li>1150 words</li>
		<li>4 minute read</li>
	</ul>
</header>

<div class="readable-width">

I'm not quiet about my intense distaste for Microsoft's feeble attempt at an operating system. I find Windows to be a horrific amalgamation of legacy code, bloat, and hostile user practices that I avoid when possible. Unfortunately, it's not always possible to do so.

This year, I found myself doing a Certificate IV in Graphic Design that required Adobe's Creative Cloud. As I'm sure you know, this software only runs on MacOS and Windows, which lead to quite the conundrum. Not willing to give up my beloved Arch Linux, I needed a way to get these programs running on my computer.

Dual booting was an option, but one with hassle, so I chose to fire up a Windows virtual machine with a few tweaks. I ran the virtual machine with KVM/QEMU using Virt-Man but that isn't the focus of this article. This article is about the tweaks I used and how I made Windows vaguely usable. With any luck, you can achieve the same.

## Installation

While it may seem sensible to just jump straight into installation, there is a much better way to do it. You'll first need to [grab an ISO from Microsoft's website](https://www.microsoft.com/software-download/windows11). If you are wondering why I recommend Windows 11 over 10, it's for a few reasons. I find 11 to be a bit more visually appealing, and it also gets more focus from Microsoft, giving it newer features, and making it more secure. Most of the issues that people blabber on about can be easily fixed with a few under the hood changes anyway.

> [!WARNING]
> I recommend using a stock ISO from Microsoft rather than mods such as Tiny11. Their stripped back nature often leads to the breakage of certain features or incompatibility with programs. The closed source nature of most ISOs also leads to the potential for bundled malware. There are many ways to debloat Windows without causing undue harm that will be detailed further along in this article.

Writing the ISO once you've got it is pretty easy. If you have a Windows install on hand that you can use to create the installation media, then I recommend writing the ISO with [Rufus](https://rufus.ie). If using another OS to write the media, then use whatever you're most used to.

Once you've booted to the installer, I recommend setting the 'Time and Currency Format' to 'English (World)'. This will stop Windows from installing all of its default bloat, but will also break the Microsoft Store. Don't fret if you like the Microsoft Store, as this guide will tell you how to reenable it later. I then suggest selecting 'Windows 11 Pro' for the version.

Once you've entered the Out of Box Experience (OOBE), there may be a decently long loading screen before you are greeted by a region error. Click 'skip' and then continue as you usually would.

When it asks how you would like the device setup, select 'Set up for Work or School'. On the following screen, select 'Sign-in options' and then 'Domain join instead' which will allow you to create an offline account. Then continue on with setup and disable any telemetry toggles as you go. Once finished, your computer will boot into the desktop.

If you want to use the Microsoft Store, then you will need to change your region. This can be done by opening settings and navigating to 'Time & language > Language & region'. Set the 'Country or Region' to your own.

## Configuration

In my opinion, Microsoft made some truly baffling decisions in Windows 11, so I'll run you through how to unbaffle your install with a couple of handy tools. After all, nothing says 'user-friendly' like needing a Swiss army knife to push a button.

The first thing to do is figure out how you want to install applications. Most people will simply search the web for executables to install, but that is a rather insecure way to go about it. It's all too easy to click the wrong link and end up with a trojan. For that reason, I recommend using a command line tool such as [Scoop](https://scoop.sh) or [Chocolatey](https://chocolatey.org), especially if you're coming from Linux. Otherwise, you can use the Microsoft Store (if you reenabled it above) or just take the risk of downloading installers from the web.

The second thing that I recommend fixing is the start menu. For this, I chose [ExplorerPatcher](https://github.com/valinet/ExplorerPatcher/wiki) which brings back Windows 10's start menu with added customisability and adds the ability to change flyouts and other such things. It's very good.

I also recommend installing using [Microsoft's PowerToys](https://github.com/microsoft/PowerToys). The full functionality is outside the scope of this article, but I use it to set my keyboard layout, rename files, organise my window layouts, resize images, and highlight my cursor for demonstrations.

If you are a developer, then you can't go wrong with [DevToys](https://devtoys.app) which is an excellent little tool that you will constantly find yourself using. When developing, it can also prove useful to add things to the File Explorer context menu. [Shell](https://nilesoft.org) is a very good tool that does just that.

It is also useful to have a good terminal on hand. Microsoft's [Windows Terminal](https://github.com/microsoft/terminal) is surprisingly good for what it is. It combines Powershell and Command Prompt, along with any Windows Subsystem for Linux compatibility layers you may have, into a cohesive, modern, and sleek interface. It's a genuinely good terminal, something I didn't expect from Microsoft when I first heard of it.

If you are sick of Windows' bloat, then you can try a debloater script such as [Win Debloat Tools](https://github.com/LeDragoX/Win-Debloat-Tools). Keep in mind debloat scripts can also cause harm by removing dependencies of other programs, so I recommend proceeding with the utmost caution.

A few other assorted tools and programs that work on Windows and that I can recommend include:

- [NanaZip](https://github.com/M2Team/NanaZip) - a decent archive manager based on 7-Zip.
- [Firefox](https://www.mozilla.org/en-US/firefox/browsers) - an excellent browser.
- [VLC](https://www.videolan.org/vlc) - a FOSS media player that plays just about anything.
- [Thunderbird](https://www.thunderbird.net) - a very nice email client.
- [LibreOffice](https://www.libreoffice.org) - an excellent office suite. Check out [my guide on improving it](LibreOffice_Setup).

Now that you have your system more or less configured, I thought it may be worth touching on antivirus programs. There are plenty out there, and each is as user hostile as the last. For that reason, I recommend sticking with Windows' built in Microsoft Defender. It is pretty fast, generally stays out of your way, and won't harass you for your lunch money. It may be lacking in some features compared to paid options, but it is widely used and very well supported. It's just about the best option around.

---

And there you have it, a few tweaks, and Windows went from 'Why do you insist on torturing me?' to 'I suppose you can stay'. I hope you found this little guide useful. Is there anything specific you do for your installs or something that I missed? If so, leave it in the comments!

<section class="giscus"></section>

</div>
</article>
