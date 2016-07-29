"use strict";
var Dare = (function () {
    function Dare(Id, OutputDare, From) {
        this.Id = Id;
        this.OutputDare = OutputDare;
        this.From = From;
    }
    Dare.prototype.SetDate = function (Date) {
        this.Date = Date;
    };
    return Dare;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dare;
//# sourceMappingURL=Dare.js.map