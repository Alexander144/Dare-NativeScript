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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnJpZW5kcy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZyaWVuZHMtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUEwQixpQkFBaUIsQ0FBQyxDQUFBO0FBQzVDLGlDQUFnQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sUUFBUSxXQUFXLDhCQUE4QixDQUFDLENBQUM7QUFHMUQsSUFBTyxJQUFJLFdBQVcsVUFBVSxDQUFDLENBQUM7QUFDbEMsdUJBQW1CLHdCQUF3QixDQUFDLENBQUE7QUFFM0MsSUFBSSxJQUFJLENBQUM7QUFDVjtJQUF3Qiw2QkFBVTtJQWU5QjtRQUVJLGlCQUFPLENBQUM7UUFFUixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksa0NBQWUsRUFBVSxDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxrQ0FBZSxFQUFVLENBQUM7UUFDaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGtDQUFlLEVBQVUsQ0FBQztJQUN2RCxDQUFDO0lBRUQsOEJBQVUsR0FBVjtRQUVJLE9BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUNuQyxDQUFDO1lBQ0csSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM3QixDQUFDO1FBRUQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FDOUMsQ0FBQztZQUNHLElBQUksWUFBWSxHQUFHLFVBQVMsTUFBVTtnQkFFdEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsQ0FDakMsQ0FBQztvQkFDTyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBRSxJQUFJLENBQUMsQ0FDdEMsQ0FBQzt3QkFDRyxJQUFJLENBQUMsYUFBYSxD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QixDQUFDO1FBRUQsT0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ2hDLENBQUM7WUFDRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFRCxPQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDbkMsQ0FBQztZQUNHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0IsQ0FBQztRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUwsZ0JBQUM7QUFBRCxDQUFDLEFBOVNELENBQXdCLHVCQUFVLEdBOFNqQztBQUVEO2tCQUFlLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0IHtFdmVudERhdGF9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuXHJcbmltcG9ydCBQYWdlID0gcmVxdWlyZShcInVpL2ZyYW1lXCIpO1xyXG5pbXBvcnQgRnJpZW5kIGZyb20gXCIuLi9DbGFzcy9GcmllbmQvRnJpZW5kXCI7XHJcblxyXG4gdmFyIHNlbGY7XHJcbmNsYXNzIE1haW5Nb2RlbCBleHRlbmRzIE9ic2VydmFibGV7XHJcbiAgIFxyXG4gICBVc2VybmFtZTogc3RyaW5nO1xyXG4gICBcclxuXHJcbiAgICBGcmllbmRzOiBPYnNlcnZhYmxlQXJyYXk8RnJpZW5kPjtcclxuICAgIEZyaWVuZHNBc2s6IE9ic2VydmFibGVBcnJheTxGcmllbmQ+O1xyXG4gICAgRnJpZW5kc1NlYXJjaDogT2JzZXJ2YWJsZUFycmF5PEZyaWVuZD47XHJcbiAgICBBZGRVc2VyOiBzdHJpbmc7XHJcbiAgICBJbnB1dERhcmU6IHN0cmluZztcclxuICAgIHBhdGg6IHN0cmluZztcclxuICAgIFNjb3JlOiBudW1iZXI7XHJcblxyXG4gICAgT2JzVXNlcjogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuRnJpZW5kcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8RnJpZW5kPigpO1xyXG4gICAgICAgIHRoaXMuRnJpZW5kc0FzayA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8RnJpZW5kPigpO1xyXG4gICAgICAgIHRoaXMuRnJpZW5kc1NlYXJjaCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8RnJpZW5kPigpO1xyXG4gICAgfVxyXG5cclxuICAgIFNlYXJjaFVzZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHdoaWxlKHRoaXMuRnJpZW5kc1NlYXJjaC5sZW5ndGggPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5GcmllbmRzU2VhcmNoLnBvcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5BZGRVc2VyICE9IG51bGwgJiYgdGhpcy5BZGRVc2VyICE9IFwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb25DaGlsZEV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0OmFueSkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC50eXBlID09PSBcIkNoaWxkQWRkZWRcIikgXHJcbiAgICAgICAgICAgIHsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuQ2hlY2tVcFVzZXIocmVzdWx0LmtleSk9PXRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkFkZFNlYXJjaFVzZXIocmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vIGxpc3RlbiB0byBjaGFuZ2VzIGluIHRoZSAvdXNlcnMgcGF0aFxyXG4gICAgICAgICAgICB0aGlzLnBhdGggPSBcIi9Vc2Vyc1wiO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5hZGRDaGlsZEV2ZW50TGlzdGVuZXIob25DaGlsZEV2ZW50LHRoaXMucGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiTm8gZWxlbWVudCB0byBzZWFyY2hcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFkZFNlYXJjaFVzZXIoRnJpZW5kc05hbWU6IHN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLkZyaWVuZHNTZWFyY2gucHVzaChuZXcgRnJpZW5kKHRoaXMuVXNlcm5hbWUsRnJpZW5kc05hbWUsZmFsc2UpKTtcclxuICAgIH1cclxuXHJcbiAgICBDaGVja1VwVXNlcihGcmllbmRzTmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IFRoaXNGcmllbmQ6QXJyYXk8Ym9vbGVhbj47XHJcbiAgICAgICAgIFRoaXNGcmllbmQgPSBuZXcgQXJyYXk8Ym9vbGVhbj4oKTtcclxuXHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGk8dGhpcy5BZGRVc2VyLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGlmKHRoaXMuQWRkVXNlcltpXSA9PSBGcmllbmRzTmFtZVtpXSlcclxuICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgVGhpc0ZyaWVuZC5wdXNoKHRydWUpO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgVGhpc0ZyaWVuZC5wdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIGwgPSAwOyBsPFRoaXNGcmllbmQubGVuZ3RoOyBsKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoVGhpc0ZyaWVuZFtsXSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihGcmllbmRzTmFtZSA9PSB0aGlzLlVzZXJuYW1lKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgQWRkVGhpc1VzZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBUaGlzQWRkVXNlciA9IHRoaXMuQWRkVXNlcjtcclxuICAgICAgICB2YXIgb25Vc2VyID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5BZGRVc2VyID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhbGVydChcIk5vdCBhIHZhbGlkIFVzZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvbkNoaWxkRXZlbnQgPSBmdW5jdGlvbihyZXN1bHQ6YW55KSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC50eXBlID09PSBcIkNoaWxkQWRkZWRcIikgXHJcbiAgICAgICAgICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5Vc2VyQ29uZmlybWVkKHNlbGYuQWRkVXNlciwgcmVzdWx0LmtleSkgPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuU2VuZFRvVXNlcihyZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Vc2VyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gbGlzdGVuIHRvIGNoYW5nZXMgaW4gdGhlIC91c2VycyBwYXRoXHJcbiAgICAgICAgICAgIHRoaXMucGF0aCA9IFwiL1VzZXJzXCI7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmFkZENoaWxkRXZlbnRMaXN0ZW5lcihvbkNoaWxkRXZlbnQsdGhpcy5wYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgVXNlckNvbmZpcm1lZChTZWFyY2hVc2VyOnN0cmluZywgRGF0YWJhc2VVc2VyOnN0cmluZyl7XHJcblxyXG4gICAgICAgIGlmKFNlYXJjaFVzZXIudG9Mb2NhbGVMb3dlckNhc2UoKSA9PSBEYXRhYmFzZVVzZXIudG9Mb2NhbGVMb3dlckNhc2UoKSYmU2VhcmNoVXNlci50b0xvY2FsZUxvd2VyQ2FzZSgpIT0gdGhpcy5Vc2VybmFtZS50b0xvd2VyQ2FzZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBTZW5kVG9Vc2VyKFRoaXNBZGRVc2VyOlN0cmluZylcclxuICAgIHtcclxuICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcIlVzZXJzL1wiK1RoaXNBZGRVc2VyK1wiL0ZyaWVuZHMvUmVxdWVzdC9cIit0aGlzLlVzZXJuYW1lICwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgR2V0RGFyZXMoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBvbkNoaWxkRXZlbnQgPSBmdW5jdGlvbihyZXN1bHQ6YW55KSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC50eXBlPT09XCJDaGlsZFJlbW92ZWRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kZWxldGVEYXJlKHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQudHlwZSA9PT0gXCJDaGlsZEFkZGVkXCIpIFxyXG4gICAgICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3RGFyZShyZXN1bHQua2V5LCByZXN1bHQudmFsdWUuRGFyZSwgcmVzdWx0LnZhbHVlLkZyb20pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxpc3RlbiB0byBjaGFuZ2VzIGluIHRoZSAvdXNlcnMgcGF0aFxyXG4gICAgICAgICAgICB0aGlzLnBhdGggPSBcIi9EYXJlcy9cIit0aGlzLlVzZXJuYW1lO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5hZGRDaGlsZEV2ZW50TGlzdGVuZXIob25DaGlsZEV2ZW50LHRoaXMucGF0aCk7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aCA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgU2VuZCgpXHJcbiAgICB7XHJcbiAgICAgICAgZmlyZWJhc2UucHVzaChcIkRhcmVzL1wiK3RoaXMuVXNlcm5hbWUseydGcm9tJzogdGhpcy5Vc2VybmFtZSwgJ0RhcmUnOnRoaXMuSW5wdXREYXJlfSk7XHJcbiAgICAgICAgdGhpcy5zZXQoXCJVc2VybmFtZVwiLFwiXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0KFwiSW5wdXREYXJlXCIsXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0QXBwbGljYXRpb24oVXNlcm5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuVXNlcm5hbWUgPSBVc2VybmFtZTtcclxuICAgICAgICB0aGlzLnNldChcIkdVSVVzZXJcIix0aGlzLlVzZXJuYW1lKTtcclxuICAgICAgICB0aGlzLkdldFJlcXVlc3QoKTtcclxuICAgICAgICB0aGlzLkdldEZyaWVuZHMoKTtcclxuICAgIH1cclxuIFxyXG4gICAgR2V0U2NvcmUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBvbkNoaWxkRXZlbnQgPSBmdW5jdGlvbihyZXN1bHQ6YW55KSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlbGYuU2V0VUlTY29yZShyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcGF0aCA9IFwiL1VzZXJzL1wiK3RoaXMuVXNlcm5hbWUgKyBcIi9TY29yZVwiO1xyXG4gICAgICAgIGZpcmViYXNlLmFkZFZhbHVlRXZlbnRMaXN0ZW5lcihvbkNoaWxkRXZlbnQscGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0VUlTY29yZShBU2NvcmU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2V0KFwiU2NvcmVcIiwgQVNjb3JlKTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRTY29yZSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGFkZGluZyA9IDEwO1xyXG4gICAgICAgIHZhciBSZXN1bHQgPSB0aGlzLlNjb3JlO1xyXG4gICAgICAgIFJlc3VsdCA9IFJlc3VsdCArIGFkZGluZztcclxuICAgICAgICAgIGZpcmViYXNlLnVwZGF0ZShcclxuICAgICAgICAgICAgJy9Vc2Vycy8nICsgdGhpcy5Vc2VybmFtZSxcclxuICAgICAgICAgICAgeydTY29yZSc6IFJlc3VsdH1cclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRGcmllbmRzKClcclxuICAgIHtcclxuICAgICAgICAgdmFyIG9uQ2hpbGRFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdDphbnkpIFxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC50eXBlID09PSBcIkNoaWxkQWRkZWRcIilcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHNlbGYuU2V0RnJpZW5kcyhyZXN1bHQua2V5KSA9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuQWRkRnJpZW5kc1RvTGlzdChyZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYocmVzdWx0LnR5cGUgPT09IFwiQ2hpbGRSZW1vdmVkXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuRGVsZXRlRnJpZW5kKHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwYXRoID0gXCIvVXNlcnMvXCIrdGhpcy5Vc2VybmFtZSArIFwiL0ZyaWVuZHMvQWNjZXB0XCI7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkQ2hpbGRFdmVudExpc3RlbmVyKG9uQ2hpbGRFdmVudCxwYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRSZXF1ZXN0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgb25DaGlsZEV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0OmFueSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihyZXN1bHQudHlwZSA9PT0gXCJDaGlsZEFkZGVkXCIpIFxyXG4gICAgICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgICAgICBzZWxmLlNldFJlcXVlc3QocmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQudHlwZSA9PT0gXCJDaGlsZFJlbW92ZWRcIikgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuRGVsZXRlUmVxdWVzdChyZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBsaXN0ZW4gdG8gY2hhbmdlcyBpbiB0aGUgL3VzZXJzIHBhdGhcclxuICAgICAgICB0aGlzLnBhdGggPSBcIi9Vc2Vycy9cIit0aGlzLlVzZXJuYW1lICtcIi9GcmllbmRzL1JlcXVlc3RcIjtcclxuICAgICAgICBmaXJlYmFzZS5hZGRDaGlsZEV2ZW50TGlzdGVuZXIob25DaGlsZEV2ZW50LHRoaXMucGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0UmVxdWVzdChmcmllbmQ6IHN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLkZyaWVuZHNBc2sucHVzaChuZXcgRnJpZW5kKHRoaXMuVXNlcm5hbWUsZnJpZW5kLGZhbHNlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgRGVsZXRlUmVxdWVzdChmcmllbmQ6IHN0cmluZylcclxuICAgIHtcclxuICAgICAgICAgZm9yICh2YXIgaT0wO2k8dGhpcy5GcmllbmRzQXNrLmxlbmd0aDtpKyspIFxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkZyaWVuZHNBc2suZ2V0SXRlbShpKS5GcmllbmRzVXNlcm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gZnJpZW5kLnRvTG93ZXJDYXNlKCkpIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIHRoaXMuRnJpZW5kc0Fzay5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBEZWxldGVGcmllbmQoZnJpZW5kOiBzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgIGZvciAodmFyIGk9MDtpPHRoaXMuRnJpZW5kcy5sZW5ndGg7aSsrKSBcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5GcmllbmRzLmdldEl0ZW0oaSkuRnJpZW5kc1VzZXJuYW1lLnRvTG93ZXJDYXNlKCkgPT09IGZyaWVuZC50b0xvd2VyQ2FzZSgpKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICB0aGlzLkZyaWVuZHMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgU2V0RnJpZW5kcyhBRnJpZW5kOiBzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIEFkZEZyaWVuZCA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgaT0wO2k8dGhpcy5GcmllbmRzLmxlbmd0aDtpKyspIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuRnJpZW5kcy5nZXRJdGVtKGkpLkZyaWVuZHNVc2VybmFtZS50b0xvd2VyQ2FzZSgpID09PSBBRnJpZW5kLnRvTG93ZXJDYXNlKCkpIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBBZGRGcmllbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQWRkRnJpZW5kO1xyXG4gICAgfVxyXG5cclxuICAgIEFkZEZyaWVuZHNUb0xpc3QoQUZyaWVuZDpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5GcmllbmRzLnB1c2gobmV3IEZyaWVuZCh0aGlzLlVzZXJuYW1lLCBBRnJpZW5kLCB0cnVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgR29CYWNrKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICB3aGlsZSh0aGlzLkZyaWVuZHMubGVuZ3RoID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRnJpZW5kcy5wb3AoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdoaWxlKHRoaXMuRnJpZW5kc0Fzay5sZW5ndGggPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5GcmllbmRzQXNrLnBvcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2hpbGUodGhpcy5GcmllbmRzU2VhcmNoLmxlbmd0aCA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkZyaWVuZHNTZWFyY2gucG9wKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkFkZFVzZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuVXNlcm5hbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucGF0aCA9IG51bGw7XHJcbiAgICAgICAgUGFnZS50b3Btb3N0KCkuZ29CYWNrKCk7XHJcbiAgICB9XHJcbiAgXHJcbn0gXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYWluTW9kZWw7Il19