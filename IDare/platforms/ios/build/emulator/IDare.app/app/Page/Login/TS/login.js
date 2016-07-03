"use strict";
var login_model_1 = require("./login-model");
var model = new login_model_1.default();
function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = model;
}
exports.onNavigatingTo = onNavigatingTo;
//# sourceMappingURL=login.js.map