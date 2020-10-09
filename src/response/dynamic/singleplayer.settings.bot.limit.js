function execute(url, info, sessionID){
	let splittedUrl = url.split('/');
    let type = splittedUrl[splittedUrl.length - 1];

    if (type === "cursedAssault")
    {
        type = "assault";
    }

    else if (type === "assaultGroup")
    {
        type = "assault";
    }

	if(type == "bossStormtrooper" || type ==  "followerStormtrooper")
		type = "followerBully";
	
    return response_f.noBody(gameplayConfig.bots.limits[type]);
}
exports.execute = execute;