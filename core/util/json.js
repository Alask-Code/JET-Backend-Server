"use strict";

const fs = require('fs');

function createDir(file) {    
    let filePath = file.substr(0, file.lastIndexOf('/'));

    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
    }
}

function stringify(data, oneLiner = false) {
	if(oneLiner)
		return JSON.stringify(data);
    return JSON.stringify(data, null, "\t");
}

function parse(string) {
    return JSON.parse(string);
}

function read(file) {
    return fs.readFileSync(file, 'utf8');
}

function write(file, data) {
	if(file.indexOf('/') != -1)
		createDir(file);
    fs.writeFileSync(file, stringify(data), 'utf8');
}
function exist(file){
	return fs.existsSync(file);	
}

module.exports.exist = exist;
module.exports.stringify = stringify;
module.exports.parse = parse;
module.exports.read = read;
module.exports.write = write;