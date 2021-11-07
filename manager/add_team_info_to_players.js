const players = require("./players.json")
const teams = require("./teams.json")
const fs = require("fs")
for(let player of players){
    const team = teams.find(team => team.name === player.team);
    if(team === undefined){
        console.log(`${player.summonerName} is not in a team`);
        continue;
    }
    player.region = team.region
    
}

fs.writeFileSync('players.json', JSON.stringify(players, null, 4));