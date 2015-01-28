
var onFinished = require('finished');
var fs = require('fs');
var path = require('path');
var extname = path.extname;

module.exports.streamFile = function *(soundName){
	var path = __dirname + "/../sounds/" + soundName + ".mp3";
	this.type = extname(path);

	var stream = this.body = fs.createReadStream(path);

	// avoid any possible fd leak
	onFinished(this, stream.destroy.bind(stream));
};