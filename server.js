const express = require("express");
const app = express();
const addonInterface = require("./addon"); // დარწმუნდით, რომ addon.js სწორ ადგილასაა

// გამოიყენეთ Render-ის მიერ მოწოდებული PORT გარემოს ცვლადი,
// ან ნაგულისხმევად 7000 ლოკალური დეველოპმენტისთვის
const PORT = process.env.PORT || 7000;

// Stremio Add-on manifest-ის მარშრუტი
app.get("/manifest.json", (req, res) => {
    res.send(addonInterface.manifest);
});

// Stremio Add-on რესურსების მარშრუტი
app.get("/:resource/:type/:id/:extra?.json", (req, res) => {
    addonInterface.get(req.params)
        .then(resp => res.send(resp))
        .catch(err => {
            console.error("Error handling Stremio request:", err); // შეცდომების ლოგირება
            res.status(500).send({ error: err.message });
        });
});

// დამატებითი: სურვილისამებრ, შეგიძლიათ დაამატოთ მარშრუტი ძირეული მისამართისთვისაც,
// რათა თავიდან აიცილოთ "Cannot GET /" შეცდომა, როდესაც მომხმარებელი უბრალოდ URL-ს გახსნის.
// ეს არ არის საჭირო Stremio-სთვის, მაგრამ მომხმარებლისთვის უფრო მეგობრულია.
app.get("/", (req, res) => {
    res.send("Hello from your Stremio add-on! Visit /manifest.json to add it to Stremio.");
});


app.listen(PORT, () => {
    console.log(`Add-on is running on port ${PORT}`);
    console.log(`Add it to Stremio using: http://localhost:${PORT}/manifest.json (for local)`);
    console.log(`Or your Render URL: https://your-service-name.onrender.com/manifest.json`);
});
