"use strict";
var Friend = (function () {
    function Friend(Username, FriendsUsername, AreFriends) {
        this.Username = Username;
        this.FriendsUsername = FriendsUsername;
        this.AreFriends = AreFriends;
    }
    Friend.prototype.SetDate = function (Date) {
        this.Date = Date;
    };
    Friend.prototype.Done = function () {
    };
    return Friend;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Friend;
//# sourceMappingURL=Friend.js.map