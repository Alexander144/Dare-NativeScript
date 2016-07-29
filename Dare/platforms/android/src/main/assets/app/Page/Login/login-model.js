"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var Page = require("ui/frame");
var item_1 = require("../Class/item/item");
var firebase = require("nativescript-plugin-firebase-common");
var SignUpConfirm;
var Username;
var LoginModel = (function (_super) {
    __extends(LoginModel, _super);
    function LoginModel() {
        _super.call(this);
        this.items = new observable_array_1.ObservableArray();
        SignUpConfirm = false;
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
        Username = this.get("Username");
        this.LoginEmail = this.get("Email");
        this.LoginPassword = this.get("Password");
        firebase.addChildEventListener(this.onChildEvent, "/Dares");
        console.debug(this.LoginEmail);
        if (SignUpConfirm == true) {
            firebase.createUser({ email: this.LoginEmail,
                password: this.LoginPassword }).then(function (user) {
                _this.set("Email", null);
                _this.set("Password", null);
                alert("UserID" + user.key);
                firebase.setValue("Users/" + _this.get("Username"), { 'ID': user.key });
            }, function (error) {
                alert("Error: " + error);
            });
        }
        else {
            alert("Username already taken");
        }
    };
    LoginModel.prototype.onChildEvent = function (result) {
        if (result.type === "ChildAdded") {
            if (result.value != Username) {
                return SignUpConfirm = true;
            }
        }
    };
    LoginModel.prototype.Send = function () {
        this.items.push(new item_1.default("Hello"));
    };
    return LoginModel;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginModel;
//# sourceMappingURL=login-model.js.map