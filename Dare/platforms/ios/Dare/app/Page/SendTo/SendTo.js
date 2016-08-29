"use strict";
var SendTo_model_1 = require("./SendTo-model");
var model = new SendTo_model_1.default();
var PageLoaded = function (args) {
    //Henter siden
    var page = args.object;
    //binder variablene sammen
    page.bindingContext = model;
    //Henter data som har blitt sendt til siden
    var data = page.navigationContext;
    //Setter metoden fordi constructoren kjøres før jeg får satt verdien
    model.SetApplication(data.Username, data.Dare);
};
exports.PageLoaded = PageLoaded;
//# sourceMappingURL=SendTo.js.map