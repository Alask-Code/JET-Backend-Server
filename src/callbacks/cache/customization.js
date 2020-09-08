"use strict";

function cache() {
    if (!serverConfig.rebuildCache) {
        return;
    }

    logger.logInfo("Caching: customization.json");

    let base = {"err": 0, "errmsg": null, "data": {}};
    let inputFiles = db.customization;

    for (let file in inputFiles) {
        let filePath = inputFiles[file];
        let fileData = json.parse(json.read(filePath));

        base.data[file] = fileData;
    }

    json.write(db.user.cache.customization, base);
}

server.addCacheCallback("cacheCustomization", cache);