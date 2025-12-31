---
title: AutoMod
description: A popular moderation bot developed for Stoat that protects over 145K users across 5,500+ servers. I maintain and host this open-source community safety tool, complete with comprehensive documentation.
og_description: Moderation bot for Stoat that keeps communities safe.
accent_colour: "#ff6763"
repository: DeclanChidlow/AutoMod
hoisted: true
tags: [design, Stoat, development, front-end development]
---

AutoMod is a moderation and utility bot for the chat platform [**Stoat**](https://stoat.chat), of which I am a core team member. It is one of the most popular bots on the platform, being present in over **5900 servers** with a combined total user count in excess of **175K people**.

<figure class="right">
<img src="https://automod.vale.rocks/assets/images/filter_example.avif" alt="A user adds the word 'poo' to the filter list using '/filter add poo'. AutoMod confirms the addition with 'strictness HARD.'" style="background: light-dark(var(--black), transparent); padding: 1rem;">
<figcaption>AutoMod following a request to begin filtering out a word.</figcaption>
</figure>

I am responsible for the bot’s full development lifecycle, including its development, maintenance, and hosting for the official Stoat instance. AutoMod provides essential moderation features such as message filtering, punitive user actions, and comprehensive action logging, among much more.

Spurred by the growing need for improved user resources, I created a [**custom documentation website**](https://automod.vale.rocks) from the ground up, making comprehensive support materials presented in an accessible manner available to all users. Realising the need for better communication with the user base, I extended this site to also support [a **blog**](https://automod.vale.rocks/blog/introducing-the-automod-blog).

The bot is developed in a monorepo, written in **JavaScript/TypeScript**, and makes use of a range of modern libraries and technologies, including:

- [**Stoat.js**](https://github.com/stoatchat/javascript-client-sdk) for interacting with Stoat's API.
- [**Valkey**](https://valkey.io), a fork of [**Redis**](https://redis.io), for high-speed caching and real-time operations.
- [**MongoDB**](https://www.mongodb.com) for persistent data storage.
- [**Docker**](https://www.docker.com) for containerisation, allowing consistent and reliable deployment and distribution.

Given AutoMod's huge success and large demand, I developed another bot in a similar style titled [AutoFeeds](https://github.com/DeclanChidlow/AutoFeeds), which automatically fetches and posts new items from user-specified RSS, Atom, and JSON feeds. It is also containerised with Docker and stays simple with a database using the **SQL-based MariaDB**.

<figure>
<svg viewBox="0 0 738.4 327.5" role="img" style="background: var(--bright_white);">
    <desc>Combined AutoMod and AutoFeeds branding showing the logos and text with a rainbow banner behind them.</desc>
	<defs>
		<linearGradient id="a" x1="13.3" x2="394.8" y1="164" y2="164" gradientUnits="userSpaceOnUse">
			<stop offset="0" stop-color="#ffe084"/>
			<stop offset="1" stop-color="#9ee09c"/>
		</linearGradient>
		<linearGradient id="b" x1="66.4" x2="448.1" y1="164" y2="164" gradientUnits="userSpaceOnUse">
			<stop offset="0" stop-color="#ffc184"/>
			<stop offset=".5" stop-color="#a0d1a8"/>
			<stop offset="1" stop-color="#9ec1ce"/>
		</linearGradient>
		<linearGradient id="c" x1="120" x2="501.4" y1="164" y2="164" gradientUnits="userSpaceOnUse">
			<stop offset="0" stop-color="#fd9987"/>
			<stop offset="1" stop-color="#cc99c6"/>
		</linearGradient>
	</defs>
	<path fill="url(#a)" d="m394.8 0-328 328H13.3L341.4 0z"/>
	<path fill="url(#b)" d="M448.1 0 119.9 328H66.4L394.6 0z"/>
	<path fill="url(#c)" d="m501.4 0-328 328H120L447.9 0z"/>
	<path fill="#ff6763" d="M234.9 0 .4 234.5V181l181-181z"/>
	<path fill="#ffb042" d="M288.2 0 .4 287.8v-53.5L234.7 0z"/>
	<path fill="#fcfd96" d="m341.5 0-328 328H.4v-40.4L288.1 0z"/>
	<path fill="#15273c"
		d="M263.3 90a368 368 0 0 0-22.5-20.1c-3.7-3-7-6.6-10.7-9.6-2.1-1.9-4.4-4-7.2-4.9a9 9 0 0 0-4.9-.1V76a56 56 0 0 0 12.2 35.3c6 7 12.6 10.8 19.8 14.9q6.8 3.8 11 5.4a122 122 0 0 0 18-9.4 10 10 0 0 0 4.4-6.1c1-4.3-1.7-8.6-20-26ZM281 38a218 218 0 0 1-20-8.4 254 254 0 0 1-20.5 8.4l-3.3 1.1 3.6 8.9c2.4 5.6 6.1 13.6 8.6 18q4.5 7.5 11 13.6a78 78 0 0 0 23 14.9q3.3 1.5 6.7 2.3a25 25 0 0 1 8.3 3.8A56 56 0 0 0 304 76V45q-10.6-2.6-23-7M109.9 261.6a58 58 0 0 0-30-30 55 55 0 0 0-21.3-4.5h-.8v15.4a45 45 0 0 1 16 3.2A42 42 0 0 1 99 283.6h15.4q0-11.8-4.4-22m-41.2 0q-4.5 0-7.8 3.2a11 11 0 0 0-3.2 7.8q0 4.5 3.3 7.8t7.7 3.2 7.8-3.2c3.3-3.2 3.2-4.8 3.2-7.8q0-4.5-3.2-7.8a11 11 0 0 0-7.8-3.2"/>
	<path fill="#15273c"
		d="M144.7 269.1c-.4-7.4-1.5-14.6-6.4-19.5l-2.6-2.8c-18-20.2-.2-27.8-3-34.8q-.4-1-1.4-1.9c-8-8-15.2 17.2-39.4-7-6-6-15.6-6.3-24.7-6.5l-4.8-.2q-1.7 0-3 1-1.5 1.3-1.6 3.4v10.9c10 0 21.4-1 28 5.6l1.7 1.6c13 11.9 19.7 3.2 25.6 7.2q.6.3 1.2 1c6.6 6.5-5.3 13.3 9.8 28.4 5 5 5.7 12.7 5.7 20.4v7.7h10.9q1 0 1.7-.4a4 4 0 0 0 2.6-4.2zM373 51.5h-15.3l-20.3 53.4h15.3l3-9h18.8l3 9H393zm-13.4 32.7 5.6-16.6 5.5 16.6zm52.7 21.6a21 21 0 0 1-9.6-2.1q-4.1-2.1-6.5-5.9a16 16 0 0 1-2.4-8.5V68h14.7v21.4q0 1.2.5 2 .4 1 1.3 1.4a4 4 0 0 0 2 .5q1.6 0 2.7-1 1-1.2 1-2.9V68h14.8v21.3a16 16 0 0 1-9 14.4 21 21 0 0 1-9.5 2Zm51-37.8v12h-7.9v24.9h-14.6V80h-7.9V68h7.9V52.8h14.6V68zm21.7 37.8q-6 0-10.9-2.5-4.7-2.5-7.5-7t-2.7-10c0-5.5.9-7 2.7-9.9a19 19 0 0 1 7.5-6.8q4.7-2.5 10.8-2.5c6.1 0 7.7.8 10.8 2.5q4.7 2.6 7.5 6.8 2.7 4.4 2.7 10c0 5.5-.9 7-2.7 10a19 19 0 0 1-7.4 6.9 23 23 0 0 1-10.8 2.5m-.1-13q1.9 0 3.3-.7 1.4-.8 2.1-2.3t.7-3.4c0-2-.2-2.4-.7-3.4q-.9-1.5-2.2-2.2T485 80c-1.8 0-2.3.3-3.2.8q-1.5.8-2.2 2.3c-.7 1.5-.8 2.1-.8 3.4s.3 2.4.8 3.3 1.3 1.8 2.2 2.3q1.5.8 3.2.8Zm82.3-41.3v53.4h-14.9V79.8l-8.7 12.5H534l-8.7-12.6v25.2h-14.8V51.5h10.9l17.5 25.6 17.4-25.6zm25.7 54.3q-6 0-10.9-2.5-4.8-2.5-7.5-7t-2.7-10c0-5.5.9-7 2.7-9.9a19 19 0 0 1 7.4-6.8q4.8-2.5 10.9-2.5c6 0 7.6.8 10.8 2.5q4.7 2.6 7.4 6.8 2.8 4.4 2.8 10c0 5.5-1 7-2.7 10a19 19 0 0 1-7.4 6.9 23 23 0 0 1-10.8 2.5m-.1-13q1.8 0 3.3-.7 1.4-.8 2-2.3.9-1.4.8-3.4c0-2-.2-2.4-.8-3.4q-.8-1.5-2-2.2-1.4-.8-3.3-.8c-2 0-2.3.3-3.2.8q-1.5.8-2.2 2.3c-.7 1.5-.8 2.1-.8 3.4s.3 2.4.8 3.3 1.3 1.8 2.2 2.3q1.5.8 3.2.8M641.5 50v19a16 16 0 0 0-8-1.9q-5.5 0-9.6 2.5a17 17 0 0 0-6.4 6.8q-2.3 4.3-2.3 10c0 5.6.8 7 2.3 9.9a17 17 0 0 0 16 9.2 15 15 0 0 0 8.4-2.4v1.7h14.3v-55zm0 39.7a6 6 0 0 1-5.3 3 6 6 0 0 1-5.4-3q-.8-1.4-.8-3.3c0-1.9.3-2.3.8-3.2q.9-1.5 2.2-2.2 1.5-.9 3.2-.9a5 5 0 0 1 3.2.9q1.5.7 2.2 2.2.7 1.4.7 3.2c0 1.8-.3 2.4-.8 3.3M208.6 219.3h-15.3L173 272.7h15.3l3-9h18.9l3 9h15.5zM195.3 252l5.6-16.6 5.4 16.6zm52.7 21.6a21 21 0 0 1-9.6-2.1q-4.2-2-6.6-5.8a16 16 0 0 1-2.4-8.6v-21.3h14.7v21.4q0 1.2.5 2 .5 1 1.3 1.5a4 4 0 0 0 2 .5q1.6 0 2.7-1.1 1-1.2 1-2.8v-21.5h14.8v21.3a16 16 0 0 1-8.9 14.4 21 21 0 0 1-9.6 2.1Zm51-37.8v12h-7.9v24.9h-14.7v-24.9h-7.9v-12h7.9v-15.1h14.7v15.1zm21.6 37.8q-6 0-10.8-2.5t-7.5-7a15 15 0 0 1-2.8-10 18 18 0 0 1 10.2-16.7q4.8-2.5 10.8-2.5c6 0 7.7.8 10.8 2.5q4.8 2.5 7.5 6.9 2.7 4.3 2.7 9.9c0 5.6-.9 7-2.7 10a19 19 0 0 1-7.4 6.9 23 23 0 0 1-10.8 2.5m0-12.9q1.8 0 3.2-.8t2.1-2.2q.8-1.5.8-3.5c0-2-.3-2.4-.8-3.4q-.8-1.5-2.2-2.2t-3.2-.8c-1.8 0-2.2.3-3.2.8q-1.4.8-2.1 2.3-.9 1.5-.8 3.4c0 2 .2 2.4.8 3.4q.8 1.5 2.1 2.2t3.2.8Zm40.5-28.9v9.5h23.4v12.4h-23.4v19h-15v-53.4h39.5v12.5zm63.5 12q-2.5-4.2-7-6.5-4.4-2.4-10.2-2.4a17 17 0 0 0-10.4 2.5 19 19 0 0 0-10 16.8q0 5.7 2.7 10.1t7.6 6.9 11.3 2.4q5.1 0 9-1.6 3.9-1.5 6.6-4.7L417 260a11 11 0 0 1-3.6 2.8 12 12 0 0 1-9.2-.2 7 7 0 0 1-3-3.8l25.4-.1a21 21 0 0 0-2-14.9m-23.5 6 .2-.6a7 7 0 0 1 2.6-3.2q1.6-1 3.9-1.1c2.2-.1 2.6.3 3.5 1q1.5 1 2.2 2.8l.3 1zm64.7-6q-2.5-4.2-7-6.5-4.4-2.4-10.2-2.4a17 17 0 0 0-10.5 2.5q-4.5 2.6-7.3 6.9t-2.6 10c0 5.6.9 7.1 2.7 10q2.8 4.4 7.6 6.9a25 25 0 0 0 11.3 2.4q5.1 0 9-1.6 3.9-1.5 6.6-4.7l-7.3-7.3a10 10 0 0 1-3.6 2.8 12 12 0 0 1-9.2-.2 7 7 0 0 1-3-3.8l25.4-.1a23 23 0 0 0 .6-5.3q0-5.4-2.5-9.6m-23.5 6 .2-.6a7 7 0 0 1 2.5-3.2q1.6-1 4-1.1c2.3-.1 2.6.3 3.5 1q1.5 1 2.2 2.8l.3 1zm53.7-32v19.1a16 16 0 0 0-8.1-1.9q-5.5 0-9.6 2.5a17 17 0 0 0-6.4 6.8q-2.2 4.3-2.2 10c0 5.6.7 7 2.2 9.9a17 17 0 0 0 16 9.3 15 15 0 0 0 8.4-2.5v1.7h14.3v-55zm0 39.7a6 6 0 0 1-5.4 3q-1.7 0-3.2-.8-1.4-.8-2.2-2.2t-.8-3.2a5 5 0 0 1 .9-3.3 6 6 0 0 1 5.4-3q1.7 0 3.2.8 1.4.8 2 2.2.9 1.4.8 3.3c0 1.9-.2 2.3-.7 3.2m35 16.3a27 27 0 0 1-13.3-3.4q-3-1.5-5-3.5l7.8-8a13 13 0 0 0 9.6 3.9q1.2 0 2-.3.6-.4.7-1 0-1-1.3-1.6l-3.1-1-4-1q-2.2-.9-4.2-2a9 9 0 0 1-3.1-3.5q-1.2-2.2-1.2-5.6c0-3.4.7-4.5 2-6.3q2-2.7 5.6-4.4 3.6-1.6 8.4-1.6c4.8 0 6.4.6 9.5 1.7q4.5 1.5 7.3 5l-7.8 7.9a9 9 0 0 0-4.2-2.8q-2.2-.7-3.7-.7c-1.5 0-1.6.1-2 .4q-.6.3-.6 1 0 .8 1.2 1.3t3.2 1l4 1.2q2 .7 4 2.1a10 10 0 0 1 4.3 9.3q0 5.6-4.4 8.7a19 19 0 0 1-11.7 3.2"/>
</svg>
</figure>

The entire AutoMod project is open-source and can be [found on GitHub](https://github.com/DeclanChidlow/AutoMod) under the AGPL v3.
