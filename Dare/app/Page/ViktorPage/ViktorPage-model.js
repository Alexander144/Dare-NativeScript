"use strict";
var observable_1 = require("data/observable");
var self;
var ViktorModel = (function (_super) {
    __extends(ViktorModel, _super);
    function ViktorModel() {
        _super.call(this);
        self = this;
        this.Color = "Blue";
        this.Name = "Jolo";
        //this.set("Add", firebase.);
    }
    ViktorModel.prototype.ChangeColor = function () {
        this.set("Name", "Hello");
        this.set("Color", "Red");
        alert("Hello");
    };
    return ViktorModel;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViktorModel;
//# sourceMappingURL=ViktorPage-model.js.map