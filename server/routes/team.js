var Joi = require("joi");
var handlers = require("../handlers/teamHandlers");

/**
 * @api {get} /team/:name Request Team Information
 * @apiName Get Player
 * @apiGroup User
 *
 * @apiParam {string} name Name of the team.
 *
 * @apiSuccess {JSON} Team object.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    
 * {
 * "custom_fields": {
 *   "coach": "",
 *     "discord_id_du_capitaine": "",
 *       "universite": ""
 * },
 * "custom_user_identifier": null,
 * "id": "123",
 * "name": "",
 * "players": [
 *   {
 *     "accountId": "",
 *     "profileIcon": 1,
 *     "summonerName": ""
 *   },
 *   {
 *     "accountId": "",
 *     "profileIcon": 1,
 *     "summonerName": ""
 *   }
 * ],
 * "profileIcon": 4652
 *}
 */

 
const teamConfig = {
  validate: {
    params: {
      name: Joi.string()
        .required()
        .description("Name of the team.")
    }
  }
};

module.exports = [
  {
    method: "GET",
    path: "/team/{name}",
    handler: handlers.getTeam,
    config: teamConfig
  }
];
