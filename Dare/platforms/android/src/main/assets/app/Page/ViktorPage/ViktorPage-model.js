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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlrdG9yUGFnZS1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlZpa3RvclBhZ2UtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUEwQixpQkFBaUIsQ0FBQyxDQUFBO0FBTzVDLElBQUksSUFBSSxDQUFDO0FBRVQ7SUFBMEIsK0JBQVU7SUFJaEM7UUFDSSxpQkFBTyxDQUFDO1FBQ1IsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ25CLDZCQUE2QjtJQUdqQyxDQUFDO0lBQ0QsaUNBQVcsR0FBWDtRQUVJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBbkJELENBQTBCLHVCQUFVLEdBbUJuQztBQUVEO2tCQUFlLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCBMYWJlbE1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9sYWJlbFwiKTtcbmltcG9ydCBQYWdlID0gcmVxdWlyZShcInVpL2ZyYW1lXCIpO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cblxudmFyIHNlbGY7XG5cbmNsYXNzIFZpa3Rvck1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZXtcblxuICAgIENvbG9yOiBzdHJpbmc7XG4gICAgTmFtZTogc3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLkNvbG9yID0gXCJCbHVlXCI7XG4gICAgICAgIHRoaXMuTmFtZSA9IFwiSm9sb1wiO1xuICAgICAgICAvL3RoaXMuc2V0KFwiQWRkXCIsIGZpcmViYXNlLik7XG4gICAgICBcbiAgICAgICBcbiAgICB9XG4gICAgQ2hhbmdlQ29sb3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5zZXQoXCJOYW1lXCIsIFwiSGVsbG9cIik7XG4gICAgICAgIHRoaXMuc2V0KFwiQ29sb3JcIixcIlJlZFwiKTtcbiAgICAgICAgYWxlcnQoXCJIZWxsb1wiKTtcbiAgICB9XG59IFxuXG5leHBvcnQgZGVmYXVsdCBWaWt0b3JNb2RlbDsiXX0=