const matches = require("./matches.json")
const players = require("./players.json")

const fs = require("fs");
const data = {};

for(let match of matches){
	for(let participant of match.info.participants){
		if(!data[participant.championId])
			data[participant.championId] = {picks:0, bans:0, wins:0, k:0, d:0, a:0, best:{kda:-1}};
		const d = data[participant.championId];
		d.picks++;
		d.wins += participant.win ? 1 : 0;
		d.k += participant.kills;
		d.d += participant.deaths;
		d.a += participant.assists;
	}

	for(let teams of match.info.teams){
        	for(let ban of teams.bans){
                	if(!data[ban.championId])
                        	data[ban.championId] = {picks:0, bans:0, wins:0, k:0, d:0, a:0, best:{kda:-1}};
                	data[ban.championId].bans++;

        	}
	}
}

for(let player of players){
	if(!player.matches || player.matches.length === 0) continue;
	const kdas = {};
	for(let match of player.matches){
		if(!kdas[match.championId])
			kdas[match.championId] = {count:0, k:0, d:0, a:0, wins:0}
		let mdata = kdas[match.championId]
		mdata.count++;
		mdata.wins += match.win ? 1 : 0;
		mdata.k += match.kills;
		mdata.d += match.deaths;
		mdata.a += match.assists;
	}
	for(const [key, value] of Object.entries(kdas)){
	if(value.count < 2) continue;
		const kda = (value.k + value.a) / (value.d === 0 ? 1 : value.d);
		//console.log("kda:", kda, value)
		if(kda > data[key].best.kda){
			data[key].best = {
				count: value.count,
				summonerId: player.summonerId,
				summonerName: player.summonerName,
				profileIconId: player.profileIconId,
				kda: kda
				}
		}
	}
}

const result = {matches: matches.length, stats: data};
fs.writeFileSync("./pick_bans.json", JSON.stringify(result, null, 4));
