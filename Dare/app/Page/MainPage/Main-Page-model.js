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
        this.Score = 0;
        //Vet ikke om denne fungerer
        firebase.keepInSync("/Dares", // which path in your Firebase needs to be kept in sync?
        true // set to false to disable this feature again
        ).then(function () {
            console.log("firebase.keepInSync is ON for /Dares");
        }, function (error) {
            console.log("firebase.keepInSync error: " + error);
        });
    }
    MainModel.prototype.GetDares = function () {
        var path;
        var onChildEvent = function (result) {
            if (result.type === "ChildRemoved") {
                self.deleteDare(result.key);
            }
            if (result.type === "ChildAdded") {
                if (self.CheckIfDareAdded(result.key) == true) {
                    self.newDare(result.key, result.value.Dare, result.value.From);
                }
            }
        };
        // listen to changes in the /users path
        path = "/Dares/" + this.User;
        firebase.addChildEventListener(onChildEvent, path);
        path = "";
    };
    MainModel.prototype.CheckIfDareAdded = function (id) {
        var AddDare = true;
        for (var i = 0; i < this.Dares.length; i++) {
            if (this.Dares.getItem(i).Id === id) {
                AddDare = false;
            }
        }
        return AddDare;
    };
    MainModel.prototype.deleteDare = function (id) {
        this.SetScore();
        for (var i = 0; i < this.Dares.length; i++) {
            if (this.Dares.getItem(i).Id === id) {
                this.Dares.splice(i, 1);
                break;
            }
        }
    };
    MainModel.prototype.newDare = function (id, nDare, From) {
        this.Dares.push(new Dare_1.default(id, nDare, From, this.User));
    };
    MainModel.prototype.Send = function () {
        Page.topmost().navigate({
            moduleName: "Page/SendTo/SendTo",
            context: { Username: this.User, Dare: this.InputDare
            },
            transition: {
                name: "slideBottom",
                duration: 380,
                curve: "easeIn"
            },
            animated: true
        });
    };
    MainModel.prototype.SetApplication = function (Username) {
        self = this;
        this.User = Username;
        this.set("SUser", this.User);
        this.GetDares();
        this.GetScore();
    };
    MainModel.prototype.GetScore = function () {
        var onChildEvent = function (result) {
            self.SetUIScore(result.value);
        };
        var path = "/Users/" + this.User + "/Score";
        firebase.addValueEventListener(onChildEvent, path);
    };
    MainModel.prototype.SetUIScore = function (AScore) {
        this.set("Score", AScore);
    };
    MainModel.prototype.SetScore = function () {
        var adding = 10;
        var Result = this.Score;
        Result = Result + adding;
        firebase.update('/Users/' + this.User, { 'Score': Result });
    };
    MainModel.prototype.GoToFriends = function () {
        Page.topmost().navigate({
            moduleName: "Page/Friends/Friends",
            context: { Username: this.User
            },
            transition: {
                name: "slideBottom",
                duration: 380,
                curve: "easeIn"
            },
            animated: true
        });
    };
    MainModel.prototype.Logout = function () {
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