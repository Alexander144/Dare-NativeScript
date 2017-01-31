"use strict";
var ViktorPage_model_1 = require("./ViktorPage-model");
var model = new ViktorPage_model_1.default();
var PageLoaded = function (args) {
    var page = args.object;
    page.bindingContext = model;
};
exports.PageLoaded = PageLoaded;
//# sourceMappingURL=ViktorPage.js.map