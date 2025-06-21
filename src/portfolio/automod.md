---
title: AutoMod
description: A popular moderation bot developed for Revolt that protects over 135K users across 5,000+ servers. I maintain and host this open-source community safety tool, complete with comprehensive documentation.
og_description: A moderation bot for Revolt that keeps communities safe.
accent_colour: "#ff6763"
repository: DeclanChidlow/AutoMod
hoisted: true
---

AutoMod is a moderation and utility bot for the chat platform [Revolt](https://revolt.chat), of which I am a core team member. It is one of the most popular bots on the platform, being present in some 5000 servers with a combined total user count of some 135K users.

<figure class="right">
<img src="https://automod.vale.rocks/assets/images/filter_example.avif" alt="A user adds the word 'poo' to the filter list using '/filter add poo'. AutoMod confirms the addition with 'strictness HARD.'">
<figcaption>AutoMod following a request to begin filtering out a word.</figcaption>
</figure>

I develop, maintain, and host the bot for public usage on the official Revolt instance. It provides commands that make it easy to filter messages, take punitive actions on users, and log actions, among much more.

All of the bot's details and comprehensive documentation are available on [the website I built and constructed for it](https://automod.vale.rocks).

The bot is developed in a monorepo, written in JavaScript/TypeScript, and makes use of a range of libraries and technologies, including Revolt.js, [Redis](https://redis.io), and [MongoDB](https://www.mongodb.com). It is containerised with [Docker](https://www.docker.com). 

Given the project's huge success and large demand, I've created another bot in a similar style titled [AutoFeeds](https://github.com/DeclanChidlow/AutoFeeds), which automatically fetches user-inputted RSS, Atom, and JSON feeds and posts new items. It is also containerised with Docker and stays simple with SQL-based MariaDB for its database.

The entire AutoMod project is open source under the AGPL v3 and [available on GitHub](https://github.com/DeclanChidlow/AutoMod). Contributions are welcome.
