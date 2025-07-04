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
          { id: "formula", name: "Formula TV", type: "tv", poster: "https://via.placeholder.com/200?text=Formula+TV" },
          { id: "pirveli", name: "TV Pirveli", type: "tv", poster: "https://via.placeholder.com/200?text=TV+Pirveli" }
        ]
      });
    }
    // ეს ხაზი გამოჩნდება, თუ მოთხოვნა არ ემთხვევა თქვენს კატალოგს
    console.log("No specific catalog handler matched, returning empty metas."); 
    return Promise.resolve({ metas: [] });
  });
  
  builder.defineStreamHandler(({ id }) => {
    // ეს ხაზი გამოჩნდება Render-ის ლოგებში, როცა Stremio სტრიმს მოითხოვს
    console.log(`Received stream request for id=${id}`); 
    
    const streams = {
      formula: [{ title: "Formula TV Live", url: "https://tv.cdn.xsg.ge/c4635/TVFormula/index.m3u8" }],
      pirveli: [{ title: "TV Pirveli Live", url: "http://tbs01-edge02.cpanel.ge/pirvelitv/playlist.m3u8" }] 
    };
    
    // ეს ხაზი გამოჩნდება, რა სტრიმები დაბრუნდება
    console.log(`Returning streams for ${id}: ${JSON.stringify(streams[id])}`); 
    
    return Promise.resolve({ streams: streams[id] || [] });
  });
  
  module.exports = builder.getInterface();
