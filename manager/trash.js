const players = require("./players.json");
const teams = require("./teams.json");
const config = require('./config.json');
const fs = require("fs")
const GaleforceModule = require('galeforce');

const galeforce = new GaleforceModule({
    "riot-api": {
        key: config.riot_api_key,
    }
}); function a() {
    for (let team of teams) {
        for (let p of team.players) {
            const player = players.find(player => player.summonerId === p.summonerId);
            if (player === undefined) {
                console.log("erreur sur", p);
                continue;
            }
            p.flag = player.flag;
        }
    }
}

function b() {
    for (let player of players) {
        if (player.flag === 1) {
            let team = teams.find(team => team.name === player.team);
            if (team === undefined) {
                console.log("erreur sur", player.team, player.summonerId);
                continue;
            }

            team.players.push({
                "accountId": player.accountId,
                "summonerId": player.summonerId,
                "summonerName": player.summonerName,
                "profileIconId": player.profileIconId,
                "soloRank": player.soloRank,
                "flag": player.flag
            });
        }
    }
}

function c() {
    // for(let i = 0; i < players.length; i++){
    //     const player = players[i];
    //     if(player.flag === 1){
    //         if(!toDelete.includes(player.summonerId)){
    //             toDelete.push(player.summonerId);
    //             continue;
    //         }
    //         players.splice(i, 1);
    //     }
    // }
    for (let j = 0; j < teams.length; j++) {
        const team = teams[j];
        const toDelete = [];

        for (let i = 0; i < team.players.length; i++) {
            const player = team.players[i];
            if (player.flag === 1) {
                if (false && !toDelete.includes(player.summonerId)) {
                    toDelete.push(player.summonerId);
                    continue;
                }
                team.players.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < players; i++) {
            const player = players[i];
            if (player.flag === 1) {
                if (false && !toDelete.includes(player.summonerId)) {
                    toDelete.push(player.summonerId);
                    continue;
                }
                players.splice(i, 1);
                i--;
            }
        }
    }
}
// //c();
// for(let i = 0; i < players.length; i++){
//     const player =players[i];
//     console.log(player.flag)
//     if(player.flag === 1){
//         console.log("splice", i)
//         players.splice(i, 1);
//         i--;
//     }
// }

async function d() {
    for (let player of players) {
       player.matches = [];
       player.matchesIds = [];
    }
    fs.writeFileSync("./players.json", JSON.stringify(players, null, 4))

}
d();
console.log("done");
//fs.writeFileSync("./teams.json", JSON.stringify(teams, null, 4));

function getRank(id) {
    return galeforce.lol.league.entries().summonerId(id)
        .region(galeforce.region.lol.EUROPE_WEST)
        .exec();
}