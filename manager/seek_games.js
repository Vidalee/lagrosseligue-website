const players = require("./players.json");
const matches = require("./matches.json");
const teams = require("./teams.json");
const matchesIds = matches.map(match => match.metadata.matchId);
const playerList = players.map(player => player.summonerId);

const fs = require('fs');
const config = require('./config.json');

const GaleforceModule = require('galeforce');
const { log } = require("console");

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
            .query({ type: "tourney", startTime: 1635724800 })
            .region(galeforce.region.riot.EUROPE)
            .exec()
        //console.log(history);
        for (let matchId of history) {
            if(matchesIds.includes(matchId)){
                console.log("Already added", matchId);
                continue;
            }
            await handleGame(matchId);
        }
        i++;
        console.log(i + "/" + l);
    }

    fs.writeFileSync('players.json', JSON.stringify(players, null, 4));
    fs.writeFileSync('matches.json', JSON.stringify(matches, null, 4));
    fs.writeFileSync('teams.json', JSON.stringify(teams, null, 4));
}
main();
console.log(matchesIds)
async function handleGame(matchId) {
    if (matchesIds.includes(matchId))
        return;
    matchesIds.push(matchId);
    const game = await galeforce.lol.match.match()
        .matchId(matchId)
        .region(galeforce.region.riot.EUROPE)
        .exec()

    let playerBlue = playerRed = undefined;
    let rcount = bcount = 0;
    for (let participant of game.info.participants) {
        // console.log("seeking", participant.summonerId, "l:", playerList.length);
        if (playerList.includes(participant.summonerId)) {
            // console.log(participant.summonerName, "is in")
            if (participant.teamId === 100) {
                playerBlue = participant;
                bcount++;
            } else {
                playerRed = participant;
                rcount++;
            }
        }
    }
    if (!playerBlue || !playerRed || bcount < 2 || rcount < 2) {
        console.log("Tourney game other than GL", bcount, rcount);
        console.log(game.metadata.matchId);
        return;
    }

    let teamBlue = players.find(player => player.summonerId === playerBlue.summonerId).team;
    let teamRed = players.find(player => player.summonerId === playerRed.summonerId).team;
    
    const gl = {
        blue: teamBlue,
        red: teamRed,
        win: playerBlue.win ? teamBlue : teamRed
    }

    for (let participant of game.info.participants) {
        let player = players.find(player => player.summonerId === participant.summonerId);
        if (player === undefined) {
            await newPlayerFlagged(participant.summonerId, participant.teamId === 100 ? playerBlue : playerRed);
            player = players.find(player => player.summonerId === participant.summonerId);
            if (player === undefined) {
                console.log("Player not found", participant.summonerName, game.metadata.matchId);
                continue;
            }
        }
        if(player.oldNames === undefined)
            player.oldNames = [];
        
        if(player.summonerName !== participant.summonerName && !player.oldNames.includes(participant.summonerName))
            player.oldNames.push(participant.summonerName);

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
        Object.assign(participant, {
            gameCreation: game.info.gameCreation,
            gameDuration: game.info.gameDuration,
            gameEndTimestamp: game.info.gameEndTimestamp,
            gameId: game.info.gameId,
            gameMode: game.info.gameMode,
            gameName: game.info.gameName,
            gameStartTimestamp: game.info.gameStartTimestamp,
            gameType: game.info.gameType,
            gameVersion: game.info.gameVersion,
            mapId: game.info.mapId,
            matchId: game.metadata.matchId,
            opponentTeam: participant.teamId === 100 ? teamRed : teamBlue
        })
        player.matches.push(participant);
        player.matchesIds.push(matchId);
    }
    
    game.gl = gl;
    matches.push(game);
}

async function newPlayerFlagged(summonerId, cpy){
    console.log(summonerId);
    const summoner = await getSummoner(summonerId);
    const rank = await getRank(summoner.id);
    let rankString = "UNRANKED";
    const soloRank = rank.filter(r => r.queueType === "RANKED_SOLO_5x5");
    if (soloRank.length > 0)
        rankString = soloRank[0].tier + " " + soloRank[0].rank;
    summoner.rank = rank;
    summoner.soloRank = rankString;
    summoner.flag = 1;
    summoner.team = cpy.team;
    summoner.summonerId = summoner.id;
    delete summoner.id;
    summoner.summonerName = summoner.name;
    delete summoner.name;
    summoner.region = cpy.region;
    const team = teams.find(team => team.id === summoner.team);
    if (team === undefined) {
        console.log("Team not found", summoner.team);
        return;
    }
    team.players.push(summoner);
    players.push(summoner);
}

function getSummoner(summonerId){
    return galeforce.lol.summoner().summonerId(summonerId)
    .region(galeforce.region.lol.EUROPE_WEST)
    .exec();
}
function getRank(id){
    return galeforce.lol.league.entries().summonerId(id)
    .region(galeforce.region.lol.EUROPE_WEST)
    .exec();
}