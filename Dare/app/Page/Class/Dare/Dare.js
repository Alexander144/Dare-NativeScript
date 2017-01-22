"use strict";
var firebase = require("nativescript-plugin-firebase");
var Dare = (function () {
    function Dare(Id, OutputDare, From, Username) {
        this.Id = Id;
        this.OutputDare = OutputDare;
        this.From = From;
        this.Username = Username;
    }
    Dare.prototype.SetDate = function (Date) {
        this.Date = Date;
    };
    Dare.prototype.DoneDare = function () {
        firebase.remove("/Dares/" + this.Username + "/" + this.Id);
    };
    return Dare;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dare;
//# sourceMappingURL=Dare.js.map