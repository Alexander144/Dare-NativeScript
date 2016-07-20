"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var item_1 = require("./Class/item");
var firebase = require("nativescript-plugin-firebase");
var IDareModel = (function (_super) {
    __extends(IDareModel, _super);
    function IDareModel() {
        _super.call(this);
        this.items = new observable_array_1.ObservableArray();
    }
    IDareModel.prototype.add = function () {
        this.items.push(new item_1.default(this.Add));
        this.set("Add", "");
        //firebase.login({ type: firebase.LoginType.ANONYMOUS}).then((user) => {
        //    alert("UserID" + user.uid);
        //},(error) => {
        //    alert("Error" + error);
        firebase.push("https://idare-8f8b1.firebaseio.com/", "Hello");
    };
    return IDareModel;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IDareModel;
//# sourceMappingURL=login-model.js.map