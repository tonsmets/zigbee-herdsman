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
const database_1 = __importDefault(require("./database"));
const adapter_1 = require("../adapter");
const model_1 = require("./model");
const helpers_1 = require("./helpers");
const Events = __importStar(require("./events"));
const debug_1 = __importDefault(require("debug"));
const fs_1 = __importDefault(require("fs"));
const zcl_1 = require("../zcl");
// @ts-ignore
const mixin_deep_1 = __importDefault(require("mixin-deep"));
const group_1 = __importDefault(require("./model/group"));
;
const DefaultOptions = {
    network: {
        networkKeyDistribute: false,
        networkKey: [0x01, 0x03, 0x05, 0x07, 0x09, 0x0B, 0x0D, 0x0F, 0x00, 0x02, 0x04, 0x06, 0x08, 0x0A, 0x0C, 0x0D],
        panID: 0x1a62,
        extenedPanID: [0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD],
        channelList: [11],
    },
    serialPort: {
        baudRate: 115200,
        rtscts: true,
        path: null,
    },
    databasePath: null,
    backupPath: null,
    acceptJoiningDeviceHandler: null,
};
const debug = {
    error: debug_1.default('zigbee-herdsman:controller:error'),
    log: debug_1.default('zigbee-herdsman:controller:log'),
};
/**
 * @ignore
 */
const OneJanuary2000 = new Date('January 01, 2000 00:00:00').getTime();
/**
 * @noInheritDoc
 */
class Controller extends events_1.default.EventEmitter {
    /**
     * Create a controller
     *
     * To auto detect the port provide `null` for `options.serialPort.path`
     */
    constructor(options) {
        super();
        this.options = mixin_deep_1.default(DefaultOptions, options);
        // Validate options
        for (const channel of this.options.network.channelList) {
            if (channel < 11 || channel > 26) {
                throw new Error(`'${channel}' is an invalid channel, use a channel between 11 - 26.`);
            }
        }
    }
    /**
     * Start the Herdsman controller
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.adapter = yield adapter_1.Adapter.create(this.options.network, this.options.serialPort, this.options.backupPath);
            debug.log(`Starting with options '${JSON.stringify(this.options)}'`);
            this.database = database_1.default.open(this.options.databasePath);
            const startResult = yield this.adapter.start();
            debug.log(`Started with result '${startResult}'`);
            // Inject adapter and database in entity
            debug.log(`Injected database: ${this.database != null}, adapter: ${this.adapter != null}`);
            model_1.Entity.injectAdapter(this.adapter);
            model_1.Entity.injectDatabase(this.database);
            // Register adapter events
            this.adapter.on(adapter_1.Events.Events.deviceJoined, this.onDeviceJoined.bind(this));
            this.adapter.on(adapter_1.Events.Events.zclData, (data) => this.onZclOrRawData('zcl', data));
            this.adapter.on(adapter_1.Events.Events.rawData, (data) => this.onZclOrRawData('raw', data));
            this.adapter.on(adapter_1.Events.Events.disconnected, this.onAdapterDisconnected.bind(this));
            this.adapter.on(adapter_1.Events.Events.deviceAnnounce, this.onDeviceAnnounce.bind(this));
            this.adapter.on(adapter_1.Events.Events.deviceLeave, this.onDeviceLeave.bind(this));
            if (startResult === 'reset') {
                debug.log('Clearing database...');
                for (const group of group_1.default.all()) {
                    group.removeFromDatabase();
                }
                for (const device of model_1.Device.all()) {
                    device.removeFromDatabase();
                }
            }
            // Add coordinator to the database if it is not there yet.
            if (model_1.Device.byType('Coordinator').length === 0) {
                debug.log('No coordinator in database, querying...');
                const coordinator = yield this.adapter.getCoordinator();
                model_1.Device.create('Coordinator', coordinator.ieeeAddr, coordinator.networkAddress, coordinator.manufacturerID, undefined, undefined, undefined, coordinator.endpoints);
            }
            // Set backup timer to 1 day.
            yield this.backup();
            this.backupTimer = setInterval(() => this.backup(), 86400000);
        });
    }
    permitJoin(permit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (permit && !this.getPermitJoin()) {
                debug.log('Permit joining');
                yield this.adapter.permitJoin(254);
                // Zigbee 3 networks automatically close after max 255 seconds, keep network open.
                this.permitJoinTimer = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                    debug.log('Permit joining');
                    yield this.adapter.permitJoin(254);
                }), 200 * 1000);
            }
            else if (permit && this.getPermitJoin()) {
                debug.log('Joining already permitted');
            }
            else {
                debug.log('Disable joining');
                yield this.adapter.permitJoin(0);
                if (this.permitJoinTimer) {
                    clearInterval(this.permitJoinTimer);
                    this.permitJoinTimer = null;
                }
            }
        });
    }
    getPermitJoin() {
        return this.permitJoinTimer != null;
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const device of model_1.Device.all()) {
                device.save();
            }
            for (const group of group_1.default.all()) {
                group.save();
            }
            // Unregister adapter events
            this.adapter.removeAllListeners(adapter_1.Events.Events.deviceJoined);
            this.adapter.removeAllListeners(adapter_1.Events.Events.zclData);
            this.adapter.removeAllListeners(adapter_1.Events.Events.rawData);
            this.adapter.removeAllListeners(adapter_1.Events.Events.disconnected);
            this.adapter.removeAllListeners(adapter_1.Events.Events.deviceAnnounce);
            this.adapter.removeAllListeners(adapter_1.Events.Events.deviceLeave);
            yield this.permitJoin(false);
            clearInterval(this.backupTimer);
            yield this.backup();
            yield this.adapter.stop();
        });
    }
    backup() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.options.backupPath && (yield this.adapter.supportsBackup())) {
                debug.log('Creating coordinator backup');
                const backup = yield this.adapter.backup();
                fs_1.default.writeFileSync(this.options.backupPath, JSON.stringify(backup, null, 2));
                debug.log(`Wrote coordinator backup to '${this.options.backupPath}'`);
            }
        });
    }
    reset(type) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adapter.reset(type);
        });
    }
    getCoordinatorVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adapter.getCoordinatorVersion();
        });
    }
    getNetworkParameters() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adapter.getNetworkParameters();
        });
    }
    /**
     * Get all devices
     */
    getDevices() {
        return model_1.Device.all();
    }
    /**
     * Get all devices with a specific type
     */
    getDevicesByType(type) {
        return model_1.Device.byType(type);
    }
    /**
     * Get device by ieeeAddr
     */
    getDeviceByIeeeAddr(ieeeAddr) {
        return model_1.Device.byIeeeAddr(ieeeAddr);
    }
    /**
     * Get group by ID
     */
    getGroupByID(groupID) {
        return group_1.default.byGroupID(groupID);
    }
    /**
     * Get all groups
     */
    getGroups() {
        return group_1.default.all();
    }
    /**
     * Create a Group
     */
    createGroup(groupID) {
        return group_1.default.create(groupID);
    }
    /**
     *  Check if the adapters supports LED
     */
    supportsLED() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adapter.supportsLED();
        });
    }
    /**
     *  Enable/Disable the LED
     */
    setLED(enabled) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.supportsLED()))
                throw new Error(`Adapter doesn't support LED`);
            yield this.adapter.setLED(enabled);
        });
    }
    onDeviceAnnounce(payload) {
        debug.log(`Device announce '${payload.ieeeAddr}'`);
        const device = model_1.Device.byIeeeAddr(payload.ieeeAddr);
        device.updateLastSeen();
        if (device.networkAddress !== payload.networkAddress) {
            debug.log(`Device '${payload.ieeeAddr}' announced with new networkAddress '${payload.networkAddress}'`);
            device.networkAddress = payload.networkAddress;
            device.save();
        }
        const data = { device };
        this.emit(Events.Events.deviceAnnounce, data);
    }
    onDeviceLeave(payload) {
        debug.log(`Device leave '${payload.ieeeAddr}'`);
        const device = model_1.Device.byIeeeAddr(payload.ieeeAddr);
        if (device) {
            debug.log(`Removing device from database '${payload.ieeeAddr}'`);
            device.removeFromDatabase();
        }
        const data = { ieeeAddr: payload.ieeeAddr };
        this.emit(Events.Events.deviceLeave, data);
    }
    onAdapterDisconnected() {
        return __awaiter(this, void 0, void 0, function* () {
            debug.log(`Adapter disconnected'`);
            try {
                yield this.adapter.stop();
            }
            catch (error) {
            }
            this.emit(Events.Events.adapterDisconnected);
        });
    }
    onDeviceJoined(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            debug.log(`Device '${payload.ieeeAddr}' joined`);
            if (this.options.acceptJoiningDeviceHandler) {
                if (!(yield this.options.acceptJoiningDeviceHandler(payload.ieeeAddr))) {
                    debug.log(`Device '${payload.ieeeAddr}' rejected by handler, removing it`);
                    yield this.adapter.removeDevice(payload.networkAddress, payload.ieeeAddr);
                    return;
                }
                else {
                    debug.log(`Device '${payload.ieeeAddr}' accepted by handler`);
                }
            }
            let device = model_1.Device.byIeeeAddr(payload.ieeeAddr);
            if (!device) {
                debug.log(`New device '${payload.ieeeAddr}' joined`);
                debug.log(`Creating device '${payload.ieeeAddr}'`);
                device = model_1.Device.create(undefined, payload.ieeeAddr, payload.networkAddress, undefined, undefined, undefined, undefined, []);
                const eventData = { device };
                this.emit(Events.Events.deviceJoined, eventData);
            }
            else if (device.networkAddress !== payload.networkAddress) {
                debug.log(`Device '${payload.ieeeAddr}' is already in database with different networkAddress, ` +
                    `updating networkAddress`);
                device.networkAddress = payload.networkAddress;
                device.save();
            }
            device.updateLastSeen();
            if (!device.interviewCompleted && !device.interviewing) {
                const payloadStart = { status: 'started', device };
                debug.log(`Interview '${device.ieeeAddr}' start`);
                this.emit(Events.Events.deviceInterview, payloadStart);
                try {
                    yield device.interview();
                    debug.log(`Succesfully interviewed '${device.ieeeAddr}'`);
                    const event = { status: 'successful', device };
                    this.emit(Events.Events.deviceInterview, event);
                }
                catch (error) {
                    debug.error(`Interview failed for '${device.ieeeAddr} with error '${error}'`);
                    const event = { status: 'failed', device };
                    this.emit(Events.Events.deviceInterview, event);
                }
            }
            else {
                debug.log(`Not interviewing '${payload.ieeeAddr}', completed '${device.interviewCompleted}', ` +
                    `in progress '${device.interviewing}'`);
            }
        });
    }
    isZclDataPayload(dataPayload, type) {
        return type === 'zcl';
    }
    onZclOrRawData(dataType, dataPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            debug.log(`Received '${dataType}' data '${JSON.stringify(dataPayload)}'`);
            const device = model_1.Device.byNetworkAddress(dataPayload.networkAddress);
            if (!device) {
                debug.log(`'${dataType}' data is from unknown device with network adress '${dataPayload.networkAddress}', ` +
                    `skipping...`);
                return;
            }
            device.updateLastSeen();
            let endpoint = device.getEndpoint(dataPayload.endpoint);
            if (!endpoint) {
                debug.log(`'${dataType}' data is from unknown endpoint '${dataPayload.endpoint}' from device with ` +
                    `network adress '${dataPayload.networkAddress}', creating it...`);
                endpoint = yield device.createEndpoint(dataPayload.endpoint);
            }
            // Parse command for event
            let type = undefined;
            let data;
            let clusterName = undefined;
            if (this.isZclDataPayload(dataPayload, dataType)) {
                const frame = dataPayload.frame;
                const command = frame.getCommand();
                clusterName = frame.Cluster.name;
                if (frame.isGlobal()) {
                    if (frame.isCommand('report')) {
                        type = 'attributeReport';
                        data = helpers_1.ZclFrameConverter.attributeList(dataPayload.frame);
                    }
                    else {
                        /* istanbul ignore else */
                        if (frame.isCommand('readRsp')) {
                            type = 'readResponse';
                            data = helpers_1.ZclFrameConverter.attributeList(dataPayload.frame);
                        }
                    }
                }
                else {
                    /* istanbul ignore else */
                    if (frame.isSpecific()) {
                        if (Events.CommandsLookup[command.name]) {
                            type = Events.CommandsLookup[command.name];
                            data = dataPayload.frame.Payload;
                        }
                        else {
                            debug.log(`Skipping command '${command.name}' because it is missing from the lookup`);
                        }
                    }
                }
                if (type === 'readResponse' || type === 'attributeReport') {
                    // Some device report, e.g. it's modelID through a readResponse or attributeReport
                    for (const [key, value] of Object.entries(data)) {
                        const property = model_1.Device.ReportablePropertiesMapping[key];
                        if (property && !device[property.key]) {
                            property.set(value, device);
                        }
                    }
                    endpoint.saveClusterAttributeList(clusterName, data);
                }
            }
            else {
                type = 'raw';
                data = dataPayload.data;
                try {
                    const cluster = zcl_1.Utils.getCluster(dataPayload.clusterID);
                    clusterName = cluster.name;
                }
                catch (error) {
                    clusterName = 'unknown';
                    debug.error(`Error while retrieving cluster for raw '${error}'`);
                }
            }
            if (type && data) {
                const endpoint = device.getEndpoint(dataPayload.endpoint);
                const linkquality = dataPayload.linkquality;
                const groupID = dataPayload.groupID;
                const eventData = {
                    type: type, device, endpoint, data, linkquality, groupID, cluster: clusterName
                };
                this.emit(Events.Events.message, eventData);
            }
            if (this.isZclDataPayload(dataPayload, dataType)) {
                const frame = dataPayload.frame;
                // Send a default response if necessary.
                if (!frame.Header.frameControl.disableDefaultResponse) {
                    try {
                        yield endpoint.defaultResponse(frame.getCommand().ID, 0, frame.Cluster.ID, frame.Header.transactionSequenceNumber);
                    }
                    catch (error) {
                        debug.error(`Default response to ${device.ieeeAddr} failed`);
                    }
                }
                // Reponse to time reads
                if (frame.isGlobal() && frame.isCluster('genTime') && frame.isCommand('read')) {
                    const time = Math.round(((new Date()).getTime() - OneJanuary2000) / 1000);
                    try {
                        yield endpoint.readResponse(frame.Cluster.ID, frame.Header.transactionSequenceNumber, { time });
                    }
                    catch (error) {
                        debug.error(`genTime response to ${device.ieeeAddr} failed`);
                    }
                }
            }
        });
    }
}
exports.default = Controller;
//# sourceMappingURL=controller.js.map