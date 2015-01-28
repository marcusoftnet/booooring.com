var render = require('../lib/render');

module.exports.showHomePage = function *(){ this.body = yield render('home'); };
module.exports.showDisclaimerPage = function *(){ this.body = yield render('disclaimer');};