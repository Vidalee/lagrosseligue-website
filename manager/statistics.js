const r = require("rethinkdbdash")({
    port: 28015,
    host: "localhost"
});
async function generate_statistics() {
    console.log("euh2");
    let stats = {
        totalKills: 0,
        totalCS: 0,
        totalGames: 0,
        totalDamages: 0,
        totalGoldSpent: 0,
        kda: {
            value: 0,
            summonerName: ""
        },
        cs: {
            value: 0,
            summonerName: ""
        },
        visionScore: {
            value: 0,
            summonerName: ""
        },
        alive: {
            value: 0,
            summonerName: ""
        },
        damages: {
            value: 0,
            summonerName: ""
        },
        pentakills: {
            players: []
        }
    };
    let champions = {};
    await r.db('GL6').table('players').run().then(response => {
        console.log("euh3");

        for (let player of response) {
            if (!player.matches)
                continue;
            let kills = 0;
            let deaths = 0;
            let assists = 0;
            let kda = 0;
            let visionScore = 0;
            let cs = 0;
            let damages = 0;
            for (let game of player.matches) {
                if (champions[game.championId] === undefined) {
                    champions[game.championId] = 0;
                }
                else
                    champions[game.championId] += 1;

                if (game.largestMultiKill == 5) {
                    console.log({ summonerName: player.summonerName, profileIconId: player.profileIconId });
                    stats.pentakills.players.push({ summonerName: player.summonerName, profileIconId: player.profileIconId });
                }
                stats.totalGoldSpent += game.goldSpent;
                stats.totalKills += game.kills;
                stats.totalCS += game.totalMinionsKilled + game.neutralMinionsKilled;
                stats.totalDamages += game.totalDamageDealtToChampions;
                cs += game.totalMinionsKilled + game.neutralMinionsKilled;
                kills += game.kills;
                deaths += game.deaths;
                assists += game.assists;
                visionScore += game.visionScore;
                if (game.longestTimeSpentLiving > stats.alive.value) {
                    stats.alive.value = game.longestTimeSpentLiving;
                    stats.alive.summonerName = player.summonerName;
                    stats.alive.profileIconId = player.profileIconId;
                }
                damages += game.totalDamageDealtToChampions;
                kda += (game.kills + game.assists) / (game.deaths == 0 ? 1 : game.deaths);
            }
            kda /= player.matches.length;
            if (kda > stats.kda.value && player.matches.length > 2) {
                stats.kda.value = kda;
                stats.kda.kills = kills / player.matches.length;
                stats.kda.deaths = deaths / player.matches.length;
                stats.kda.assists = assists / player.matches.length;
                stats.kda.summonerName = player.summonerName;
                stats.kda.profileIconId = player.profileIconId;
            }
            visionScore /= player.matches.length;
            if (visionScore > stats.visionScore.value && player.matches.length > 2) {
                stats.visionScore.value = visionScore;
                stats.visionScore.summonerName = player.summonerName;
                stats.visionScore.profileIconId = player.profileIconId;
            }
            cs /= player.matches.length;
            if (cs > stats.cs.value && player.matches.length > 2) {
                stats.cs.value = cs;
                stats.cs.summonerName = player.summonerName;
                stats.cs.profileIconId = player.profileIconId;
            }
            damages /= player.matches.length;
            if (damages > stats.damages.value && player.matches.length > 2) {
                stats.damages.value = damages;
                stats.damages.summonerName = player.summonerName;
                stats.damages.profileIconId = player.profileIconId;
            }
        }
        let max = 0;
        let champMax = 0;
        for (let key in champions) {
            if (champions[key] > max) {
                max = champions[key];
                champMax = key;
            }
        }
        console.log(stats.pentakills.players.length);
        stats.popChampion = { id: champMax, value: max };

    });
    let zz = 0;
    await r.db('GL6').table('matches').count().run().then(response => {
        stats.totalGames = response;
    });
    console.log(zz);
    await r.db('GL6').table('statistics').delete().run();
    await r.db('GL6').table('statistics').insert(stats).run().then(() => console.log("done"));
}

generate_statistics();