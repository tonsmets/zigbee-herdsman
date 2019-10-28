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
const zclTransactionSequenceNumber_1 = __importDefault(require("../helpers/zclTransactionSequenceNumber"));
const Zcl = __importStar(require("../../zcl"));
const device_1 = __importDefault(require("./device"));
const assert_1 = __importDefault(require("assert"));
class Group extends entity_1.default {
    constructor(databaseID, groupID, members, meta) {
        super();
        this.databaseID = databaseID;
        this.groupID = groupID;
        this._members = members;
        this.meta = meta;
    }
    get members() { return Array.from(this._members); }
    /*
     * CRUD
     */
    static fromDatabaseEntry(entry) {
        const members = new Set();
        for (const member of entry.members) {
            const device = device_1.default.byIeeeAddr(member.deviceIeeeAddr);
            if (device) {
                const endpoint = device.getEndpoint(member.endpointID);
                members.add(endpoint);
            }
        }
        return new Group(entry.id, entry.groupID, members, entry.meta);
    }
    toDatabaseRecord() {
        const members = Array.from(this.members).map((member) => {
            return { deviceIeeeAddr: member.getDevice().ieeeAddr, endpointID: member.ID };
        });
        return { id: this.databaseID, type: 'Group', groupID: this.groupID, members, meta: this.meta };
    }
    static loadFromDatabaseIfNecessary() {
        if (!Group.groups) {
            Group.groups = {};
            const entries = entity_1.default.database.getEntries(['Group']);
            for (const entry of entries) {
                const group = Group.fromDatabaseEntry(entry);
                Group.groups[group.groupID] = group;
            }
        }
    }
    static byGroupID(groupID) {
        Group.loadFromDatabaseIfNecessary();
        return Group.groups[groupID];
    }
    static all() {
        Group.loadFromDatabaseIfNecessary();
        return Object.values(Group.groups);
    }
    static create(groupID) {
        assert_1.default(typeof groupID === 'number', 'GroupID must be a number');
        Group.loadFromDatabaseIfNecessary();
        if (Group.groups[groupID]) {
            throw new Error(`Group with groupID '${groupID}' already exists`);
        }
        const databaseID = entity_1.default.database.newID();
        const group = new Group(databaseID, groupID, new Set(), {});
        entity_1.default.database.insert(group.toDatabaseRecord());
        Group.groups[group.groupID] = group;
        return group;
    }
    removeFromDatabase() {
        Group.loadFromDatabaseIfNecessary();
        entity_1.default.database.remove(this.databaseID);
        delete Group.groups[this.groupID];
    }
    save() {
        entity_1.default.database.update(this.toDatabaseRecord());
    }
    addMember(endpoint) {
        this._members.add(endpoint);
        this.save();
    }
    removeMember(endpoint) {
        this._members.delete(endpoint);
        this.save();
    }
    hasMember(endpoint) {
        return this._members.has(endpoint);
    }
    /*
     * Zigbee functions
     */
    command(clusterKey, commandKey, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const cluster = Zcl.Utils.getCluster(clusterKey);
            const command = cluster.getCommand(commandKey);
            for (const parameter of command.parameters) {
                if (!payload.hasOwnProperty(parameter.name)) {
                    throw new Error(`Parameter '${parameter.name}' is missing`);
                }
            }
            const frame = Zcl.ZclFrame.create(Zcl.FrameType.SPECIFIC, Zcl.Direction.CLIENT_TO_SERVER, true, null, zclTransactionSequenceNumber_1.default.next(), command.ID, cluster.ID, payload);
            yield entity_1.default.adapter.sendZclFrameGroup(this.groupID, frame);
        });
    }
}
// This lookup contains all groups that are queried from the database, this is to ensure that always
// the same instance is returned.
Group.groups = null;
exports.default = Group;
//# sourceMappingURL=group.js.map