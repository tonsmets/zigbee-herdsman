"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
;
function equalsPartial(object, expected) {
    for (const [key, value] of Object.entries(expected)) {
        if (!fast_deep_equal_1.default(object[key], value)) {
            return false;
        }
    }
    return true;
}
exports.default = equalsPartial;
//# sourceMappingURL=equalsPartial.js.map