"use strict";
var TempPage_model_1 = require("./TempPage-model");
var model = new TempPage_model_1.default();
var PageLoaded = function (args) {
    var page = args.object;
    page.bindingContext = model;
};
exports.PageLoaded = PageLoaded;
//# sourceMappingURL=TempPage.js.map