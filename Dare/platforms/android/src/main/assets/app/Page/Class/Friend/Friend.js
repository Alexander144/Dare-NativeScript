"use strict";
var firebase = require("nativescript-plugin-firebase");
var observable_1 = require("data/observable");
var Friend = (function (_super) {
    __extends(Friend, _super);
    function Friend(Username, FriendsUsername, AreFriends) {
        _super.call(this);
        this.Username = Username;
        this.FriendsUsername = FriendsUsername;
        this.AreFriends = AreFriends;
        this.Selected = false;
        this.Color = "red";
    }
    Friend.prototype.SetDate = function (Date) {
        this.Date = Date;
    };
    Friend.prototype.Done = function () {
        var OUsername = {};
        OUsername[this.Username] = true;
        var FUsername = {};
        FUsername[this.FriendsUsername] = true;
        firebase.setValue("Users/" + this.Username + "/Friends/Accept/", FUsername);
        firebase.setValue("Users/" + this.FriendsUsername + "/Friends/Accept/", OUsername);
        firebase.remove("Users/" + this.Username + "/Friends/Request/" + this.FriendsUsername);
    };
    Friend.prototype.Delete = function () {
        firebase.remove("Users/" + this.Username + "/Friends/Accept/" + this.FriendsUsername);
        firebase.remove("Users/" + this.FriendsUsername + "/Friends/Accept/" + this.Username);
    };
    Friend.prototype.Select = function () {
        this.Selected = !this.Selected;
        if (this.Selected == true) {
            this.set("Color", "green");
        }
        else {
            //Samme her
            this.set("Color", "red");
        }
    };
    Friend.prototype.SendRequest = function () {
        var OUsername = {};
        OUsername[this.Username] = false;
        firebase.setValue("Users/" + this.FriendsUsername + "/Friends/Request/", OUsername);
        alert("Send friend request to " + this.FriendsUsername);
    };
    Friend.prototype.Send = function (InputDare) {
        firebase.push("Dares/" + this.FriendsUsername, { 'From': this.Username, 'Dare': InputDare });
        this.Selected = false;
        this.set("Color", "red");
    };
    return Friend;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Friend;
//# sourceMappingURL=Friend.js.map