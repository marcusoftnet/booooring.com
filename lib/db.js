var monk = require('monk');
var wrap = require('co-monk');

module.exports.sounds = function (mongoUrl) {
	var db = monk(mongoUrl);
	return wrap(db.get('sounds'));
};