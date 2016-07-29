"use strict";
var Registrer_model_1 = require("./Registrer-model");
var model = new Registrer_model_1.default();
var PageLoaded = function (args) {
    var page = args.object;
    page.bindingContext = model;
};
exports.PageLoaded = PageLoaded;
//# sourceMappingURL=Registrer.js.map