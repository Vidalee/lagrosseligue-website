var Joi = require("joi");
var handlers = require("../handlers/summonerHandlers");

/**
 * @api {get} /summoner/:summonerName Request Summoner Information
 * @apiName Get Player
 * @apiGroup User
 *
 * @apiParam {string} summonerName Summoner name of the summoner.
 *
 * @apiSuccess {JSON} User User object.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        games: [],
 *        summonerId: "",
 *        iconId: 1,
 *        summonerName: ""
 *     }
 */

const summonerConfig = {
  validate: {
    params: {
      summonerName: Joi.string()
        .required()
        .description("Summoner name of the summoner.")
    }
  }
};

module.exports = [
  {
    method: "GET",
    path: "/summoner/{summonerName}",
    handler: handlers.getSummoner,
    config: summonerConfig
  }
];
