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
        this.SelectedFriend = false;
        this.Color = "red";
    }
    Friend.prototype.Select = function () {
        this.SelectedFriend = !this.SelectedFriend;
        if (this.SelectedFriend == true) {
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
    Friend.prototype.SetDate = function (Date) {
        this.Date = Date;
    };
    Friend.prototype.AcceptFriendRequest = function () {
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
    Friend.prototype.Send = function (InputDare) {
        firebase.push("Dares/" + this.FriendsUsername, { 'From': this.Username, 'Dare': InputDare, 'Status': "Recived" });
        this.SelectedFriend = false;
        this.set("Color", "red");
    };
    Friend.prototype.GetUsername = function () {
        return this.FriendsUsername;
    };
    return Friend;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Friend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnJpZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRnJpZW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFPLFFBQVEsV0FBVyw4QkFBOEIsQ0FBQyxDQUFDO0FBQzFELDJCQUEwQixpQkFBaUIsQ0FBQyxDQUFBO0FBQzVDO0lBQXFCLDBCQUFVO0lBUTNCLGdCQUFZLFFBQWUsRUFBRSxlQUFzQixFQUFFLFVBQW1CO1FBQ3BFLGlCQUFPLENBQUM7UUFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUU1QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsdUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUUsQ0FBRSxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzVDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUvQixDQUFDO1FBQ0QsSUFBSSxDQUFBLENBQUM7WUFDRCxXQUFXO1lBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQztJQUNKLENBQUM7SUFFRCw0QkFBVyxHQUFYO1FBQ0ksSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxlQUFlLEdBQUMsbUJBQW1CLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0UsS0FBSyxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsd0JBQU8sR0FBUCxVQUFRLElBQVM7UUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsb0NBQW1CLEdBQW5CO1FBQ0ksSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN0QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsUUFBUSxHQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3hFLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxlQUFlLEdBQUMsa0JBQWtCLEVBQUcsU0FBUyxDQUFDLENBQUM7UUFDaEYsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxtQkFBbUIsR0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELHVCQUFNLEdBQU47UUFDSSxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsUUFBUSxHQUFDLGtCQUFrQixHQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRixRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsZUFBZSxHQUFDLGtCQUFrQixHQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBR0QscUJBQUksR0FBSixVQUFLLFNBQVM7UUFDVCxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsZUFBZSxFQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsNEJBQVcsR0FBWDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FBQyxBQWpFRCxDQUFxQix1QkFBVSxHQWlFOUI7QUFFRDtrQkFBZSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0eyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5jbGFzcyBGcmllbmQgZXh0ZW5kcyBPYnNlcnZhYmxle1xyXG4gICAgVXNlcm5hbWU6IHN0cmluZztcclxuICAgIEZyaWVuZHNVc2VybmFtZTogc3RyaW5nO1xyXG4gICAgQXJlRnJpZW5kczogYm9vbGVhbjtcclxuICAgIFNlbGVjdGVkRnJpZW5kOmJvb2xlYW47XHJcbiAgICBEYXRlOiBEYXRlO1xyXG4gICAgQ29sb3I6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihVc2VybmFtZTpzdHJpbmcsIEZyaWVuZHNVc2VybmFtZTpzdHJpbmcsIEFyZUZyaWVuZHM6IGJvb2xlYW4pe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICB0aGlzLlVzZXJuYW1lID0gVXNlcm5hbWU7XHJcbiAgICAgICB0aGlzLkZyaWVuZHNVc2VybmFtZSA9IEZyaWVuZHNVc2VybmFtZTtcclxuICAgICAgIHRoaXMuQXJlRnJpZW5kcyA9IEFyZUZyaWVuZHM7XHJcbiAgICAgICB0aGlzLlNlbGVjdGVkRnJpZW5kID0gZmFsc2U7XHJcbiAgICAgICBcclxuICAgICAgIHRoaXMuQ29sb3IgPSBcInJlZFwiO1xyXG4gICAgfVxyXG5cclxuICAgIFNlbGVjdCgpe1xyXG4gICAgICAgIHRoaXMuU2VsZWN0ZWRGcmllbmQgPSEgdGhpcy5TZWxlY3RlZEZyaWVuZDtcclxuICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRGcmllbmQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgdGhpcy5zZXQoXCJDb2xvclwiLCBcImdyZWVuXCIpO1xyXG4gICAgICAgICAgIC8vR2rDuHIgb20gdGlsIGVuIGFubmVuIGZhcmdlXHJcbiAgICAgICB9XHJcbiAgICAgICBlbHNle1xyXG4gICAgICAgICAgIC8vU2FtbWUgaGVyXHJcbiAgICAgICAgICAgdGhpcy5zZXQoXCJDb2xvclwiLCBcInJlZFwiKTtcclxuICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBTZW5kUmVxdWVzdCgpe1xyXG4gICAgICAgIHZhciBPVXNlcm5hbWUgPSB7fTtcclxuICAgICAgICBPVXNlcm5hbWVbdGhpcy5Vc2VybmFtZV0gPSBmYWxzZTtcclxuICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXCJVc2Vycy9cIit0aGlzLkZyaWVuZHNVc2VybmFtZStcIi9GcmllbmRzL1JlcXVlc3QvXCIsT1VzZXJuYW1lKTtcclxuICAgICAgICAgYWxlcnQoXCJTZW5kIGZyaWVuZCByZXF1ZXN0IHRvIFwiICsgdGhpcy5GcmllbmRzVXNlcm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIFNldERhdGUoRGF0ZTpEYXRlKXtcclxuICAgICAgICB0aGlzLkRhdGUgPSBEYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIEFjY2VwdEZyaWVuZFJlcXVlc3QoKXtcclxuICAgICAgICB2YXIgT1VzZXJuYW1lID0ge307XHJcbiAgICAgICAgT1VzZXJuYW1lW3RoaXMuVXNlcm5hbWVdID0gdHJ1ZTtcclxuICAgICAgICB2YXIgRlVzZXJuYW1lID0ge307XHJcbiAgICAgICAgRlVzZXJuYW1lW3RoaXMuRnJpZW5kc1VzZXJuYW1lXSA9IHRydWU7XHJcbiAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFwiVXNlcnMvXCIrdGhpcy5Vc2VybmFtZStcIi9GcmllbmRzL0FjY2VwdC9cIiwgRlVzZXJuYW1lKTtcclxuICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXCJVc2Vycy9cIit0aGlzLkZyaWVuZHNVc2VybmFtZStcIi9GcmllbmRzL0FjY2VwdC9cIiwgIE9Vc2VybmFtZSk7XHJcbiAgICAgICAgIGZpcmViYXNlLnJlbW92ZShcIlVzZXJzL1wiK3RoaXMuVXNlcm5hbWUrXCIvRnJpZW5kcy9SZXF1ZXN0L1wiK3RoaXMuRnJpZW5kc1VzZXJuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBEZWxldGUoKXtcclxuICAgICAgICBmaXJlYmFzZS5yZW1vdmUoXCJVc2Vycy9cIit0aGlzLlVzZXJuYW1lK1wiL0ZyaWVuZHMvQWNjZXB0L1wiK3RoaXMuRnJpZW5kc1VzZXJuYW1lKTtcclxuICAgICAgICBmaXJlYmFzZS5yZW1vdmUoXCJVc2Vycy9cIit0aGlzLkZyaWVuZHNVc2VybmFtZStcIi9GcmllbmRzL0FjY2VwdC9cIit0aGlzLlVzZXJuYW1lKTtcclxuICAgIH1cclxuICAgIFxyXG4gICBcclxuICAgIFNlbmQoSW5wdXREYXJlKXtcclxuICAgICAgICAgZmlyZWJhc2UucHVzaChcIkRhcmVzL1wiK3RoaXMuRnJpZW5kc1VzZXJuYW1lLHsnRnJvbSc6IHRoaXMuVXNlcm5hbWUsICdEYXJlJzpJbnB1dERhcmUsICdTdGF0dXMnOiBcIlJlY2l2ZWRcIn0pO1xyXG4gICAgICAgICB0aGlzLlNlbGVjdGVkRnJpZW5kID0gZmFsc2U7XHJcbiAgICAgICAgIHRoaXMuc2V0KFwiQ29sb3JcIiwgXCJyZWRcIik7XHJcbiAgICB9XHJcbiAgICBHZXRVc2VybmFtZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLkZyaWVuZHNVc2VybmFtZTtcclxuICAgIH1cclxufSBcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZyaWVuZDsiXX0=