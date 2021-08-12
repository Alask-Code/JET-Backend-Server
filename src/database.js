class DatabaseLoader 
{
  load()
  {
    logger.logInfo("Load: 'Core'");
    this._load_CoreData();
    logger.logInfo("Load: 'Globals'");
    this._load_Globals();
    logger.logInfo("Load: 'Gameplay'");
    this._load_GameplayConfig();
    logger.logInfo("Load: 'Bots'");
    this._load_BotsData();
    logger.logInfo("Load: 'Hideout'");
    this._load_HideoutData();
    logger.logInfo("Load: 'Quests'");
    this._load_QuestsData();
    logger.logInfo("Load: 'Items'");
    this._load_ItemsData();
    logger.logInfo("Load: 'Customizations'");
    this._load_CustomizationData();
    logger.logInfo("Load: 'Locales'");
    this._load_LocaleData();
    logger.logInfo("Load: 'Locations'");
    this._load_LocationData();
    logger.logInfo("Load: 'Traders'");
    this._load_TradersData();
    logger.logInfo("Load: 'Weather'");
    this._load_WeatherData();
    logger.logInfo("Database loaded");

  }
  _load_Globals() {
    global._database.globals = fileIO.readParsed(db.base.globals);
    //allow to use file with {data:{}} as well as {}
    if (typeof global._database.globals.data != "undefined") global._database.globals = global._database.globals.data;
  }
  _load_GameplayConfig() {
    global._database.gameplayConfig = fileIO.readParsed(db.user.configs.gameplay);
    global._database.gameplay = global._database.gameplayConfig;
  }
  _load_BotsData() {
    global._database.bots = {};
    for (let botType in db.bots) {
      global._database.bots[botType] = {};
      let difficulty_easy = null;
      let difficulty_normal = null;
      let difficulty_hard = null;
      let difficulty_impossible = null;
      if (typeof db.bots[botType].difficulty != "undefined") {
        if (typeof db.bots[botType].difficulty.easy != "undefined") difficulty_easy = fileIO.readParsed(db.bots[botType].difficulty.easy);
        if (typeof db.bots[botType].difficulty.normal != "undefined") difficulty_normal = fileIO.readParsed(db.bots[botType].difficulty.normal);
        if (typeof db.bots[botType].difficulty.hard != "undefined") difficulty_hard = fileIO.readParsed(db.bots[botType].difficulty.hard);
        if (typeof db.bots[botType].difficulty.impossible != "undefined") difficulty_impossible = fileIO.readParsed(db.bots[botType].difficulty.impossible);
      }
      global._database.bots[botType].difficulty = {
        easy: difficulty_easy,
        normal: difficulty_normal,
        hard: difficulty_hard,
        impossible: difficulty_impossible,
      };
      global._database.bots[botType].appearance = fileIO.readParsed(db.bots[botType].appearance);
      global._database.bots[botType].chances = fileIO.readParsed(db.bots[botType].chances);
      global._database.bots[botType].experience = fileIO.readParsed(db.bots[botType].experience);
      global._database.bots[botType].generation = fileIO.readParsed(db.bots[botType].generation);
      global._database.bots[botType].health = fileIO.readParsed(db.bots[botType].health);
      global._database.bots[botType].inventory = {};
      for (const name in db.bots[botType].inventory) {
        global._database.bots[botType].inventory[name] = fileIO.readParsed(db.bots[botType].inventory[name]);
      }
      //global._database.bots[botType].inventory = fileIO.readParsed(db.bots[botType].inventory);
      global._database.bots[botType].names = fileIO.readParsed(db.bots[botType].names);
    }
  }
  _load_CoreData() {
    global._database.core = {};
    global._database.core.botBase = fileIO.readParsed(db.base.botBase);
    global._database.core.botCore = fileIO.readParsed(db.base.botCore);
    global._database.core.fleaOffer = fileIO.readParsed(db.base.fleaOffer);
    global._database.core.matchMetrics = fileIO.readParsed(db.base.matchMetrics);
  }
  _load_ItemsData() {
    global._database.items = fileIO.readParsed(db.user.cache.items);
    if (typeof global._database.items.data != "undefined") global._database.items = global._database.items.data;
    global._database.templates = fileIO.readParsed(db.user.cache.templates);
    if (typeof global._database.templates.data != "undefined") global._database.templates = global._database.templates.data;
  }
   _load_HideoutData() {
    if (!global._database.hideout) global._database.hideout = {};
  
    global._database.hideout.settings = fileIO.readParsed(db.hideout.settings);
    if (typeof global._database.hideout.settings.data != "undefined") {
      global._database.hideout.settings = global._database.hideout.settings.data;
    }
  
    global._database.hideout.areas = fileIO.readParsed(db.user.cache.hideout_areas);
    if (typeof global._database.hideout.areas.data != "undefined") {
      global._database.hideout.areas = global._database.hideout.areas.data;
    }
  
    global._database.hideout.production = fileIO.readParsed(db.user.cache.hideout_production);
    if (typeof global._database.hideout.production.data != "undefined") {
      global._database.hideout.production = global._database.hideout.production.data;
    }
  
    global._database.hideout.scavcase = fileIO.readParsed(db.user.cache.hideout_scavcase);
    if (typeof global._database.hideout.scavcase.data != "undefined") {
      global._database.hideout.scavcase = global._database.hideout.scavcase.data;
    }
    // apply production time divider
    for (let id in global._database.hideout.areas) {
      for (let id_stage in global._database.hideout.areas[id].stages) {
        let stage = global._database.hideout.areas[id].stages[id_stage];
        if (stage.constructionTime != 0 && stage.constructionTime > global._database.gameplay.hideout.productionTimeDivide_Areas) {
          stage.constructionTime = stage.constructionTime / global._database.gameplay.hideout.productionTimeDivide_Areas;
        }
      }
    }
    for (let id in global._database.hideout.production) {
      if (
        global._database.hideout.production[id].productionTime != 0 &&
        global._database.hideout.production[id].productionTime > global._database.gameplay.hideout.productionTimeDivide_Production
      ) {
        global._database.hideout.production[id].productionTime =
          global._database.hideout.production[id].productionTime / global._database.gameplay.hideout.productionTimeDivide_Production;
      }
    }
    for (let id in global._database.hideout.scavcase) {
      if (
        global._database.hideout.production[id].ProductionTime != 0 &&
        global._database.hideout.production[id].ProductionTime > global._database.gameplay.hideout.productionTimeDivide_ScavCase
      ) {
        global._database.hideout.production[id].ProductionTime =
          global._database.hideout.production[id].ProductionTime / global._database.gameplay.hideout.productionTimeDivide_ScavCase;
      }
    }
  }
  _load_QuestsData() {
    global._database.quests = fileIO.readParsed(db.user.cache.quests);
    if (typeof global._database.quests.data != "undefined") global._database.quests = global._database.quests.data;
  }
  _load_CustomizationData() {
    global._database.customization = fileIO.readParsed(db.user.cache.customization);
    if (typeof global._database.customization.data != "undefined") global._database.customization = global._database.customization.data;
  }
  _load_LocaleData() {
    global._database.languages = fileIO.readParsed(db.user.cache.languages);
    global._database.locales = { menu: {}, global: {} };
    for (let lang in db.locales) {
      let menuFile = fileIO.exist(db.user.cache["locale_menu_" + lang.toLowerCase()]) ? db.user.cache["locale_menu_" + lang.toLowerCase()] : db.locales[lang].menu;
  
      global._database.locales.menu[lang] = fileIO.readParsed(menuFile);
      if (typeof global._database.locales.menu[lang].data != "undefined") {
        global._database.locales.menu[lang] = global._database.locales.menu[lang].data;
      }
  
      global._database.locales.global[lang] = fileIO.readParsed(db.user.cache["locale_" + lang.toLowerCase()]);
      if (typeof global._database.locales.global[lang].data != "undefined") {
        global._database.locales.global[lang] = global._database.locales.global[lang].data;
      }
    }
  }
  _load_LocationData() {
    var _locations = fileIO.readParsed(db.user.cache.locations);
    global._database.locations = {};
    for (let _location in _locations) {
      global._database.locations[_location] = _locations[_location];
    }
    global._database.core.location_base = fileIO.readParsed(db.base.locations);
    global._database.locationConfigs = {};
    //global._database.locationConfigs["dynamicLootAutoSpawnDetector"] = fileIO.readParsed(db.locations.dynamicLootAutoSpawnDetector);
    global._database.locationConfigs["StaticLootTable"] = fileIO.readParsed(db.locations.StaticLootTable);
    global._database.locationConfigs["DynamicLootTable"] = fileIO.readParsed(db.locations.DynamicLootTable);
  }
  _load_TradersData() {
    global._database.traders = {};
    for (let traderID in db.traders) {
      global._database.traders[traderID] = { base: {}, assort: {}, categories: {} };
      global._database.traders[traderID].base = fileIO.readParsed(db.traders[traderID].base);
      global._database.traders[traderID].categories = fileIO.readParsed(db.traders[traderID].categories);
      global._database.traders[traderID].base.sell_category = global._database.traders[traderID].categories; // override trader categories
      global._database.traders[traderID].assort = fileIO.readParsed(db.user.cache["assort_" + traderID]);
      if (typeof global._database.traders[traderID].assort.data != "undefined") global._database.traders[traderID].assort = global._database.traders[traderID].assort.data;
      if (global._database.traders[traderID].base.repair.price_rate === 0) {
        global._database.traders[traderID].base.repair.price_rate = 100;
        global._database.traders[traderID].base.repair.price_rate *= global._database.gameplayConfig.trading.repairMultiplier;
        global._database.traders[traderID].base.repair.price_rate -= 100;
      } else {
        global._database.traders[traderID].base.repair.price_rate *= global._database.gameplayConfig.trading.repairMultiplier;
        if (global._database.traders[traderID].base.repair.price_rate == 0) global._database.traders[traderID].base.repair.price_rate = -1;
      }
      if (global._database.traders[traderID].base.repair.price_rate < 0) {
        global._database.traders[traderID].base.repair.price_rate = -100;
      }
    }
  }
  _load_WeatherData() {
    global._database.weather = fileIO.readParsed(db.user.cache.weather);
    let i = 0;
    for (let weather in db.weather) {
      logger.logInfo("Loaded Weather: ID: " + i++ + ", Name: " + weather);
    }
  }
}
exports.constructor = new DatabaseLoader();
