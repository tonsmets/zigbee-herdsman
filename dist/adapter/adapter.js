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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const debug_1 = __importDefault(require("debug"));
const utils_1 = require("../utils");
const debug = debug_1.default("zigbee-herdsman:adapter");
class Adapter extends events_1.default.EventEmitter {
    constructor(networkOptions, serialPortOptions, backupPath) {
        super();
        this.networkOptions = networkOptions;
        this.serialPortOptions = serialPortOptions;
        this.backupPath = backupPath;
    }
    static create(networkOptions, serialPortOptions, backupPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ZStackAdapter } = yield Promise.resolve().then(() => __importStar(require('./z-stack/adapter')));
            const adapters = [ZStackAdapter];
            // Use ZStackAdapter by default
            let adapter = ZStackAdapter;
            if (!serialPortOptions.path) {
                debug('No path provided, auto detecting path');
                for (const candidate of adapters) {
                    const path = yield candidate.autoDetectPath();
                    if (path) {
                        debug(`Auto detected path '${path}' from adapter '${candidate.name}'`);
                        serialPortOptions.path = path;
                        adapter = candidate;
                        break;
                    }
                }
                if (!serialPortOptions.path) {
                    throw new Error("No path provided and failed to auto detect path");
                }
            }
            else {
                try {
                    // Path can be a symlink, resolve it.
                    serialPortOptions.path = utils_1.RealpathSync(serialPortOptions.path);
                    // Determine adapter to use
                    for (const candidate of adapters) {
                        if (yield candidate.isValidPath(serialPortOptions.path)) {
                            debug(`Path '${serialPortOptions.path}' is valid for '${candidate.name}'`);
                            adapter = candidate;
                            break;
                        }
                    }
                }
                catch (error) {
                    debug(`Failed to validate path: '${error}'`);
                }
            }
            return new adapter(networkOptions, serialPortOptions, backupPath);
        });
    }
}
exports.default = Adapter;
//# sourceMappingURL=adapter.js.map