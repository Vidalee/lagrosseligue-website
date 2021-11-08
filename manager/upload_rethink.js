const players = require("./players.json");
const teams = require("./teams.json");
const matches = require("./matches.json");
const r = require("rethinkdbdash")({
    port: 28015,
    host: "localhost"
});

r.db("GL6").table("teams").delete().run().then(() => {
    r.db("GL6").table("teams").insert(teams).run().then(() => {
        console.log("Done uploading teams");   
    });
});

r.db("GL6").table("players").delete().run().then(() => {
    r.db("GL6").table("players").insert(players).run().then(() => {
        console.log("Done uploading players");   
    });
});

r.db("GL6").table("matches").delete().run().then(() => {
    r.db("GL6").table("matches").insert(matches).run().then(() => {
        console.log("Done uploading matches");   
    });
});