---
{
	title: "Examining My Halo Service Record"
	description: "Statistics and data from my playing of the video games in the Halo series. My data extracted from Halo Waypoint combined with some light analysis. Covering the games in the Master Chief Collection and Halo Infinite. Kills, deaths, and how they all happened."
	og_description: "&quot;Data retrieval was not a command directive.&quot;"
	pub_time: "2026-09-05"
	section: "Essay"
	tags: ["gaming"]
	standardsite_rkey: "3murnqu7rgb2h"
	(infinite): assets/posts/halo-stats/infinite.json
	(mcc): assets/posts/halo-stats/mcc.json
	_body: _template()
}
---

I am not what one would call the greatest player of Halo to ever grace this planet. If you can believe it, I am rather mediocre. I have moments of greatness, but I'm also very much a casual player. Halo is a game I can pick up and play for leisure without too much effort or consideration. That said, I love data. I love diving into data and picking out interesting little details -- all the tiny little bits that you don't really notice otherwise.

Bungie must have been data fiends too, because their website, [bungie.net](https://www.halopedia.org/Bungie.net), used to be a haven for player stats. Hooking directly into Xbox Live, bungie.net was a brilliant hub of Halo stats and content. You could even see [things like heatmaps](https://bnetarchive.haloman30.com/Stats/halo3/heatmapstatsed76.html) showing where a player killed or got killed. Even details such as what weapons you were best with. Unfortunately, 343 Industries didn't keep the same level of detail when they took over the franchise. Some details are made accessible on Halo Waypoint, but they're a bit lacklustre, and not all tracked details are exposed.

This page shows all my Halo stats, sourced from my [Service Records on Halo Waypoint](https://www.halowaypoint.com/players/outervale/service-records). The stats are not fetched automatically, as Halo Studios or Microsoft are liable to change authentication or the returned data, causing a surprise breakage. I instead fetch them manually when I feel the data has grown stale. Using the [ever-wonderful Web Origami dialect of JavaScript](/posts/web-origami) which I built this site upon, I then transform the data to populate this post. You can see when I last updated the data by referencing the modification date in the header.

<details>
<summary>Further data handling details</summary>

I load up the Halo Waypoint site in my browser, authenticate, and download my Service Records directly. My Halo Infinite Service Record comes from `https://halostats.svc.halowaypoint.com/hi/players/xuid(2535432479962354)/Matchmade/servicerecord?`. My Halo MCC Service Record comes from `https://mccapi.svc.halowaypoint.com/hmcc/users/gt(OuterVale)/service-record` with the campaign data coming from `https://mccapi.svc.halowaypoint.com/hmcc/users/gt(OuterVale)/service-record/{GAME}/campaign`. In the latter I substitute `{GAME}` for the game: 'h1', 'h2', 'h3', 'odst', 'reach', or 'h4'.

I then save my acquired data in my website's Git repository. I have scripts to map campaign level numbers to the actual names corresponding to the levels, to map medal IDs to the actual medal data, and a script to convert the timestamps to actual human-readable duration values with reasonable degrees of detail.

</details>

## Halo: The Master Chief Collection

The Master Chief Collection (MCC) has my stats for Halo: CE through Halo 4. I did not play the original Xbox and Xbox 360 releases of these games when their servers were still available, so no stats exist from those releases.

My MCC stats are particularly poor. If ever you've tried to play an old online game with a die-hard community, you know the struggle. The people still playing these old Halo games online are really good. Many have been playing since the games originally released and know them intricately. Meanwhile, I've only played for ${ assets/posts/halo-stats/readable-duration.js(mcc.timePlayedSeconds) }, and that is across all of the games in the collection. They're fun games that are great to jump into, but I won't kid that I don't get decimated.

### Multiplayer

- Games Played: ${ mcc.multiplayer.gamesPlayed }
- Wins: ${ mcc.multiplayer.wins }
- Losses: ${ mcc.multiplayer.losses }
- Kills: ${ mcc.multiplayer.kills }
- Deaths: ${ mcc.multiplayer.deaths }
- Assists: ${ mcc.multiplayer.assists }
- Average <abbr title="Kill-Death-Assist">KDA</abbr>: ${ ((mcc.multiplayer.kills + (mcc.multiplayer.assists / 3) - mcc.multiplayer.deaths) / mcc.multiplayer.gamesPlayed).toFixed(2) }

### Campaigns

- Mission Kills: ${ mcc.campaign.missionKills }
- Mission Deaths: ${ mcc.campaign.missionDeaths }

<details>
<summary>Individual campaign level stats</summary>

<h3>Halo: Combat Evolved</h3>

${ assets/posts/halo-stats/mcc-campaign.js(assets/posts/halo-stats/mcc-h1-campaign.json/, assets/posts/halo-stats/mcc-campaign-levels.json/) }

<h3>Halo 2</h3>

${ assets/posts/halo-stats/mcc-campaign.js(assets/posts/halo-stats/mcc-h2-campaign.json/, assets/posts/halo-stats/mcc-campaign-levels.json/) }

<h3>Halo 3</h3>

${ assets/posts/halo-stats/mcc-campaign.js(assets/posts/halo-stats/mcc-h3-campaign.json/, assets/posts/halo-stats/mcc-campaign-levels.json/) }

<h3>Halo 3: ODST</h3>

${ assets/posts/halo-stats/mcc-campaign.js(assets/posts/halo-stats/mcc-odst-campaign.json/, assets/posts/halo-stats/mcc-campaign-levels.json/) }

<h3>Halo: Reach</h3>

${ assets/posts/halo-stats/mcc-campaign.js(assets/posts/halo-stats/mcc-reach-campaign.json/, assets/posts/halo-stats/mcc-campaign-levels.json/) }

<h3>Halo 4</h3>

${ assets/posts/halo-stats/mcc-campaign.js(assets/posts/halo-stats/mcc-h4-campaign.json/, assets/posts/halo-stats/mcc-campaign-levels.json/) }

</details>

## Halo Infinite

Unlike MCC, I'm not quite as poorly matched in Halo Infinite on account of it being a newer game that is much more accessible and has a far greater active player population. It is also a really solid online game with the best gameplay of the series.

I've completed ${ infinite.MatchesCompleted } matches in my ${ assets/posts/halo-stats/readable-duration.js(infinite.TimePlayed) } of playtime. Of those matches, I've won ${ infinite.Wins } of them, lost ${ infinite.Losses } of them, and tied in ${ infinite.Ties } of them.

### Core Stats

These are the totals across all game types (including Firefight, which massively inflates figures).

- Score: ${ infinite.CoreStats.Score }
- Personal Score: ${ infinite.CoreStats.PersonalScore }
- Rounds Won: ${ infinite.CoreStats.RoundsWon } (${ ((infinite.CoreStats.RoundsWon / infinite.MatchesCompleted) * 100).toFixed(2) }%)
- Rounds Lost: ${ infinite.CoreStats.RoundsLost } (${ ((infinite.CoreStats.RoundsLost / infinite.MatchesCompleted) * 100).toFixed(2) }%)
- Rounds Tied: ${ infinite.CoreStats.RoundsTied } (${ ((infinite.CoreStats.RoundsTied / infinite.MatchesCompleted) * 100).toFixed(2) }%)
- Win/Loss Ratio: ${ (infinite.Wins / (infinite.Losses)).toFixed(2) }
- Kills: ${ infinite.CoreStats.Kills }
- Deaths: ${ infinite.CoreStats.Deaths }
- Assists: ${ infinite.CoreStats.Assists }
- Kill-to-death Ratio: ${ (infinite.CoreStats.Kills / (infinite.CoreStats.Deaths)).toFixed(2) }
- Average <abbr title="Kill-Death-Assist">KDA</abbr>: ${ (infinite.CoreStats.AverageKDA).toFixed(2) }
- Suicides: ${ infinite.CoreStats.Suicides } (${ ((infinite.CoreStats.Suicides / infinite.CoreStats.Deaths) * 100).toFixed(2) }%)
- Betrayals: ${ infinite.CoreStats.Betrayals } _(sorry!)_
- Grenade Kills: ${ infinite.CoreStats.GrenadeKills } (${ ((infinite.CoreStats.GrenadeKills / infinite.CoreStats.Kills) * 100).toFixed(2) }%)
- Headshot Kills: ${ infinite.CoreStats.HeadshotKills } (${ ((infinite.CoreStats.HeadshotKills / infinite.CoreStats.Kills) * 100).toFixed(2) }%)
- Melee Kills: ${ infinite.CoreStats.MeleeKills } (${ ((infinite.CoreStats.MeleeKills / infinite.CoreStats.Kills) * 100).toFixed(2) }%)
- Power Weapon Kills: ${ infinite.CoreStats.PowerWeaponKills } (${ ((infinite.CoreStats.PowerWeaponKills / infinite.CoreStats.Kills) * 100).toFixed(2) }%)
- Shots Fired: ${ infinite.CoreStats.ShotsFired }
- Shots Hit: ${ infinite.CoreStats.ShotsHit } (${ (infinite.CoreStats.Accuracy).toFixed(2) }%)
- Damage Dealt: ${ infinite.CoreStats.DamageDealt }
- Damage Taken: ${ infinite.CoreStats.DamageTaken }
- Damage Ratio: ${ (infinite.CoreStats.DamageDealt / (infinite.CoreStats.DamageTaken)).toFixed(2) }
- Callout Assists: ${ infinite.CoreStats.CalloutAssists }
- Vehicles Destroyed: ${ infinite.CoreStats.VehicleDestroys }
- Driver Assists: ${ infinite.CoreStats.DriverAssists }
- Vehicle Hijacks: ${ infinite.CoreStats.Hijacks }
- <abbr title="Electro Magnetic Pulse">EMP</abbr> Assists: ${ infinite.CoreStats.EmpAssists }
- Max Killing Spree: ${ infinite.CoreStats.MaxKillingSpree }
- Spawns: ${ infinite.CoreStats.Spawns }
- Objectives Completed: ${ infinite.CoreStats.ObjectivesCompleted }

For exclusively player versus player interactions, excluding Firefight:

- Kills: ${ infinite.PvpStats.Kills }
- Deaths: ${ infinite.PvpStats.Deaths }
- Assists: ${ infinite.PvpStats.Assists }
- Kill-to-death Ratio: ${ (infinite.PvpStats.Kills / (infinite.PvpStats.Deaths)).toFixed(2) }

### Medals

${ assets/posts/halo-stats/medal-list.js(assets/posts/halo-stats/infinite-medals.json/, infinite.CoreStats.Medals) }

### Capture the Flag

My favourite of Halo's game types. The goal is to capture the enemy flag and return it to your base. I very much play the objective and will throw away lives trying to get one up.

- Flag Steals: ${ infinite.CaptureTheFlagStats.FlagSteals }
- Flag Grabs: ${ infinite.CaptureTheFlagStats.FlagGrabs }
- Flag Captures: ${ infinite.CaptureTheFlagStats.FlagCaptures }
- Flag Capture Assists: ${ infinite.CaptureTheFlagStats.FlagCaptureAssists }
- Flag Steal-to-Capture Conversion: ${ ((infinite.CaptureTheFlagStats.FlagCaptures / (infinite.CaptureTheFlagStats.FlagSteals)) * 100).toFixed(1) }%
- Flag Carriers Killed: ${ infinite.CaptureTheFlagStats.FlagCarriersKilled }
- Flag Returners Killed: ${ infinite.CaptureTheFlagStats.FlagReturnersKilled }
- Flag Returns: ${ infinite.CaptureTheFlagStats.FlagReturns }
- Flag Secures: ${ infinite.CaptureTheFlagStats.FlagSecures }
- Kills as Flag Carrier: ${ infinite.CaptureTheFlagStats.KillsAsFlagCarrier }
- Kills as Flag Returner: ${ infinite.CaptureTheFlagStats.KillsAsFlagReturner }
- Time as Flag Carrier: ${ assets/posts/halo-stats/readable-duration.js(infinite.CaptureTheFlagStats.TimeAsFlagCarrier) }

### Attrition

Slayer, but each team has a limited number of lives, and players can be revived. I usually feel like too much of a burden to my team.

- Allies Revived: ${ infinite.EliminationStats.AlliesRevived }
- Elimination Assists: ${ infinite.EliminationStats.EliminationAssists }
- Eliminations: ${ infinite.EliminationStats.Eliminations }
- Enemy Revives Denied: ${ infinite.EliminationStats.EnemyRevivesDenied }
- Executions: ${ infinite.EliminationStats.Executions }
- Kills as Last Player Standing: ${ infinite.EliminationStats.KillsAsLastPlayerStanding }
- Last Players Standing Killed: ${ infinite.EliminationStats.LastPlayersStandingKilled }
- Rounds Survived: ${ infinite.EliminationStats.RoundsSurvived }
- Times Revived by Ally: ${ infinite.EliminationStats.TimesRevivedByAlly }

### Infection

A group of survivors try to survive against zombies. Once slain, survivors join the zombie team to hunt down more survivors. I find this mode very stressful, so don't play it often.

- Alphas Killed: ${ infinite.InfectionStats.AlphasKilled }
- Spartans Infected: ${ infinite.InfectionStats.SpartansInfected }
- Spartans Infected as Alpha: ${ infinite.InfectionStats.SpartansInfectedAsAlpha }
- Kills as Last Spartan Standing: ${ infinite.InfectionStats.KillsAsLastSpartanStanding }
- Last Spartans Standing Infected: ${ infinite.InfectionStats.LastSpartansStandingInfected }
- Rounds as Alpha: ${ infinite.InfectionStats.RoundsAsAlpha }
- Rounds as Last Spartan Standing: ${ infinite.InfectionStats.RoundsAsLastSpartanStanding }
- Rounds Finished as Infected: ${ infinite.InfectionStats.RoundsFinishedAsInfected }
- Rounds Survived as Spartan: ${ infinite.InfectionStats.RoundsSurvivedAsSpartan }
- Rounds Survived as Last Spartan Standing: ${ infinite.InfectionStats.RoundsSurvivedAsLastSpartanStanding }
- Time as Last Spartan Standing: ${ assets/posts/halo-stats/readable-duration.js(infinite.InfectionStats.TimeAsLastSpartanStanding) }
- Infected Killed: ${ infinite.InfectionStats.InfectedKilled }

### Oddball

Must hold onto a skull (the titular Oddball) to collect points, while stopping the enemy team from doing the same. Very much dependent on team members being helpful due to being unable to use weapons while holding the ball. Unfortunately, they are often not.

- Kills as Skull Carrier: ${ infinite.OddballStats.KillsAsSkullCarrier }
- Longest Time as Skull Carrier: ${ assets/posts/halo-stats/readable-duration.js(infinite.OddballStats.LongestTimeAsSkullCarrier) }
- Skull Carriers Killed: ${ infinite.OddballStats.SkullCarriersKilled }
- Skull Grabs: ${ infinite.OddballStats.SkullGrabs }
- Time as Skull Carrier: ${ assets/posts/halo-stats/readable-duration.js(infinite.OddballStats.TimeAsSkullCarrier) }
- Skull Scoring Ticks: ${ infinite.OddballStats.SkullScoringTicks }

### Total Control

Teams must capture and control all designated areas on a map while preventing the enemy team from doing the same.

- Zone Captures: ${ infinite.ZonesStats.ZoneCaptures }
- Zone Defensive Kills: ${ infinite.ZonesStats.ZoneDefensiveKills }
- Zone Offensive Kills: ${ infinite.ZonesStats.ZoneOffensiveKills }
- Zone Secures: ${ infinite.ZonesStats.ZoneSecures }
- Total Zone Occupation Time: ${ assets/posts/halo-stats/readable-duration.js(infinite.ZonesStats.TotalZoneOccupationTime) }
- Zone Scoring Ticks: ${ infinite.ZonesStats.ZoneScoringTicks }

### Stockpile

Two teams fighting for Power Seeds, which are located in neutral territory and must be collected and deposited at your base. I'm not much a fan of this gametype.

- Kills as Power Seed Carrier: ${ infinite.StockpileStats.KillsAsPowerSeedCarrier }
- Power Seed Carriers Killed: ${ infinite.StockpileStats.PowerSeedCarriersKilled }
- Power Seeds Deposited: ${ infinite.StockpileStats.PowerSeedsDeposited }
- Power Seeds Stolen: ${ infinite.StockpileStats.PowerSeedsStolen }
- Time as Power Seed Carrier: ${ assets/posts/halo-stats/readable-duration.js(infinite.StockpileStats.TimeAsPowerSeedCarrier) }
- Time as Power Seed Driver: ${ assets/posts/halo-stats/readable-duration.js(infinite.StockpileStats.TimeAsPowerSeedDriver) }

### Firefight

Multiplayer or single-player wave defence against computer-driven enemies.

- Kills: ${ infinite.PveStats.Kills }
- Deaths: ${ infinite.PveStats.Deaths }
- Assists: ${ infinite.PveStats.Assists }
- Grunt Kills: ${ infinite.PveStats.GruntKills } (${ ((infinite.PveStats.GruntKills / infinite.PveStats.Kills) * 100).toFixed(2) }%)
- Jackal Kills: ${ infinite.PveStats.JackalKills } (${ ((infinite.PveStats.JackalKills / infinite.PveStats.Kills) * 100).toFixed(2) }%)
- Elite Kills: ${ infinite.PveStats.EliteKills } (${ ((infinite.PveStats.EliteKills / infinite.PveStats.Kills) * 100).toFixed(2) }%)
- Brute Kills: ${ infinite.PveStats.BruteKills } (${ ((infinite.PveStats.BruteKills / infinite.PveStats.Kills) * 100).toFixed(2) }%)
- Hunter Kills: ${ infinite.PveStats.HunterKills } (${ ((infinite.PveStats.HunterKills / infinite.PveStats.Kills) * 100).toFixed(2) }%)
- Skimmer Kills: ${ infinite.PveStats.SkimmerKills } (${ ((infinite.PveStats.SkimmerKills / infinite.PveStats.Kills) * 100).toFixed(2) }%)
- Boss Kills: ${ infinite.PveStats.BossKills } (${ ((infinite.PveStats.BossKills / infinite.PveStats.Kills) * 100).toFixed(2) }%)

<style>
@media (min-width: 30rem) {
	article > div > ul {
		columns: 2;
		column-gap: 2rem;

		li {
			break-inside: avoid;
		}
	}
}

.medal {
	display: inline-block;
	block-size: 4rem;
	aspect-ratio: 1;
	vertical-align: middle;
	background-image: url(/assets/posts/halo-stats/infinite-medals.avif);
	background-size: 1024px auto;
}
</style>
