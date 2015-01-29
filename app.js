var app = module.exports = require("koa")();
var route = require("koa-route");
var serve = require('koa-static');
var config = require('./config')();

// configuration of middleware
app.use(serve(__dirname + '/public'));

// routes
var apihandler = require("./routes/routesApi.js");
app.use(route.get("/api/sound/:soundName" , apihandler.streamFile));

var sitehandler = require("./routes/siteRoutes.js");
app.use(route.get("/" , sitehandler.showHomePage));
app.use(route.get("/disclaimer" , sitehandler.showDisclaimerPage));

// start it
app.listen(config.port);
console.log('listening on port '+ config.port);