"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var firebase = require("nativescript-plugin-firebase");
var Dare_1 = require("../Class/Dare/Dare");
var MainModel = (function (_super) {
    __extends(MainModel, _super);
    function MainModel() {
        _super.call(this);
        this.Dares = new observable_array_1.ObservableArray();
        this.GetDares();
    }
    MainModel.prototype.GetDares = function () {
        this.Dares.push(new Dare_1.default("12", "Eat", "Alexander144"));
    };
    MainModel.prototype.Send = function () {
        console.debug("Send");
        firebase.push("Dares/" + this.get("Username"), { 'From': "Username", 'Dare': this.get("InputDare") });
        this.set("Username", "");
        this.set("Dare", "");
    };
    MainModel.prototype.Logout = function () {
        firebase.logout();
    };
    return MainModel;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainModel;
//# sourceMappingURL=Main-Page-model.js.map