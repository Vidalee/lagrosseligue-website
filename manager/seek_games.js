const players = require("./players.json");
const matches = require("./matches.json");
const matchesIds = matches.map(match => match.metadata.matchId);
const playerList = players.map(player => player.summonerId);

const fs = require('fs');
const config = require('./config.json');

const GaleforceModule = require('galeforce');

const galeforce = new GaleforceModule({
    "riot-api": {
        key: config.riot_api_key,
    }
});
async function main() {
    let i = 0;
    let l = players.length;
    for (let player of players) {
        
        const history = await galeforce.lol.match.list()
            .puuid(player.puuid)
            .query({ type: "tourney" })
            .region(galeforce.region.riot.EUROPE)
            .exec()
        //console.log(history);
        for (let matchId of history) {
            await handleGame(matchId);
        }
        i++;
        console.log(i + "/" + l);
    }

    fs.writeFileSync('players.json', JSON.stringify(players, null, 4));
    fs.writeFileSync('matches.json', JSON.stringify(matches, null, 4));
}
main();

async function handleGame(matchId) {
    if (matchesIds.includes(matchId))
        return;
    matchesIds.push(matchId);
    const game = await galeforce.lol.match.match()
        .matchId(matchId)
        .region(galeforce.region.riot.EUROPE)
        .exec()

    let playerBlue = playerRed = undefined;;
    for (let participant of game.info.participants) {
        if (playerList.includes(participant.summonerId)) {
            if (participant.teamId === 100) {
                playerBlue = participant;
            } else {
                playerRed = participant;
            }
        }
    }
    if (!playerBlue || !playerRed) {
        console.log("Tourney game other than GL");
        return;
    }

    let glBlue = glRed = undefined;
    for (let participant of game.info.participants) {
        const player = players.find(player => player.summonerId === participant.summonerId);
        if (player === undefined) {
            console.log("Player not found: " + participant.summonerName);
            continue;
        }

        if (player.summonerId === playerBlue.summonerId)
            glBlue = player;
        if (player.summonerId === playerRed.summonerId)
            glRed = player;

        if (!player.matches) {
            player.matches = [];
            player.matchesIds = [];
        }
        if (player.matchesIds.includes(matchId)) {
            //console.log("Game " + matchId + " already added to " + player.summonerName);
            continue;
        }
        player.matches.push(participant);
        player.matchesIds.push(matchId);
    }

    const gl = {
        blue: glBlue.team,
        red: glRed.team,
        win: playerBlue.win ? glBlue.team : glRed.team
    }
    game.gl = gl;
    matches.push(game);
}
