var co = require('co');
var config = require('../config')('local');
var db = require("../lib/db.js");
var soundCollection = db.sounds(config.mongoUrl);

module.exports.removeAllDocs = function(done){
	co(function *(){
		yield soundCollection.remove({});
	})(done);
};

module.exports.seedDb = function () {
	co(function *() {
		yield [
			soundCollection.insert({ name: "booring", heading: "Boooring", description: "When this is just to booooring!"}),
			soundCollection.insert({ name: "slaves", heading: "Slave choir", description: "When it's just too much working"}),
			soundCollection.insert({ name: "slowclap", heading: "Slow clapping", description: "When something is a little bit pretentious"}),
			soundCollection.insert({ name: "soclose", heading: "So close", description: "When someone presented something that didn't really went down as planned"})
		];
	})();
};

var app = require('../app.js');
module.exports.request = require('supertest').agent(app.listen());