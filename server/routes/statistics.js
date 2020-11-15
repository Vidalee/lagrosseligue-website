var Joi = require("joi");
var handlers = require("../handlers/statisticsHandlers");

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
    path: "/statistics",
    handler: handlers.getStatistics,
  }
];
