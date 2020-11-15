var main = require("../app");
var Boom = require("boom");
var crypto = require("crypto");

module.exports = {
  getSearch: function (request, h) {
    return new Promise(resolve => {
      main.r
        .db("GL5")
        .table("teams")
        .filter(function (player) {
          return player("name").match(`(?i)^${request.params.name}.*`)
        })
        .run()
        .then(function (response) {
          main.r
            .db("GL5")
            .table("playersFiltered")
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
