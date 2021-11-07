const fs = require('fs');
/*const r = require("rethinkdbdash")({
    port: 28015,
    host: "localhost"
});*/
const config = require('./config.json');

const GaleforceModule = require('galeforce');

const galeforce = new GaleforceModule({
    "riot-api": {
        key: config.riot_api_key,
    }
});

async function main() {
    let lines = fs.readFileSync('./data.csv', 'utf-8').split(/\r?\n/);
    const data = [];
    const teams = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        console.log(`${i}/${lines.length}`);
        if (line.includes("N/A") || line.includes(",,,,,,,,,,"))
            continue;
        const split = line.split(',');
        const players = [];
        const errors = [];
        for (let j = 3; j < split.length; j++) {
            if (split[j].length === 0)
                continue;

            try {
                const summoner = await getSummoner(split[j]);
                const rank = await getRank(summoner.id);
                let rankString = "UNRANKED";
                const soloRank = rank.filter(r => r.queueType === "RANKED_SOLO_5x5");
                if (soloRank.length > 0)
                    rankString = soloRank[0].tier + " " + soloRank[0].rank;
                players.push({ accountId: summoner.accountId, summonerId: summoner.id, summonerName: summoner.name, profileIconId: summoner.profileIconId, soloRank: rankString });
                summoner.rank = rank;
                summoner.soloRank = rank;
                data.push(summoner);

            } catch (e) {
                console.log(`${split[j]} does not exist on team ${split[1]}`)
                errors.push(split[j]);
            }
        }
        teams.push({
            name: split[1], region: split[2], custom_fields: {
                coach: "",
                capitaine_id: players[0].summonerId,
                capitaine_summonerName: players[0].summonerName,
            }, players: players, profileIconId: players[0].profileIconId, errors: errors
        });
    }
    console.log("saving...");
    fs.writeFileSync('teams.json', JSON.stringify(teams, null, 4));
    fs.writeFileSync('players.json', JSON.stringify(data, null, 4));
}

main();

function getSummoner(name){
    return galeforce.lol.summoner().name(name)
    .region(galeforce.region.lol.EUROPE_WEST)
    .exec();
}
function getRank(id){
    return galeforce.lol.league.entries().summonerId(id)
    .region(galeforce.region.lol.EUROPE_WEST)
    .exec();
}