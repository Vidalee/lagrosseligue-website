const teams = require("./teams.json")
const players = require("./players.json")
const playerList = players.map(player => player.summonerId);

const matches = require("./matches.json")

const config = require('./config.json');
const fs = require("fs")
const GaleforceModule = require('galeforce');

const galeforce = new GaleforceModule({
    "riot-api": {
        key: config.riot_api_key,
    }
});

async function main() {
    let i = 0;
    let l = matches.length;
    for (let match of matches) {
        let playerBlue = playerRed = undefined;;
        for (let participant of match.info.participants) {
            if (playerList.includes(participant.summonerId)) {
                if (participant.teamId === 100) {
                    playerBlue = players.find(player => player.summonerId === participant.summonerId);
                } else {
                    playerRed = players.find(player => player.summonerId === participant.summonerId);
                }
            }
        }

        for (let participant of match.info.participants) {
            if (playerList.includes(participant.summonerId))
                continue;
            
            const player = await getSummoner(participant.summonerId);
            const rank = await getRank(player.id);
            let rankString = "UNRANKED";
            const soloRank = rank.filter(r => r.queueType === "RANKED_SOLO_5x5");
            if (soloRank.length > 0)
                rankString = soloRank[0].tier + " " + soloRank[0].rank;
            const dto = { accountId: player.accountId, summonerId: player.id, summonerName: player.name, profileIconId: player.profileIconId, soloRank: rankString, flag: 1 };
            if (participant.summonerName !== player.name)
                dto.oldSummonerName = participant.summonerName;
            dto.flag = 1;

            if (participant.teamId === 100) {
                const team = teams.find(team => team.name === playerBlue.team);
                dto.team = team.name;
                dto.region = team.region;
                team.players.push(dto);
            } else {
                const team = teams.find(team => team.name === playerRed.team);
                dto.team = team.name;
                dto.region = team.region;
                team.players.push(dto);
            }
            players.push(dto);
            playerList.push(dto.summonerId);
            //console.log("added", participant.summonerName, participant.summonerId, "to", dto.team);
        }
        i++;
        console.log(i + "/" + l);
    }
    fs.writeFileSync('players.json', JSON.stringify(players, null, 4));
    fs.writeFileSync('teams.json', JSON.stringify(teams, null, 4));
}

main();

function getSummoner(id) {
    return galeforce.lol.summoner().summonerId(id)
        .region(galeforce.region.lol.EUROPE_WEST)
        .exec();
}
function getRank(id) {
    return galeforce.lol.league.entries().summonerId(id)
        .region(galeforce.region.lol.EUROPE_WEST)
        .exec();
}