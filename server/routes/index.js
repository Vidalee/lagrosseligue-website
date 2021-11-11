const summoner = require("./summoner");
const team = require("./team");
const search = require("./search");
const statistics = require("./statistics");
const champions = require("./champions");

module.exports = [].concat(summoner, team, search, statistics, champions);
