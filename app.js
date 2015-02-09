var app = module.exports = require("koa")();
var route = require("koa-route");
var favicon = require('koa-favicon');
var serve = require('koa-static');
var config = require('./config')();

// configuration of middleware
app.use(serve(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

// routes
var apihandler = require("./routes/routesApi.js");
app.use(route.get("/api/sound/:soundName" , apihandler.streamFile));
app.use(route.post("/api/played/:soundName" , apihandler.soundPlayed));

var sitehandler = require("./routes/siteRoutes.js");
app.use(route.get("/" , sitehandler.showHomePage));
app.use(route.get("/disclaimer" , sitehandler.showDisclaimerPage));
app.use(route.get("/sound/:soundName" , sitehandler.showSoundPage));

// seed the database
if(process.argv[2] === 'seed'){
	console.log("Seeding database.... Seeeding it!")
	require("./test/testHelpers.js").seedDb();
};

// start it
app.listen(config.port);
console.log("The app is stared. Listening on port "+ config.port);
console.log("This is the configuration we're running:")
console.log(config)