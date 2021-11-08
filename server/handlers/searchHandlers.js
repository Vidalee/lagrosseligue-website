var main = require("../app");
var Boom = require("boom");
var crypto = require("crypto");

module.exports = {
  getSearch: function (request, h) {
    return new Promise(resolve => {
      main.r
        .db("GL6")
        .table("teams")
        .filter(function (team) {
          return team("name").match(`(?i)^${request.params.name}.*`)
        })
        .run()
        .then(function (response) {
          main.r
            .db("GL6")
            .table("players")
            .filter(function (player) {
              return player("summonerName").match(`(?i)^${request.params.name}.*`)
            })
            .run()
            .then(function (response2) {
              response = response.concat(response2);
              if (response.length != 0) {
                console.log("Results successfully returned");
                resolve(response);
              } else {
                resolve(Boom.notFound("User or team not found."));
              }
            });

        });
    });
  }
};
