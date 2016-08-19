"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var firebase = require("nativescript-plugin-firebase");
var Page = require("ui/frame");
var Dare_1 = require("../Class/Dare/Dare");
var self;
var MainModel = (function (_super) {
    __extends(MainModel, _super);
    function MainModel() {
        _super.call(this);
        this.Dares = new observable_array_1.ObservableArray();
        this.User = null;
    }
    MainModel.prototype.GetDares = function () {
        var onChildEvent = function (result) {
            if (result.type === "ChildChanged") {
                alert(result.key + JSON.stringify(result.value.Dare) + JSON.stringify(result.value.From));
            }
            if (result.type === "ChildAdded") {
                self.newDare(result.key, result.value.Dare, result.value.From);
            }
        };
        // listen to changes in the /users path
        this.path = "/Dares/" + this.User;
        firebase.addChildEventListener(onChildEvent, this.path);
        this.path = "";
    };
    MainModel.prototype.newDare = function (id, nDare, From) {
        this.Dares.push(new Dare_1.default(id, nDare, From));
    };
    MainModel.prototype.Send = function () {
        firebase.push("Dares/" + this.Username, { 'From': this.User, 'Dare': this.InputDare });
        this.set("Username", "");
        this.set("InputDare", "");
    };
    MainModel.prototype.SetApplication = function (Username) {
        self = this;
        this.User = Username;
        this.set("SUser", this.User);
        this.GetDares();
    };
    MainModel.prototype.Logout = function () {
        this.path = "";
        this.User = "";
        this.set("Username", "");
        this.set("InputDare", "");
        while (this.Dares.length > 0) {
            this.Dares.pop();
        }
        firebase.logout();
        Page.topmost().goBack();
    };
    return MainModel;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainModel;
//# sourceMappingURL=Main-Page-model.js.map