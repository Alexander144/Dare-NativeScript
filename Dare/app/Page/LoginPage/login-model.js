"use strict";
var observable_1 = require("data/observable");
var Page = require("ui/frame");
var firebase = require("nativescript-plugin-firebase");
var self;
var LoginModel = (function (_super) {
    __extends(LoginModel, _super);
    function LoginModel() {
        _super.call(this);
        self = this;
        //this.set("Add", firebase.);
    }
    LoginModel.prototype.Login = function () {
        var _this = this;
        this.LoginEmail = this.get("Email");
        this.LoginPassword = this.get("Password");
        firebase.login({ type: firebase.LoginType.PASSWORD,
            email: this.LoginEmail,
            password: this.LoginPassword }).then(function (user) {
            _this.set("Username", null);
            _this.set("Email", null);
            _this.set("Password", null);
            _this.GetUsernameFromDatabase(user.uid);
        }, function (error) {
            alert("Error:" + error);
        });
    };
    LoginModel.prototype.GetUsernameFromDatabase = function (uid) {
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
            _this.set("Username", null);
            _this.set("Email", null);
            _this.set("Password", null);
            alert("Sucess");
            firebase.setValue("Users/" + _this.get("Username"), { 'ID': user.key, 'Score': 0 });
        }, function (error) {
            alert("Error: " + error);
        });
    };
    LoginModel.prototype.Send = function () {
        firebase.push("", "hello");
    };
    return LoginModel;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginModel;
//# sourceMappingURL=login-model.js.map