"use strict";

/* Based on the item action, determine whose inventories we should be looking at for from and to. */
function getOwnerInventoryItems(body, sessionID) {
    let isSameInventory = false;
    let pmcItems = profile_f.profileServer.getPmcProfile(sessionID).Inventory.items;
    let scavData = profile_f.profileServer.getScavProfile(sessionID);
    let fromInventoryItems = pmcItems;
    let fromType = "pmc";

    if ("fromOwner" in body) {
        if (body.fromOwner.id === scavData._id) {
            fromInventoryItems = scavData.Inventory.items;
            fromType = "scav";
        } else if (body.fromOwner.type === "Mail") {
            fromInventoryItems = dialogue_f.dialogueServer.getMessageItemContents(body.fromOwner.id, sessionID);
            fromType = "mail";
        }
    }

    // Don't need to worry about mail for destination because client doesn't allow
    // users to move items back into the mail stash.
    let toInventoryItems = pmcItems;
    let toType = "pmc";

    if ("toOwner" in body && body.toOwner.id === scavData._id) {
        toInventoryItems = scavData.Inventory.items;
        toType = "scav";
    }

    if (fromType === toType) {
        isSameInventory = true;
    }

    return {
        from: fromInventoryItems,
        to: toInventoryItems,
        sameInventory: isSameInventory,
        isMail: fromType === "mail"
    };
}

/* Move Item
* change location of item with parentId and slotId
* transfers items from one profile to another if fromOwner/toOwner is set in the body.
* otherwise, move is contained within the same profile_f.
* */
function moveItem(pmcData, body, sessionID) {
    let output = item_f.itemServer.getOutput();

    let inventoryItems = getOwnerInventoryItems(body, sessionID);
   /*  if (inventoryItems.isMail) {
        let idsToMove = dialogue_f.findAndReturnChildren(inventoryItems.from, body.item);
        for (let itemId of idsToMove) {
            for (let messageItem of inventoryItems.from) {
                if (messageItem._id === itemId) {
                    inventoryItems.to.push(messageItem);
                }
            }
        }
        moveItemInternal(inventoryItems.to, body);
    } else */ if (inventoryItems.sameInventory) {
        moveItemInternal(inventoryItems.from, body);
    } else {
        moveItemToProfile(inventoryItems.from, inventoryItems.to, body);
    }

    return output;
}

/* Internal helper function to transfer an item from one profile to another.
* fromProfileData: Profile of the source.
* toProfileData: Profile of the destination.
* body: Move request
*/
function moveItemToProfile(fromItems, toItems, body) {
    handleCartridges(fromItems, body);

    let idsToMove = itm_hf.findAndReturnChildrenByItems(fromItems, body.item);

    for (let itemId of idsToMove) {
        for (let itemIndex in fromItems) {
            if (fromItems[itemIndex]._id && fromItems[itemIndex]._id === itemId) {
                if (itemId === body.item) {
                    fromItems[itemIndex].parentId = body.to.id;
                    fromItems[itemIndex].slotId = body.to.container;

                    if ("location" in body.to) {
                        fromItems[itemIndex].location = body.to.location;
                    } else {
                        if (fromItems[itemIndex].location) {
                            delete fromItems[itemIndex].location;
                        }
                    }
                }

                toItems.push(fromItems[itemIndex]);
                fromItems.splice(itemIndex, 1);

            }
        }
    }
}

/* Internal helper function to move item within the same profile_f.
* items: Items
* body: Move request
*/
function moveItemInternal(items, body) {
    handleCartridges(items, body);

    for (let item of items) {
        if (item._id && item._id === body.item) {
            item.parentId = body.to.id;
            item.slotId = body.to.container;

            if ("location" in body.to) {
                item.location = body.to.location;
            } else {
                if (item.location) {
                    delete item.location;
                }
            }

            return;
        }
    }
}

/* Internal helper function to handle cartridges in inventory if any of them exist.
* items: Items
* body: Move request
*/
function handleCartridges(items, body) {
    // -> Move item to diffrent place - counts with equiping filling magazine etc
    if (body.to.container === 'cartridges') {
        let tmp_counter = 0;

        for (let item_ammo in items) {
            if (body.to.id === items[item_ammo].parentId) {
                tmp_counter++;
            }
        }

        body.to.location = tmp_counter;//wrong location for first cartrige
    }
}

/* Remove item of itemId and all of its descendants from profile. */
function removeItemFromProfile(profileData, itemId, output = null) {
    // get items to remove
    let ids_toremove = itm_hf.findAndReturnChildren(profileData, itemId);

     //remove one by one all related items and itself
    for (let i in ids_toremove) {
        if (output !== null) {
            output.items.del.push({"_id": ids_toremove[i]});
        }

        for (let a in profileData.Inventory.items) {
            if (profileData.Inventory.items[a]._id === ids_toremove[i]) {
                profileData.Inventory.items.splice(a, 1);
            }
        }
    }
}

/*
* Remove Item
* Deep tree item deletion / Delets main item and all sub items with sub items ... and so on.
*/
function removeItem(profileData, body, output, sessionID) {
    let toDo = [body];

    //Find the item and all of it's relates
    if (toDo[0] === undefined || toDo[0] === null || toDo[0] === "undefined") {
		logger.logError(`item id is ${toDo[0]} with body ${body}`);
        return "";
    }

    removeItemFromProfile(profileData, toDo[0], output);
    return output;
}

function discardItem(pmcData, body, sessionID) {
    insurance_f.insuranceServer.remove(pmcData, body.item, sessionID);
    return removeItem(pmcData, body.item, item_f.itemServer.getOutput(), sessionID);
}

/* Split Item
* spliting 1 item into 2 separate items ...
* */
function splitItem(pmcData, body, sessionID) {
    let output = item_f.itemServer.getOutput();
    let location = body.container.location;

    let inventoryItems = getOwnerInventoryItems(body, sessionID);

    if (!("location" in body.container) && body.container.container === "cartridges") {
        let tmp_counter = 0;

        for (let item_ammo in inventoryItems.to) {
            if (inventoryItems.to[item_ammo].parentId === body.container.id) {
                tmp_counter++;
            }
        }

        location = tmp_counter;//wrong location for first cartrige
    }


    // The item being merged is possible from three different sources: pmc, scav, or mail.
    for (let item of items.from) {
        if (item._id && item._id === body.item) {
            item.upd.StackObjectsCount -= body.count;

            let newItem = utility.generateNewItemId();

            output.items.new.push({
                "_id": newItem,
                "_tpl": item._tpl,
                "parentId": body.container.id,
                "slotId": body.container.container,
                "location": location,
                "upd": {"StackObjectsCount": body.count}
            });

            items.to.push({
                "_id": newItem,
                "_tpl": item._tpl,
                "parentId": body.container.id,
                "slotId": body.container.container,
                "location": location,
                "upd": {"StackObjectsCount": body.count}
            });

            return output;
        }
    }

    return "";
}

/* Merge Item
* merges 2 items into one, deletes item from body.item and adding number of stacks into body.with
* */
function mergeItem(pmcData, body, sessionID) {
    let output = item_f.itemServer.getOutput();
    let inventoryItems = getOwnerInventoryItems(body, sessionID);

    for (let key in inventoryItems.to) {
        if (inventoryItems.to[key]._id === body.with) {
            for (let key2 in inventoryItems.from) {
                if (inventoryItems.from[key2]._id && inventoryItems.from[key2]._id === body.item) {
                    let stackItem0 = 1;
                    let stackItem1 = 1;
                    
                    if (!(inventoryItems.to[key].upd && inventoryItems.to[key].upd.StackObjectsCount)) {
                        inventoryItems.to[key].upd = {"StackObjectsCount" : 1};
                    } else if (!(inventoryItems.to[key2].upd && inventoryItems.to[key2].upd.StackObjectsCount)) {
                        inventoryItems.from[key2].upd = {"StackObjectsCount" : 1};
                    }
                    
                    if ("upd" in inventoryItems.to[key]) {
                        stackItem0 = inventoryItems.to[key].upd.StackObjectsCount;
                    }

                    if ("upd" in inventoryItems.from[key2]) {
                        stackItem1 = inventoryItems.from[key2].upd.StackObjectsCount;
                    }

                    if (stackItem0 === 1) {
                        Object.assign(inventoryItems.to[key], {"upd": {"StackObjectsCount": 1}});
                    }

                    inventoryItems.to[key].upd.StackObjectsCount = stackItem0 + stackItem1;
                    output.items.del.push({"_id": inventoryItems.from[key2]._id});
                    inventoryItems.from.splice(key2, 1);
                    return output;
                }
            }
        }
    }

    return "";
}

/* Transfer item
* Used to take items from scav inventory into stash or to insert ammo into mags (shotgun ones) and reloading weapon by clicking "Reload"
* */
function transferItem(pmcData, body, sessionID) {
    let output = item_f.itemServer.getOutput();

    let itemFrom = null, itemTo = null;

    for (let iterItem of pmcData.Inventory.items) {
        if (iterItem._id === body.item) {
            itemFrom = iterItem;
        }
        else if (iterItem._id === body.with) {
            itemTo = iterItem;
        }
        if (itemFrom !== null && itemTo !== null) break;
    }

    if (itemFrom !== null && itemTo !== null)
    {
        let stackFrom = 1;

        if ("upd" in itemFrom) {
            stackFrom = itemFrom.upd.StackObjectsCount;
        } else {
            Object.assign(itemFrom, {"upd": {"StackObjectsCount": 1}});
        }

        if (stackFrom > body.count) {
            itemFrom.upd.StackObjectsCount = stackFrom - body.count;
        } else {
            // Moving a full stack onto a smaller stack
            itemFrom.upd.StackObjectsCount = stackFrom - 1;
        }

        let stackTo = 1;

        if ("upd" in itemTo) {
            stackTo = itemTo.upd.StackObjectsCount;
        } else {
            Object.assign(itemTo, {"upd": {"StackObjectsCount": 1}});
        }

        itemTo.upd.StackObjectsCount = stackTo + body.count;
    }

    return output;
}

/* Swap Item
* its used for "reload" if you have weapon in hands and magazine is somewhere else in rig or backpack in equipment
* */
function swapItem(pmcData, body, sessionID) {
    let output = item_f.itemServer.getOutput();

    for (let iterItem of pmcData.Inventory.items) {
        if (iterItem._id === body.item) {
            iterItem.parentId = body.to.id;         // parentId
            iterItem.slotId = body.to.container;    // slotId
            iterItem.location = body.to.location    // location
        }

        if (iterItem._id === body.item2) {
            iterItem.parentId = body.to2.id;
            iterItem.slotId = body.to2.container;
            delete iterItem.location;
        }
    }

    return output;
}

/* Give Item
* its used for "add" item like gifts etc.
* */
function addItem(pmcData, body, output, sessionID, foundInRaid = false) {
    let PlayerStash = itm_hf.getPlayerStash(sessionID);
    let stashY = PlayerStash[1];
    let stashX = PlayerStash[0];
    let inventoryItems;

    if (body.item_id in globals.data.ItemPresets) {
        inventoryItems = itm_hf.clone(globals.data.ItemPresets[body.item_id]._items);
        body.item_id = inventoryItems[0]._id;
    } else if (body.tid === "579dc571d53a0658a154fbec") {
        let item = json.parse(json.read(db.user.cache.assort_579dc571d53a0658a154fbec)).data.items[body.item_id];
        inventoryItems = [{_id: body.item_id, _tpl: item._tpl}];
    } else {
        inventoryItems = trader_f.traderServer.getAssort(sessionID, body.tid).items;
    }

    for (let item of inventoryItems) {
        if (item._id === body.item_id) {
            let MaxStacks = 1;
            let StacksValue = [];
            let tmpItem = itm_hf.getItem(item._tpl)[1];

            // split stacks if the size is higher than allowed by StackMaxSize
            if (body.count > tmpItem._props.StackMaxSize) {
                let count = body.count;
                let calc = body.count - (Math.floor(body.count / tmpItem._props.StackMaxSize) * tmpItem._props.StackMaxSize);

                MaxStacks = (calc > 0) ? MaxStacks + Math.floor(count / tmpItem._props.StackMaxSize) : Math.floor(count / tmpItem._props.StackMaxSize);

                for (let sv = 0; sv < MaxStacks; sv++) {
                    if (count > 0) {
                        if (count > tmpItem._props.StackMaxSize) {
                            count = count - tmpItem._props.StackMaxSize;
                            StacksValue[sv] = tmpItem._props.StackMaxSize;
                        } else {
                            StacksValue[sv] = count;
                        }
                    }
                }
            } else {
                StacksValue[0] = body.count;
            }
            // stacks prepared

            for (let stacks = 0; stacks < MaxStacks; stacks++) {
                //update profile on each stack so stash recalculate will have new items
                pmcData = profile_f.profileServer.getPmcProfile(sessionID);

                let StashFS_2D = itm_hf.recheckInventoryFreeSpace(pmcData, sessionID);
                let ItemSize = itm_hf.getSize(item._tpl, item._id, inventoryItems);
                let tmpSizeX = ItemSize[0];
                let tmpSizeY = ItemSize[1];
                let rotation = false;
                let minVolume = (tmpSizeX < tmpSizeY ? tmpSizeX : tmpSizeY) - 1;
                let limitY = stashY - minVolume;
                let limitX = stashX - minVolume;

                addedProperly:
                    for (let y = 0; y < limitY; y++) {
                        for (let x = 0; x < limitX; x++) {
                            let badSlot = "no";
                            for (let itemY = 0; itemY < tmpSizeY; itemY++) {
                                if(badSlot === "no" && y + tmpSizeY - 1 > stashY - 1) {
                                    badSlot = "yes";
                                    break;
                                }

                                for (let itemX = 0; itemX < tmpSizeX; itemX++) {
                                    if(badSlot === "no" && x + tmpSizeX - 1 > stashX - 1) {
                                        badSlot = "yes";
                                        break;
                                    }

                                    if (StashFS_2D[y + itemY][x + itemX] !== 0) {
                                        badSlot = "yes";
                                        break;
                                    }
                                }

                                if (badSlot === "yes") {
                                    break;
                                }
                            }
                            
                            /**Try to rotate if there is enough room for the item
                             * Only occupies one grid of items, no rotation required
                             * */
                            if(badSlot === "yes" && tmpSizeX * tmpSizeY > 1) {
                                badSlot = "no";
                                for (let itemY = 0; itemY < tmpSizeX; itemY++) {
                                    if (badSlot === "no" && y + tmpSizeX - 1 > stashY - 1) {
                                        badSlot = "yes";
                                        break;
                                    }
                                    for (let itemX = 0; itemX < tmpSizeY; itemX++) {
                                        if (badSlot === "no" && x + tmpSizeY - 1 > stashX - 1) {
                                            badSlot = "yes";
                                            break;
                                        }

                                        if (StashFS_2D[y + itemY][x + itemX] !== 0) {
                                            badSlot = "yes";
                                            break;
                                        }
                                    }
    
                                    if (badSlot === "yes") {
                                        break;
                                    }
                                }

                                if (badSlot === "no") {
                                    rotation = true;
                                }
                            }

                            

                            if (badSlot === "yes") {
                                continue;
                            }

                            logger.logInfo(`Item placed at position [${x},${y}]`, "", "", true);
                            let newItem = utility.generateNewItemId();
                            let toDo = [[item._id, newItem]];
                            let upd = {"StackObjectsCount": StacksValue[stacks]};

                            // in case people want all items to be marked as found in raid
                            if (gameplayConfig.trading.buyItemsMarkedFound) {
                                foundInRaid = true;
                            }

                            // hideout items need to be marked as found in raid
                            if (foundInRaid) {
                                upd["SpawnedInSession"] = true;
                            }

                            output.items.new.push({
                                "_id": newItem,
                                "_tpl": item._tpl,
                                "parentId": pmcData.Inventory.stash,
                                "slotId": "hideout",
                                "location": {"x": x, "y": y, "r": rotation ? 1: 0},
                                "upd": upd
                            });

                            pmcData.Inventory.items.push({
                                "_id": newItem,
                                "_tpl": item._tpl,
                                "parentId": pmcData.Inventory.stash,
                                "slotId": "hideout",
                                "location": {"x": x, "y": y, "r": rotation ? 1: 0},
                                "upd": upd
                            });

                            // If this is an ammobox, add cartridges to it.
                            // Damaged ammo box are not loaded.
                            let ammoBoxInfo = tmpItem._props.StackSlots;
                            if (ammoBoxInfo !== undefined && tmpItem._name.indexOf("_damaged") < 0) {
                                // Cartridge info seems to be an array of size 1 for some reason... (See AmmoBox constructor in client code)
                                let maxCount = ammoBoxInfo[0]._max_count;
                                let ammoTmplId = ammoBoxInfo[0]._props.filters[0].Filter[0];
                                let ammoStackMaxSize = itm_hf.getItem(ammoTmplId)[1]._props.StackMaxSize;
                                let ammos = [];
                                let location = 0;

                                while(true) {
                                    let ammoStackSize = maxCount <= ammoStackMaxSize ? maxCount : ammoStackMaxSize;
                                    ammos.push({
                                        "_id": utility.generateNewItemId(),
                                        "_tpl": ammoTmplId,
                                        "parentId": toDo[0][1],
                                        "slotId": "cartridges",
                                        "location": location,
                                        "upd": {"StackObjectsCount": ammoStackSize}
                                    });

                                    location++;
                                    maxCount -= ammoStackMaxSize;
                                    if(maxCount <= 0) {
                                        break;
                                    }
                                }
                               
                                [output.items.new, pmcData.Inventory.items].forEach(x => x.push.apply(x, ammos));
                            }

                            while (true) {
                                if (toDo.length === 0) {
                                    break;
                                }

                                for (let tmpKey in inventoryItems) {
                                    if (inventoryItems[tmpKey].parentId && items[tmpKey].parentId === toDo[0][0]) {
                                        newItem = utility.generateNewItemId();

                                        let SlotID = inventoryItems[tmpKey].slotId;

                                        if (SlotID === "hideout") {
                                            output.items.new.push({
                                                "_id": newItem,
                                                "_tpl": inventoryItems[tmpKey]._tpl,
                                                "parentId": toDo[0][1],
                                                "slotId": SlotID,
                                                "location": {"x": x, "y": y, "r": "Horizontal"},
                                                "upd": upd
                                            });

                                            pmcData.Inventory.items.push({
                                                "_id": newItem,
                                                "_tpl": inventoryItems[tmpKey]._tpl,
                                                "parentId": toDo[0][1],
                                                "slotId": inventoryItems[tmpKey].slotId,
                                                "location": {"x": x, "y": y, "r": "Horizontal"},
                                                "upd": upd
                                            });
                                        } else {
                                            output.items.new.push({
                                                "_id": newItem,
                                                "_tpl": inventoryItems[tmpKey]._tpl,
                                                "parentId": toDo[0][1],
                                                "slotId": SlotID,
                                                "upd": upd
                                            });

                                            pmcData.Inventory.items.push({
                                                "_id": newItem,
                                                "_tpl": inventoryItems[tmpKey]._tpl,
                                                "parentId": toDo[0][1],
                                                "slotId": inventoryItems[tmpKey].slotId,
                                                "upd": upd
                                            });
                                        }

                                        toDo.push([inventoryItems[tmpKey]._id, newItem]);
                                    }
                                }

                                toDo.splice(0, 1);
                            }

                            break addedProperly;
                        }
                    }
            }

            return output;
        }
    }

    return "";
}

module.exports.moveItem = moveItem;
module.exports.removeItemFromProfile = removeItemFromProfile;
module.exports.removeItem = removeItem;
module.exports.discardItem = discardItem;
module.exports.splitItem = splitItem;
module.exports.mergeItem = mergeItem;
module.exports.transferItem = transferItem;
module.exports.swapItem = swapItem;
module.exports.addItem = addItem;
