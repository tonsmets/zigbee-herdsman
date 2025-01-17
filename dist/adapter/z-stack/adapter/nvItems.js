"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tstype_1 = require("./tstype");
const Constants = __importStar(require("../constants"));
const NvItemsIds = Constants.COMMON.nvItemIds;
exports.default = {
    znpHasConfiguredInit: (version) => {
        return {
            id: version === tstype_1.ZnpVersion.zStack12 ?
                NvItemsIds.ZNP_HAS_CONFIGURED_ZSTACK1 : NvItemsIds.ZNP_HAS_CONFIGURED_ZSTACK3,
            len: 0x01,
            initlen: 0x01,
            initvalue: Buffer.from([0x00]),
        };
    },
    znpHasConfigured: (version) => {
        return {
            id: version === tstype_1.ZnpVersion.zStack12 ?
                NvItemsIds.ZNP_HAS_CONFIGURED_ZSTACK1 : NvItemsIds.ZNP_HAS_CONFIGURED_ZSTACK3,
            offset: 0x00,
            len: 0x01,
            value: Buffer.from([0x55]),
        };
    },
    panID: (panID) => {
        return {
            id: NvItemsIds.PANID,
            len: 0x02,
            offset: 0x00,
            value: Buffer.from([panID & 0xFF, (panID >> 8) & 0xFF]),
        };
    },
    extendedPanID: (extendedPanID) => {
        return {
            id: NvItemsIds.EXTENDED_PAN_ID,
            len: 0x08,
            offset: 0x00,
            value: Buffer.from(extendedPanID),
        };
    },
    channelList: (channelList) => {
        return {
            id: NvItemsIds.CHANLIST,
            len: 0x04,
            offset: 0x00,
            value: Buffer.from(Constants.Utils.getChannelMask(channelList)),
        };
    },
    networkKeyDistribute: (distribute) => {
        return {
            id: NvItemsIds.PRECFGKEYS_ENABLE,
            len: 0x01,
            offset: 0x00,
            value: Buffer.from([distribute ? 0x01 : 0x00]),
        };
    },
    networkKey: (key) => {
        return {
            // id/configid is used depending if SAPI or SYS command is executed
            id: NvItemsIds.PRECFGKEY,
            configid: NvItemsIds.PRECFGKEY,
            len: 0x10,
            offset: 0x00,
            value: Buffer.from(key),
        };
    },
    startupOption: (value) => {
        return {
            id: NvItemsIds.STARTUP_OPTION,
            len: 0x01,
            offset: 0x00,
            value: Buffer.from([value]),
        };
    },
    logicalType: (value) => {
        return {
            id: NvItemsIds.LOGICAL_TYPE,
            len: 0x01,
            offset: 0x00,
            value: Buffer.from([value]),
        };
    },
    zdoDirectCb: () => {
        return {
            id: NvItemsIds.ZDO_DIRECT_CB,
            len: 0x01,
            offset: 0x00,
            value: Buffer.from([0x01]),
        };
    },
    tcLinkKey: () => {
        return {
            id: NvItemsIds.LEGACY_TCLK_TABLE_START,
            offset: 0x00,
            len: 0x20,
            // ZigBee Alliance Pre-configured TC Link Key - 'ZigBeeAlliance09'
            value: Buffer.from([
                0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x5a, 0x69, 0x67, 0x42, 0x65, 0x65, 0x41, 0x6c,
                0x6c, 0x69, 0x61, 0x6e, 0x63, 0x65, 0x30, 0x39, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
            ]),
        };
    },
};
//# sourceMappingURL=nvItems.js.map