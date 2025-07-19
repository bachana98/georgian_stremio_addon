const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
  id: "org.ge.simpleiptv",
  version: "1.0.1", // ვერსია გავზარდე, რადგან ახალი არხები დაემატა
  name: "Georgia TV: Live Channels", // სახელი შევცვალე უფრო ზოგადზე
  description: "ქართული სატელევიზიო არხები პირდაპირ Stremio-ში: Formula TV, TV Pirveli, Kavkasia TV, Euronews Georgia, 1TV, Silk Universal.", // აღწერა განვაახლე
  types: ["tv"],
  catalogs: [
    { type: "tv", id: "geo-tve", name: "ქართული Live TV" }
  ],
  resources: ["catalog", "stream"]
};

const builder = new addonBuilder(manifest);

// ✅ Catalog handler - კატალოგის დამმუშავებელი
builder.defineCatalogHandler(async ({ type, id, extra }) => {
  console.log(`Received catalog request: type=${type}, id=${id}, extra=${JSON.stringify(extra)}`);

  try {
    if (type === "tv" && id === "geo-tve") {
      console.log("Matched catalog handler for geo-tve");
      return Promise.resolve({
        metas: [
          {
            id: "formula",
            name: "Formula TV",
            type: "tv",
            poster: "https://i.imgur.com/fsqBn8G.png", // Formula TV-ის ლოგო
            posterShape: "landscape"
          },
          {
            id: "pirveli",
            name: "TV Pirveli",
            type: "tv",
            poster: "https://i.imgur.com/cGHsM1x.png", // TV Pirveli-ის ლოგო
            posterShape: "landscape"
          },
          {
            id: "kavkasia",
            name: "Kavkasia TV",
            type: "tv",
            poster: "https://i.imgur.com/Z5b7w7K.png", // Kavkasia TV-ის ლოგო
            posterShape: "landscape"
          },
          {
            id: "euronewsgeorgia",
            name: "Euronews Georgia",
            type: "tv",
            poster: "https://i.imgur.com/VNJ4soR.png", // Euronews Georgia-ის ლოგო
            posterShape: "landscape"
          },
          {
            id: "1tv", // ID შეცვლილია "1TV"-დან "1tv"-ზე, რათა მცირე ასოებით იყოს
            name: "1TV",
            type: "tv",
            poster: "https://i.imgur.com/FSkYLPK.png", // 1TV-ის ლოგო
            posterShape: "landscape"
          },
          {
            id: "silkuniversal",
            name: "Silk Universal",
            type: "tv",
            poster: "https://i.imgur.com/z0XHsPE.png", // Silk Universal-ის ლოგო
            posterShape: "landscape"
          }
        ]
      });
    }

    console.log("No specific catalog handler matched, returning empty metas.");
    return Promise.resolve({ metas: [] });
  } catch (error) {
    console.error("Error in defineCatalogHandler:", error);
    return Promise.resolve({ metas: [] });
  }
});

// ✅ Stream handler - სტრიმის დამმუშავებელი
builder.defineStreamHandler(async ({ id, type }) => { // type პარამეტრიც დავამატე, თუმცა ამ შემთხვევაში tv-ზეა ფოკუსირებული
  console.log(`Received stream request for id=${id}, type=${type}`);

  try {
    const streams = {};

    // TV არხების სტრიმები
    if (type === "tv") { // დარწმუნება, რომ TV ტიპის მოთხოვნაა
      streams.formula = [{ title: "Formula TV Live", url: "https://tv.cdn.xsg.ge/c4635/TVFormula/index.m3u8" }];
      streams.pirveli = [{ title: "TV Pirveli Live", url: "http://dvrfl05.bozztv.com/gin-tvpirveli/index.m3u8" }];
      streams.kavkasia = [{ title: "Kavkasia TV Live", url: "http://dvrfl05.bozztv.com/gin-kavkasia/index.m3u8" }];
      streams.euronewsgeorgia = [{ title: "Euronews Georgia Live", url: "http://dvrfl05.bozztv.com/gin-euronewsgeorgia/index.m3u8" }];
      streams["1tv"] = [{ title: "1TV Live", url: "https://tv.cdn.xsg.ge/gpb-1tv/index.m3u8" }]; // ID-სთან შესაბამისობა "1tv"
      streams.silkuniversal = [{ title: "Silk Universal Live", url: "http://dvrfl05.bozztv.com/gin-silkuniversal/index.m3u8" }];

      if (streams[id]) {
        console.log(`Returning streams for ${id}: ${JSON.stringify(streams[id])}`);
        return Promise.resolve({ streams: streams[id] });
      }
    }

    console.log(`No stream found for id=${id}, type=${type}`);
    return Promise.resolve({ streams: [] });
  } catch (error) {
    console.error("Error in defineStreamHandler:", error);
    return Promise.resolve({ streams: [] });
  }
});

module.exports = builder.getInterface();  
