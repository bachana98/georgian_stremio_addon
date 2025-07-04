const express = require("express");
const app = express();
const addonInterface = require("./addon");

app.get("/manifest.json", (req, res) => res.send(addonInterface.manifest));
app.get("/:resource/:type/:id/:extra?.json", (req, res) =>
  addonInterface.get(req.params).then(resp => res.send(resp)).catch(err => res.status(500).send({ error: err.message }))
);

app.listen(7000, () => console.log("Add-on is running on http://localhost:7000/manifest.json"));
