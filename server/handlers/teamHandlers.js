var main = require("../app");
var Boom = require("boom");

module.exports = {
  getTeam: function(request, h) {
    return new Promise(resolve => {
      main.r
        .db("GL5")
        .table("teams")
        .filter({ name: request.params.name })
        .run()
        .then(function(response) {
          console.log(response);
          if (response.length != 0) {
            console.log("Team successfully returned");
            resolve(response[0]);
          } else {
            resolve(Boom.notFound("Team not found."));
          }
        });
    });
  }
};
