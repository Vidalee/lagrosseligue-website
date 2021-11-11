const matches = require("./matches.json")

let l = 9999999999999999;
let m = undefined;
for(let match of matches){
    if(match.info.gameDuration < l && match.info.gameDuration > 5*60){
        l = match.info.gameDuration;
        m = match;
    }
}

console.log(m.metadata.matchId);