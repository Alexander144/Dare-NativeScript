"use strict";
var firebase = require("nativescript-plugin-firebase");
var Friend = (function () {
    function Friend(Username, FriendsUsername, AreFriends) {
        this.Username = Username;
        this.FriendsUsername = FriendsUsername;
        this.AreFriends = AreFriends;
        this.Selected = false;
    }
    Friend.prototype.SetDate = function (Date) {
        this.Date = Date;
    };
    Friend.prototype.Done = function () {
        firebase.setValue("Users/" + this.Username + "/Friends/Accept/" + this.FriendsUsername, true);
        firebase.setValue("Users/" + this.FriendsUsername + "/Friends/Accept/" + this.Username, true);
        firebase.remove("Users/" + this.Username + "/Friends/Request/" + this.FriendsUsername);
    };
    Friend.prototype.Delete = function () {
        firebase.remove("Users/" + this.Username + "/Friends/Accept/" + this.FriendsUsername);
        firebase.remove("Users/" + this.FriendsUsername + "/Friends/Accept/" + this.Username);
    };
    Friend.prototype.Select = function () {
        this.Selected = !this.Selected;
        if (this.Selected == true) {
        }
        else {
        }
    };
    Friend.prototype.Send = function (InputDare) {
        firebase.push("Dares/" + this.FriendsUsername, { 'From': this.Username, 'Dare': InputDare });
        this.Selected = false;
    };
    return Friend;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Friend;
//# sourceMappingURL=Friend.js.map