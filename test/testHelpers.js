var co = require('co');
var config = require('../config')('local');
var db = require("../lib/db.js");
var soundCollection = db.sounds(config.mongoUrl);
module.exports.soundCollection = soundCollection;

module.exports.removeAllDocs = function(done){
	co(function *(){
		yield soundCollection.remove({});
	})(done);
};

var testSoundName = module.exports.testSoundName = "booooring";


module.exports.seedDb = function () {
	co(function *() {
		var data = require("./testData.json");
		for (var i = 0; i < data.length -1; i++) {
			yield soundCollection.insert(data[i]);
		};
	})();
};

var app = require('../app.js');
module.exports.request = require('supertest').agent(app.listen());