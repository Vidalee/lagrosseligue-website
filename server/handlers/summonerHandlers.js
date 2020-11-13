var main = require("../app");
var Boom = require("boom");

module.exports = {
  getSummoner: function(request, h) {
    return new Promise(resolve => {
      main.r
        .db("GL5")
        .table("playersFiltered")
        .filter({ summonerName: request.params.summonerName })
        .run()
        .then(function(response) {
          console.log(response);
          if (response.length != 0) {
            console.log("User successfully returned");
            resolve(response[0]);
          } else {
            resolve(Boom.notFound("User not found."));
          }
        });
    });
  }
};
