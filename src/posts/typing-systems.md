---
title: Switching to Colemak-DH
description: Details of my choice and experience switching to the Colemak-DH keyboard layout from QWERTY for the purposes of speed and improved ergonomics.
og_description: QWKSFO dixnd.
pub_time: 2025-10-11
section: Essay
---

QWERTY is the de facto keyboard layout for people using the Latin-script alphabet. It evented on typewriters in the late 1800s and has remained a staple layout of the keyboard since -- a questionable feat given how few things from the 1800s remain unchanged.

I am a very active computer user, and my primary work is development and writing. These are both extremely text-heavy jobs involving long periods of text manipulation alongside short, sporadic bursts. This made my primary consideration ergonomics. While I fortunately haven't had any issues personally, repetitive strain injuries (RSI) and carpal tunnel syndrome have plagued many a heavy typist and are both things I'd rather avoid if possible.

I do not use QWERTY, instead opting for Colemak-DH. My intention for this article is to document my experience switching and if I believe it wise.

## Why Colemak-DH?

I wanted to properly learn to touch-type. Throughout primary school I had computer classes in which we learnt how to touch-type, but I never took to them. I ended up with a half-pecking/half-touch-typing abomination style that I could use with relative efficacy but which was unwieldy, unideal, and not particularly fast nor ergonomic.

If I was going to be relearning how to type, I decided I may as well learn how to type with a good layout. Thus, the question became: which to choose? There are plenty of alternative keyboard layouts. To run through a few of those I considered:

- Dvorak, which came about in the 1930s. It goes all in on efficiency and optimising finger movements. The layout is entirely different from QWERTY.
- Colemak, which came about in 2006. It aims for improved typing comfort and speed while remaining reasonably close to QWERTY by not moving a huge number of keys around. It also doesn't mess with the placement of common shortcuts. This makes switching easier.
- [Workman](https://workmanlayout.org) attempts to address some of Colemak's shortcomings. It does introduce many cases where one finger needs to hit multiple keys in succession [^1].

Speed was not too much of an object to me, as I could already write faster than I could realistically think to write in most scenarios, and I could certainly type faster than I could code. I obviously didn't want to choose a layout which prioritises ergonomics to the point of my speed becoming an issue, but speed isn't my explicit goal. Any of the above layouts come with a speed improvement thanks to the added efficiency anyhow.

Colemak came out as the winner, as the difference to QWERTY isn't too drastic, and while it isn't perfect in any one way, it is extremely good in all of them.

The exception to that rule is the placement of <kbd>D</kbd> and <kbd>H</kbd>, which are frequently used letters and awkward to type due to the lateral stretch. This is fixed by Colemak-DH, which moves those keys into a much better position and is the layout I ultimately chose.

Workman also tries to fix Colemak's <kbd>D</kbd><kbd>H</kbd> problem but introduces other issues such that I didn't consider it as a good fit for me.

As the keyboard on [my laptop](/posts/a-year-with-the-framework-laptop-13) is ANSI, I also have <kbd>Z</kbd> placed in the center of the bottom row to avoid conflict with the left <kbd>Shift</kbd>.

<figure>
<svg viewBox="0 0 41.4 11.6" role="img">
    <desc>A keyboard layout. The top row has 'Q', 'W', 'F', 'P', 'B', 'J', 'L', 'U', 'Y', and ';'. The middle row has 'A', 'R', 'S', 'T', 'G', 'M', 'N', 'E', 'I', and 'O'. The bottom row has 'X', 'C', 'D', 'V', Z', 'K', 'H', ',', and '.'.</desc>
	<path fill="light-dark(var(--white), var(--grey))"
		d="M0 0h3.3v3.3H0zm4.1 0h3.3v3.3H4.1zm4.1 0h3.3v3.3H8.2zm4.2 0h3.3v3.3h-3.3zm4.1 0h3.3v3.3h-3.3zm4.1 0H24v3.3h-3.3zm4.2 0h3.3v3.3h-3.3zM29 0h3.2v3.3H29zm4 0h3.3v3.3H33zm4.2 0h3.3v3.3h-3.3zM.8 4.1h3.3v3.3H.8zm4.2 0h3.3v3.3H5zm4.1 0h3.3v3.3H9.1zm4.1 0h3.3v3.3h-3.3zm4.2 0h3.3v3.3h-3.3zm4.1 0h3.3v3.3h-3.3zm4.1 0H29v3.3h-3.3zm4.2 0h3.3v3.3h-3.3zm4.2 0h3.2v3.3H34zm4 0h3.3v3.3H38zM2.5 8.2h3.3v3.3H2.5zm4.1 0H10v3.3H6.6zm4.2 0h3.3v3.3h-3.3zm4.2 0h3.2v3.3H15zm4 0h3.3v3.3H19zm4.2 0h3.3v3.3h-3.3zm4.1 0h3.3v3.3h-3.3zm4.1 0h3.3v3.3h-3.3zm4.2 0H39v3.3h-3.3z" />
	<g font-size="0.18rem" fill="light-dark(var(--black), var(--bright_white))">
		<text x="10" y="59.9" transform="translate(-9.5 -57.3)">
			<tspan x="10" y="59.9">Q</tspan>
		</text>
		<text x="13.8" y="60" transform="translate(-9.5 -57.3)">
			<tspan x="13.8" y="60">W</tspan>
		</text>
		<text x="18.3" y="60" transform="translate(-9.5 -57.3)">
			<tspan x="18.3" y="60">F</tspan>
		</text>
		<text x="22.5" y="60" transform="translate(-9.5 -57.3)">
			<tspan x="22.5" y="60">P</tspan>
		</text>
		<text x="26.6" y="60" transform="translate(-9.5 -57.3)">
			<tspan x="26.6" y="60">B</tspan>
		</text>
		<text x="31" y="60" transform="translate(-9.5 -57.3)">
			<tspan x="31" y="60">J</tspan>
		</text>
		<text x="34.9" y="60" transform="translate(-9.5 -57.3)">
			<tspan x="34.9" y="60">L</tspan>
		</text>
		<text x="39" y="60" transform="translate(-9.5 -57.3)">
			<tspan x="39" y="60">U</tspan>
		</text>
		<text x="43.3" y="60" transform="translate(-9.5 -57.3)">
			<tspan x="43.3" y="60">Y</tspan>
		</text>
		<text x="47.9" y="59.7" transform="translate(-9.5 -57.3)">
			<tspan x="47.9" y="59.7">;</tspan>
		</text>
		<text x="11" y="64.1" transform="translate(-9.5 -57.3)">
			<tspan x="11" y="64.1">A</tspan>
		</text>
		<text x="15" y="64.1" transform="translate(-9.5 -57.3)">
			<tspan x="15" y="64.1">R</tspan>
		</text>
		<text x="19.3" y="64.1" transform="translate(-9.5 -57.3)">
			<tspan x="19.3" y="64.1">S</tspan>
		</text>
		<text x="23.5" y="64.1" transform="translate(-9.5 -57.3)">
			<tspan x="23.5" y="64.1">T</tspan>
		</text>
		<text x="27.4" y="64.1" transform="translate(-9.5 -57.3)">
			<tspan x="27.4" y="64.1">G</tspan>
		</text>
		<text x="31.3" y="64.1" transform="translate(-9.5 -57.3)">
			<tspan x="31.3" y="64.1">M</tspan>
		</text>
		<text x="35.6" y="64.1" transform="translate(-9.5 -57.3)">
			<tspan x="35.6" y="64.1">N</tspan>
		</text>
		<text x="39.8" y="64.1" transform="translate(-9.5 -57.3)">
			<tspan x="39.8" y="64.1">E</tspan>
		</text>
		<text x="44.6" y="64.1" transform="translate(-9.5 -57.3)">
			<tspan x="44.6" y="64.1">I</tspan>
		</text>
		<text x="48" y="64.1" transform="translate(-9.5 -57.3)">
			<tspan x="48" y="64.1">O</tspan>
		</text>
		<text x="12.7" y="68.3" transform="translate(-9.5 -57.3)">
			<tspan x="12.7" y="68.3">X</tspan>
		</text>
		<text x="16.7" y="68.2" transform="translate(-9.5 -57.3)">
			<tspan x="16.7" y="68.2">C</tspan>
		</text>
		<text x="20.7" y="68.3" transform="translate(-9.5 -57.3)">
			<tspan x="20.7" y="68.3">D</tspan>
		</text>
		<text x="25.1" y="68.3" transform="translate(-9.5 -57.3)">
			<tspan x="25.1" y="68.3">V</tspan>
		</text>
		<text x="29.2" y="68.3" transform="translate(-9.5 -57.3)">
			<tspan x="29.2" y="68.3">Z</tspan>
		</text>
		<text x="33.2" y="68.3" transform="translate(-9.5 -57.3)">
			<tspan x="33.2" y="68.3">K</tspan>
		</text>
		<text x="37.3" y="68.3" transform="translate(-9.5 -57.3)">
			<tspan x="37.3" y="68.3">H</tspan>
		</text>
		<text x="42.2" y="68.2" transform="translate(-9.5 -57.3)">
			<tspan x="42.2" y="68.2">,</tspan>
		</text>
		<text x="46.3" y="68.2" transform="translate(-9.5 -57.3)">
			<tspan x="46.3" y="68.2">.</tspan>
		</text>
	</g>
</svg>
<figcaption>My Colemak-DH ANSI keyboard layout.</figcaption>
</figure>

## The Switching Experience

To log my progress and get a general idea of how Colemak was working for me, I decided to use [Monkeytype](https://monkeytype.com). Monkeytype allows you to test your typing speed. There are a number of tests one can select from, and at the conclusion of each, statistics are provided, including details such as one's speed measured in words per minute (WPM) and one's accuracy. The outcomes are logged so one can refer to them later and track their progress. This data is also exportable as a <abbr title="Comma Separated Values">CSV</abbr> file, allowing further external analysis.

Before switching, I made note of my QWERTY speed, which I logged at 64WPM with an accuracy of 97.65%.

I switched cold turkey on the 13<sup>th</sup> of November, 2022. I completely dropped QWERTY and switched my devices to Colemak-DH. My initial typing speed was a feeble 4.8 words per minute (WPM) with an accuracy of 75%. I unfortunately no longer have my chat logs from the time, but my mistypings were comically egregious.

Some people opt for using transitionary layouts, such as Tarmak, which allow the user to slowly migrate to Colemak via a series of steps which only move a few keys. I didn't follow Tarmak, as I wanted to polish my touch typing, and a switching period of being slower at typing was not too dire for me at the time. I might consider Tarmak were I to be making the switch now, given that I am now operating in more professional contexts which require quick action.

The first two months following my switch showed the most improvement, jumping me to scores in the high 40s by mid-January. I continued to improve my speed before eventually surpassing my QWERTY speed with a test of 66.8WPM on the 20<sup>th</sup> of April, 2023. I imagine that the swift succession at the beginning is in one part due to the law of diminishing returns and in another part due to my decrease in active improvement, as is seen in the graph below showing my tests.

<figure>
<svg viewBox="0 0 555.1 322.5" role="img">
    <desc>A graph starting in December 2022 and ending in November 2022 showing Colemak-DH typing speed over time. Begins at 4.9 WPM and finishes at 83.2 WPM.</desc>
	<g>
        <g stroke="light-dark(var(--bright_grey), var(--white))">
			<path d="M51 259.3h504" />
			<path d="M51 195.3h504m-504-63h504m-504-64h504M51 4.3h504" />
			<path d="M51 238.3h504m-504-21h504m-504-43h504m-504-21h504m-504-43h504m-504-21h504" />
			<path d="M51 96.1h504" stroke="var(--red)" />
			<path d="M51 47.3h504m-504-22h504" />
		</g>
	</g>
	<g fill="var(--blue)">
		<path
			d="M554.6 47.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M540 81.1a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 20.8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-30.3a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-9.3 1.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M530.7 70.3a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M530.7 66.8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 20.1a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M530.7 64.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 20a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-30.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 17.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M530.7 72.7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 21.3a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-36.8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M530.7 69a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1.4 39.8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M529.3 73.6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-115.5-.9a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-30.5 38.7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 14.9a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M266.4 105a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-16a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M266.4 107.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M194.7 126a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M194.7 120.9a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M194.7 126a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-26.7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 39.1a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M194.7 140.6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-9a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-8-16.6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 6.6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-53.1 26.7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-6.6-10.1a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-18.6 3.3a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1.4 17.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M107 156a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M107 155.8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-2.6-10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M104.4 153.8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-21.8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 28.6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-12.9a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M103 151.7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M103 149.3a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M103 148a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1.3 5.8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M100.4 154a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 8.3a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M97.8 165.4a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M97.8 160.8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-4 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-6.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-5.4a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M91.1 171.3a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M91.1 169.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-5.3 2.4a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 6.9a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-15.7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M79.2 185a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M79.2 180.6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-11.7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 17.7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M77.8 181.9a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M77.8 181a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 7.4a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-13.4a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M77.8 176.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M77.8 174.6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-3.9 17.1a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-2.7 5.1a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 5.8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M71.2 201.4a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M71.2 197.6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-6.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M71.2 199a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M71.2 197.8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M71.2 197.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-7.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M69.9 194.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M69.9 199.7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M69.9 197a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M69.9 195.6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M69.9 200.3a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M69.9 205.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M68.5 206.4a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M65.9 210.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M65.9 205.8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-4 7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-2.7 9.4a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M59.2 221.7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M59.2 223.4a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0-30.8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 37.1a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M59.2 223.1a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m0 6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path
			d="M59.2 223.4a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1.2 7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M58 230.9a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M58 227.1a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M58 230.9a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M58 232a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M58 235.6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M58 233.6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M58 234.8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M56.6 233a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M56.6 236.3a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M56.6 236.6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M56.6 238.7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M56.6 238.7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M56.6 238.3a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M56.6 240a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M56.6 245a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M56.6 246.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
		<path d="M56.6 246.8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
	</g>
	<g fill="light-dark(var(--black), var(--bright_white))" font-size="0.75rem">
		<text x="-200" y="9.7" transform="rotate(-90)" font-weight="bold">Words Per Minute</text>
		<text x="37.7" y="263">0</text>
		<text x="31" y="199.3">25</text>
		<text x="30.7" y="135.5">50</text>
		<text x="31.3" y="71.8">75</text>
		<text x="25.3" y="8">100</text>
		<text x="287.7" y="322.3" font-weight="bold">Date</text>
		<text x="-173.2" y="254.8" transform="rotate(-45)">1/12/22</text>
		<text x="-143.1" y="285.5" transform="rotate(-45)">1/01/23</text>
		<text x="-115.7" y="315.2" transform="rotate(-45)">1/02/23</text>
		<text x="-89.3" y="341.4" transform="rotate(-45)">1/03/23</text>
		<text x="-60.6" y="370.7" transform="rotate(-45)">1/04/23</text>
		<text x="-35.6" y="395.3" transform="rotate(-45)">1/05/23</text>
		<text x="-3.3" y="427.9" transform="rotate(-45)">1/06/23</text>
		<text x="26" y="455.7" transform="rotate(-45)">1/07/23</text>
		<text x="53.9" y="485.2" transform="rotate(-45)">1/08/23</text>
		<text x="83.2" y="514.3" transform="rotate(-45)">1/09/23</text>
		<text x="111.5" y="540.1" transform="rotate(-45)">1/10/23</text>
		<text x="142.6" y="568.5" transform="rotate(-45)">1/11/23</text>
	</g>
</svg>
<figcaption>My first year of progress after switching, based on data exported from Monkeytype. The red line indicates my prior QWERTY speed of 64WPM.</figcaption>
</figure>

One significant worry I had was that I'd lose all ability to use a QWERTY keyboard, especially as I was working tech support at the time, which regularly required me to input information on client devices.

Indeed, following my switch to Colemak-DH, my QWERTY ability took a significant hit. After a short period of adjustment I can hunt and peck at a serviceable speed, but my performance fluctuates. It isn't enough to be a hugely negative influence, as I'm rarely entering text at a high speed on other people's devices.

I think it is to my benefit that I was not a touch typist when I used to use QWERTY, as I can use QWERTY when pecking and Colemak-DH when touch typing without having my wires crossed.

It really wasn't a painful process to switch, and it is something that must only be done once and doesn't require additional effort to keep; my consistent computer use is enough to keep me sharp. I consider switching to have been a worthwhile usage of my time that continues to be to my benefit. For any heavy typist concerned with long-term ergonomics, I'd consider the initial investment justifiable.

## Further Notes

Since switching keyboard layouts, very few other people can use my devices. This is great in that people can't use them without permission but is terrible in that people can't use them _with_ permission.

This inability for others to use my devices certainly isn't aided by the fact that I replaced my laptop's labelled QWERTY keyboard with a blank set or the fact that I have my mouse and touchpad's primary click on the right, with my secondary click on the left.

One alteration I swear by is having my <kbd>Caps Lock</kbd> bound to <kbd>Esc</kbd>. I've never used the <kbd>Caps Lock</kbd> key, so keeping it around was pointless. <kbd>Esc</kbd> is a much more useful key, but it is usually far out of the way in the top left of the keyboard, which requires I reach for it. It is also very convenient for my Vim usage, where I frequently need to exit out of modes.

[^1]: This is called a same-finger bigram and reduces speed.
