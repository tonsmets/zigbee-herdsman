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
const entity_1 = __importDefault(require("./entity"));
const Zcl = __importStar(require("../../zcl"));
const zclTransactionSequenceNumber_1 = __importDefault(require("../helpers/zclTransactionSequenceNumber"));
const ZclFrameConverter = __importStar(require("../helpers/zclFrameConverter"));
const group_1 = __importDefault(require("./group"));
const device_1 = __importDefault(require("./device"));
class Endpoint extends entity_1.default {
    constructor(ID, profileID, deviceID, inputClusters, outputClusters, deviceNetworkAddress, deviceIeeeAddress, clusters, binds) {
        super();
        this.ID = ID;
        this.profileID = profileID;
        this.deviceID = deviceID;
        this.inputClusters = inputClusters;
        this.outputClusters = outputClusters;
        this.deviceNetworkAddress = deviceNetworkAddress;
        this.deviceIeeeAddress = deviceIeeeAddress;
        this.clusters = clusters;
        this._binds = binds;
    }
    // Getters/setters
    get binds() {
        return this._binds.map((entry) => {
            let target = null;
            if (entry.type === 'endpoint') {
                const device = device_1.default.byIeeeAddr(entry.deviceIeeeAddress);
                if (device) {
                    target = device.getEndpoint(entry.endpointID);
                }
            }
            else {
                target = group_1.default.byGroupID(entry.groupID);
            }
            return { target, cluster: Zcl.Utils.getCluster(entry.cluster) };
        });
    }
    ;
    /**
     * Get device of this endpoint
     */
    getDevice() {
        return device_1.default.byIeeeAddr(this.deviceIeeeAddress);
    }
    /**
     * @param {number|string} clusterKey
     * @returns {boolean}
     */
    supportsInputCluster(clusterKey) {
        const cluster = Zcl.Utils.getCluster(clusterKey);
        return this.inputClusters.includes(cluster.ID);
    }
    supportsOutputCluster(clusterKey) {
        const cluster = Zcl.Utils.getCluster(clusterKey);
        return this.outputClusters.includes(cluster.ID);
    }
    /*
     * CRUD
     */
    static fromDatabaseRecord(record, deviceNetworkAddress, deviceIeeeAddress) {
        // Migrate attrs to attributes
        for (const entry of Object.values(record.clusters).filter((e) => e.hasOwnProperty('attrs'))) {
            // @ts-ignore
            entry.attributes = entry.attrs;
            // @ts-ignore
            delete entry.attrs;
        }
        return new Endpoint(record.epId, record.profId, record.devId, record.inClusterList, record.outClusterList, deviceNetworkAddress, deviceIeeeAddress, record.clusters, record.binds || []);
    }
    toDatabaseRecord() {
        return {
            profId: this.profileID, epId: this.ID, devId: this.deviceID,
            inClusterList: this.inputClusters, outClusterList: this.outputClusters, clusters: this.clusters,
            binds: this._binds,
        };
    }
    static create(ID, profileID, deviceID, inputClusters, outputClusters, deviceNetworkAddress, deviceIeeeAddress) {
        return new Endpoint(ID, profileID, deviceID, inputClusters, outputClusters, deviceNetworkAddress, deviceIeeeAddress, {}, []);
    }
    saveClusterAttributeList(clusterKey, list) {
        const cluster = Zcl.Utils.getCluster(clusterKey);
        if (!this.clusters[cluster.name])
            this.clusters[cluster.name] = { attributes: {} };
        for (const [attribute, value] of Object.entries(list)) {
            this.clusters[cluster.name].attributes[attribute] = value;
        }
    }
    getClusterAttributeValue(clusterKey, attributeKey) {
        const cluster = Zcl.Utils.getCluster(clusterKey);
        const attribute = cluster.getAttribute(attributeKey);
        if (this.clusters[cluster.name] && this.clusters[cluster.name].attributes) {
            return this.clusters[cluster.name].attributes[attribute.name];
        }
        return null;
    }
    /*
     * Zigbee functions
     */
    write(clusterKey, attributes, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { manufacturerCode, disableDefaultResponse } = this.getOptionsWithDefaults(options, true);
            const cluster = Zcl.Utils.getCluster(clusterKey);
            const payload = [];
            for (const [nameOrID, value] of Object.entries(attributes)) {
                if (cluster.hasAttribute(nameOrID)) {
                    const attribute = cluster.getAttribute(nameOrID);
                    payload.push({ attrId: attribute.ID, attrData: value, dataType: attribute.type });
                }
                else if (!isNaN(Number(nameOrID))) {
                    payload.push({ attrId: Number(nameOrID), attrData: value.value, dataType: value.type });
                }
                else {
                    throw new Error(`Unknown attribute '${nameOrID}', specify either an existing attribute or a number`);
                }
            }
            const frame = Zcl.ZclFrame.create(Zcl.FrameType.GLOBAL, Zcl.Direction.CLIENT_TO_SERVER, disableDefaultResponse, manufacturerCode, zclTransactionSequenceNumber_1.default.next(), 'write', cluster.ID, payload);
            yield entity_1.default.adapter.sendZclFrameNetworkAddressWithResponse(this.deviceNetworkAddress, this.ID, frame);
        });
    }
    read(clusterKey, attributes, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { manufacturerCode, disableDefaultResponse } = this.getOptionsWithDefaults(options, true);
            const cluster = Zcl.Utils.getCluster(clusterKey);
            const payload = [];
            for (const attribute of attributes) {
                payload.push({ attrId: cluster.getAttribute(attribute).ID });
            }
            const frame = Zcl.ZclFrame.create(Zcl.FrameType.GLOBAL, Zcl.Direction.CLIENT_TO_SERVER, disableDefaultResponse, manufacturerCode, zclTransactionSequenceNumber_1.default.next(), 'read', cluster.ID, payload);
            const result = yield entity_1.default.adapter.sendZclFrameNetworkAddressWithResponse(this.deviceNetworkAddress, this.ID, frame);
            return ZclFrameConverter.attributeList(result.frame);
        });
    }
    readResponse(clusterKey, transactionSequenceNumber, attributes, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { manufacturerCode, disableDefaultResponse } = this.getOptionsWithDefaults(options, true);
            const cluster = Zcl.Utils.getCluster(clusterKey);
            const payload = [];
            for (const [name, value] of Object.entries(attributes)) {
                const attribute = cluster.getAttribute(name);
                payload.push({ attrId: attribute.ID, attrData: value, dataType: attribute.type, status: 0 });
            }
            const frame = Zcl.ZclFrame.create(Zcl.FrameType.GLOBAL, Zcl.Direction.SERVER_TO_CLIENT, disableDefaultResponse, manufacturerCode, transactionSequenceNumber, 'readRsp', cluster.ID, payload);
            yield entity_1.default.adapter.sendZclFrameNetworkAddress(this.deviceNetworkAddress, this.ID, frame);
        });
    }
    bind(clusterKey, target) {
        return __awaiter(this, void 0, void 0, function* () {
            const cluster = Zcl.Utils.getCluster(clusterKey);
            const type = target instanceof Endpoint ? 'endpoint' : 'group';
            yield entity_1.default.adapter.bind(this.deviceNetworkAddress, this.deviceIeeeAddress, this.ID, cluster.ID, target instanceof Endpoint ? target.deviceIeeeAddress : target.groupID, type, target instanceof Endpoint ? target.ID : null);
            if (!this.binds.find((b) => b.cluster.ID === cluster.ID && b.target === target)) {
                if (target instanceof group_1.default) {
                    this._binds.push({ cluster: cluster.ID, groupID: target.groupID, type: 'group' });
                }
                else {
                    this._binds.push({
                        cluster: cluster.ID, type: 'endpoint', deviceIeeeAddress: target.deviceIeeeAddress,
                        endpointID: target.ID
                    });
                }
                this.getDevice().save();
            }
        });
    }
    unbind(clusterKey, target) {
        return __awaiter(this, void 0, void 0, function* () {
            const cluster = Zcl.Utils.getCluster(clusterKey);
            const type = target instanceof Endpoint ? 'endpoint' : 'group';
            yield entity_1.default.adapter.unbind(this.deviceNetworkAddress, this.deviceIeeeAddress, this.ID, cluster.ID, target instanceof Endpoint ? target.deviceIeeeAddress : target.groupID, type, target instanceof Endpoint ? target.ID : null);
            const index = this.binds.findIndex((b) => b.cluster.ID === cluster.ID && b.target === target);
            if (index !== -1) {
                this._binds.splice(index, 1);
                this.getDevice().save();
            }
        });
    }
    defaultResponse(commandID, status, clusterID, transactionSequenceNumber, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { manufacturerCode, disableDefaultResponse } = this.getOptionsWithDefaults(options, true);
            const payload = { cmdId: commandID, statusCode: status };
            const frame = Zcl.ZclFrame.create(Zcl.FrameType.GLOBAL, Zcl.Direction.SERVER_TO_CLIENT, disableDefaultResponse, manufacturerCode, transactionSequenceNumber, 'defaultRsp', clusterID, payload);
            yield entity_1.default.adapter.sendZclFrameNetworkAddress(this.deviceNetworkAddress, this.ID, frame);
        });
    }
    configureReporting(clusterKey, items, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { manufacturerCode, disableDefaultResponse } = this.getOptionsWithDefaults(options, true);
            const cluster = Zcl.Utils.getCluster(clusterKey);
            const payload = items.map((item) => {
                let dataType, attrId;
                if (typeof item.attribute === 'object') {
                    dataType = item.attribute.type;
                    attrId = item.attribute.ID;
                }
                else {
                    /* istanbul ignore else */
                    if (cluster.hasAttribute(item.attribute)) {
                        const attribute = cluster.getAttribute(item.attribute);
                        dataType = attribute.type;
                        attrId = attribute.ID;
                    }
                }
                return {
                    direction: Zcl.Direction.CLIENT_TO_SERVER,
                    attrId, dataType,
                    minRepIntval: item.minimumReportInterval,
                    maxRepIntval: item.maximumReportInterval,
                    repChange: item.reportableChange,
                };
            });
            const frame = Zcl.ZclFrame.create(Zcl.FrameType.GLOBAL, Zcl.Direction.CLIENT_TO_SERVER, disableDefaultResponse, manufacturerCode, zclTransactionSequenceNumber_1.default.next(), 'configReport', cluster.ID, payload);
            yield entity_1.default.adapter.sendZclFrameNetworkAddressWithResponse(this.deviceNetworkAddress, this.ID, frame);
        });
    }
    command(clusterKey, commandKey, payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const cluster = Zcl.Utils.getCluster(clusterKey);
            const command = cluster.getCommand(commandKey);
            const hasResponse = command.hasOwnProperty('response');
            const { manufacturerCode, disableDefaultResponse } = this.getOptionsWithDefaults(options, hasResponse);
            for (const parameter of command.parameters) {
                if (!payload.hasOwnProperty(parameter.name)) {
                    throw new Error(`Parameter '${parameter.name}' is missing`);
                }
            }
            const frame = Zcl.ZclFrame.create(Zcl.FrameType.SPECIFIC, Zcl.Direction.CLIENT_TO_SERVER, disableDefaultResponse, manufacturerCode, zclTransactionSequenceNumber_1.default.next(), command.ID, cluster.ID, payload);
            if (hasResponse) {
                const result = yield entity_1.default.adapter.sendZclFrameNetworkAddressWithResponse(this.deviceNetworkAddress, this.ID, frame);
                return result.frame.Payload;
            }
            else {
                yield entity_1.default.adapter.sendZclFrameNetworkAddress(this.deviceNetworkAddress, this.ID, frame);
            }
        });
    }
    getOptionsWithDefaults(options, disableDefaultResponse) {
        const providedOptions = options || {};
        return Object.assign({ manufacturerCode: null, disableDefaultResponse }, providedOptions);
    }
    addToGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.command('genGroups', 'add', { groupid: group.groupID, groupname: '' });
            group.addMember(this);
        });
    }
    /**
     * Remove endpoint from a group, accepts both a Group and number as parameter.
     * The number parameter type should only be used when removing from a group which is not known
     * to zigbee-herdsman.
     */
    removeFromGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.command('genGroups', 'remove', { groupid: group instanceof group_1.default ? group.groupID : group });
            if (group instanceof group_1.default) {
                group.removeMember(this);
            }
        });
    }
    removeFromAllGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.command('genGroups', 'removeAll', {}, { disableDefaultResponse: true });
            for (const group of group_1.default.all()) {
                if (group.hasMember(this)) {
                    group.removeMember(this);
                }
            }
        });
    }
}
exports.default = Endpoint;
//# sourceMappingURL=endpoint.js.map