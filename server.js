const { serveHTTP } = require("stremio-addon-sdk");
const addonInterface = require("./addon"); // addon.js ფაილი, რომელიც შეიცავს Add-on-ის ლოგიკას

// serveHTTP ფუნქცია Stremio Add-on-ის ინტერფეისს აწვდის HTTP მოთხოვნებზე.
// ის ავტომატურად ამუშავებს ყველა Stremio API როუტს.
serveHTTP(addonInterface, { port: process.env.PORT || 10000 });

// ლოგირება, რომ Add-on მუშაობს
console.log(`✅ Add-on running at http://localhost:${process.env.PORT || 10000}`);
