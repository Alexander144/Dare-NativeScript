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
        var onChildEvent = function (result) {
            var matches = [];
            if (result.type === "ChildAdded") {
                this.Dares.push(new Dare_1.default("", result.Dare, result.From));
            }
            else if (result.type === "ChildRemoved") {
                matches.push(result);
                matches.forEach(function (match) {
                    var index = this.Dares.indexOf(match);
                    this.Dares.splice(index, 1);
                });
            }
        };
        return firebase.addChildEventListener(onChildEvent, "/Dares/Lol12345").then(function () {
            console.log("firebase.addChildEventListener added");
        }, function (error) {
            console.log("firebase.addChildEventListener error: " + error);
        });
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