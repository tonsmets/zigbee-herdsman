"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serialport_1 = __importDefault(require("serialport"));
const utils_1 = require("../utils");
function find(matchers) {
    return __awaiter(this, void 0, void 0, function* () {
        let devices = yield serialport_1.default.list();
        devices = devices.filter((device) => matchers.find((matcher) => utils_1.EqualsPartial(device, matcher)) != null);
        // @ts-ignore; not sure why this is needed as path exists (definition is wrong?)
        return devices.map((device) => device.path);
    });
}
function is(path, matchers) {
    return __awaiter(this, void 0, void 0, function* () {
        const devices = yield serialport_1.default.list();
        // @ts-ignore; not sure why this is needed as path exists (definition is wrong?)
        const device = devices.find((device) => device.path === path);
        if (!device) {
            return false;
        }
        return matchers.find((matcher) => utils_1.EqualsPartial(device, matcher)) != null;
    });
}
exports.default = { is, find };
//# sourceMappingURL=serialPortUtils.js.map