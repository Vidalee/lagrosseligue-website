var Joi = require("joi");
var handlers = require("../handlers/championHandlers");

/**
 * @api {get} /statistics Request Statistics
 * @apiName Statistics
 * @apiGroup Statistics
 *
 *
 * @apiSuccess {JSON} Statistics Statistics object.
 */

module.exports = [
  {
    method: "GET",
    path: "/champions",
    handler: handlers.getChampions,
  }
];
