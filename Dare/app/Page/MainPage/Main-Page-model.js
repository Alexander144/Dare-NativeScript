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
        this.Image = "https://1.bp.blogspot.com/-YIfQT6q8ZM4/Vzyq5z1B8HI/AAAAAAAAAAc/UmWSSMLKtKgtH7CACElUp12zXkrPK5UoACLcB/s1600/image00.png";
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
                self.DeleteDare(result.key);
            }
            if (result.type === "ChildAdded") {
                if (self.CheckIfDareAdded(result.key) == true) {
                    self.NewDare(result.key, result.value.Dare, result.value.From);
                }
            }
        };
        // listen to changes in the /users path
        path = "/Dares/" + this.User;
        firebase.addChildEventListener(onChildEvent, path);
        path = "";
    };
    MainModel.prototype.GetScore = function () {
        var onChildEvent = function (result) {
            self.SetUIScore(result.value);
        };
        var path = "/Users/" + this.User + "/Score";
        firebase.addValueEventListener(onChildEvent, path);
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
    MainModel.prototype.DeleteDare = function (id) {
        this.SetScore();
        for (var i = 0; i < this.Dares.length; i++) {
            if (this.Dares.getItem(i).Id === id) {
                this.Dares.splice(i, 1);
                break;
            }
        }
    };
    MainModel.prototype.NewDare = function (id, nDare, From) {
        this.Dares.push(new Dare_1.default(id, nDare, From, this.User));
    };
    MainModel.prototype.SendDare = function () {
        firebase.uploadFile({
            // the full path of the file in your Firebase storage (folders will be created)
            remoteFullPath: 'uploads/images/telerik-logo-uploaded.png',
            // option 2: a full file path (ignored if 'localFile' is set)
            localFullPath: this.Image,
            // get notified of file upload progress
            onProgress: function (status) {
                console.log("Uploaded fraction: " + status.fractionCompleted);
                console.log("Percentage complete: " + status.percentageCompleted);
            }
        }).then(function (uploadedFile) {
            console.log("File uploaded: " + JSON.stringify(uploadedFile));
        }, function (error) {
            console.log("firebase.keepInSync error: " + error);
        });
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
        this.set("GUIUser", this.User);
        this.GetDares();
        this.GetScore();
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
    MainModel.prototype.GoToFriendsPage = function () {
        Page.topmost().navigate({
            moduleName: "Page/FriendsPage/Friends",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbi1QYWdlLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTWFpbi1QYWdlLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwyQkFBMEIsaUJBQWlCLENBQUMsQ0FBQTtBQUM1QyxpQ0FBZ0MsdUJBQXVCLENBQUMsQ0FBQTtBQUN4RCxJQUFPLFFBQVEsV0FBVyw4QkFBOEIsQ0FBQyxDQUFDO0FBSTFELElBQU8sSUFBSSxXQUFXLFVBQVUsQ0FBQyxDQUFDO0FBQ2xDLHFCQUFpQixvQkFBb0IsQ0FBQyxDQUFBO0FBRXJDLElBQUksSUFBSSxDQUFDO0FBQ1Y7SUFBd0IsNkJBQVU7SUFROUI7UUFFSSxpQkFBTyxDQUFDO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGtDQUFlLEVBQVEsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsd0hBQXdILENBQUM7UUFFdEksNEJBQTRCO1FBQzFCLFFBQVEsQ0FBQyxVQUFVLENBQ2hCLFFBQVEsRUFBRSx3REFBd0Q7UUFDbEUsSUFBSSxDQUFNLDZDQUE2QztTQUN2RCxDQUFDLElBQUksQ0FDTjtZQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUN4RCxDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFRCw0QkFBUSxHQUFSO1FBRUksSUFBSSxJQUFZLENBQUM7UUFDakIsSUFBSSxZQUFZLEdBQUcsVUFBUyxNQUFVO1lBRWxDLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUcsY0FBYyxDQUFDLENBQ2hDLENBQUM7Z0JBQ0csSUFBSSxDQUFDLFVBQVUsQ0FBQyxN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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnR7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmltcG9ydCBsaXN0UGlja2VyTW9kdWxlID0gcmVxdWlyZShcInVpL2xpc3QtcGlja2VyXCIpO1xyXG5pbXBvcnQge0V2ZW50RGF0YX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5cclxuaW1wb3J0IFBhZ2UgPSByZXF1aXJlKFwidWkvZnJhbWVcIik7XHJcbmltcG9ydCBEYXJlIGZyb20gXCIuLi9DbGFzcy9EYXJlL0RhcmVcIjtcclxuXHJcbiB2YXIgc2VsZjtcclxuY2xhc3MgTWFpbk1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZXtcclxuICAgIERhcmVzOiBPYnNlcnZhYmxlQXJyYXk8RGFyZT47XHJcbiAgICBVc2VyOiBzdHJpbmc7XHJcbiAgICBVc2VybmFtZTogc3RyaW5nO1xyXG4gICAgSW5wdXREYXJlOiBzdHJpbmc7XHJcbiAgICBTY29yZTogbnVtYmVyO1xyXG4gICAgSW1hZ2U6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkRhcmVzID0gbmV3IE9ic2VydmFibGVBcnJheTxEYXJlPigpO1xyXG4gICAgICAgIHRoaXMuVXNlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5TY29yZSA9IDA7XHJcbiAgICAgICAgdGhpcy5JbWFnZSA9IFwiaHR0cHM6Ly8xLmJwLmJsb2dzcG90LmNvbS8tWUlmUVQ2cThaTTQvVnp5cTV6MUI4SEkvQUFBQUFBQUFBQWMvVW1XU1NNTEt0S2d0SDdDQUNFbFVwMTJ6WGtyUEs1VW9BQ0xjQi9zMTYwMC9pbWFnZTAwLnBuZ1wiO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WZXQgaWtrZSBvbSBkZW5uZSBmdW5nZXJlclxyXG4gICAgICAgICAgZmlyZWJhc2Uua2VlcEluU3luYyhcclxuICAgICAgICAgICAgIFwiL0RhcmVzXCIsIC8vIHdoaWNoIHBhdGggaW4geW91ciBGaXJlYmFzZSBuZWVkcyB0byBiZSBrZXB0IGluIHN5bmM/XHJcbiAgICAgICAgICAgICB0cnVlICAgICAgLy8gc2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgdGhpcyBmZWF0dXJlIGFnYWluXHJcbiAgICAgICAgICAgICkudGhlbihcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaXJlYmFzZS5rZWVwSW5TeW5jIGlzIE9OIGZvciAvRGFyZXNcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpcmViYXNlLmtlZXBJblN5bmMgZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBHZXREYXJlcygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHBhdGg6IHN0cmluZztcclxuICAgICAgICB2YXIgb25DaGlsZEV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0OmFueSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihyZXN1bHQudHlwZT09PVwiQ2hpbGRSZW1vdmVkXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuRGVsZXRlRGFyZShyZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVzdWx0LnR5cGUgPT09IFwiQ2hpbGRBZGRlZFwiKSBcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHNlbGYuQ2hlY2tJZkRhcmVBZGRlZChyZXN1bHQua2V5KSA9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5OZXdEYXJlKHJlc3VsdC5rZXksIHJlc3VsdC52YWx1ZS5EYXJlLCByZXN1bHQudmFsdWUuRnJvbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGxpc3RlbiB0byBjaGFuZ2VzIGluIHRoZSAvdXNlcnMgcGF0aFxyXG4gICAgICAgICAgICBwYXRoID0gXCIvRGFyZXMvXCIrdGhpcy5Vc2VyO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5hZGRDaGlsZEV2ZW50TGlzdGVuZXIob25DaGlsZEV2ZW50LHBhdGgpO1xyXG4gICAgICAgICAgICBwYXRoID0gXCJcIjtcclxuICAgIH1cclxuICAgIEdldFNjb3JlKClcclxuICAgIHsgICAgXHJcbiAgICAgICAgdmFyIG9uQ2hpbGRFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdDphbnkpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2VsZi5TZXRVSVNjb3JlKHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwYXRoID0gXCIvVXNlcnMvXCIrdGhpcy5Vc2VyICsgXCIvU2NvcmVcIjtcclxuICAgICAgICBmaXJlYmFzZS5hZGRWYWx1ZUV2ZW50TGlzdGVuZXIob25DaGlsZEV2ZW50LHBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIENoZWNrSWZEYXJlQWRkZWQoaWQ6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBBZGREYXJlID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciBpPTA7aTx0aGlzLkRhcmVzLmxlbmd0aDtpKyspIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuRGFyZXMuZ2V0SXRlbShpKS5JZCA9PT0gaWQpIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBBZGREYXJlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFkZERhcmU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIERlbGV0ZURhcmUoaWQ6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU2V0U2NvcmUoKTtcclxuICAgICAgICBmb3IgKHZhciBpPTA7aTx0aGlzLkRhcmVzLmxlbmd0aDtpKyspIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuRGFyZXMuZ2V0SXRlbShpKS5JZCA9PT0gaWQpIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRhcmVzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgTmV3RGFyZShpZDpzdHJpbmcsIG5EYXJlOnN0cmluZywgRnJvbTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5EYXJlcy5wdXNoKG5ldyBEYXJlKGlkLG5EYXJlLEZyb20sdGhpcy5Vc2VyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgU2VuZERhcmUoKVxyXG4gICAgeyBcclxuICAgICAgICBmaXJlYmFzZS51cGxvYWRGaWxlKHtcclxuICAgICAgICAvLyB0aGUgZnVsbCBwYXRoIG9mIHRoZSBmaWxlIGluIHlvdXIgRmlyZWJhc2Ugc3RvcmFnZSAoZm9sZGVycyB3aWxsIGJlIGNyZWF0ZWQpXHJcbiAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICd1cGxvYWRzL2ltYWdlcy90ZWxlcmlrLWxvZ28tdXBsb2FkZWQucG5nJyxcclxuICAgICAgICAvLyBvcHRpb24gMjogYSBmdWxsIGZpbGUgcGF0aCAoaWdub3JlZCBpZiAnbG9jYWxGaWxlJyBpcyBzZXQpXHJcbiAgICAgICAgbG9jYWxGdWxsUGF0aDogdGhpcy5JbWFnZSxcclxuICAgICAgICAvLyBnZXQgbm90aWZpZWQgb2YgZmlsZSB1cGxvYWQgcHJvZ3Jlc3NcclxuICAgICAgICBvblByb2dyZXNzOiBmdW5jdGlvbihzdGF0dXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBsb2FkZWQgZnJhY3Rpb246IFwiICsgc3RhdHVzLmZyYWN0aW9uQ29tcGxldGVkKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVyY2VudGFnZSBjb21wbGV0ZTogXCIgKyBzdGF0dXMucGVyY2VudGFnZUNvbXBsZXRlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICAodXBsb2FkZWRGaWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIHVwbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHVwbG9hZGVkRmlsZSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaXJlYmFzZS5rZWVwSW5TeW5jIGVycm9yOiBcIiArIGVycm9yKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgUGFnZS50b3Btb3N0KCkubmF2aWdhdGUoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2R1bGVOYW1lOiBcIlBhZ2UvU2VuZFRvL1NlbmRUb1wiLFxyXG4gICAgICAgICAgICBjb250ZXh0OntVc2VybmFtZTogdGhpcy5Vc2VyLCBEYXJlOnRoaXMuSW5wdXREYXJlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVCb3R0b21cIixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzODAsXHJcbiAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlSW5cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRlZDogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIFNldEFwcGxpY2F0aW9uKFVzZXJuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLlVzZXIgPSBVc2VybmFtZTtcclxuICAgICAgICB0aGlzLnNldChcIkdVSVVzZXJcIix0aGlzLlVzZXIpO1xyXG4gICAgICAgIHRoaXMuR2V0RGFyZXMoKTtcclxuICAgICAgICB0aGlzLkdldFNjb3JlKCk7XHJcbiAgICB9XHJcblxyXG4gIFxyXG4gICAgU2V0VUlTY29yZShBU2NvcmU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2V0KFwiU2NvcmVcIiwgQVNjb3JlKTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRTY29yZSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGFkZGluZyA9IDEwO1xyXG4gICAgICAgIHZhciBSZXN1bHQgPSB0aGlzLlNjb3JlO1xyXG4gICAgICAgXHJcbiAgICAgICAgUmVzdWx0ID0gUmVzdWx0ICsgYWRkaW5nO1xyXG4gICAgICAgIGZpcmViYXNlLnVwZGF0ZShcclxuICAgICAgICAgICAgJy9Vc2Vycy8nICsgdGhpcy5Vc2VyLFxyXG4gICAgICAgICAgICB7J1Njb3JlJzogUmVzdWx0fVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgR29Ub0ZyaWVuZHNQYWdlKClcclxuICAgIHtcclxuICAgICAgICBQYWdlLnRvcG1vc3QoKS5uYXZpZ2F0ZShcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZHVsZU5hbWU6IFwiUGFnZS9GcmllbmRzUGFnZS9GcmllbmRzXCIsXHJcbiAgICAgICAgICAgICBjb250ZXh0OntVc2VybmFtZTogdGhpcy5Vc2VyXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlQm90dG9tXCIsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzgwLFxyXG4gICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZUluXCJcclxuICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgTG9nb3V0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVzZXIgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2V0KFwiVXNlcm5hbWVcIixcIlwiKTtcclxuICAgICAgICB0aGlzLnNldChcIklucHV0RGFyZVwiLFwiXCIpO1xyXG4gICAgICAgIHdoaWxlKHRoaXMuRGFyZXMubGVuZ3RoID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGFyZXMucG9wKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmaXJlYmFzZS5sb2dvdXQoKTtcclxuICAgICAgICBcclxuICAgICAgICBQYWdlLnRvcG1vc3QoKS5nb0JhY2soKTtcclxuICAgIH1cclxuICBcclxufSBcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1haW5Nb2RlbDsiXX0=