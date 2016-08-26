"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var Page = require("ui/frame");
var item_1 = require("../Class/item/item");
var firebase = require("nativescript-plugin-firebase");
var self;
var LoginModel = (function (_super) {
    __extends(LoginModel, _super);
    function LoginModel() {
        _super.call(this);
        this.items = new observable_array_1.ObservableArray();
        self = this;
        //this.set("Add", firebase.);
    }
    LoginModel.prototype.login = function () {
        var _this = this;
        this.LoginEmail = this.get("Email");
        this.LoginPassword = this.get("Password");
        firebase.login({ type: firebase.LoginType.PASSWORD,
            email: this.LoginEmail,
            password: this.LoginPassword }).then(function (user) {
            _this.set("Email", null);
            _this.set("Password", null);
            _this.GetUsername(user.uid);
        }, function (error) {
            alert("Error:" + error);
        });
    };
    LoginModel.prototype.GetUsername = function (uid) {
        var user;
        var onChildEvent = function (result) {
            if (result.type === "ChildAdded") {
                if (result.value.ID == uid) {
                    Page.topmost().navigate({
                        moduleName: "Page/MainPage/Main-Page",
                        context: { Username: result.key
                        },
                        transition: {
                            name: "slideBottom",
                            duration: 380,
                            curve: "easeIn"
                        },
                        animated: true
                    });
                }
            }
        };
        // listen to changes in the /users path
        firebase.addChildEventListener(onChildEvent, "/Users");
    };
    LoginModel.prototype.SignUp = function () {
        var _this = this;
        this.LoginEmail = this.get("Email");
        this.LoginPassword = this.get("Password");
        firebase.createUser({ email: this.LoginEmail,
            password: this.LoginPassword }).then(function (user) {
            _this.set("Email", null);
            _this.set("Password", null);
            alert("UserID" + user.key);
            firebase.setValue("Users/" + _this.get("Username"), { 'ID': user.key, 'Score': 0 });
        }, function (error) {
            alert("Error: " + error);
        });
    };
    LoginModel.prototype.Send = function () {
        firebase.push("", "hello");
        this.items.push(new item_1.default("Hello"));
    };
    return LoginModel;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginModel;
//# sourceMappingURL=login-model.js.map