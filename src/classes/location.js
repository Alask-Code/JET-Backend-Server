"use strict";

const ItemParentsList = [
  "5485a8684bdc2da71d8b4567",
  "543be5cb4bdc2deb348b4568",
  "5b3f15d486f77432d0509248",
  "5448e54d4bdc2dcc718b4568",
  "57bef4c42459772e8d35a53b",
  "5447b5fc4bdc2d87278b4567",
  "5447b5f14bdc2d61278b4567",
  "55818add4bdc2d5b648b456f",
  "5a74651486f7744e73386dd1",
  "5448e53e4bdc2d60728b4567",
  "555ef6e44bdc2de9068b457e",
  "5448eb774bdc2d0a728b4567",
  "57864ee62459775490116fc1",
  "55818afb4bdc2dde698b456d",
  "57864ada245977548638de91",
  "55818a6f4bdc2db9688b456b",
  "55818ad54bdc2ddc698b4569",
  "55818acf4bdc2dde698b456b",
  "5f4fbaaca5573a5ac31db429",
  "550aa4af4bdc2dd4348b456e",
  "566162e44bdc2d3f298b4573",
  "5448e8d64bdc2dce718b4568",
  "5448f3a14bdc2d27728b4569",
  "57864a66245977548f04a81f",
  "543be5f84bdc2dd4348b456a",
  "5a341c4686f77469e155819e",
  "550aa4bf4bdc2dd6348b456b",
  "55818b084bdc2d5b648b4571",
  "5448e8d04bdc2ddf718b4569",
  "543be6674bdc2df1348b4569",
  "55818af64bdc2d5b648b4570",
  "5d650c3e815116009f6201d2",
  "550aa4154bdc2dd8348b456b",
  "56ea9461d2720b67698b456f",
  "55802f3e4bdc2de7118b4584",
  "5447bedf4bdc2d87278b4568",
  "55818a104bdc2db9688b4569",
  "5645bcb74bdc2ded0b8b4578",
  "5a341c4086f77401f2541505",
  "57864c322459775490116fbf",
  "5448ecbe4bdc2d60728b4568",
  "55d720f24bdc2d88028b456d",
  "55818ac54bdc2d5b648b456e",
  "54009119af1c881c07000029",
  "57864a3d24597754843f8721",
  "543be5e94bdc2df1348b4568",
  "5c164d2286f774194c5e69fa",
  "5c99f98d86f7745c314214b3",
  "5447e1d04bdc2dff2f8b4567",
  "55818b014bdc2ddc698b456b",
  "55818b0e4bdc2dde698b456e",
  "5671435f4bdc2d96058b4569",
  "566965d44bdc2d814c8b4571",
  "57864e4c24597754843f8723",
  "5447bed64bdc2d97278b4568",
  "5448bc234bdc2d3c308b4569",
  "567849dd4bdc2d150f8b456e",
  "5447b6194bdc2d67278b4567",
  "55802f4a4bdc2ddb688b4569",
  "5448f3ac4bdc2dce718b4569",
  "57864c8c245977548867e7f1",
  "5448f39d4bdc2d0a728b4568",
  "543be5664bdc2dd4348b4569",
  "5448bf274bdc2dfc2f8b456a",
  "5448fe124bdc2da5018b4567",
  "543be5dd4bdc2deb348b4569",
  "55818b224bdc2dde698b456f",
  "5448fe394bdc2d0d028b456c",
  "550aa4dd4bdc2dc9348b4569",
  "5a2c3a9486f774688b05e574",
  "55818ae44bdc2dde698b456c",
  "590c745b86f7743cc433c5f2",
  "5447b5cf4bdc2d65278b4567",
  "55818a684bdc2ddd698b456d",
  "550ad14d4bdc2dd5348b456c",
  "557596e64bdc2dc2118b4571",
  "55818b1d4bdc2d5b648b4572",
  "55818a304bdc2db5418b457d",
  "566168634bdc2d144c8b456c",
  "55818a604bdc2db5418b457e",
  "5447b6094bdc2dc3278b4567",
  "5448fe7a4bdc2d6f028b456b",
  "550aa4cd4bdc2dd8348b456c",
  "5795f317245977243854e041",
  "5447b5e04bdc2d62278b4567",
  "5447b6254bdc2dc3278b4568",
  "55818aeb4bdc2ddc698b456a",
  "5447bee84bdc2dc3278b4569",
  "5447e0e74bdc2d3c308b4567",
  "5661632d4bdc2d903d8b456b",
  "566abbb64bdc2d144c8b457d",
  "567583764bdc2d98058b456e",
  "5448f3a64bdc2d60728b456a",
  "55818a594bdc2db9688b456a",
  "55818b164bdc2ddc698b456c",
  "5d21f59b6dbe99052b54ef83",
  "543be6564bdc2df4348b4568",
  "57864bb7245977548b3b66c2",
  "5448e5284bdc2dcb718b4567",
  "5448e5724bdc2ddf718b4568",
  "5422acb9af1c889c16000029",
];
let _LootContainerNode = [];
/*
5cdeb229d7f00c000e7ce174 heavy machine gun
5d52cc5ba4b9367408500062 automatic grenade launcher
*/
function LoadLootContainerNode() {
  if (_LootContainerNode.length == 0) _LootContainerNode = Object.values(global._database.items).filter((item) => item._parent === "566965d44bdc2d814c8b4571");
  return _LootContainerNode;
}
function GenerateDynamicLootSpawnTable(lootData, mapName) {
  let containsSpawns = [];
  if (global._database.gameplayConfig.useDynamicLootFromItemsArray) {
    for (const spawnTemplate in lootData.Items) {
      const filteredData = Object.values(global._database.items).filter((itemTemplate) => itemTemplate._parent == spawnTemplate);
      // add them to the list
      if (filteredData.length != 0) {
        for (const itemTemplate in filteredData) {
          containsSpawns.push(filteredData[itemTemplate]._id);
        }
      } else {
        containsSpawns.push(global._database.items[spawnTemplate]);
      }
    }
  } else {
    for (const key of Object.keys(global._database.locationConfigs.DynamicLootTable[mapName])) {
      const match = lootData.Id.toLowerCase();

      if (match.includes(key)) {
        const lootList = global._database.locationConfigs.DynamicLootTable[mapName][key].SpawnList;
        for (const loot in lootList) {
          if (ItemParentsList.includes(lootList[loot])) {
            logger.logWarning(`In Map ${mapName}: there is dynamic loot ${lootList[loot]} as prohibited ParentId... skipping`);
            continue;
          }
          containsSpawns.push(global._database.items[lootList[loot]]);
        }
      }
    }
  }
  return containsSpawns;
}
function GenerateLootList(containerId) {
  let LootList = {};
  // get static container loot pools
  let ItemList = global._database.locationConfigs.StaticLootTable[containerId];

  for (const item of ItemList.SpawnList) {
    if (ItemParentsList.includes(item)) {
      logger.logWarning(`In Container ${containerId}: there is static loot ${item} as prohibited ParentId... skipping`);
      continue;
    }
    const itemTemplate = global._database.items[item];
    if (typeof itemTemplate._props.LootExperience == "undefined") {
      logger.logWarning(`itemTemplate._props.LootExperience == "undefined" for ${itemTemplate._id}`);
    }
    const rollSpawnChance = utility.getRandomInt(0, 10000);
    const itemSpawnChance = utility.valueBetween(itemTemplate._props.LootExperience, 0, 250, 0, 100)
    if (itemSpawnChance < rollSpawnChance) {
      //logger.logInfo(`SpawnItemInContainer: ${itemTemplate._id} ==> ${rollSpawnChance} < ${itemTemplate._props.SpawnChance*100} * ${GetRarityMultiplier(itemTemplate._props.Rarity)}`)
      LootList[item] = global._database.items[item];
      if (typeof LootList[item] == "undefined") {
        // remove added item if undefined
        delete LootList[item];
        continue;
      } else LootList[item]["preset"] = FindIfItemIsAPreset(LootList[item]._id);
    }
  }
  // Shuffle LootList for added randomization -300 ms for customs ~1000 things to calculate
  // LootList = Object.keys(LootList)
  //   .map((key) => ({ key, value: LootList[key] }))
  //   .sort((a, b) => b.key.localeCompare(a.key))
  //   .reduce((acc, e) => {
  //     acc[e.key] = e.value;
  //     return acc;
  //   }, {});
  return LootList;
}
function FindIfItemIsAPreset(ID_TO_SEARCH) {
  let foundPresetsList = Object.values(_database.globals.ItemPresets).filter((preset) => preset._encyclopedia && preset._encyclopedia == ID_TO_SEARCH);
  if (foundPresetsList.length == 0) return null;
  return foundPresetsList[0];
}
function DeepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function GetRarityMultiplier(rarity) {
  switch (rarity) {
    case "Not_exist":
      return global._database.gameplayConfig.locationloot.RarityMultipliers.Not_exist;
    case "Rare":
      return global._database.gameplayConfig.locationloot.RarityMultipliers.Rare;
    case "Superrare":
      return global._database.gameplayConfig.locationloot.RarityMultipliers.Superrare;
    case "Common":
      return global._database.gameplayConfig.locationloot.RarityMultipliers.Common;
    default:
      return 0;
  }
}
function _RollMaxItemsToSpawn(container) {
  let minCount = 0;
  const maxItemsPossibleToSpawn = container._props.Grids[0]._props.cellsV * container._props.Grids[0]._props.cellsH;

  if (utility.getRandomInt(0, 100) > _database.gameplayConfig.locationloot.containers.ChanceForEmpty) {
    minCount++;
    for (let i = 1; i < maxItemsPossibleToSpawn; i++) {
      if (utility.getRandomInt(0, 100) < _database.gameplayConfig.locationloot.containers.ChanceToSpawnNextItem) {
        minCount++;
      }
    }
  }
  return minCount;
}
function _GenerateContainerLoot(_items) {
  // themaoci: will need to review it again and shorten it !!!
  // we are getting the lootcontainer node and selecting proper loot container
  //const LootContainerNode = LoadLootContainerNode();
  //if (LootContainerNode == null) throw "LootContainerNode is null something goes wrong please check db.items[???LootContainer???.json] file";
  //let container = Object.values(LootContainerNode).filter((container) => container._id == _items[0]._tpl);

  const ContainerId = _items[0]._tpl;
  const LootContainerIdTable = Object.keys(global._database.locationConfigs.StaticLootTable);
  if (!LootContainerIdTable.includes(ContainerId)) {
    // Check if static weapon.
    if (ContainerId != "5cdeb229d7f00c000e7ce174" && ContainerId != "5d52cc5ba4b9367408500062") {
      logger.logWarning("GetLootContainerData is null something goes wrong please check if container template: " + _items[0]._tpl + " exists");
      return;
    } else {
      _items[0].upd = { FireMode: { FireMode: "fullauto" } };
      // stationary gun is actually a container...
      const GunTempalte = global._database.items[_items[0]._tpl]; // template object
      const MagazineTemplate = global._database.items[GunTempalte._props.Slots[0]._props.filters[0].Filter[0]]; // template object
      const Magazine_Size = MagazineTemplate._props.Cartridges[0]._max_count; // number
      const AmmoTemplates = MagazineTemplate._props.Cartridges[0]._props.filters[0].Filter; // array
      const magazine = {
        _id: utility.generateNewId("M"),
        _tpl: MagazineTemplate._id,
        parentId: _items[0]._id,
        slotId: "mod_magazine",
      };
      _items.push(magazine);
      for (let i = 0; i < Magazine_Size / 4; i++) {
        if (_items[0]._tpl == "5d52cc5ba4b9367408500062") {
          // this is grenade launcher ammo preset creation
          if (i == 0) {
            const bullet = {
              _id: utility.generateNewId("B"),
              _tpl: AmmoTemplates[0],
              parentId: magazine._id,
              slotId: "cartridges",
            };
            _items.push(bullet);
            continue;
          }
          const bullet = {
            _id: utility.generateNewId("B"),
            _tpl: AmmoTemplates[0],
            parentId: magazine._id,
            slotId: "cartridges",
            location: i,
          };
          _items.push(bullet);
        } else {
          // this is machine gun ammo preset creation
          const ammoCount = i % 2 == 0 ? 3 : 1;
          const bullet = {
            _id: utility.generateNewId("B"),
            _tpl: AmmoTemplates[i % 2],
            parentId: magazine._id,
            slotId: "cartridges",
            location: i,
            upd: {
              StackObjectsCount: ammoCount,
            },
          };
          _items.push(bullet);
        }
      }
      return;
    }
  }
  const LootList = GenerateLootList(ContainerId);

  const parentId = _items[0]._id;
  const idPrefix = parentId.substring(0, parentId.length - 4);
  let idSuffix = parseInt(parentId.substring(parentId.length - 4), 16) + 1;
  const ContainerTemplate = global._database.items[ContainerId];
  let container2D = Array(ContainerTemplate._props.Grids[0]._props.cellsV)
    .fill()
    .map(() => Array(ContainerTemplate._props.Grids[0]._props.cellsH).fill(0));
  //let maxProbability = container.maxProbability;
  let addedPresets = [];

  // roll a maximum number of items  to spawn in the container between 0 and max slot count
  const minCount = _RollMaxItemsToSpawn(ContainerTemplate);
  //const rollSpawnChance = utility.getRandomInt(0, 10000); // roll between 0.00 and 100.00
  let LootListItems = Object.keys(LootList);
  //logger.logInfo(`SpawnItemInContainer: ${rollSpawnChance} | ${Object.keys(LootList).length}`)
  if (LootListItems.length != 0) {
    // we finished generating spawn for this container now its time to roll items to put in container
    let itemWidth = 0;
    let itemHeight = 0;
    for (let i = 0; i < minCount; i++) {
      //let item = {};
      let containerItem = {};

      let RollIndex = utility.getRandomInt(0, LootListItems.length - 1);
      let indexRolled = []; // if its here it will not check anything :) if its outside of for loop(above) it will nto roll the same item twice
      // make sure its not already rolled index
      while (indexRolled.includes(RollIndex)) {
        RollIndex = utility.getRandomInt(0, LootListItems.length - 1);
      }
      // add current rolled index
      indexRolled.push(RollIndex);
      // getting rolled item
      const rolledRandomItemToPlace = LootList[LootListItems[RollIndex]];

      if (typeof rolledRandomItemToPlace == "undefined") {
        logger.logWarning(`Undefined in container: ${ContainerId}  ${LootListItems.length} ${RollIndex}`);
        continue;
      }
      let result = { success: false };
      let maxAttempts =
        global._database.gameplayConfig.locationloot.containers.AttemptsToPlaceLoot > 10 ? 1 : global._database.gameplayConfig.locationloot.containers.AttemptsToPlaceLoot;

      // attempt to add item x times
      while (!result.success && maxAttempts) {
        //let currentTotal = 0;
        // get basic width and height of the item
        itemWidth = rolledRandomItemToPlace._props.Width;
        itemHeight = rolledRandomItemToPlace._props.Height;
        // check if item is a preset
        if (rolledRandomItemToPlace.preset != null) {
          // Prevent the same preset from spawning twice (it makes the client mad)
          if (addedPresets.includes(rolledRandomItemToPlace.preset._id)) {
            maxAttempts--;
            continue;
          }
          addedPresets.push(rolledRandomItemToPlace.preset._id);
          const size = helper_f.getItemSize(rolledRandomItemToPlace._id, rolledRandomItemToPlace.preset._items[0]._id, rolledRandomItemToPlace.preset._items);
          // Guns will need to load a preset of items
          rolledRandomItemToPlace._props.presetId = rolledRandomItemToPlace.preset._id;
          itemWidth = size[0];
          itemHeight = size[1];
        }
        result = helper_f.findSlotForItem(container2D, itemWidth, itemHeight);
        maxAttempts--;
      }
      // finished attempting to insert item into container

      // if we weren't able to find an item to fit after x tries then container is probably full
      if (!result.success) break;

      container2D = helper_f.fillContainerMapWithItem(container2D, result.x, result.y, itemWidth, itemHeight, result.rotation);
      let rot = result.rotation ? 1 : 0;

      if (rolledRandomItemToPlace._props.presetId) {
        // Process gun preset into container items
        let preset = helper_f.getPreset(rolledRandomItemToPlace._props.presetId);
        if (preset == null) continue;
        preset._items[0].parentId = parentId;
        preset._items[0].slotId = "main";
        preset._items[0].location = { x: result.x, y: result.y, r: rot };

        for (var p in preset._items) {
          _items.push(DeepCopy(preset._items[p]));

          if (preset._items[p].slotId === "mod_magazine") {
            let mag = helper_f.getItem(preset._items[p]._tpl)[1];
            let cartridges = {
              _id: idPrefix + idSuffix.toString(16),
              _tpl: rolledRandomItemToPlace._props.defAmmo,
              parentId: preset._items[p]._id,
              slotId: "cartridges",
              upd: { StackObjectsCount: mag._props.Cartridges[0]._max_count },
            };

            _items.push(cartridges);
            idSuffix++;
          }
        }
        continue;
      }

      containerItem = {
        _id: idPrefix + idSuffix.toString(16),
        _tpl: rolledRandomItemToPlace._id,
        parentId: parentId,
        slotId: "main",
        location: { x: result.x, y: result.y, r: rot },
      };

      let cartridges;
      if (rolledRandomItemToPlace._parent === "543be5dd4bdc2deb348b4569" || rolledRandomItemToPlace._parent === "5485a8684bdc2da71d8b4567") {
        // Money or Ammo stack
        let stackCount = utility.getRandomInt(rolledRandomItemToPlace._props.StackMinRandom, rolledRandomItemToPlace._props.StackMaxRandom);
        containerItem.upd = { StackObjectsCount: stackCount };
      } else if (rolledRandomItemToPlace._parent === "543be5cb4bdc2deb348b4568") {
        // Ammo container
        idSuffix++;

        cartridges = {
          _id: idPrefix + idSuffix.toString(16),
          _tpl: rolledRandomItemToPlace._props.StackSlots[0]._props.filters[0].Filter[0],
          parentId: containerItem._id,
          slotId: "cartridges",
          upd: { StackObjectsCount: rolledRandomItemToPlace._props.StackMaxRandom },
        };
      } else if (rolledRandomItemToPlace._parent === "5448bc234bdc2d3c308b4569") {
        // Magazine
        idSuffix++;
        cartridges = {
          _id: idPrefix + idSuffix.toString(16),
          _tpl: rolledRandomItemToPlace._props.Cartridges[0]._props.filters[0].Filter[0],
          parentId: parentId,
          slotId: "cartridges",
          upd: { StackObjectsCount: rolledRandomItemToPlace._props.Cartridges[0]._max_count },
        };
      }

      _items.push(containerItem);

      if (cartridges) _items.push(cartridges);
      idSuffix++;
    }
  } else {
    logger.logInfo(`EmptyContainer: ${ContainerId}`);
  }
  let changedIds = {};
  for (let item of _items) {
    let newId = utility.generateNewItemId();
    changedIds[item._id] = newId;
    item._id = newId;

    if (!item.parentId) continue;
    item.parentId = changedIds[item.parentId];
  }
}

//========> LOOT CREATION START !!!!!
class Generator {
  lootMounted(typeArray, output) {
    let count = 0;
    for (let i in typeArray) {
      let data = DeepCopy(typeArray[i]);

      let changedIds = {};
      for (var item of data.Items) {
        let newId = utility.generateNewItemId();
        changedIds[item._id] = newId;
        if (item._id == data.Root) data.Root = newId;
        item._id = newId;
        if (!item.parentId) continue;

        item.parentId = changedIds[item.parentId];
      }
      output.Loot.push(data);
      count++;
    }
    return count;
  }
  lootForced(typeArray, output) {
    let count = 0;
    for (let i in typeArray) {
      let data = DeepCopy(typeArray[i]);
      let newItemsData = [];
      // forced loot should be only contain 1 item... (there shouldnt be any weapon in there...)
      const newId = utility.generateNewItemId();

      let createEndLootData = {
        Id: data.Id,
        IsStatic: data.IsStatic,
        useGravity: data.useGravity,
        randomRotation: data.randomRotation,
        Position: data.Position,
        Rotation: data.Rotation,
        IsGroupPosition: data.IsGroupPosition,
        GroupPositions: data.GroupPositions,
        Root: newId,
        Items: [
          {
            _id: newId,
            _tpl: data.Items[0],
          },
        ],
      };

      output.Loot.push(createEndLootData);
      count++;
    }
    return count;
  }
  lootStatics(typeArray, output) {
    // TODO: this needs redo ~themaoci
    let count = 0;
    let dateNow = Date.now();
    for (let i in typeArray) {
      let data = typeArray[i];
      dateNow = Date.now();
      _GenerateContainerLoot(data.Items);
      if (Date.now() - dateNow > 50) logger.logInfo(`Slow Container ${data.Id} [${Date.now() - dateNow}ms]`);
      dateNow = Date.now();
      data.Root = data.Items[0]._id;
      output.Loot.push(data);
      count++;
    }
    return count;
  }
  lootDynamic(typeArray, output, locationLootChanceModifier, MapName) {
    let count = 0;
    for (let itemLoot in typeArray) {
      const lootData = typeArray[itemLoot];
      //loot overlap removed its useless...
      let DynamicLootSpawnTable = GenerateDynamicLootSpawnTable(lootData, MapName); // add this function
      // should return Array() of strings where they are item ID's
      // check server settigns if auto detect or use Items strings to detect predefined items
      if (DynamicLootSpawnTable.length == 0) {
        logger.logWarning(`LootSpawn: ${lootData.Id} has not found any loot table for the spawn automatically. Skipping...`);
        continue;
      }

      const generatedItemId = utility.generateNewItemId();
      let randomChoosedItem = DynamicLootSpawnTable[utility.getRandomInt(0, DynamicLootSpawnTable.length - 1)];

      const createdItem = {
        _id: generatedItemId,
        _tpl: randomChoosedItem._id,
      };

      // item creation
      let createEndLootData = {
        Id: lootData.Id,
        IsStatic: lootData.IsStatic,
        useGravity: lootData.useGravity,
        randomRotation: lootData.randomRotation,
        Position: lootData.Position,
        Rotation: lootData.Rotation,
        IsGroupPosition: lootData.IsGroupPosition,
        GroupPositions: lootData.GroupPositions,
        Root: generatedItemId,
        Items: [],
      };
      createEndLootData.Items.push(createdItem);
      // now add other things like cartriges etc.

      // AMMO BOXES !!!
      if (global._database.items[createEndLootData.Items[0]._tpl]._parent == "543be5cb4bdc2deb348b4568") {
        const ammoTemplate = global._database.items[createEndLootData.Items[0]._tpl]._props.StackSlots[0]._props.filters[0].Filter[0];
        const ammoMaxStack = global._database.items[ammoTemplate]._props.StackMaxSize;
        const randomizedBulletsCount = utility.getRandomInt(
          global._database.items[createEndLootData.Items[0]._tpl]._props.StackMinRandom,
          global._database.items[createEndLootData.Items[0]._tpl]._props.StackMaxRandom
        );
        let locationCount = 0;
        for (let i = 0; i < randomizedBulletsCount; i += ammoMaxStack) {
          const currentStack = i + ammoMaxStack > randomizedBulletsCount ? randomizedBulletsCount - i : ammoMaxStack;
          createEndLootData.Items.push({
            _id: utility.generateNewItemId(),
            _tpl: ammoTemplate,
            parentId: createEndLootData.Items[0]._id,
            slotId: "cartridges",
            location: locationCount,
            upd: {
              StackObjectsCount: currentStack,
            },
          });
          locationCount++;
        }
      }
      // Preset weapon
      const PresetData = FindIfItemIsAPreset(createEndLootData.Items[0]._tpl);
      if (PresetData != null) {
        let preset = PresetData[utility.getRandomInt(0, PresetData.length)];
        if (preset == null) continue;

        let oldBaseItem = preset._items[0];
        preset._items = preset._items.splice(0, 1);
        let idSuffix = 0;
        let OldIds = {};
        for (var p in preset._items) {
          let currentItem = DeepCopy(preset._items[p]);
          OldIds[currentItem.id] = utility.generateNewItemId();
          if (currentItem.parentId == oldBaseItem._id) currentItem.parentId = createEndLootData.Items[0]._id;
          if (typeof OldIds[currentItem.parentId] != "undefined") currentItem.parentId = OldIds[currentItem.parentId];

          currentItem.id = OldIds[currentItem.id];
          createEndLootData.Items.push(currentItem);

          if (preset._items[p].slotId === "mod_magazine") {
            let mag = helper_f.getItem(preset._items[p]._tpl)[1];
            let cartridges = {
              _id: currentItem.id + "_" + idSuffix,
              _tpl: item._props.defAmmo,
              parentId: preset._items[p]._id,
              slotId: "cartridges",
              upd: { StackObjectsCount: mag._props.Cartridges[0]._max_count },
            };

            createEndLootData.Items.push(cartridges);
            idSuffix++;
          }
        }
      }
      // spawn change calculation
      const num = utility.getRandomInt(0, 10000);
      const itemSpawnChance = utility.valueBetween(helper_f.getItem(createdItem._tpl)[1]["_props"]["LootExperience"], 0, 250, 0, 100)

      const itemChance = itemSpawnChance * locationLootChanceModifier;
      if (num >= itemChance) {
        //lootPositions.push(position);
        count++;
        output.Loot.push(createEndLootData);
      }
    }
    return count;
  }
}
//========>  LOOT CREATION END !!!!!

/* LocationServer class maintains list of locations in memory. */
class LocationServer {
  /* generates a random location preset to use for local session */
  generate(name, sessionID) {
    const lootGenerator = new Generator();
    let dateNow = Date.now();
    let stage = 0;
    // dont read next time ??
    if (typeof global._database.locations[name] == "undefined") {
      logger.logWarning("No Such Location");
      return;
    }
    let _location = global._database.locations[name];

    if (global._database.gameplayConfig.locationloot.useDynamicLootMultiplier) {
      if (sessionID != "" && typeof sessionID != "undefined") {
        let exfilData = profile_f.handler.getProfileExfilsById(sessionID);

        let sumExfils = 0;
        for (const key in exfilData) {
          sumExfils += exfilData[key];
        }
        if (sumExfils != 0) {
          _location.base.GlobalLootChanceModifier = sumExfils / (sumExfils + exfilData[name]);
        } else {
          _location.base.GlobalLootChanceModifier = 1;
        }
      }
    }

    let output = _location.base;
    let ids = {};

    // don't generate loot on hideout
    if (name === "hideout") {
      return output;
    }

    // Deep copy so the variable contents can be edited non-destructively
    let forced = DeepCopy(_location.loot.forced);
    let mounted = DeepCopy(_location.loot.mounted);
    let statics = DeepCopy(_location.loot.static);
    let dynamic = DeepCopy(_location.loot.dynamic);
    logger.logInfo(`State Prepare, TimeElapsed: ${Date.now() - dateNow}ms`);
    dateNow = Date.now();

    output.Loot = [];
    let count = 0;
    let counters = [];

    count = lootGenerator.lootMounted(mounted, output);
    logger.logInfo(`State Mounted, TimeElapsed: ${Date.now() - dateNow}ms`);
    dateNow = Date.now();

    counters.push(count);
    count = 0;
    count = lootGenerator.lootForced(forced, output);
    logger.logInfo(`State Forced, TimeElapsed: ${Date.now() - dateNow}ms`);
    dateNow = Date.now();

    counters.push(count);
    count = 0;
    count = lootGenerator.lootStatics(statics, output);
    logger.logInfo(`State Containers, TimeElapsed: ${Date.now() - dateNow}ms`);
    dateNow = Date.now();

    counters.push(count);

    // dyanmic loot
    count = 0;
    count = lootGenerator.lootDynamic(dynamic, output, _location.base.GlobalLootChanceModifier, name);
    logger.logInfo(`State Dynamic, TimeElapsed: ${Date.now() - dateNow}ms`);
    dateNow = Date.now();

    counters.push(count);

    // Loot position list for filtering the lootItem in the same position.
    if (global.serverConfig.lootDebug) {
      logger.logSuccess(
        `Generated location ${name} with [mounted: ${counters[0]}/${mounted.length} | forcedLoot: ${counters[1]}/${forced.length} | statics: ${counters[2]}/${statics.length} | dynamic: ${counters[3]}/${dynamic.length}]`
      );
    }
    counters = null;

    return output;
  }

  /* get a location with generated loot data */
  get(Location, sessionID) {
    let name = Location.toLowerCase().replace(" ", "");
    return this.generate(name, sessionID);
  }

  /* get all locations without loot data */
  generateAll() {
    // lets try to read from cache
    if (!utility.isUndefined(db.user.cache.locations)) {
      let base = global._database.core.location_base;
      let newData = {};
      for (let location in global._database.locations) {
        newData[global._database.locations[location].base._Id] = utility.wipeDepend(global._database.locations[location].base);
        newData[global._database.locations[location].base._Id].Loot = [];
      }
      base.locations = newData;
      return base;
    }
    throw "Missing file db/cacheBase/locations.json";
  }
}

module.exports.handler = new LocationServer();

// UNUSED PART - But leaved as backup for now

// function GetLootContainerData(ItemID, lootContainerNode) {
//   const LootContainerNodeList = Object.values(lootContainerNode).filter((node) => node._id == ItemID);
//   if (LootContainerNodeList == 0) return null;
//   return LootContainerNodeList[0];
// }
// function DeepParentToItemSearch(incomingList) {
//   let itemList = [];
//   for (const obj in incomingList) {
//     if (ItemParentsList.includes(incomingList[obj])) {
//       const listOfItems = Object.keys(_database.items).filter((item) => _database.items[item]._parent == incomingList[obj]);
//       let output = DeepParentToItemSearch(listOfItems);
//       for (const data in output) {
//         itemList.push(output[data]);
//       }
//       continue;
//     }
//     itemList.push(incomingList[obj]);
//   }
//   return itemList;
// }

// function _MountedLootPush(typeArray, output) {
//   let count = 0;
//   for (let i in typeArray) {
//     let data = DeepCopy(typeArray[i]);

//     let changedIds = {};
//     for (var item of data.Items) {
//       let newId = utility.generateNewItemId();
//       changedIds[item._id] = newId;
//       if (item._id == data.Root) data.Root = newId;
//       item._id = newId;
//       if (!item.parentId) continue;

//       item.parentId = changedIds[item.parentId];
//     }
//     output.Loot.push(data);
//     count++;
//   }
//   return count;
// }
// function _ForcedLootPush(typeArray, output) {
//   let count = 0;
//   for (let i in typeArray) {
//     let data = DeepCopy(typeArray[i]);
//     let newItemsData = [];
//     // forced loot should be only contain 1 item... (there shouldnt be any weapon in there...)
//     const newId = utility.generateNewItemId();

//     let createEndLootData = {
//       Id: data.Id,
//       IsStatic: data.IsStatic,
//       useGravity: data.useGravity,
//       randomRotation: data.randomRotation,
//       Position: data.Position,
//       Rotation: data.Rotation,
//       IsGroupPosition: data.IsGroupPosition,
//       GroupPositions: data.GroupPositions,
//       Root: newId,
//       Items: [
//         {
//           _id: newId,
//           _tpl: data.Items[0],
//         },
//       ],
//     };

//     output.Loot.push(createEndLootData);
//     count++;
//   }
//   return count;
// }
// function _StaticsLootPush(typeArray, output) {
//   // TODO: this needs redo ~themaoci
//   let count = 0;
//   let dateNow = Date.now();
//   for (let i in typeArray) {
//     let data = typeArray[i];
//     //if (data.Items.length > 1) data.Items.splice(1);
//     //logger.logInfo(`Container ${data.Id}, TimeElapsed: ${Date.now() - dateNow}ms`);
//     dateNow = Date.now();
//     _GenerateContainerLoot(data.Items);
//     //logger.logInfo(`Container - END - , TimeElapsed: ${Date.now() - dateNow}ms`);
//     if (Date.now() - dateNow > 100) logger.logInfo(`Slow Container ${data.Id}`);
//     dateNow = Date.now();
//     data.Root = data.Items[0]._id;
//     output.Loot.push(data);
//     count++;
//   }
//   return count;
// }
// function _DynamicLootPush(typeArray, output, locationLootChanceModifier, MapName) {
//   let count = 0;
//   for (let itemLoot in typeArray) {
//     const lootData = typeArray[itemLoot];
//     //loot overlap removed its useless...
//     let detectedItemsToSpawn = detectLootSpawn(lootData, MapName); // add this function
//     // should return Array() of strings where they are item ID's
//     // check server settigns if auto detect or use Items strings to detect predefined items
//     if (detectedItemsToSpawn.length == 0) {
//       logger.logWarning(`LootSpawn: ${lootData.Id} has not found any loot table for the spawn automatically. Skipping...`);
//       continue;
//     }

//     const generatedItemId = utility.generateNewItemId();
//     let randomChoosedItem = detectedItemsToSpawn[utility.getRandomInt(0, detectedItemsToSpawn.length - 1)];

//     const createdItem = {
//       _id: generatedItemId,
//       _tpl: randomChoosedItem._id,
//     };

//     // item creation
//     let createEndLootData = {
//       Id: lootData.Id,
//       IsStatic: lootData.IsStatic,
//       useGravity: lootData.useGravity,
//       randomRotation: lootData.randomRotation,
//       Position: lootData.Position,
//       Rotation: lootData.Rotation,
//       IsGroupPosition: lootData.IsGroupPosition,
//       GroupPositions: lootData.GroupPositions,
//       Root: generatedItemId,
//       Items: [],
//     };
//     createEndLootData.Items.push(createdItem);
//     // now add other things like cartriges etc.

//     // AMMO BOXES !!!
//     if (global._database.items[createEndLootData.Items[0]._tpl]._parent == "543be5cb4bdc2deb348b4568") {
//       const ammoTemplate = global._database.items[createEndLootData.Items[0]._tpl]._props.StackSlots[0]._props.filters[0].Filter[0];
//       const ammoMaxStack = global._database.items[ammoTemplate]._props.StackMaxSize;
//       const randomizedBulletsCount = utility.getRandomInt(
//         global._database.items[createEndLootData.Items[0]._tpl]._props.StackMinRandom,
//         global._database.items[createEndLootData.Items[0]._tpl]._props.StackMaxRandom
//       );
//       let locationCount = 0;
//       for (let i = 0; i < randomizedBulletsCount; i += ammoMaxStack) {
//         const currentStack = i + ammoMaxStack > randomizedBulletsCount ? randomizedBulletsCount - i : ammoMaxStack;
//         createEndLootData.Items.push({
//           _id: utility.generateNewItemId(),
//           _tpl: ammoTemplate,
//           parentId: createEndLootData.Items[0]._id,
//           slotId: "cartridges",
//           location: locationCount,
//           upd: {
//             StackObjectsCount: currentStack,
//           },
//         });
//         locationCount++;
//       }
//     }
//     // Preset weapon
//     const PresetData = FindIfItemIsAPreset(createEndLootData.Items[0]._tpl);
//     if (PresetData != null) {
//       let preset = PresetData[utility.getRandomInt(0, PresetData.length)];
//       if (preset == null) continue;

//       let oldBaseItem = preset._items[0];
//       preset._items = preset._items.splice(0, 1);
//       let idSuffix = 0;
//       let OldIds = {};
//       for (var p in preset._items) {
//         let currentItem = DeepCopy(preset._items[p]);
//         OldIds[currentItem.id] = utility.generateNewItemId();
//         if (currentItem.parentId == oldBaseItem._id) currentItem.parentId = createEndLootData.Items[0]._id;
//         if (typeof OldIds[currentItem.parentId] != "undefined") currentItem.parentId = OldIds[currentItem.parentId];

//         currentItem.id = OldIds[currentItem.id];
//         createEndLootData.Items.push(currentItem);

//         if (preset._items[p].slotId === "mod_magazine") {
//           let mag = helper_f.getItem(preset._items[p]._tpl)[1];
//           let cartridges = {
//             _id: currentItem.id + "_" + idSuffix,
//             _tpl: item._props.defAmmo,
//             parentId: preset._items[p]._id,
//             slotId: "cartridges",
//             upd: { StackObjectsCount: mag._props.Cartridges[0]._max_count },
//           };

//           createEndLootData.Items.push(cartridges);
//           idSuffix++;
//         }
//       }
//     }
//     // spawn change calculation
//     const num = utility.getRandomInt(0, 10000);
//     const spawnChance = helper_f.getItem(createdItem._tpl)[1]["_props"]["SpawnChance"] * 100;

//     const itemChance = spawnChance * locationLootChanceModifier;
//     if (num >= itemChance) {
//       //lootPositions.push(position);
//       count++;
//       output.Loot.push(createEndLootData);
//     }
//   }
//   return count;
// }
