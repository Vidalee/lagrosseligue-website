process.env.LEAGUE_API_PLATFORM_ID = 'euw1'

const LeagueJS = require('leaguejs');
const leagueJs = new LeagueJS(require("./config.json").riot_api_key);


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function main(){
leagueJs.Summoner
	.gettingByName('EldoranDev')
	.then(data => {
		'use strict';
		console.log(data);
	})
	.catch(err => {
		'use strict';
		console.log(err);
	});
await sleep(3000)
leagueJs.Summoner
	.gettingByName("vivi")
	.then(data => {
		'use strict';
		console.log(data);
	})
	.catch(err => {
		'use strict';
		console.log(err);
	});
}

main();