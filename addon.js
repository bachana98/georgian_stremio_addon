const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
  id: "org.ge.simpleiptv",
  version: "1.0.0",
  name: "Georgia TV: Formula & Pirveli",
  description: "Formula TV და TV Pirveli პირდაპირ Stremio-ში",
  types: ["tv"],
  catalogs: [
    { type: "tv", id: "geo-tve", name: "ქართული Live TV" }
  ],
  resources: ["catalog", "stream"]
};

const builder = new addonBuilder(manifest);

// ✅ Catalog handler
builder.defineCatalogHandler(({ type, id, extra }) => {
  console.log(`Received catalog request: type=${type}, id=${id}, extra=${JSON.stringify(extra)}`);

  if (type === "tv" && id === "geo-tve") {
    console.log("Matched catalog handler for geo-tve");
    return Promise.resolve({
      metas: [
        {
          id: "formula",
          name: "Formula TV",
          type: "tv",
          poster: "https://i.imgur.com/n4V4SBe.png"
        },
        {
          id: "pirveli",
          name: "TV Pirveli",
          type: "tv",
          poster: "https://i.imgur.com/JdCbT8s.png"
        }
      ]
    });
  }

  console.log("No specific catalog handler matched, returning empty metas.");
  return Promise.resolve({ metas: [] });
});

// ✅ Stream handler
builder.defineStreamHandler(async ({ id }) => {
  console.log(`Received stream request for id=${id}`);

  const streams = {
    formula: [
      {
        title: "Formula TV Live",
        url: "https://tv.cdn.xsg.ge/c4635/TVFormula/index.m3u8"
      }
    ],
    pirveli: [
      {
        title: "TV Pirveli Live",
        url: "http://tbs01-edge02.cpanel.ge/pirvelitv/playlist.m3u8"
      }
    ]
  };

  const stream = streams[id];

  if (stream) {
    console.log(`Returning streams for ${id}: ${JSON.stringify(stream)}`);
    return Promise.resolve({ streams: stream });
  } else {
    console.log(`No stream found for id=${id}`);
    return Promise.resolve({ streams: [] });
  }
});

module.exports = builder.getInterface();
