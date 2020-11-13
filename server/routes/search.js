var Joi = require("joi");
var handlers = require("../handlers/searchHandlers");

/**
 * @api {get} /search/:name Search for a player or a team
 * @apiName Search
 * @apiGroup Search
 *
 * @apiParam {string} name Name of the player or the team
 *
 * @apiSuccess {JSON} List List of Result objects.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
          "username": "John Smith" ,
          "type":  "player"
        }]
 */

const getSearchConfig = {
  validate: {
    params: {
      name: Joi.string()
        .required()
        .description("Name of the player or team.")
    }
  }
};

module.exports = [
  {
    method: "GET",
    path: "/search/{name}",
    handler: handlers.getSearch,
    config: getSearchConfig
  }
];
