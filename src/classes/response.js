"use strict"

function noBody(data)
{
    return utility.clearString(json.stringify(data));
}

function getBody(data, err = 0, errmsg = null) {
    return json.stringify({"err": err, "errmsg": errmsg, "data": data}, true);
}

function getUnclearedBody(data, err = 0, errmsg = null) {
    return json.stringify({"err": err, "errmsg": errmsg, "data": data});
}

function nullResponse() {
    return getBody(null);
}

function emptyArrayResponse() {
    return getBody([]);
}

module.exports.noBody = noBody;
module.exports.getBody = getBody;
module.exports.getUnclearedBody = getUnclearedBody;
module.exports.nullResponse = nullResponse;
module.exports.emptyArrayResponse = emptyArrayResponse;