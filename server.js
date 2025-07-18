const express = require("express");
const app = express();
const addonInterface = require("./addon"); // დარწმუნდით, რომ addon.js სწორ ადგილასაა

const express = require("express");
const addonInterface = require("./addon");
const app = express();

const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.redirect("/manifest.json");
});

app.get("/manifest.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(addonInterface.manifest);
});

app.get("/stream/:type/:id.json", (req, res) => {
  addonInterface.get({ resource: "stream", type: req.params.type, id: req.params.id })
    .then(resp => {
      res.setHeader("Content-Type", "application/json");
      res.send(resp);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ err: "Got error in stream call" });
    });
});

app.listen(PORT, () => {
  console.log(`Add-on running on http://localhost:${PORT}`);
});
