var main = require("../app");
var Boom = require("boom");

module.exports = {
  getStatistics: function(request, h) {
    return new Promise(resolve => {
      main.r
        .db("GL5")
        .table("statistics")
        .run()
        .then(function(response) {
          if (response.length != 0) {
            console.log("Statistics successfully returned");
            resolve(response[0]);
          } else {
            resolve(Boom.notFound("Statistics not found."));
          }
        });
    });
  }
};
