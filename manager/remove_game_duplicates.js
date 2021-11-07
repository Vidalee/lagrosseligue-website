const matches = require('./matches.json');
const fs = require('fs');
const list = [];
const g = [];
let d = 0;

for (let match of matches) {
    if (list.includes(match.metadata.matchId))
        d++;
    else{
        list.push(match.metadata.matchId);
        g.push(match);
    }
}

console.log(d)
fs.writeFileSync('matches.json', JSON.stringify(g, null, 4));
