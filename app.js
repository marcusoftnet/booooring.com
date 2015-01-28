var app = module.exports = require("koa")();
var route = require("koa-route");
var serve = require('koa-static');

// configuration of middleware
app.use(serve(__dirname + '/public'));

// routes
var apihandler = require("./routes/routesApi.js");
app.use(route.get("/api/sound/:soundName" , apihandler.streamFile));

var sitehandler = require("./routes/siteRoutes.js");
app.use(route.get("/" , sitehandler.showHomePage));
app.use(route.get("/disclaimer" , sitehandler.showDisclaimerPage));



// start it
app.listen(3000);
console.log("App listening... http://localhost:3000");

