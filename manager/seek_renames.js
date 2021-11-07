const teams = require("./teams.json");

for(let team of teams){
    for(let player of team.errors){
        console.log(`${team.name}, ${player}`);
    }
}