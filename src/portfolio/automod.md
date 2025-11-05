---
title: AutoMod
description: A popular moderation bot developed for Stoat that protects over 145K users across 5,500+ servers. I maintain and host this open-source community safety tool, complete with comprehensive documentation.
og_description: Moderation bot for Stoat that keeps communities safe.
accent_colour: "#ff6763"
repository: DeclanChidlow/AutoMod
hoisted: true
tags: [design, Stoat, development, front-end development]
---

AutoMod is a moderation and utility bot for the chat platform [**Stoat**](https://stoat.chat), of which I am a core team member. It is one of the most popular bots on the platform, being present in over **5500 servers** with a combined total user count in excess of **145K people**.

<figure class="right">
<img src="https://automod.vale.rocks/assets/images/filter_example.avif" alt="A user adds the word 'poo' to the filter list using '/filter add poo'. AutoMod confirms the addition with 'strictness HARD.'">
<figcaption>AutoMod following a request to begin filtering out a word.</figcaption>
</figure>

I am responsible for the bot’s full development lifecycle, including its development, maintenance, and hosting for the official Stoat instance. AutoMod provides essential moderation features such as message filtering, punitive user actions, and comprehensive action logging, among much more.

Spurred by the growing need for improved user resources, I created a [**custom documentation website**](https://automod.vale.rocks) from the ground up, making comprehensive support materials presented in an accessible manner available to all users. Realising the need for better communication with the user base, I extended this site to also support [a **blog**](https://automod.vale.rocks/blog/introducing-the-automod-blog).

The bot is developed in a monorepo, written in **JavaScript/TypeScript**, and makes use of a range of modern libraries and technologies, including:

- **Stoat.js** for interacting with Stoat's API.
- [**Valkey**](https://valkey.io), a fork of [**Redis**](https://redis.io), for high-speed caching and real-time operations.
- [**MongoDB**](https://www.mongodb.com) for persistent data storage.
- [**Docker**](https://www.docker.com) for containerisation, allowing consistent and reliable deployment and distribution.

Given AutoMod's huge success and large demand, I developed another bot in a similar style titled [AutoFeeds](https://github.com/DeclanChidlow/AutoFeeds), which automatically fetches and posts new items from user-specified RSS, Atom, and JSON feeds. It is also containerised with Docker and stays simple with a simple database using the SQL-based **MariaDB**.

The entire AutoMod project is open-source and can be [found on GitHub](https://github.com/DeclanChidlow/AutoMod) under the AGPL v3.
