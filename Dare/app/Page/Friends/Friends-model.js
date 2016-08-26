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
        /*this.Dares = new ObservableArray<Dare>();
        this.User = null;
        this.Score = 0;
          firebase.keepInSync(
             "/Dares", // which path in your Firebase needs to be kept in sync?
             true      // set to false to disable this feature again
            ).then(
            () => {
                console.log("firebase.keepInSync is ON for /Dares");
            },
            (error) => {
            console.log("firebase.keepInSync error: " + error);
        });*/
    }
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
        if (SearchUser.toLocaleLowerCase() == DatabaseUser.toLocaleLowerCase() && SearchUser.toLocaleLowerCase() != this.User.toLowerCase()) {
            return true;
        }
        else {
            return false;
        }
    };
    MainModel.prototype.SendToUser = function (ThisAddUser) {
        firebase.setValue("Users/" + ThisAddUser + "/Wait/" + this.User, false);
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
        this.path = "/Dares/" + this.User;
        firebase.addChildEventListener(onChildEvent, this.path);
        this.path = "";
    };
    /*deleteDare(id:string){
        this.SetScore();
    for (var i=0;i<this.Dares.length;i++) {
        if (this.Dares.getItem(i).Id === id) {
        this.Dares.splice(i,1);
        break;
    }
  }
        this.Dares.sort
    }*/
    MainModel.prototype.Send = function () {
        firebase.push("Dares/" + this.Username, { 'From': this.User, 'Dare': this.InputDare });
        this.set("Username", "");
        this.set("InputDare", "");
    };
    MainModel.prototype.SetApplication = function (Username) {
        self = this;
        this.User = Username;
        this.set("SUser", this.User);
        //this.GetDares();
        //this.GetScore();
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
        alert(this.Score);
        firebase.update('/Users/' + this.User, { 'Score': Result });
    };
    MainModel.prototype.GetFriends = function () {
        var onChildEvent = function (result) {
            if (result.type === "ChildAdded") {
                if (self.SetFriends(result.value) == true) {
                    self.AddFriendsToList(result.value);
                }
            }
        };
        var path = "/Users/" + this.User + "/Friends/Accept";
        firebase.addChildEventListener(onChildEvent, path);
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
        this.Friends.push(new Friend_1.default(this.User, AFriend, true));
    };
    MainModel.prototype.GoBack = function () {
        while (this.Friends.length > 0) {
            this.Friends.pop();
        }
        while (this.FriendsAsk.length > 0) {
            this.FriendsAsk.pop();
        }
        this.AddUser = null;
        this.User = null;
        this.path = null;
        Page.topmost().goBack();
    };
    return MainModel;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainModel;
//# sourceMappingURL=Friends-model.js.map