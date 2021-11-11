const players = require("./players.json");
const teams = require("./teams.json");
const fs = require("fs");

// for(let team of teams){
//     for(let tPlayer of team.players){
//         const player = players.find(p => p.accountId === tPlayer.accountId);
//         player.team = team.name;
//         player.region = team.region;
//     }
// }

 for(let player of players){
if(!player.summonerName){
     player.summonerName = player.name;
     delete player.name;
}
if(!player.summonerId){
     player.summonerId = player.id;
     delete player.id;
}
 }
fs.writeFileSync('teams.json', JSON.stringify(teams, null, 4));
fs.writeFileSync('players.json', JSON.stringify(players, null, 4));
