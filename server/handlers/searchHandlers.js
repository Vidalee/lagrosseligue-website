var main = require("../app");
var Boom = require("boom");
var crypto = require("crypto");

module.exports = {
  getSearch: function(request, h) {
    return new Promise(resolve => {
      main.r
        .db("GL5")
        .table("playersFiltered")
        .filter(function(player){
          return player("summonerName").match(`(?i)^${request.params.name}.+`)
        })
        .run()
        .then(function(response) {
          if (response.length != 0) {
            console.log("Results successfully returned");
            resolve(response);
          } else {
            resolve(Boom.notFound("User or team not found."));
          }
        });
    });
  }
};
