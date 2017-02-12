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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VuZFRvLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2VuZFRvLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwyQkFBMEIsaUJBQWlCLENBQUMsQ0FBQTtBQUM1QyxpQ0FBZ0MsdUJBQXVCLENBQUMsQ0FBQTtBQUN4RCxJQUFPLFFBQVEsV0FBVyw4QkFBOEIsQ0FBQyxDQUFDO0FBSTFELElBQU8sSUFBSSxXQUFXLFVBQVUsQ0FBQyxDQUFDO0FBRWxDLHVCQUFtQix3QkFBd0IsQ0FBQyxDQUFBO0FBRTNDLElBQUksSUFBSSxDQUFDO0FBQ1Y7SUFBd0IsNkJBQVU7SUFPOUI7UUFDSSxpQkFBTyxDQUFDO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGtDQUFlLEVBQVUsQ0FBQztRQUM5Qyw0QkFBNEI7UUFDMUIsUUFBUSxDQUFDLFVBQVUsQ0FDaEIsUUFBUSxFQUFFLHdEQUF3RDtRQUNsRSxJQUFJLENBQU0sNkNBQTZDO1NBQ3ZELENBQUMsSUFBSSxDQUNOO1lBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQ3hELENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBRVgsQ0FBQztJQUVHLHdCQUFJLEdBQUo7UUFDSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElB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O0FBRUQ7a0JBQWUsU0FBUyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0eyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgbGlzdFBpY2tlck1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9saXN0LXBpY2tlclwiKTtcclxuaW1wb3J0IHtFdmVudERhdGF9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuXHJcbmltcG9ydCBQYWdlID0gcmVxdWlyZShcInVpL2ZyYW1lXCIpO1xyXG5pbXBvcnQgRGFyZSBmcm9tIFwiLi4vQ2xhc3MvRGFyZS9EYXJlXCI7XHJcbmltcG9ydCBGcmllbmQgZnJvbSBcIi4uL0NsYXNzL0ZyaWVuZC9GcmllbmRcIjtcclxuXHJcbiB2YXIgc2VsZjtcclxuY2xhc3MgTWFpbk1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZXtcclxuICAgIFVzZXI6IHN0cmluZztcclxuICAgIERhcmU6IHN0cmluZztcclxuICAgIGluZGV4OiBudW1iZXI7XHJcbiAgICBGcmllbmRzOiBPYnNlcnZhYmxlQXJyYXk8RnJpZW5kPjtcclxuICBcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgIHRoaXMuRnJpZW5kcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8RnJpZW5kPigpO1xyXG4gICAgICAgIC8vVmV0IGlra2Ugb20gZGVubmUgZnVuZ2VyZXJcclxuICAgICAgICAgIGZpcmViYXNlLmtlZXBJblN5bmMoXHJcbiAgICAgICAgICAgICBcIi9EYXJlc1wiLCAvLyB3aGljaCBwYXRoIGluIHlvdXIgRmlyZWJhc2UgbmVlZHMgdG8gYmUga2VwdCBpbiBzeW5jP1xyXG4gICAgICAgICAgICAgdHJ1ZSAgICAgIC8vIHNldCB0byBmYWxzZSB0byBkaXNhYmxlIHRoaXMgZmVhdHVyZSBhZ2FpblxyXG4gICAgICAgICAgICApLnRoZW4oXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlyZWJhc2Uua2VlcEluU3luYyBpcyBPTiBmb3IgL0RhcmVzXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaXJlYmFzZS5rZWVwSW5TeW5jIGVycm9yOiBcIiArIGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxufVxyXG5cclxuICAgIFNlbmQoKXtcclxuICAgICAgICAgZm9yICh2YXIgaT0wO2k8dGhpcy5GcmllbmRzLmxlbmd0aDtpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuRnJpZW5kcy5nZXRJdGVtKGkpLlNlbGVjdGVkRnJpZW5kID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkZyaWVuZHMuZ2V0SXRlbShpKS5TZW5kKHRoaXMuRGFyZSk7XHJcbiAgICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFBhZ2UudG9wbW9zdCgpLmdvQmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIFNldEFwcGxpY2F0aW9uKFVzZXJuYW1lOnN0cmluZywgRGFyZTpzdHJpbmcpe1xyXG4gICAgICAgIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuVXNlciA9IFVzZXJuYW1lO1xyXG4gICAgICAgIHRoaXMuRGFyZSA9IERhcmU7XHJcbiAgICAgICAgdGhpcy5zZXQoXCJTVXNlclwiLHRoaXMuVXNlcik7XHJcbiAgICAgICAgaWYodGhpcy5TZXRGcmllbmRzKHRoaXMuVXNlcikpe1xyXG4gICAgICAgICAgICB0aGlzLkZyaWVuZHMucHVzaChuZXcgRnJpZW5kKHRoaXMuVXNlcix0aGlzLlVzZXIsdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkdldEZyaWVuZHMoKTtcclxuICAgIH1cclxuICAgIEdldEZyaWVuZHMoKXtcclxuICAgICAgICAgICB2YXIgb25DaGlsZEV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0OmFueSkge1xyXG4gICAgICAgICAgICAgaWYocmVzdWx0LnR5cGUgPT09IFwiQ2hpbGRBZGRlZFwiKXtcclxuICAgICAgICAgICAgICAgICBpZihzZWxmLlNldEZyaWVuZHMocmVzdWx0LmtleSkgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5BZGRGcmllbmRzVG9MaXN0KHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZihyZXN1bHQudHlwZSA9PT0gXCJDaGlsZFJlbW92ZWRcIil7XHJcbiAgICAgICAgICAgICAgICAgIHNlbGYuRGVsZXRlRnJpZW5kKHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgICAgICBsZXQgcGF0aFRvRnJpZW5kcyA9IFwiL1VzZXJzL1wiK3RoaXMuVXNlciArIFwiL0ZyaWVuZHMvQWNjZXB0XCI7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkQ2hpbGRFdmVudExpc3RlbmVyKG9uQ2hpbGRFdmVudCxwYXRoVG9GcmllbmRzKTtcclxuICAgIH1cclxuICAgIFNldEZyaWVuZHMoQUZyaWVuZDogc3RyaW5nKXtcclxuICAgIHZhciBBZGRGcmllbmQgPSB0cnVlO1xyXG4gICAgLy9LYW4gYnl0dGUgdGlsIC5pbmRleG9mLiBTw7hrZXIgaWdqZW5ub20gYXJyYXkgaHZvciBlbGVtZW50ZSBkdSB2bCBoYSBsaWdnZXJcclxuICAgIGZvciAodmFyIGk9MDtpPHRoaXMuRnJpZW5kcy5sZW5ndGg7aSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkZyaWVuZHMuZ2V0SXRlbShpKS5GcmllbmRzVXNlcm5hbWUgPT09IEFGcmllbmQpIHtcclxuICAgICAgICAgICAgICAgIEFkZEZyaWVuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQWRkRnJpZW5kO1xyXG4gICAgfVxyXG4gICAgQWRkRnJpZW5kc1RvTGlzdChBRnJpZW5kOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5GcmllbmRzLnB1c2gobmV3IEZyaWVuZCh0aGlzLlVzZXIsQUZyaWVuZCx0cnVlKSk7XHJcbiAgICB9XHJcblxyXG4gIFxyXG4gICBHb0JhY2soKXtcclxuICAgICAgICAgd2hpbGUodGhpcy5GcmllbmRzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLkZyaWVuZHMucG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICBQYWdlLnRvcG1vc3QoKS5nb0JhY2soKTtcclxuICAgIH1cclxuICBcclxufSBcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1haW5Nb2RlbDsiXX0=