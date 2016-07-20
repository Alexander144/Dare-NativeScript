"use strict";
var item = (function () {
    function item(name) {
        this.name = name;
        this.id = new Date().getTime();
    }
    return item;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = item;
//# sourceMappingURL=item.js.map