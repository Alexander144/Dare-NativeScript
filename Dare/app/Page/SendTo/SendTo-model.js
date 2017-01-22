"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var firebase = require("nativescript-plugin-firebase");
var Page = require("ui/frame");
var Friend_1 = require("../Class/Friend/Friend");
var self;
var MainModel = (function (_super) {
    __extends(MainModel, _super);
    function MainModel() {
        _super.call(this);
        this.Friends = new observable_array_1.ObservableArray();
        //Vet ikke om denne fungerer
        firebase.keepInSync("/Dares", // which path in your Firebase needs to be kept in sync?
        true // set to false to disable this feature again
        ).then(function () {
            console.log("firebase.keepInSync is ON for /Dares");
        }, function (error) {
            console.log("firebase.keepInSync error: " + error);
        });
    }
    MainModel.prototype.Send = function () {
        for (var i = 0; i < this.Friends.length; i++) {
            if (this.Friends.getItem(i).SelectedFriend === true) {
                this.Friends.getItem(i).Send(this.Dare);
            }
        }
        Page.topmost().goBack();
    };
    MainModel.prototype.SetApplication = function (Username, Dare) {
        self = this;
        this.User = Username;
        this.Dare = Dare;
        this.set("SUser", this.User);
        if (this.SetFriends(this.User)) {
            this.Friends.push(new Friend_1.default(this.User, this.User, true));
        }
        this.GetFriends();
    };
    MainModel.prototype.GetFriends = function () {
        var onChildEvent = function (result) {
            if (result.type === "ChildAdded") {
                if (self.SetFriends(result.key) == true) {
                    self.AddFriendsToList(result.key);
                }
            }
            if (result.type === "ChildRemoved") {
                self.DeleteFriend(result.key);
            }
        };
        var pathToFriends = "/Users/" + this.User + "/Friends/Accept";
        firebase.addChildEventListener(onChildEvent, pathToFriends);
    };
    MainModel.prototype.SetFriends = function (AFriend) {
        var AddFriend = true;
        //Kan bytte til .indexof. Søker igjennom array hvor elemente du vl ha ligger
        for (var i = 0; i < this.Friends.length; i++) {
            if (this.Friends.getItem(i).FriendsUsername === AFriend) {
                AddFriend = false;
            }
        }
        return AddFriend;
    };
    MainModel.prototype.AddFriendsToList = function (AFriend) {
        this.Friends.push(new Friend_1.default(this.User, AFriend, true));
    };
    MainModel.prototype.GoBack = function () {
        while (this.Friends.length > 0) {
            this.Friends.pop();
        }
        Page.topmost().goBack();
    };
    return MainModel;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainModel;
//# sourceMappingURL=SendTo-model.js.map