---
{
	title: "Examining My Team Fortress Statistics"
	description: "Statistics and data from my time playing Team Fortress 2. Everything that I can easily extract from the API, including my play activity as various classes, in various modes. Kills, damage inflicted, score, and other details with some light commentary where appropriate."
	og_description: "'Let's see which of you is a statistical outlier.'"
	pub_time: "2026-09-12"
	mod_time: "2026-09-22"
	section: "Data"
	tags: ["gaming"]
    standardsite_rkey: "3mvd3mrs7q62h"
	(tf2): assets/posts/team-fortress-stats/tf2-stats.json/playerstats/stats
	_body: _template()
}
---

Team Fortress 2 is a great game. It is also a deeply unserious one. I'm not sure how much value can be extracted from the gameplay statistics of an online multiplayer experience where it is not uncommon to killbind for a laugh or to decide not to kill anyone for an entire match and instead chill with the enemy. Team Fortress 2 is a deeply unserious game with a deeply unserious community.

Nevertheless, this page presents my stats for [Team Fortress 2](http://teamfortress.com), Valve's 2007 class-based multiplayer first-person shooter, since I first played it on the 28th of April 2020. I'm dubious of the accuracy of these statistics, so they should be taken with a grain of salt. What is tracked is very limited, and omits negative statistics, such as deaths. Though, with objective-based gamemodes, kill-to-death ratios don't have much bearing on performance. One could stay alive and kill the enemy team effectively, but that is worthless if the objective is not being completed.

Team Fortress 2 data is all kept and stored on Steam so can be easily accessed. I fetch the data manually on occasion and then use [Web Origami](/posts/web-origami) to transform it to this readable page. When I last fetched the data is evidenced by the modification data in this post's header.

This is a similar process to the one I employ for [Examining My Halo Service Record](/posts/halo-stats).

<details>
<summary>Further data details</summary>

One can easily access their Team Fortress 2 stats at both `https://steamcommunity.com/id/USERNAME/stats/TF2` and `https://steamcommunity.com/id/USERNAME/gcpd/440/` ('440' is Team Fortress 2's Steam game ID). These two pages show slightly different sets of stats, though much of the data overlaps.

The data used for this post is sourced from Steam's API: `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0001/?key=API_KEY&steamid=STEAM_ID&appid=440`. The schema for that endpoint can be sourced from `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002/?key=API_KEY&appid=440`.

The above presented stats pages and the data sourced from the API each differ -- in some cases rather significantly. My understanding is that this is due to discrepancies between Steamworks and the Game Coordinator.

</details>

## Overall Stats

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(assets/posts/team-fortress-stats/stats.js(tf2, "sum", "iPlayTime")) }
- Kills: ${ assets/posts/team-fortress-stats/stats.js(tf2, "sum", "iNumberOfKills") }
- Kills per Hour: ${ assets/posts/team-fortress-stats/stats.js(tf2, "killsPerHour") }
- Kill Assists: ${ assets/posts/team-fortress-stats/stats.js(tf2, "sum", "iKillAssists") }
- Damage Dealt: ${ assets/posts/team-fortress-stats/stats.js(tf2, "sum", "iDamageDealt") }
- Buildings Destroyed: ${ assets/posts/team-fortress-stats/stats.js(tf2, "sum", "iBuildingsDestroyed") }
- Point Captures: ${ assets/posts/team-fortress-stats/stats.js(tf2, "sum", "iPointCaptures") }
- Point Defenses: ${ assets/posts/team-fortress-stats/stats.js(tf2, "sum", "iPointDefenses") }
- Points Scored: ${ assets/posts/team-fortress-stats/stats.js(tf2, "sum", "iPointsScored") }
- Dominations: ${ assets/posts/team-fortress-stats/stats.js(tf2, "sum", "iDominations") }
- Revenges: ${ assets/posts/team-fortress-stats/stats.js(tf2, "sum", "iRevenge") }

## Per-Class Stats

My most played class is ${ assets/posts/team-fortress-stats/stats.js(tf2, "top", "iPlayTime") }. I have the most kills with ${ assets/posts/team-fortress-stats/stats.js(tf2, "top", "iNumberOfKills") }, the most assists with ${ assets/posts/team-fortress-stats/stats.js(tf2, "top", "iKillAssists") }, have dealt the most damage with ${ assets/posts/team-fortress-stats/stats.js(tf2, "top", "iDamageDealt") }, have scored the most points with ${ assets/posts/team-fortress-stats/stats.js(tf2, "top", "iPointsScored") }, have got the most captures with ${ assets/posts/team-fortress-stats/stats.js(tf2, "top", "iPointCaptures") }, the most defences with ${ assets/posts/team-fortress-stats/stats.js(tf2, "top", "iPointDefenses") }, and have lived the longest life as ${ assets/posts/team-fortress-stats/stats.js(tf2, "topMax", "iPlayTime") }.

### Scout

Being a manic movement-mechanic enjoying player, one would think that I'd be a major fan of Scout. However, his movement is a tad boring compared to the rocket and sticky jumping of Soldier and Demoman, the flare jumping or jetpack boosting of Pyro, blast jump mirroring of the Quickfix, and other movement mechanics. Yes, Scout can double jump (or triple jump with the Atomizer) and do some interesting things with the Force-a-Nature, but the low health makes anything too tricky too risky. I like to be rather goofy when playing TF2, but Scout is too punishing for that play style.

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(tf2/Scout.accum.iPlayTime/value) } (${ assets/posts/team-fortress-stats/stats.js(tf2, "share", "Scout") })
- Kills: ${ tf2/Scout.accum.iNumberOfKills/value }
- Kills per Hour: ${ assets/posts/team-fortress-stats/stats.js(tf2, "classKillsPerHour", "Scout") }
- Kill Assists: ${ tf2/Scout.accum.iKillAssists/value }
- Damage Dealt: ${ tf2/Scout.accum.iDamageDealt/value }
- Damage per Kill: ${ (tf2/Scout.accum.iDamageDealt/value / tf2/Scout.accum.iNumberOfKills/value).toFixed(0) }
- Buildings Destroyed: ${ tf2/Scout.accum.iBuildingsDestroyed/value }
- Point Captures: ${ tf2/Scout.accum.iPointCaptures/value }
- Point Defenses: ${ tf2/Scout.accum.iPointDefenses/value }
- Points Scored: ${ tf2/Scout.accum.iPointsScored/value }
- Dominations: ${ tf2/Scout.accum.iDominations/value }
- Revenges: ${ tf2/Scout.accum.iRevenge/value }
- Longest Life: ${ assets/posts/team-fortress-stats/readable-duration.js(tf2/Scout.max.iPlayTime/value) }
- Most Kills: ${ tf2/Scout.max.iNumberOfKills/value }
- Most Kill Assists: ${ tf2/Scout.max.iKillAssists/value }
- Most Damage: ${ tf2/Scout.max.iDamageDealt/value }
- Most Buildings Destroyed: ${ tf2/Scout.max.iBuildingsDestroyed/value }
- Most Captures: ${ tf2/Scout.max.iPointCaptures/value }
- Most Defenses: ${ tf2/Scout.max.iPointDefenses/value }
- Most Points: ${ tf2/Scout.max.iPointsScored/value }
- Most Dominations: ${ tf2/Scout.max.iDominations/value }
- Most Revenges: ${ tf2/Scout.max.iRevenge/value }

### Soldier

Soldier feels about as close to a 'default' class as you can get in TF2. Soldier is easy to play though has a high skill ceiling, as is expected of a TF2 class. I'll reach for the class to dish out damage, but only when it is necessary for team composition.

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(tf2/Soldier.accum.iPlayTime/value) } (${ assets/posts/team-fortress-stats/stats.js(tf2, "share", "Soldier") })
- Kills: ${ tf2/Soldier.accum.iNumberOfKills/value }
- Kills per Hour: ${ assets/posts/team-fortress-stats/stats.js(tf2, "classKillsPerHour", "Soldier") }
- Kill Assists: ${ tf2/Soldier.accum.iKillAssists/value }
- Damage Dealt: ${ tf2/Soldier.accum.iDamageDealt/value }
- Damage per Kill: ${ (tf2/Soldier.accum.iDamageDealt/value / tf2/Soldier.accum.iNumberOfKills/value).toFixed(0) }
- Buildings Destroyed: ${ tf2/Soldier.accum.iBuildingsDestroyed/value }
- Point Captures: ${ tf2/Soldier.accum.iPointCaptures/value }
- Point Defenses: ${ tf2/Soldier.accum.iPointDefenses/value }
- Points Scored: ${ tf2/Soldier.accum.iPointsScored/value }
- Dominations: ${ tf2/Soldier.accum.iDominations/value }
- Revenges: ${ tf2/Soldier.accum.iRevenge/value }
- Longest Life: ${ assets/posts/team-fortress-stats/readable-duration.js(tf2/Soldier.max.iPlayTime/value) }
- Most Kills: ${ tf2/Soldier.max.iNumberOfKills/value }
- Most Kill Assists: ${ tf2/Soldier.max.iKillAssists/value }
- Most Damage: ${ tf2/Soldier.max.iDamageDealt/value }
- Most Buildings Destroyed: ${ tf2/Soldier.max.iBuildingsDestroyed/value }
- Most Captures: ${ tf2/Soldier.max.iPointCaptures/value }
- Most Defenses: ${ tf2/Soldier.max.iPointDefenses/value }
- Most Points: ${ tf2/Soldier.max.iPointsScored/value }
- Most Dominations: ${ tf2/Soldier.max.iDominations/value }
- Most Revenges: ${ tf2/Soldier.max.iRevenge/value }

#### Mann vs Machine

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(tf2/Soldier.mvm.accum.iPlayTime/value) }
- Longest Life: ${ assets/posts/team-fortress-stats/readable-duration.js(tf2/Soldier.mvm.max.iPlayTime/value) }
- Kills: ${ tf2/Soldier.mvm.accum.iNumberOfKills/value } (Best: ${ tf2/Soldier.mvm.max.iNumberOfKills/value })
- Kill Assists: ${ tf2/Soldier.mvm.accum.iKillAssists/value } (Best: ${ tf2/Soldier.mvm.max.iKillAssists/value })
- Damage Dealt: ${ tf2/Soldier.mvm.accum.iDamageDealt/value } (Best: ${ tf2/Soldier.mvm.max.iDamageDealt/value })
- Point Defenses: ${ tf2/Soldier.mvm.accum.iPointDefenses/value } (Best: ${ tf2/Soldier.mvm.max.iPointDefenses/value })
- Points Scored: ${ tf2/Soldier.mvm.accum.iPointsScored/value } (Best: ${ tf2/Soldier.mvm.max.iPointsScored/value })

### Pyro

<kbd>W</kbd>+<kbd>M1</kbd> is the ultimate play strategy. Pair it with the Thermal Thruster and you're set to be a right pest. It is a shame there is no tracking for 'amount of players air blasted sent plummeting to their doom by me crouched around the corner'.

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(tf2/Pyro.accum.iPlayTime/value) } (${ assets/posts/team-fortress-stats/stats.js(tf2, "share", "Pyro") })
- Kills: ${ tf2/Pyro.accum.iNumberOfKills/value }
- Kills per Hour: ${ assets/posts/team-fortress-stats/stats.js(tf2, "classKillsPerHour", "Pyro") }
- Kill Assists: ${ tf2/Pyro.accum.iKillAssists/value }
- Damage Dealt: ${ tf2/Pyro.accum.iDamageDealt/value }
- Damage per Kill: ${ (tf2/Pyro.accum.iDamageDealt/value / tf2/Pyro.accum.iNumberOfKills/value).toFixed(0) }
- Fire Damage: ${ tf2/Pyro.accum.iFireDamage/value }
- Buildings Destroyed: ${ tf2/Pyro.accum.iBuildingsDestroyed/value }
- Point Captures: ${ tf2/Pyro.accum.iPointCaptures/value }
- Point Defenses: ${ tf2/Pyro.accum.iPointDefenses/value }
- Points Scored: ${ tf2/Pyro.accum.iPointsScored/value }
- Dominations: ${ tf2/Pyro.accum.iDominations/value }
- Revenges: ${ tf2/Pyro.accum.iRevenge/value }
- Longest Life: ${ assets/posts/team-fortress-stats/readable-duration.js(tf2/Pyro.max.iPlayTime/value) }
- Most Kills: ${ tf2/Pyro.max.iNumberOfKills/value }
- Most Kill Assists: ${ tf2/Pyro.max.iKillAssists/value }
- Most Damage: ${ tf2/Pyro.max.iDamageDealt/value }
- Most Buildings Destroyed: ${ tf2/Pyro.max.iBuildingsDestroyed/value }
- Most Captures: ${ tf2/Pyro.max.iPointCaptures/value }
- Most Defenses: ${ tf2/Pyro.max.iPointDefenses/value }
- Most Points: ${ tf2/Pyro.max.iPointsScored/value }
- Most Dominations: ${ tf2/Pyro.max.iDominations/value }
- Most Revenges: ${ tf2/Pyro.max.iRevenge/value }

#### Mann vs Machine

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(tf2/Pyro.mvm.accum.iPlayTime/value) }
- Longest Life: ${ assets/posts/team-fortress-stats/readable-duration.js(tf2/Pyro.mvm.max.iPlayTime/value) }
- Kills: ${ tf2/Pyro.mvm.accum.iNumberOfKills/value } (Best: ${ tf2/Pyro.mvm.max.iNumberOfKills/value })
- Kill Assists: ${ tf2/Pyro.mvm.accum.iKillAssists/value } (Best: ${ tf2/Pyro.mvm.max.iKillAssists/value })
- Damage Dealt: ${ tf2/Pyro.mvm.accum.iDamageDealt/value } (Best: ${ tf2/Pyro.mvm.max.iDamageDealt/value })
- Fire Damage: ${ tf2/Pyro.mvm.accum.iFireDamage/value }
- Points Scored: ${ tf2/Pyro.mvm.accum.iPointsScored/value } (Best: ${ tf2/Pyro.mvm.max.iPointsScored/value })

### Demoman

Like Soldier, Demoman is the go-to 'damage dealer'. I'm very dynamic in switching weapons with Demoman based on circumstance. The Loch-n-Load is the obvious case for dealing with Engineer's buildings due to the increased damage to buildings, while I quite enjoy the Loose Cannon for its fuse control, faster projectile speed, and ability to '<span style="font-family: fantasy; color: var(--yellow); paint-order: stroke fill; -webkit-text-stroke: 2px var(--black); filter: drop-shadow(0 0 0.25rem var(--magenta));">Donk! 2x</span>'. I'm partial to the Scottish Resistance for setting up traps -- particuarly huge minefields with 14 stickies deployed. I don't play much Demoknight, as I find TF2's melee mechanics to be lacklustre.

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(tf2/Demoman.accum.iPlayTime/value) } (${ assets/posts/team-fortress-stats/stats.js(tf2, "share", "Demoman") })
- Kills: ${ tf2/Demoman.accum.iNumberOfKills/value }
- Kills per Hour: ${ assets/posts/team-fortress-stats/stats.js(tf2, "classKillsPerHour", "Demoman") }
- Kill Assists: ${ tf2/Demoman.accum.iKillAssists/value }
- Damage Dealt: ${ tf2/Demoman.accum.iDamageDealt/value }
- Damage per Kill: ${ (tf2/Demoman.accum.iDamageDealt/value / tf2/Demoman.accum.iNumberOfKills/value).toFixed(0) }
- Buildings Destroyed: ${ tf2/Demoman.accum.iBuildingsDestroyed/value }
- Point Captures: ${ tf2/Demoman.accum.iPointCaptures/value }
- Point Defenses: ${ tf2/Demoman.accum.iPointDefenses/value }
- Points Scored: ${ tf2/Demoman.accum.iPointsScored/value }
- Dominations: ${ tf2/Demoman.accum.iDominations/value }
- Revenges: ${ tf2/Demoman.accum.iRevenge/value }
- Longest Life: ${ assets/posts/team-fortress-stats/readable-duration.js(tf2/Demoman.max.iPlayTime/value) }
- Most Kills: ${ tf2/Demoman.max.iNumberOfKills/value }
- Most Kill Assists: ${ tf2/Demoman.max.iKillAssists/value }
- Most Damage: ${ tf2/Demoman.max.iDamageDealt/value }
- Most Buildings Destroyed: ${ tf2/Demoman.max.iBuildingsDestroyed/value }
- Most Captures: ${ tf2/Demoman.max.iPointCaptures/value }
- Most Defenses: ${ tf2/Demoman.max.iPointDefenses/value }
- Most Points: ${ tf2/Demoman.max.iPointsScored/value }
- Most Dominations: ${ tf2/Demoman.max.iDominations/value }
- Most Revenges: ${ tf2/Demoman.max.iRevenge/value }

#### Mann vs Machine

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(tf2/Demoman.mvm.accum.iPlayTime/value) }
- Longest Life: ${ assets/posts/team-fortress-stats/readable-duration.js(tf2/Demoman.mvm.max.iPlayTime/value) }
- Kills: ${ tf2/Demoman.mvm.accum.iNumberOfKills/value } (Best: ${ tf2/Demoman.mvm.max.iNumberOfKills/value })
- Kill Assists: ${ tf2/Demoman.mvm.accum.iKillAssists/value } (Best: ${ tf2/Demoman.mvm.max.iKillAssists/value })
- Damage Dealt: ${ tf2/Demoman.mvm.accum.iDamageDealt/value } (Best: ${ tf2/Demoman.mvm.max.iDamageDealt/value })
- Buildings Destroyed: ${ tf2/Demoman.mvm.accum.iBuildingsDestroyed/value } (Best: ${ tf2/Demoman.mvm.max.iBuildingsDestroyed/value })
- Point Defenses: ${ tf2/Demoman.mvm.accum.iPointDefenses/value } (Best: ${ tf2/Demoman.mvm.max.iPointDefenses/value })
- Points Scored: ${ tf2/Demoman.mvm.accum.iPointsScored/value } (Best: ${ tf2/Demoman.mvm.max.iPointsScored/value })

### Heavy

I find Heavy to be a slog to play. Heavy is so easily countered by Spy and Sniper but has zero recourse against the latter. Once respawned, it then takes three years to return to the front lines. More than perhaps any other class, without the support of your team Heavy is unviable against anyone who has even the vaguest understanding of the game.

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(tf2/Heavy.accum.iPlayTime/value) } (${ assets/posts/team-fortress-stats/stats.js(tf2, "share", "Heavy") })
- Kills: ${ tf2/Heavy.accum.iNumberOfKills/value }
- Kills per Hour: ${ assets/posts/team-fortress-stats/stats.js(tf2, "classKillsPerHour", "Heavy") }
- Kill Assists: ${ tf2/Heavy.accum.iKillAssists/value }
- Damage Dealt: ${ tf2/Heavy.accum.iDamageDealt/value }
- Damage per Kill: ${ (tf2/Heavy.accum.iDamageDealt/value / tf2/Heavy.accum.iNumberOfKills/value).toFixed(0) }
- Buildings Destroyed: ${ tf2/Heavy.accum.iBuildingsDestroyed/value }
- Point Captures: ${ tf2/Heavy.accum.iPointCaptures/value }
- Points Scored: ${ tf2/Heavy.accum.iPointsScored/value }
- Revenges: ${ tf2/Heavy.accum.iRevenge/value }
- Longest Life: ${ assets/posts/team-fortress-stats/readable-duration.js(tf2/Heavy.max.iPlayTime/value) }
- Most Kills: ${ tf2/Heavy.max.iNumberOfKills/value }
- Most Kill Assists: ${ tf2/Heavy.max.iKillAssists/value }
- Most Damage: ${ tf2/Heavy.max.iDamageDealt/value }
- Most Buildings Destroyed: ${ tf2/Heavy.max.iBuildingsDestroyed/value }
- Most Captures: ${ tf2/Heavy.max.iPointCaptures/value }
- Most Points: ${ tf2/Heavy.max.iPointsScored/value }
- Most Revenges: ${ tf2/Heavy.max.iRevenge/value }

#### Mann vs Machine

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(tf2/Heavy.mvm.accum.iPlayTime/value) }
- Longest Life: ${ assets/posts/team-fortress-stats/readable-duration.js(tf2/Heavy.mvm.max.iPlayTime/value) }

### Engineer

The snowballing of building up a nest and upgrading buildings is fantastically enjoyable. There is a lovely gameplay loop of staying on your toes and remaining aware of the ever-lurking Spy looking to do you in. Engineer's unlockables also make him an extremely varied class. From long-distance repair with the Rescue Ranger, to a Mini-Sentry with the Gunslinger, to manual control with the Wrangler, and projectile destruction with the Short Circuit.

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(tf2/Engineer.accum.iPlayTime/value) } (${ assets/posts/team-fortress-stats/stats.js(tf2, "share", "Engineer") })
- Kills: ${ tf2/Engineer.accum.iNumberOfKills/value }
- Kills per Hour: ${ assets/posts/team-fortress-stats/stats.js(tf2, "classKillsPerHour", "Engineer") }
- Kill Assists: ${ tf2/Engineer.accum.iKillAssists/value }
- Damage Dealt: ${ tf2/Engineer.accum.iDamageDealt/value }
- Damage per Kill: ${ (tf2/Engineer.accum.iDamageDealt/value / tf2/Engineer.accum.iNumberOfKills/value).toFixed(0) }
- Buildings Built: ${ tf2/Engineer.accum.iBuildingsBuilt/value }
- Teleports Provided: ${ tf2/Engineer.accum.iNumTeleports/value }
- Buildings Destroyed: ${ tf2/Engineer.accum.iBuildingsDestroyed/value }
- Point Captures: ${ tf2/Engineer.accum.iPointCaptures/value }
- Point Defenses: ${ tf2/Engineer.accum.iPointDefenses/value }
- Points Scored: ${ tf2/Engineer.accum.iPointsScored/value }
- Dominations: ${ tf2/Engineer.accum.iDominations/value }
- Revenges: ${ tf2/Engineer.accum.iRevenge/value }
- Longest Life: ${ assets/posts/team-fortress-stats/readable-duration.js(tf2/Engineer.max.iPlayTime/value) }
- Most Kills: ${ tf2/Engineer.max.iNumberOfKills/value }
- Most Kill Assists: ${ tf2/Engineer.max.iKillAssists/value }
- Most Damage: ${ tf2/Engineer.max.iDamageDealt/value }
- Most Buildings Built: ${ tf2/Engineer.max.iBuildingsBuilt/value }
- Most Sentry Kills: ${ tf2/Engineer.max.iSentryKills/value }
- Most Teleports: ${ tf2/Engineer.max.iNumTeleports/value }
- Most Buildings Destroyed: ${ tf2/Engineer.max.iBuildingsDestroyed/value }
- Most Captures: ${ tf2/Engineer.max.iPointCaptures/value }
- Most Defenses: ${ tf2/Engineer.max.iPointDefenses/value }
- Most Points: ${ tf2/Engineer.max.iPointsScored/value }
- Most Dominations: ${ tf2/Engineer.max.iDominations/value }
- Most Revenges: ${ tf2/Engineer.max.iRevenge/value }

#### Mann vs Machine

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(tf2/Engineer.mvm.accum.iPlayTime/value) }
- Longest Life: ${ assets/posts/team-fortress-stats/readable-duration.js(tf2/Engineer.mvm.max.iPlayTime/value) }
- Kills: ${ tf2/Engineer.mvm.accum.iNumberOfKills/value } (Best: ${ tf2/Engineer.mvm.max.iNumberOfKills/value })
- Kill Assists: ${ tf2/Engineer.mvm.accum.iKillAssists/value } (Best: ${ tf2/Engineer.mvm.max.iKillAssists/value })
- Damage Dealt: ${ tf2/Engineer.mvm.accum.iDamageDealt/value } (Best: ${ tf2/Engineer.mvm.max.iDamageDealt/value })
- Buildings Built: ${ tf2/Engineer.mvm.accum.iBuildingsBuilt/value } (Best: ${ tf2/Engineer.mvm.max.iBuildingsBuilt/value })
- Teleports Provided: ${ tf2/Engineer.mvm.accum.iNumTeleports/value } (Best: ${ tf2/Engineer.mvm.max.iNumTeleports/value })
- Point Defenses: ${ tf2/Engineer.mvm.accum.iPointDefenses/value } (Best: ${ tf2/Engineer.mvm.max.iPointDefenses/value })
- Points Scored: ${ tf2/Engineer.mvm.accum.iPointsScored/value } (Best: ${ tf2/Engineer.mvm.max.iPointsScored/value })
- Most Sentry Kills: ${ tf2/Engineer.mvm.max.iSentryKills/value }

### Medic

I love playing support classes. Medic, especially with the Vaccinator. I love juggling the various damage resistances based on situation and the dynamic gameplay that comes with it, though it does come at the cost of slurs from the enemy team. Also, Battle Medic for the win!

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(tf2/Medic.accum.iPlayTime/value) } (${ assets/posts/team-fortress-stats/stats.js(tf2, "share", "Medic") })
- Kills: ${ tf2/Medic.accum.iNumberOfKills/value }
- Kills per Hour: ${ assets/posts/team-fortress-stats/stats.js(tf2, "classKillsPerHour", "Medic") }
- Kill Assists: ${ tf2/Medic.accum.iKillAssists/value }
- Damage Dealt: ${ tf2/Medic.accum.iDamageDealt/value }
- Damage per Kill: ${ (tf2/Medic.accum.iDamageDealt/value / tf2/Medic.accum.iNumberOfKills/value).toFixed(0) }
- Health Points Healed: ${ tf2/Medic.accum.iHealthPointsHealed/value }
- ÜberCharges: ${ tf2/Medic.accum.iNumInvulnerable/value }
- ÜberCharges per Hour: ${ ((tf2/Medic.accum.iNumInvulnerable/value / tf2/Medic.accum.iPlayTime/value) * 3600).toFixed(1) }
- Buildings Destroyed: ${ tf2/Medic.accum.iBuildingsDestroyed/value }
- Point Captures: ${ tf2/Medic.accum.iPointCaptures/value }
- Point Defenses: ${ tf2/Medic.accum.iPointDefenses/value }
- Points Scored: ${ tf2/Medic.accum.iPointsScored/value }
- Dominations: ${ tf2/Medic.accum.iDominations/value }
- Revenges: ${ tf2/Medic.accum.iRevenge/value }
- Longest Life: ${ assets/posts/team-fortress-stats/readable-duration.js(tf2/Medic.max.iPlayTime/value) }
- Most Kills: ${ tf2/Medic.max.iNumberOfKills/value }
- Most Kill Assists: ${ tf2/Medic.max.iKillAssists/value }
- Most Damage: ${ tf2/Medic.max.iDamageDealt/value }
- Most Healing: ${ tf2/Medic.max.iHealthPointsHealed/value }
- Most ÜberCharges: ${ tf2/Medic.max.iNumInvulnerable/value }
- Most Buildings Destroyed: ${ tf2/Medic.max.iBuildingsDestroyed/value }
- Most Captures: ${ tf2/Medic.max.iPointCaptures/value }
- Most Defenses: ${ tf2/Medic.max.iPointDefenses/value }
- Most Points: ${ tf2/Medic.max.iPointsScored/value }
- Most Dominations: ${ tf2/Medic.max.iDominations/value }
- Most Revenges: ${ tf2/Medic.max.iRevenge/value }

#### Mann vs Machine

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(tf2/Medic.mvm.accum.iPlayTime/value) }
- Longest Life: ${ assets/posts/team-fortress-stats/readable-duration.js(tf2/Medic.mvm.max.iPlayTime/value) }
- Kills: ${ tf2/Medic.mvm.accum.iNumberOfKills/value } (Best: ${ tf2/Medic.mvm.max.iNumberOfKills/value })
- Kill Assists: ${ tf2/Medic.mvm.accum.iKillAssists/value } (Best: ${ tf2/Medic.mvm.max.iKillAssists/value })
- Damage Dealt: ${ tf2/Medic.mvm.accum.iDamageDealt/value } (Best: ${ tf2/Medic.mvm.max.iDamageDealt/value })
- Health Points Healed: ${ tf2/Medic.mvm.accum.iHealthPointsHealed/value } (Best: ${ tf2/Medic.mvm.max.iHealthPointsHealed/value })
- ÜberCharges: ${ tf2/Medic.mvm.accum.iNumInvulnerable/value } (Best: ${ tf2/Medic.mvm.max.iNumInvulnerable/value })
- Buildings Destroyed: ${ tf2/Medic.mvm.accum.iBuildingsDestroyed/value } (Best: ${ tf2/Medic.mvm.max.iBuildingsDestroyed/value })
- Point Defenses: ${ tf2/Medic.mvm.accum.iPointDefenses/value } (Best: ${ tf2/Medic.mvm.max.iPointDefenses/value })
- Points Scored: ${ tf2/Medic.mvm.accum.iPointsScored/value } (Best: ${ tf2/Medic.mvm.max.iPointsScored/value })

### Sniper

A lot of people play Sniper, but having many Snipers on a team's lineup is a detriment. I've never played much Sniper because it is so rare that my doing so would actually add to the team.

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(tf2/Sniper.accum.iPlayTime/value) } (${ assets/posts/team-fortress-stats/stats.js(tf2, "share", "Sniper") })
- Kills: ${ tf2/Sniper.accum.iNumberOfKills/value }
- Kills per Hour: ${ assets/posts/team-fortress-stats/stats.js(tf2, "classKillsPerHour", "Sniper") }
- Kill Assists: ${ tf2/Sniper.accum.iKillAssists/value }
- Damage Dealt: ${ tf2/Sniper.accum.iDamageDealt/value }
- Damage per Kill: ${ (tf2/Sniper.accum.iDamageDealt/value / tf2/Sniper.accum.iNumberOfKills/value).toFixed(0) }
- Headshots: ${ tf2/Sniper.accum.iHeadshots/value }
- Buildings Destroyed: ${ tf2/Sniper.accum.iBuildingsDestroyed/value }
- Point Captures: ${ tf2/Sniper.accum.iPointCaptures/value }
- Point Defenses: ${ tf2/Sniper.accum.iPointDefenses/value }
- Points Scored: ${ tf2/Sniper.accum.iPointsScored/value }
- Longest Life: ${ assets/posts/team-fortress-stats/readable-duration.js(tf2/Sniper.max.iPlayTime/value) }
- Most Kills: ${ tf2/Sniper.max.iNumberOfKills/value }
- Most Kill Assists: ${ tf2/Sniper.max.iKillAssists/value }
- Most Damage: ${ tf2/Sniper.max.iDamageDealt/value }
- Most Headshots: ${ tf2/Sniper.max.iHeadshots/value }
- Most Buildings Destroyed: ${ tf2/Sniper.max.iBuildingsDestroyed/value }
- Most Captures: ${ tf2/Sniper.max.iPointCaptures/value }
- Most Defenses: ${ tf2/Sniper.max.iPointDefenses/value }
- Most Points: ${ tf2/Sniper.max.iPointsScored/value }

### Spy

Like Sniper, the average public server has more than enough people playing Spy. The times where I will opt for Spy are when there are no other Spy players on the team, or when an Engineer's nest needs sapping.

- Playtime: ${ assets/posts/team-fortress-stats/hours.js(tf2/Spy.accum.iPlayTime/value) } (${ assets/posts/team-fortress-stats/stats.js(tf2, "share", "Spy") })
- Kills: ${ tf2/Spy.accum.iNumberOfKills/value }
- Kills per Hour: ${ assets/posts/team-fortress-stats/stats.js(tf2, "classKillsPerHour", "Spy") }
- Kill Assists: ${ tf2/Spy.accum.iKillAssists/value }
- Damage Dealt: ${ tf2/Spy.accum.iDamageDealt/value }
- Damage per Kill: ${ (tf2/Spy.accum.iDamageDealt/value / tf2/Spy.accum.iNumberOfKills/value).toFixed(0) }
- Backstabs: ${ tf2/Spy.accum.iBackstabs/value }
- Health Points Leeched: ${ tf2/Spy.accum.iHealthPointsLeached/value }
- Buildings Destroyed: ${ tf2/Spy.accum.iBuildingsDestroyed/value }
- Point Captures: ${ tf2/Spy.accum.iPointCaptures/value }
- Point Defenses: ${ tf2/Spy.accum.iPointDefenses/value }
- Points Scored: ${ tf2/Spy.accum.iPointsScored/value }
- Dominations: ${ tf2/Spy.accum.iDominations/value }
- Revenges: ${ tf2/Spy.accum.iRevenge/value }
- Longest Life: ${ assets/posts/team-fortress-stats/readable-duration.js(tf2/Spy.max.iPlayTime/value) }
- Most Kills: ${ tf2/Spy.max.iNumberOfKills/value }
- Most Kill Assists: ${ tf2/Spy.max.iKillAssists/value }
- Most Damage: ${ tf2/Spy.max.iDamageDealt/value }
- Most Backstabs: ${ tf2/Spy.max.iBackstabs/value }
- Most Health Leeched: ${ tf2/Spy.max.iHealthPointsLeached/value }
- Most Buildings Destroyed: ${ tf2/Spy.max.iBuildingsDestroyed/value }
- Most Captures: ${ tf2/Spy.max.iPointCaptures/value }
- Most Defenses: ${ tf2/Spy.max.iPointDefenses/value }
- Most Points: ${ tf2/Spy.max.iPointsScored/value }
- Most Dominations: ${ tf2/Spy.max.iDominations/value }
- Most Revenges: ${ tf2/Spy.max.iRevenge/value }

## Modes and Maps

It would appear that not all maps and modes are logged and accounted for in Team Fortress 2's tracking.

### Payload

Far and away the game's best mode. Payload is a great deal of fun.

- **Total: ${ assets/posts/team-fortress-stats/hours.js(assets/posts/team-fortress-stats/stats.js(tf2, "modeTotal", "pl")) }**
- Badwater Basin: ${ assets/posts/team-fortress-stats/hours.js(tf2/pl_badwater.accum.iPlayTime/value) }
- Upward: ${ assets/posts/team-fortress-stats/hours.js(tf2/pl_upward.accum.iPlayTime/value) }
- Frontier: ${ assets/posts/team-fortress-stats/hours.js(tf2/pl_frontier_final.accum.iPlayTime/value) }
- Barnblitz: ${ assets/posts/team-fortress-stats/hours.js(tf2/pl_barnblitz.accum.iPlayTime/value) }
- Thunder Mountain: ${ assets/posts/team-fortress-stats/hours.js(tf2/pl_thundermountain.accum.iPlayTime/value) }
- Gold Rush: ${ assets/posts/team-fortress-stats/hours.js(tf2/pl_goldrush.accum.iPlayTime/value) }
- Hoodoo: ${ assets/posts/team-fortress-stats/hours.js(tf2/pl_hoodoo_final.accum.iPlayTime/value) }

### Payload Race

- **Total: ${ assets/posts/team-fortress-stats/hours.js(assets/posts/team-fortress-stats/stats.js(tf2, "modeTotal", "plr")) }**
- Hightower: ${ assets/posts/team-fortress-stats/hours.js(tf2/plr_hightower.accum.iPlayTime/value) }
- Nightfall: ${ assets/posts/team-fortress-stats/hours.js(tf2/plr_nightfall_final.accum.iPlayTime/value) }
- Pipeline: ${ assets/posts/team-fortress-stats/hours.js(tf2/plr_pipeline.accum.iPlayTime/value) }

### Control Points

- **Total: ${ assets/posts/team-fortress-stats/hours.js(assets/posts/team-fortress-stats/stats.js(tf2, "modeTotal", "cp")) }**
- Dustbowl: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_dustbowl.accum.iPlayTime/value) }
- Mountain Lab: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_mountainlab.accum.iPlayTime/value) }
- Steel: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_steel.accum.iPlayTime/value) }
- Egypt: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_egypt_final.accum.iPlayTime/value) }
- Gorge: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_gorge.accum.iPlayTime/value) }
- Foundry: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_foundry.accum.iPlayTime/value) }
- Gravel Pit: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_gravelpit.accum.iPlayTime/value) }
- Junction: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_junction_final.accum.iPlayTime/value) }
- Mann Manor: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_manor_event.accum.iPlayTime/value) }
- Badlands: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_badlands.accum.iPlayTime/value) }
- Gullywash: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_gullywash_final1.accum.iPlayTime/value) }
- Yukon: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_yukon_final.accum.iPlayTime/value) }
- Well: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_well.accum.iPlayTime/value) }
- Fastlane: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_fastlane.accum.iPlayTime/value) }
- Freight: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_freight_final1.accum.iPlayTime/value) }
- Coldfront: ${ assets/posts/team-fortress-stats/hours.js(tf2/cp_coldfront.accum.iPlayTime/value) }

### King of the Hill

- **Total: ${ assets/posts/team-fortress-stats/hours.js(assets/posts/team-fortress-stats/stats.js(tf2, "modeTotal", "koth")) }**
- Harvest: ${ assets/posts/team-fortress-stats/hours.js(tf2/koth_harvest_final.accum.iPlayTime/value) }
- Sawmill: ${ assets/posts/team-fortress-stats/hours.js(tf2/koth_sawmill.accum.iPlayTime/value) }
- Lakeside: ${ assets/posts/team-fortress-stats/hours.js(tf2/koth_lakeside_final.accum.iPlayTime/value) }
- Nucleus: ${ assets/posts/team-fortress-stats/hours.js(tf2/koth_nucleus.accum.iPlayTime/value) }
- Kong King: ${ assets/posts/team-fortress-stats/hours.js(tf2/koth_king.accum.iPlayTime/value) }
- Viaduct: ${ assets/posts/team-fortress-stats/hours.js(tf2/koth_viaduct.accum.iPlayTime/value) }
- Badlands: ${ assets/posts/team-fortress-stats/hours.js(tf2/koth_badlands.accum.iPlayTime/value) }

### Capture the Flag

- **Total: ${ assets/posts/team-fortress-stats/hours.js(assets/posts/team-fortress-stats/stats.js(tf2, "modeTotal", "ctf")) }**
- 2Fort: ${ assets/posts/team-fortress-stats/hours.js(tf2/ctf_2fort.accum.iPlayTime/value) }
- Turbine: ${ assets/posts/team-fortress-stats/hours.js(tf2/ctf_turbine.accum.iPlayTime/value) }
- Double Cross: ${ assets/posts/team-fortress-stats/hours.js(tf2/ctf_doublecross.accum.iPlayTime/value) }

### Special Delivery

- **Total: ${ assets/posts/team-fortress-stats/hours.js(assets/posts/team-fortress-stats/stats.js(tf2, "modeTotal", "sd")) }**
- Doomsday: ${ assets/posts/team-fortress-stats/hours.js(tf2/sd_doomsday.accum.iPlayTime/value) }

<style>
@media (min-width: 30rem) {
	article > div ul {
		columns: 2;
		column-gap: 2rem;

		&:has(> li:only-child) {
            columns: 1;
        }

		li {
			break-inside: avoid;
            margin-block-start: 0;
		}
	}
}
</style>
