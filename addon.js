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

builder.defineCatalogHandler(({ type, id, extra }) => { 
  // ეს ხაზი გამოჩნდება Render-ის ლოგებში, როცა Stremio კატალოგს მოითხოვს
  console.log(`Received catalog request: type=${type}, id=${id}, extra=${JSON.stringify(extra)}`); 
  
  if (type === "tv" && id === "geo-tve") {
    // ეს ხაზი გამოჩნდება, თუ მოთხოვნა ემთხვევა თქვენს კატალოგს
    console.log("Matched catalog handler for geo-tve"); 
    return Promise.resolve({
      metas: [
        { id: "formula", name: "Formula TV", type: "tv", poster: "https://i.imgur.com/n4V4SBe.png" },
        { id: "pirveli", name: "TV Pirveli", type: "tv", poster: "https://i.imgur.com/JdCbT8s.png" }
      ]
    });
  }
  // ეს ხაზი გამოჩნდება, თუ მოთხოვნა არ ემთხვევა თქვენს კატალოგს
  console.log("No specific catalog handler matched, returning empty metas."); 
  return Promise.resolve({ metas: [] });
});

builder.defineStreamHandler(async ({ id }) => {
  // Log that a stream request has been received.
  console.log(`Received stream request for id=${id}`);

  const streams = {
    formula: [{ title: "Formula TV Live", url: "https://tv.cdn.xsg.ge/c4635/TVFormula/index.m3u8" }],
    pirveli: [{ title: "TV Pirveli Live", url: "http://tbs01-edge02.cpanel.ge/pirvelitv/playlist.m3u8" }]
  };

  const stream = streams[id];

  if (stream) {
    // In a real-world scenario, you'd want to check if the URL is valid.
    // For this example, we'll assume the Formula TV link is valid and the Pirveli link is broken.
    if (id === 'pirveli') {
      console.log(`Stream for ${id} is known to be broken. Returning empty stream.`);
      return Promise.resolve({ streams: [] });
    }

    console.log(`Returning streams for ${id}: ${JSON.stringify(stream)}`);
    return Promise.resolve({ streams: stream });
  } else {
    console.log(`No stream found for id=${id}`);
    return Promise.resolve({ streams: [] });
  }
});

module.exports = builder.getInterface();
