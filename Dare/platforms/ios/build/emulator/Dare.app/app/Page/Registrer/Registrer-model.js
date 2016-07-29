"use strict";
var observable_1 = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var RegistrerModel = (function (_super) {
    __extends(RegistrerModel, _super);
    function RegistrerModel() {
        _super.call(this);
        //this.set("Add", firebase.);
    }
    RegistrerModel.prototype.Registrer = function () {
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
            alert("Error" + error);
        });
        //this.items.push(new item(this.Add));
        //firebase.push('',"Hello");
    };
    return RegistrerModel;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegistrerModel;
//# sourceMappingURL=Registrer-model.js.map