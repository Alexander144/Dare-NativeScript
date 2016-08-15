"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var firebase = require("nativescript-plugin-firebase");
var Dare_1 = require("../Class/Dare/Dare");
var M_Dare;
var self;
var MainModel = (function (_super) {
    __extends(MainModel, _super);
    function MainModel() {
        _super.call(this);
        this.Dares = new observable_array_1.ObservableArray();
        this.m_Dare = "læl";
        this.set("m_Dare", "lol");
        this.GetDares();
        self = this;
    }
    MainModel.prototype.GetDares = function () {
        var onChildEvent = function (result) {
            if (result.type === "ChildAdded" && result.type != "undefined") {
                console.log("Event type: " + result.type);
                console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value.Dare));
                alert(result.key + JSON.stringify(result.value.Dare) + JSON.stringify(result.value.From));
                self.newDare(result.key, result.value.Dare, result.value.From);
                //self.Dares.push(new Dare("lol","2323","2323"));
                self.set("m_Dare", "lol");
            }
        };
        // listen to changes in the /users path
        firebase.addChildEventListener(onChildEvent, "/Dares/Alexander144");
        //self.Dares.push(new Dare("1","lol","leel"));
        //this.Dares.push(new Dare("12","Eat", this.User));
    };
    MainModel.prototype.newDare = function (id, nDare, From) {
        this.Dares.push(new Dare_1.default(id, nDare, From));
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