const express = require("express");
const app = express();
const addonInterface = require("./addon"); // დარწმუნდი, რომ addon.js იგივე ფოლდერშია

const PORT = process.env.PORT || 10000;

// მთავარი გვერდი გადამისამართდეს manifest-ზე
app.get("/", (req, res) => {
  res.redirect("/manifest.json");
});

// manifest.json სერვისისთვის
app.get("/manifest.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(addonInterface.manifest);
});

// სტანდარტული Stremio-ის რესურს როუტი: /:resource/:type/:id/:extra?.json
app.get("/:resource/:type/:id/:extra?.json", (req, res) => {
  addonInterface.get(req, res);
});

app.listen(PORT, () => {
  console.log(`✅ Add-on running at http://localhost:${PORT}`);
});
