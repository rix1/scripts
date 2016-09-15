"use strict";

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('source.json')
});

var regex = /\s/g;
var buff = "";

rl.on('line', (line) => {
	var res = line.replace(regex, "_");
	buff += res + '\n';
});

rl.on('pause', () => {
	fs.writeFile('./out.json', buff, (err) => {
		err && console.log(err);
		console.log("The file was saved");
	})
});