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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlrdG9yUGFnZS1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlZpa3RvclBhZ2UtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUEwQixpQkFBaUIsQ0FBQyxDQUFBO0FBTzVDLElBQUksSUFBSSxDQUFDO0FBRVQ7SUFBMEIsK0JBQVU7SUFJaEM7UUFDSSxpQkFBTyxDQUFDO1FBQ1IsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ25CLDZCQUE2QjtJQUdqQyxDQUFDO0lBQ0QsaUNBQVcsR0FBWDtRQUVJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBbkJELENBQTBCLHVCQUFVLEdBbUJuQztBQUVEO2tCQUFlLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgTGFiZWxNb2R1bGUgPSByZXF1aXJlKFwidWkvbGFiZWxcIik7XHJcbmltcG9ydCBQYWdlID0gcmVxdWlyZShcInVpL2ZyYW1lXCIpO1xyXG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuXHJcblxyXG52YXIgc2VsZjtcclxuXHJcbmNsYXNzIFZpa3Rvck1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZXtcclxuXHJcbiAgICBDb2xvcjogc3RyaW5nO1xyXG4gICAgTmFtZTogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuQ29sb3IgPSBcIkJsdWVcIjtcclxuICAgICAgICB0aGlzLk5hbWUgPSBcIkpvbG9cIjtcclxuICAgICAgICAvL3RoaXMuc2V0KFwiQWRkXCIsIGZpcmViYXNlLik7XHJcbiAgICAgIFxyXG4gICAgICAgXHJcbiAgICB9XHJcbiAgICBDaGFuZ2VDb2xvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZXQoXCJOYW1lXCIsIFwiSGVsbG9cIik7XHJcbiAgICAgICAgdGhpcy5zZXQoXCJDb2xvclwiLFwiUmVkXCIpO1xyXG4gICAgICAgIGFsZXJ0KFwiSGVsbG9cIik7XHJcbiAgICB9XHJcbn0gXHJcblxyXG5leHBvcnQgZGVmYXVsdCBWaWt0b3JNb2RlbDsiXX0=