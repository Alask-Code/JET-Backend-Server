
class Initializer {
    constructor() {
        this.initializeCore();
        this.initializeExceptions();
        this.initializeClasses();
		this.initializeItemRoute();
		
		// start watermark and server
		require('./server/watermark.js').run();

		server.start();
		
		console.log(global._Database);
    }

    /* load core functionality */
    initializeCore() {
		
		global.internal = {};
        global.db = {}; // used only for caching
        global.res = {}; // used for deliver an images
		global._Database = {};

		global.startTimestamp = new Date().getTime();
		
        /* setup utilites */
		global.internal.fs = require('fs');
		global.internal.path = require('path');
		global.internal.util = require('util');
		global.internal.resolve = global.internal.path.resolve;
		global.internal.zlib = require('zlib');
		global.internal.https = require('https');
		global.internal.selfsigned = require('selfsigned');
		global.internal.psList = require('ps-list');
		global.internal.process = require('process');
		global.executedDir = internal.process.cwd();
		
		// internal packages
        global.json = require('./util/json.js');
        global.utility = require('./util/utility.js');
        global.logger = (require('./util/logger.js').logger);
		
        /* setup core files */
        global.serverConfig = json.readParsed("user/configs/server.json");
        global.modsConfig = json.readParsed("user/configs/mods.json");

        /* setup routes and cache */
        const route = require('./server/route.js');
        route.all();

        /* core logic */
        global.router = (require('./server/router.js').router);
        global.events = require('./server/events.js');
        global.server = (require('./server/server.js').server);
    }

    /* load exception handler */
    initializeExceptions() {
        internal.process.on('uncaughtException', (error, promise) => {
            logger.logError("[Server]:" + server.getVersion());
            logger.logError("[Trace]:");
            logger.logData(error);
			logger.logData(" ");
        });
    }

    /* load loadorder from cache */
    initializeItemRoute() {
        logger.logSuccess("Create: Item Action Callbacks");
		// Load Item Route's
		// move this later to other file or something like that :)
		item_f.handler.updateRouteStruct();
		let itemHandlers = "";
		for(let iRoute in item_f.handler.routeStructure){
			itemHandlers += iRoute + ", ";
			item_f.handler.addRoute(iRoute, item_f.handler.routeStructure[iRoute]);
		}
		logger.logInfo("[Actions] " + itemHandlers.slice(0, -2));
    }

    /* load classes */
    initializeClasses() {
        logger.logSuccess("Create: Classes as global variables");
		let path = executedDir + "/src/classes";
		let files = json.readDir(path);
		let loadedModules = "";
		global["helper_f"] = require(executedDir + "/src/classes/helper.js");
		for(let file of files){
			loadedModules += file.replace(".js",", ");
			if(file == "helper.js") continue;
			let name = file.replace(".js","") + "_f";
			global[name] = require(executedDir + "/src/classes/" + file);
		}
		logger.logInfo("[Modules] " + loadedModules.slice(0, -2))
    }
}

module.exports.initializer = new Initializer();