var app = module.exports = require("koa")();
var route = require("koa-route");

// api routes
app.use(route.get("/api/sound/:filename" , streamFile));

// start it
app.listen(3000);
console.log("App listening... http://localhost:3000");

// handlers
var onFinished = require('finished');
var fs = require('fs');
var path = require('path');
var extname = path.extname;

function *streamFile(fileName){
	var path = __dirname + "/sounds/" + fileName + ".mp3";
	this.type = extname(path);

	var stream = this.body = fs.createReadStream(path);

	// avoid any possible fd leak
	onFinished(this, stream.destroy.bind(stream));
};
