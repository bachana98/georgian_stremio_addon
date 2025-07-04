const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
  id: "org.ge.simpleiptv",
  version: "1.0.0",
  name: "georgia TV: Formula & Pirveli",
  description: "Formula TV და TV Pirveli პირდაპირ Stremio-ში",
  types: ["tv"],
  catalogs: [
    { type: "tv", id: "geo-tve", name: "ქართული Live TV" }
  ],
  resources: ["catalog", "stream"]
};

const builder = new addonBuilder(manifest);

// ******** შეცვლილი ხაზი აქ არის: დაემატა ', extra' პარამეტრებში ********
builder.defineCatalogHandler(({ type, id, extra }) => { 
  if (type === "tv" && id === "geo-tve") {
    return Promise.resolve({
      metas: [
        { id: "formula", name: "Formula TV", type: "tv", poster: "https://via.placeholder.com/200?text=Formula+TV" },
        { id: "pirveli", name: "TV Pirveli", type: "tv", poster: "https://via.placeholder.com/200?text=TV+Pirveli" }
      ]
    });
  }
  // თუ type ან id არ ემთხვევა, დააბრუნეთ ცარიელი metas
  return Promise.resolve({ metas: [] });
});

builder.defineStreamHandler(({ id }) => {
  const streams = {
    formula: [{ title: "Formula TV Live", url: "https://tv.cdn.xsg.ge/c4635/TVFormula/index.m3u8" }],
    // TV Pirveli-ს URL: თუ პრობლემა შეგექმნებათ, ეცადეთ HTTPS ვერსია იპოვოთ
    pirveli: [{ title: "TV Pirveli Live", url: "http://tbs01-edge02.cpanel.ge/pirvelitv/playlist.m3u8" }] 
  };
  return Promise.resolve({ streams: streams[id] || [] });
});

module.exports = builder.getInterface();  
