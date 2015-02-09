var render = require('../lib/render');
var config = require('../config')();
var db = require("../lib/db.js");
var soundCollection = db.sounds(config.mongoUrl);

module.exports.showDisclaimerPage = function *(){
	this.body = yield render('disclaimer');
};

module.exports.showHomePage = function *(){
	var soundList = yield soundCollection.find({}, { sort:{ noOfPlays : -1}});

	var noOfSounds = soundList.length;
	var totalNoOfPlays = sumNoOfPlays(soundList);

	this.body = yield render('home', { sounds : soundList, totalNoPlays : totalNoOfPlays });
};

module.exports.showSoundPage = function *(soundName) {
	var s = yield soundCollection.findOne({ name: soundName});

	if(this.query.autoplay){
		s.play = true;
	}

	this.body = yield render('sound', { sound : s });
};

function sumNoOfPlays (soundList) {
	var result =0;
	for (var i = 0; i < soundList.length; i++) {
		if(soundList[i].noOfPlays != undefined){
			result += soundList[i].noOfPlays;
		}
	};

	return result;
}