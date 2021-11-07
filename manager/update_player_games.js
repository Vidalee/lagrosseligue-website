const players = require("./players.json");
const matches = require("./matches.json");
const matchesIds = matches.map(match => match.metadata.matchId);
const playerList = players.map(player => player.summonerId);

const fs = require('fs');
const config = require('./config.json');

function cleanMatches(){
    for(let player of players)
        player.matches = []
}

async function main() {
    let i = 0;
    let l = matches.length;
    for (let match of matches) {

        //console.log(history);
        await handleGame(match);
        i++;
        console.log(i + "/" + l);
    }

    fs.writeFileSync('players.json', JSON.stringify(players, null, 4));
    //fs.writeFileSync('matches.json', JSON.stringify(matches, null, 4));
}
cleanMatches();
main();

async function handleGame(match) {


    let playerBlue = playerRed = undefined;;
    for (let participant of match.info.participants) {
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
    // console.log(playerBlue.summonerName, playerRed.summonerName);
    // console.log(match.metadata.matchId);
    let glBlue = glRed = undefined;
    for (let participant of match.info.participants) {
        const player = players.find(player => player.summonerId === participant.summonerId);
        if (player === undefined) {
            // console.log("Player not found: " + participant.summonerName);
            continue;
        }

        if (player.summonerId === playerBlue.summonerId)
            glBlue = player;
        if (player.summonerId === playerRed.summonerId)
            glRed = player;

        if (!player.matches || player.matches.length === 0) {
            player.matches = [];
            player.matchesIds = [];
        }
        if (player.matchesIds.includes(match.metadata.matchId)) {
            //console.log("Game " + match.metadata.matchId + " already added to " + player.summonerName);
            continue;
        }
        Object.assign(participant, {
            gameCreation: match.info.gameCreation,
            gameDuration: match.info.gameDuration,
            gameEndTimestamp: match.info.gameEndTimestamp,
            gameId: match.info.gameId,
            gameMode: match.info.gameMode,
            gameName: match.info.gameName,
            gameStartTimestamp: match.info.gameStartTimestamp,
            gameType: match.info.gameType,
            gameVersion: match.info.gameVersion,
            mapId: match.info.mapId,
            matchId: match.metadata.matchId
        })
        player.matches.push(participant);
        player.matchesIds.push(match.metadata.matchId);
    }
}
