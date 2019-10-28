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
const endpoint_1 = __importDefault(require("./endpoint"));
const entity_1 = __importDefault(require("./entity"));
const utils_1 = require("../../utils");
const debug_1 = __importDefault(require("debug"));
const Zcl = __importStar(require("../../zcl"));
const debug = debug_1.default('zigbee-herdsman:controller:device');
class Device extends entity_1.default {
    constructor(ID, type, ieeeAddr, networkAddress, manufacturerID, endpoints, manufacturerName, powerSource, modelID, applicationVersion, stackVersion, zclVersion, hardwareVersion, dateCode, softwareBuildID, interviewCompleted, meta) {
        super();
        this.ID = ID;
        this._type = type;
        this.ieeeAddr = ieeeAddr;
        this._networkAddress = networkAddress;
        this._manufacturerID = manufacturerID;
        this._endpoints = endpoints;
        this._manufacturerName = manufacturerName;
        this._powerSource = powerSource;
        this._modelID = modelID;
        this._applicationVersion = applicationVersion;
        this._stackVersion = stackVersion;
        this._zclVersion = zclVersion;
        this.hardwareVersion = hardwareVersion;
        this._dateCode = dateCode;
        this._softwareBuildID = softwareBuildID;
        this._interviewCompleted = interviewCompleted;
        this._interviewing = false;
        this.meta = meta;
        this._lastSeen = null;
    }
    // Getters/setters
    get applicationVersion() { return this._applicationVersion; }
    set applicationVersion(applicationVersion) { this._applicationVersion = applicationVersion; }
    get endpoints() { return this._endpoints; }
    get interviewCompleted() { return this._interviewCompleted; }
    get interviewing() { return this._interviewing; }
    get lastSeen() { return this._lastSeen; }
    get manufacturerID() { return this._manufacturerID; }
    get type() { return this._type; }
    get dateCode() { return this._dateCode; }
    set dateCode(dateCode) { this._dateCode = dateCode; }
    set hardwareVersion(hardwareVersion) { this._hardwareVersion = hardwareVersion; }
    get hardwareVersion() { return this._hardwareVersion; }
    get manufacturerName() { return this._manufacturerName; }
    set manufacturerName(manufacturerName) { this._manufacturerName = manufacturerName; }
    set modelID(modelID) { this._modelID = modelID; }
    get modelID() { return this._modelID; }
    get networkAddress() { return this._networkAddress; }
    set networkAddress(networkAddress) { this._networkAddress = networkAddress; }
    get powerSource() { return this._powerSource; }
    set powerSource(powerSource) {
        this._powerSource = typeof powerSource === 'number' ? Zcl.PowerSource[powerSource] : powerSource;
    }
    get softwareBuildID() { return this._softwareBuildID; }
    set softwareBuildID(softwareBuildID) { this._softwareBuildID = softwareBuildID; }
    get stackVersion() { return this._stackVersion; }
    set stackVersion(stackVersion) { this._stackVersion = stackVersion; }
    get zclVersion() { return this._zclVersion; }
    set zclVersion(zclVersion) { this._zclVersion = zclVersion; }
    createEndpoint(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.getEndpoint(ID)) {
                throw new Error(`Device '${this.ieeeAddr}' already has an endpoint '${ID}'`);
            }
            const endpoint = endpoint_1.default.create(ID, undefined, undefined, [], [], this.networkAddress, this.ieeeAddr);
            this.endpoints.push(endpoint);
            this.save();
            return endpoint;
        });
    }
    getEndpoint(ID) {
        return this.endpoints.find((e) => e.ID === ID);
    }
    updateLastSeen() {
        this._lastSeen = Date.now();
    }
    /*
     * CRUD
     */
    static fromDatabaseEntry(entry) {
        const networkAddress = entry.nwkAddr;
        const ieeeAddr = entry.ieeeAddr;
        const endpoints = Object.values(entry.endpoints).map((e) => {
            return endpoint_1.default.fromDatabaseRecord(e, networkAddress, ieeeAddr);
        });
        const meta = entry.meta ? entry.meta : {};
        if (entry.type === 'Group') {
            throw new Error('Cannot load device from group');
        }
        return new Device(entry.id, entry.type, ieeeAddr, networkAddress, entry.manufId, endpoints, entry.manufName, entry.powerSource, entry.modelId, entry.appVersion, entry.stackVersion, entry.zclVersion, entry.hwVersion, entry.dateCode, entry.swBuildId, entry.interviewCompleted, meta);
    }
    toDatabaseEntry() {
        const epList = this.endpoints.map((e) => e.ID);
        const endpoints = {};
        for (const endpoint of this.endpoints) {
            endpoints[endpoint.ID] = endpoint.toDatabaseRecord();
        }
        return {
            id: this.ID, type: this.type, ieeeAddr: this.ieeeAddr, nwkAddr: this.networkAddress,
            manufId: this.manufacturerID, manufName: this.manufacturerName, powerSource: this.powerSource,
            modelId: this.modelID, epList, endpoints, appVersion: this.applicationVersion,
            stackVersion: this.stackVersion, hwVersion: this.hardwareVersion, dateCode: this.dateCode,
            swBuildId: this.softwareBuildID, zclVersion: this.zclVersion, interviewCompleted: this.interviewCompleted,
            meta: this.meta,
        };
    }
    save() {
        entity_1.default.database.update(this.toDatabaseEntry());
    }
    static loadFromDatabaseIfNecessary() {
        if (!Device.devices) {
            Device.devices = {};
            const entries = entity_1.default.database.getEntries(['Coordinator', 'EndDevice', 'Router']);
            for (const entry of entries) {
                const device = Device.fromDatabaseEntry(entry);
                Device.devices[device.ieeeAddr] = device;
            }
        }
    }
    static byIeeeAddr(ieeeAddr) {
        Device.loadFromDatabaseIfNecessary();
        return Device.devices[ieeeAddr];
    }
    static byNetworkAddress(networkAddress) {
        Device.loadFromDatabaseIfNecessary();
        return Object.values(Device.devices).find(d => d.networkAddress === networkAddress);
    }
    static byType(type) {
        Device.loadFromDatabaseIfNecessary();
        return Object.values(Device.devices).filter(d => d.type === type);
    }
    static all() {
        Device.loadFromDatabaseIfNecessary();
        return Object.values(Device.devices);
    }
    static create(type, ieeeAddr, networkAddress, manufacturerID, manufacturerName, powerSource, modelID, endpoints) {
        Device.loadFromDatabaseIfNecessary();
        if (Device.devices[ieeeAddr]) {
            throw new Error(`Device with ieeeAddr '${ieeeAddr}' already exists`);
        }
        const endpointsMapped = endpoints.map((e) => {
            return endpoint_1.default.create(e.ID, e.profileID, e.deviceID, e.inputClusters, e.outputClusters, networkAddress, ieeeAddr);
        });
        const ID = entity_1.default.database.newID();
        const device = new Device(ID, type, ieeeAddr, networkAddress, manufacturerID, endpointsMapped, manufacturerName, powerSource, modelID, undefined, undefined, undefined, undefined, undefined, undefined, false, {});
        entity_1.default.database.insert(device.toDatabaseEntry());
        Device.devices[device.ieeeAddr] = device;
        return device;
    }
    /*
     * Zigbee functions
     */
    interview() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.interviewing) {
                const message = `Interview - interview already in progress for '${this.ieeeAddr}'`;
                debug(message);
                throw new Error(message);
            }
            let error;
            this._interviewing = true;
            debug(`Interview - start device '${this.ieeeAddr}'`);
            try {
                yield this.interviewInternal();
                debug(`Interview - completed for device '${this.ieeeAddr}'`);
                this._interviewCompleted = true;
            }
            catch (e) {
                // Xiaomi end devices have a different interview procedure, after pairing they report it's
                // modelID trough a readResponse. The readResponse is received by the controller and set on the device
                // Check if we have a modelID starting with lumi.* at this point, indicating a Xiaomi end device.
                if (this.modelID && this.modelID.startsWith('lumi.')) {
                    debug('Interview procedure failed but got modelID starting with lumi, assuming Xiaomi end device');
                    this._type = 'EndDevice';
                    this._manufacturerID = 4151;
                    this._manufacturerName = 'LUMI';
                    this._powerSource = 'Battery';
                    this._interviewing = false;
                    this._interviewCompleted = true;
                    this.save();
                }
                else {
                    debug(`Interview - failed for device '${this.ieeeAddr}' with error '${e.stack}'`);
                    error = e;
                }
            }
            finally {
                this._interviewing = false;
                this.save();
            }
            if (error) {
                throw error;
            }
        });
    }
    interviewInternal() {
        return __awaiter(this, void 0, void 0, function* () {
            const nodeDescriptorQuery = () => __awaiter(this, void 0, void 0, function* () {
                const nodeDescriptor = yield entity_1.default.adapter.nodeDescriptor(this.networkAddress);
                this._manufacturerID = nodeDescriptor.manufacturerCode;
                this._type = nodeDescriptor.type;
                this.save();
                debug(`Interview - got node descriptor for device '${this.ieeeAddr}'`);
            });
            try {
                yield nodeDescriptorQuery();
            }
            catch (error) {
                // Most of the times the first node descriptor query fails and the seconds one succeeds.
                debug(`Interview - first node descriptor request failed for '${this.ieeeAddr}', retrying...`);
                yield nodeDescriptorQuery();
            }
            const activeEndpoints = yield entity_1.default.adapter.activeEndpoints(this.networkAddress);
            this._endpoints = activeEndpoints.endpoints.map((e) => {
                return endpoint_1.default.create(e, undefined, undefined, [], [], this.networkAddress, this.ieeeAddr);
            });
            this.save();
            debug(`Interview - got active endpoints for device '${this.ieeeAddr}'`);
            for (const endpoint of this.endpoints) {
                const simpleDescriptor = yield entity_1.default.adapter.simpleDescriptor(this.networkAddress, endpoint.ID);
                endpoint.profileID = simpleDescriptor.profileID;
                endpoint.deviceID = simpleDescriptor.deviceID;
                endpoint.inputClusters = simpleDescriptor.inputClusters;
                endpoint.outputClusters = simpleDescriptor.outputClusters;
                debug(`Interview - got simple descriptor for endpoint '${endpoint.ID}' device '${this.ieeeAddr}'`);
                this.save();
            }
            if (this.endpoints.length !== 0) {
                const endpoint = this.endpoints[0];
                // Split into chunks of 3, otherwise some devices fail to respond.
                for (const chunk of utils_1.ArraySplitChunks(Object.keys(Device.ReportablePropertiesMapping), 3)) {
                    const result = yield endpoint.read('genBasic', chunk);
                    for (const [key, value] of Object.entries(result)) {
                        Device.ReportablePropertiesMapping[key].set(value, this);
                    }
                    debug(`Interview - got '${chunk}' for device '${this.ieeeAddr}'`);
                    this.save();
                }
            }
            else {
                debug(`Interview - skip reading attributes because of no endpoint for device '${this.ieeeAddr}'`);
                throw new Error(`Interview failed because of not endpiont ('${this.ieeeAddr}')`);
            }
            // Enroll IAS device
            for (const endpoint of this.endpoints.filter((e) => e.supportsInputCluster('ssIasZone'))) {
                debug(`Interview - ssIasZone enrolling '${this.ieeeAddr}' endpoint '${endpoint.ID}'`);
                const coordinator = Device.byType('Coordinator')[0];
                yield endpoint.write('ssIasZone', { 'iasCieAddr': coordinator.ieeeAddr });
                // According to the spec, we should wait for an enrollRequest here, but the Bosch ISW-ZPR1 didn't send it.
                yield utils_1.Wait(3000);
                // Konke devices don't do a defaultResponse
                const disableDefaultResponse = this.manufacturerName === 'Konke';
                yield endpoint.command('ssIasZone', 'enrollRsp', { enrollrspcode: 0, zoneid: 23 }, { disableDefaultResponse });
                debug(`Interview - successfully enrolled '${this.ieeeAddr}' endpoint '${endpoint.ID}'`);
            }
        });
    }
    removeFromNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            yield entity_1.default.adapter.removeDevice(this.networkAddress, this.ieeeAddr);
            yield this.removeFromDatabase();
        });
    }
    removeFromDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            Device.loadFromDatabaseIfNecessary();
            entity_1.default.database.remove(this.ID);
            delete Device.devices[this.ieeeAddr];
        });
    }
    lqi() {
        return __awaiter(this, void 0, void 0, function* () {
            return entity_1.default.adapter.lqi(this.networkAddress);
        });
    }
    routingTable() {
        return __awaiter(this, void 0, void 0, function* () {
            return entity_1.default.adapter.routingTable(this.networkAddress);
        });
    }
    ping() {
        return __awaiter(this, void 0, void 0, function* () {
            // Zigbee does not have an official pining mechamism. Use a read request
            // of a mandatory basic cluster attribute to keep it as lightweight as
            // possible.
            yield this.endpoints[0].read('genBasic', ['zclVersion']);
        });
    }
}
// This lookup contains all devices that are queried from the database, this is to ensure that always
// the same instance is returned.
Device.devices = null;
Device.ReportablePropertiesMapping = {
    modelId: { key: 'modelID', set: (v, d) => { d.modelID = v; } },
    manufacturerName: { key: 'manufacturerName', set: (v, d) => { d.manufacturerName = v; } },
    powerSource: { key: 'powerSource', set: (v, d) => { d.powerSource = v; } },
    zclVersion: { key: 'zclVersion', set: (v, d) => { d.zclVersion = v; } },
    appVersion: { key: 'applicationVersion', set: (v, d) => { d.applicationVersion = v; } },
    stackVersion: { key: 'stackVersion', set: (v, d) => { d.stackVersion = v; } },
    hwVersion: { key: 'hardwareVersion', set: (v, d) => { d.hardwareVersion = v; } },
    dateCode: { key: 'dateCode', set: (v, d) => { d.dateCode = v; } },
    swBuildId: { key: 'softwareBuildID', set: (v, d) => { d.softwareBuildID = v; } },
};
exports.default = Device;
//# sourceMappingURL=device.js.map