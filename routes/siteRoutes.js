var render = require('../lib/render');
var config = require('../config')();
var db = require("../lib/db.js");
var soundCollection = db.sounds(config.mongoUrl);

module.exports.showDisclaimerPage = function *(){ this.body = yield render('disclaimer');};

module.exports.showHomePage = function *(){
	var soundList = yield soundCollection.find({});
	this.body = yield render('home', { sounds : soundList });
};

module.exports.showSoundPage = function *(soundName) {
	var s = yield soundCollection.findOne({ name: "booooring"});
	this.body = yield render('sound', { sound : s });
};
