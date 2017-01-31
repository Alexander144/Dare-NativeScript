"use strict";
var observable_1 = require("data/observable");
var self;
var ViktorModel = (function (_super) {
    __extends(ViktorModel, _super);
    function ViktorModel() {
        _super.call(this);
        //Self is for firebase connection
        self = this;
        this.Name = "Viktor app";
    }
    ViktorModel.prototype.done = function () {
        this.Name = "Alexander erbg kul";
        this.set("Name", this.Name);
    };
    return ViktorModel;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViktorModel;
//# sourceMappingURL=ViktorPage-model.js.map