const teams = require('./teams.json');
const players = require('./players.json');
const fs = require('fs');
let lines = fs.readFileSync('./matching.csv', 'utf-8').split(/\r?\n/);

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const parts = line.split(',');
    const palier = parts[1];
    const teamName = parts[2];
    const coach = parts[4];

    const team = teams.find(t => t.name === teamName);
    if(team === undefined){
        console.log('team not found', teamName);
        continue;
    }
    team.custom_fields.coach = coach;
    team.palier = palier;

    for(let p of team.players){
        const player = players.find(pa => pa.summonerId === p.summonerId);
        if(player === undefined){
            console.log('player not found', player);
            continue;
        }
        player.palier = palier;
    }
}

fs.writeFileSync("./teams.json", JSON.stringify(teams, null, 4));
fs.writeFileSync("./players.json", JSON.stringify(players, null, 4));