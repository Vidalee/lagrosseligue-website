const players = require("./players.json");
const teams = require("./teams.json");
const fs = require("fs");

for(let team of teams){
    for(let tPlayer of team.players){
        const player = players.find(p => p.accountId === tPlayer.accountId);
        player.team = team.name;
        player.summonerId = tPlayer.summonerId;
        player.region = team.region;
        delete player.matches;
        delete player.matchesIds;
    }
}


fs.writeFileSync('teams.json', JSON.stringify(teams, null, 4));
fs.writeFileSync('players.json', JSON.stringify(players, null, 4));
