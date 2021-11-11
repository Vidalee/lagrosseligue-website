var main = require("../app");
var Boom = require("boom");

module.exports = {
  getChampions: function(request, h) {
    return new Promise(resolve => {
      main.r
        .db("GL6")
        .table("champions")
        .run()
        .then(function(response) {
          if (response.length != 0) {
            console.log("Champions successfully returned");
            resolve(response[0]);
          } else {
            resolve(Boom.notFound("Champions not found."));
          }
        });
    });
  }
};
