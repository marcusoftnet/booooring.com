var app = require("koa")();
var route = require("koa-route");

// routes
app.use(route.get("/", function *(){ this.body = "Yup, it's working!"}));

// start it
app.listen(3000);
console.log("App listening... http://localhost:3000");