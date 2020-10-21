exports.cache = () => {
    if (!serverConfig.rebuildCache) {
        return;
    }

    logger.logInfo("Caching: hideout_areas.json");

    let base = {"err": 0, "errmsg": null, "data": []};
    let inputFiles = db.hideout.areas;

    for (let file in inputFiles) {
        let filePath = inputFiles[file];
        let fileData = json.readParsed(filePath);

        base.data.push(fileData);
    }

    json.write("user/cache/hideout_areas.json", base);
}