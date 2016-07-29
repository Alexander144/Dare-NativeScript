"use strict";
var login_model_1 = require("./login-model");
var model = new login_model_1.default();
var PageLoaded = function (args) {
    var page = args.object;
    page.bindingContext = model;
};
exports.PageLoaded = PageLoaded;
//# sourceMappingURL=login.js.map