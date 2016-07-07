"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var item_1 = require("./Class/item");
//import firebase = require("nativescript-plugin-firebase");
var IDareModel = (function (_super) {
    __extends(IDareModel, _super);
    function IDareModel() {
        _super.call(this);
        this.items = new observable_array_1.ObservableArray();
    }
    IDareModel.prototype.add = function () {
        this.items.push(new item_1.default(this.Add));
        this.set("Add", "");
    };
    return IDareModel;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IDareModel;
//# sourceMappingURL=login-model.js.map