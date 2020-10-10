"use strict";

class Router {
    constructor() {
        this.staticRoutes = {};
		let getStaticRoute = json.readDir("./src/response");
		for(let file of getStaticRoute){
			if(file.indexOf('_') == 0) continue;
			if(!file.includes(".js")) continue;

			let route = "/" + file.replace(".js", "").replace(/\./g, "/");
			let callback = require("../../src/response/" + file);
			this.staticRoutes[route] = callback.execute;
		}
		
		this.dynamicRoutes = {};
		let getDynamicRoute = json.readDir("./src/response/dynamic");
		for(let file of getDynamicRoute){
			//if(file.includes('_')) continue; // fucks up the last_id dynamic response
			if(!file.includes(".js")) continue;
			
			let route = file.replace(".js", "");
			if(route == "jpg" || route == "png" || route == "bundle")
				route = "." + route;
			else if(route == "last_id")
				route = "?" + route;
			else
				route = "/" + route.replace(/\./g, "/");
			let callback = require("../../src/response/dynamic/" + file);
			this.dynamicRoutes[route] = callback.execute;
		}
		
		
    }

    /* sets static routes to check for */
    /*addStaticRoute(route, callback) {
        this.staticRoutes[route] = callback;
    }*/

    /* sets dynamic routes to check for */
    /*addDynamicRoute(route, callback) {
        this.dynamicRoutes[route] = callback;
    }*/

    getResponse(req, body, sessionID) {
        let output = "";
        let url = req.url;
        let info = {};
        /* parse body */
        if (body !== "") {
            info = json.parse(body);
        }
    
        /* remove retry from URL */
        if (url.includes("?retry=")) {
            url = url.split("?retry=")[0];
        }
        
        /* route request */
        if (url in this.staticRoutes) {
            output = this.staticRoutes[url](url, info, sessionID);
        } else {
            for (let key in this.dynamicRoutes) {
                if (url.includes(key)) {
                    output = this.dynamicRoutes[key](url, info, sessionID);
                }
            }
        }
    
        return output;
    }
}

module.exports.router = new Router();
