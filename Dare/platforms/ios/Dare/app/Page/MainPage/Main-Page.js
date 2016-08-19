"use strict";
var Main_Page_model_1 = require("./Main-Page-model");
var model = new Main_Page_model_1.default();
var PageLoaded = function (args) {
    //Henter siden
    var page = args.object;
    //binder variablene sammen
    page.bindingContext = model;
    //Henter data som har blitt sendt til siden
    var data = page.navigationContext;
    //Setter metoden fordi constructoren kjøres før jeg får satt verdien
    model.SetApplication(data.Username);
};
exports.PageLoaded = PageLoaded;
//# sourceMappingURL=Main-Page.js.map