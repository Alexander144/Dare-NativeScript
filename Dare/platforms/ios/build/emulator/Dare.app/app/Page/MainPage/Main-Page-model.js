"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var firebase = require("nativescript-plugin-firebase");
var Dare_1 = require("../Class/Dare/Dare");
var M_Dare;
var MainModel = (function (_super) {
    __extends(MainModel, _super);
    function MainModel() {
        _super.call(this);
        this.Dares = new observable_array_1.ObservableArray();
        this.GetDares();
    }
    MainModel.prototype.onChildEvent = function (result) {
        if (result.type === "ChildAdded" && result.type != "undefined") {
            console.log("Event type: " + result.type);
            console.log("Key: " + result.key);
            console.log("Value: " + JSON.stringify(result.value.Dare));
            this.m_Dare = JSON.stringify(result.value.Dare);
        }
    };
    MainModel.prototype.GetDares = function () {
        // listen to changes in the /users path
        firebase.addChildEventListener(this.onChildEvent, "/Dares/Lol12345");
        this.set('M_Dare', M_Dare);
        console.log("This is::::::" + M_Dare);
        this.Dares.push(new Dare_1.default("1", "lol", "leel"));
        //this.Dares.push(new Dare("12","Eat", this.User));
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