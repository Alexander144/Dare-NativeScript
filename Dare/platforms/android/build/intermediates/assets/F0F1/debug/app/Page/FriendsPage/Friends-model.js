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
        this.FriendsAsk = new observable_array_1.ObservableArray();
        this.FriendsSearch = new observable_array_1.ObservableArray();
    }
    MainModel.prototype.SearchUser = function () {
        while (this.FriendsSearch.length > 0) {
            this.FriendsSearch.pop();
        }
        if (this.AddUser != null && this.AddUser != "") {
            var onChildEvent = function (result) {
                if (result.type === "ChildAdded") {
                    if (self.CheckUpUser(result.key) == true) {
                        self.AddSearchUser(result.key);
                    }
                }
            };
            // listen to changes in the /users path
            this.path = "/Users";
            firebase.addChildEventListener(onChildEvent, this.path);
        }
        else {
            alert("No element to search");
        }
    };
    MainModel.prototype.AddSearchUser = function (FriendsName) {
        this.FriendsSearch.push(new Friend_1.default(this.Username, FriendsName, false));
    };
    MainModel.prototype.CheckUpUser = function (FriendsName) {
        var ThisFriend;
        ThisFriend = new Array();
        for (var i = 0; i < this.AddUser.length; i++) {
            if (this.AddUser[i] == FriendsName[i]) {
                ThisFriend.push(true);
            }
            else {
                ThisFriend.push(false);
            }
        }
        for (var l = 0; l < ThisFriend.length; l++) {
            if (ThisFriend[l] == false) {
                return false;
            }
        }
        if (FriendsName == this.Username) {
            return false;
        }
        return true;
    };
    MainModel.prototype.AddThisUser = function () {
        var ThisAddUser = this.AddUser;
        var onUser = true;
        if (this.AddUser == null) {
            alert("Not a valid User");
        }
        else {
            var onChildEvent = function (result) {
                if (result.type === "ChildAdded") {
                    if (self.UserConfirmed(self.AddUser, result.key) == true) {
                        self.SendToUser(result.key);
                        onUser = false;
                        return;
                    }
                }
            };
            // listen to changes in the /users path
            this.path = "/Users";
            firebase.addChildEventListener(onChildEvent, this.path);
        }
    };
    MainModel.prototype.UserConfirmed = function (SearchUser, DatabaseUser) {
        if (SearchUser.toLocaleLowerCase() == DatabaseUser.toLocaleLowerCase() && SearchUser.toLocaleLowerCase() != this.Username.toLowerCase()) {
            return true;
        }
        else {
            return false;
        }
    };
    MainModel.prototype.SendToUser = function (ThisAddUser) {
        firebase.setValue("Users/" + ThisAddUser + "/Friends/Request/" + this.Username, false);
    };
    MainModel.prototype.GetDares = function () {
        var onChildEvent = function (result) {
            if (result.type === "ChildRemoved") {
                self.deleteDare(result.key);
            }
            if (result.type === "ChildAdded") {
                self.newDare(result.key, result.value.Dare, result.value.From);
            }
        };
        // listen to changes in the /users path
        this.path = "/Dares/" + this.Username;
        firebase.addChildEventListener(onChildEvent, this.path);
        this.path = "";
    };
    MainModel.prototype.Send = function () {
        firebase.push("Dares/" + this.Username, { 'From': this.Username, 'Dare': this.InputDare });
        this.set("Username", "");
        this.set("InputDare", "");
    };
    MainModel.prototype.SetApplication = function (Username) {
        self = this;
        this.Username = Username;
        this.set("GUIUser", this.Username);
        this.GetRequest();
        this.GetFriends();
    };
    MainModel.prototype.GetScore = function () {
        var onChildEvent = function (result) {
            self.SetUIScore(result.value);
        };
        var path = "/Users/" + this.Username + "/Score";
        firebase.addValueEventListener(onChildEvent, path);
    };
    MainModel.prototype.SetUIScore = function (AScore) {
        this.set("Score", AScore);
    };
    MainModel.prototype.SetScore = function () {
        var adding = 10;
        var Result = this.Score;
        Result = Result + adding;
        firebase.update('/Users/' + this.Username, { 'Score': Result });
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
        var path = "/Users/" + this.Username + "/Friends/Accept";
        firebase.addChildEventListener(onChildEvent, path);
    };
    MainModel.prototype.GetRequest = function () {
        var onChildEvent = function (result) {
            if (result.type === "ChildAdded") {
                self.SetRequest(result.key);
            }
            if (result.type === "ChildRemoved") {
                self.DeleteRequest(result.key);
            }
        };
        // listen to changes in the /users path
        this.path = "/Users/" + this.Username + "/Friends/Request";
        firebase.addChildEventListener(onChildEvent, this.path);
    };
    MainModel.prototype.SetRequest = function (friend) {
        this.FriendsAsk.push(new Friend_1.default(this.Username, friend, false));
    };
    MainModel.prototype.DeleteRequest = function (friend) {
        for (var i = 0; i < this.FriendsAsk.length; i++) {
            if (this.FriendsAsk.getItem(i).FriendsUsername.toLowerCase() === friend.toLowerCase()) {
                this.FriendsAsk.splice(i, 1);
            }
        }
    };
    MainModel.prototype.DeleteFriend = function (friend) {
        for (var i = 0; i < this.Friends.length; i++) {
            if (this.Friends.getItem(i).FriendsUsername.toLowerCase() === friend.toLowerCase()) {
                this.Friends.splice(i, 1);
            }
        }
    };
    MainModel.prototype.SetFriends = function (AFriend) {
        var AddFriend = true;
        for (var i = 0; i < this.Friends.length; i++) {
            if (this.Friends.getItem(i).FriendsUsername.toLowerCase() === AFriend.toLowerCase()) {
                AddFriend = false;
            }
        }
        return AddFriend;
    };
    MainModel.prototype.AddFriendsToList = function (AFriend) {
        this.Friends.push(new Friend_1.default(this.Username, AFriend, true));
    };
    MainModel.prototype.GoBack = function () {
        while (this.Friends.length > 0) {
            this.Friends.pop();
        }
        while (this.FriendsAsk.length > 0) {
            this.FriendsAsk.pop();
        }
        while (this.FriendsSearch.length > 0) {
            this.FriendsSearch.pop();
        }
        this.AddUser = null;
        this.Username = null;
        this.path = null;
        Page.topmost().goBack();
    };
    return MainModel;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainModel;
//# sourceMappingURL=Friends-model.js.map