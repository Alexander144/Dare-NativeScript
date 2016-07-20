"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var Page = require("ui/frame");
var firebase = require("nativescript-plugin-firebase");
var LoginModel = (function (_super) {
    __extends(LoginModel, _super);
    function LoginModel() {
        _super.call(this);
        this.items = new observable_array_1.ObservableArray();
        //this.set("Add", firebase.);
    }
    LoginModel.prototype.login = function () {
        var _this = this;
        var navigationEntry = {
            moduleName: "details-page",
            context: { info: "something you want to pass to your page" },
            animated: false
        };
        this.LoginEmail = this.get("Email");
        this.LoginPassword = this.get("Password");
        console.debug(this.LoginEmail);
        firebase.login({ type: firebase.LoginType.PASSWORD,
            email: this.LoginEmail,
            password: this.LoginPassword }).then(function (user) {
            _this.set("Email", null);
            _this.set("Password", null);
            //alert("UserID" + user.uid);
            Page.topmost().navigate({
                moduleName: "Page/MainPage/Main-Page",
                transition: {
                    name: "slideBottom",
                    duration: 380,
                    curve: "easeIn"
                },
                animated: true
            });
        }, function (error) {
            alert("Error:" + error);
        });
        //this.items.push(new item(this.Add));
        //firebase.push('',"Hello");
    };
    LoginModel.prototype.SignUp = function () {
        var _this = this;
        this.LoginEmail = this.get("Email");
        this.LoginPassword = this.get("Password");
        console.debug(this.LoginEmail);
        firebase.createUser({ email: this.LoginEmail,
            password: this.LoginPassword }).then(function (user) {
            _this.set("Email", null);
            _this.set("Password", null);
            alert("UserID" + user.key);
        }, function (error) {
            alert("Error: " + error);
        });
    };
    LoginModel.prototype.Send = function () {
        firebase.push("idare-8f8b1", this.LoginEmail);
    };
    return LoginModel;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginModel;
//# sourceMappingURL=login-model.js.map