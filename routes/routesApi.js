var onFinished = require('finished');
var fs = require('fs');
var path = require('path');
var extname = path.extname;
var config = require('../config')();
var db = require("../lib/db.js");
var soundCollection = db.sounds(config.mongoUrl);

module.exports.streamFile = function *(soundName){
	var path = __dirname + "/../sounds/" + soundName + ".mp3";
	this.type = extname(path);

	var stream = this.body = fs.createReadStream(path);

	// avoid any possible fd leak
	onFinished(this, stream.destroy.bind(stream));
};

module.exports.soundPlayed = function *(soundName) {
	var s = yield soundCollection.findAndModify({name: soundName}, { $inc: { noOfPlays : 1 }});

	this.status = 200;
};