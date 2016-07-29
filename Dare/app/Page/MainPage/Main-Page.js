"use strict";
var Main_Page_model_1 = require("./Main-Page-model");
var model = new Main_Page_model_1.default();
var PageLoaded = function (args) {
    var page = args.object;
    page.bindingContext = model;
};
exports.PageLoaded = PageLoaded;
//# sourceMappingURL=Main-Page.js.map