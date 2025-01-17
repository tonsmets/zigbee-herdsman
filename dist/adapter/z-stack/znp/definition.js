"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../unpi/constants");
const parameterType_1 = __importDefault(require("./parameterType"));
const Definition = {
    [constants_1.Subsystem.SYS]: [
        {
            name: 'resetReq',
            ID: 0,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'type', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'ping',
            ID: 1,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'capabilities', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'version',
            ID: 2,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'transportrev', parameterType: parameterType_1.default.UINT8 },
                { name: 'product', parameterType: parameterType_1.default.UINT8 },
                { name: 'majorrel', parameterType: parameterType_1.default.UINT8 },
                { name: 'minorrel', parameterType: parameterType_1.default.UINT8 },
                //{name: 'maintrel', parameterType: ParameterType.UINT8},
                { name: 'revision', parameterType: parameterType_1.default.UINT32 },
            ],
        },
        {
            name: 'setExtAddr',
            ID: 3,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'extaddress', parameterType: parameterType_1.default.IEEEADDR },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'getExtAddr',
            ID: 4,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'extaddress', parameterType: parameterType_1.default.IEEEADDR },
            ],
        },
        {
            name: 'ramRead',
            ID: 5,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'address', parameterType: parameterType_1.default.UINT16 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'value', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'ramWrite',
            ID: 6,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'address', parameterType: parameterType_1.default.UINT16 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'value', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'osalNvItemInit',
            ID: 7,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'id', parameterType: parameterType_1.default.UINT16 },
                { name: 'len', parameterType: parameterType_1.default.UINT16 },
                { name: 'initlen', parameterType: parameterType_1.default.UINT8 },
                { name: 'initvalue', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'osalNvRead',
            ID: 8,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'id', parameterType: parameterType_1.default.UINT16 },
                { name: 'offset', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'value', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'osalNvWrite',
            ID: 9,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'id', parameterType: parameterType_1.default.UINT16 },
                { name: 'offset', parameterType: parameterType_1.default.UINT8 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'value', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'osalStartTimer',
            ID: 10,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'id', parameterType: parameterType_1.default.UINT8 },
                { name: 'timeout', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'osalStopTimer',
            ID: 11,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'id', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'random',
            ID: 12,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'value', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'adcRead',
            ID: 13,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'channel', parameterType: parameterType_1.default.UINT8 },
                { name: 'resolution', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'value', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'gpio',
            ID: 14,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'operation', parameterType: parameterType_1.default.UINT8 },
                { name: 'value', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'value', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'stackTune',
            ID: 15,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'operation', parameterType: parameterType_1.default.UINT8 },
                { name: 'value', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'value', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'setTime',
            ID: 16,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'utc', parameterType: parameterType_1.default.UINT32 },
                { name: 'hour', parameterType: parameterType_1.default.UINT8 },
                { name: 'minute', parameterType: parameterType_1.default.UINT8 },
                { name: 'second', parameterType: parameterType_1.default.UINT8 },
                { name: 'month', parameterType: parameterType_1.default.UINT8 },
                { name: 'day', parameterType: parameterType_1.default.UINT8 },
                { name: 'year', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'getTime',
            ID: 17,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'utc', parameterType: parameterType_1.default.UINT32 },
                { name: 'hour', parameterType: parameterType_1.default.UINT8 },
                { name: 'minute', parameterType: parameterType_1.default.UINT8 },
                { name: 'second', parameterType: parameterType_1.default.UINT8 },
                { name: 'month', parameterType: parameterType_1.default.UINT8 },
                { name: 'day', parameterType: parameterType_1.default.UINT8 },
                { name: 'year', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'osalNvDelete',
            ID: 18,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'id', parameterType: parameterType_1.default.UINT16 },
                { name: 'len', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'osalNvLength',
            ID: 19,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'id', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'length', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'setTxPower',
            ID: 20,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'level', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'txpower', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'jammerParameters',
            ID: 21,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'jmrcntievents', parameterType: parameterType_1.default.UINT16 },
                { name: 'jmrhinoiselvl', parameterType: parameterType_1.default.UINT8 },
                { name: 'jmrdetectperiod', parameterType: parameterType_1.default.UINT32 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'snifferParameters',
            ID: 22,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'param', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'zdiagsInitStats',
            ID: 23,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'zdiagsClearStats',
            ID: 24,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'clearnv', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'sysclock', parameterType: parameterType_1.default.UINT32 },
            ],
        },
        {
            name: 'zdiagsGetStats',
            ID: 25,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'attributeid', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'attributevalue', parameterType: parameterType_1.default.UINT32 },
            ],
        },
        {
            name: 'zdiagsRestoreStatsNv',
            ID: 26,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'zdiagsSaveStatsToNv',
            ID: 27,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'sysclock', parameterType: parameterType_1.default.UINT32 },
            ],
        },
        {
            name: 'osalNvReadExt',
            ID: 28,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'id', parameterType: parameterType_1.default.UINT16 },
                { name: 'offset', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'value', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'osalNvWriteExt',
            ID: 29,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'id', parameterType: parameterType_1.default.UINT16 },
                { name: 'offset', parameterType: parameterType_1.default.UINT16 },
                { name: 'len', parameterType: parameterType_1.default.UINT16 },
                { name: 'value', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'nvCreate',
            ID: 48,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'sysid', parameterType: parameterType_1.default.UINT8 },
                { name: 'itemid', parameterType: parameterType_1.default.UINT16 },
                { name: 'subid', parameterType: parameterType_1.default.UINT16 },
                { name: 'len', parameterType: parameterType_1.default.UINT32 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'nvDelete',
            ID: 49,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'sysid', parameterType: parameterType_1.default.UINT8 },
                { name: 'itemid', parameterType: parameterType_1.default.UINT16 },
                { name: 'subid', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'nvLength',
            ID: 50,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'sysid', parameterType: parameterType_1.default.UINT8 },
                { name: 'itemid', parameterType: parameterType_1.default.UINT16 },
                { name: 'subid', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'nvRead',
            ID: 51,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'sysid', parameterType: parameterType_1.default.UINT8 },
                { name: 'itemid', parameterType: parameterType_1.default.UINT16 },
                { name: 'subid', parameterType: parameterType_1.default.UINT16 },
                { name: 'offset', parameterType: parameterType_1.default.UINT16 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'value', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'nvWrite',
            ID: 52,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'sysid', parameterType: parameterType_1.default.UINT8 },
                { name: 'itemid', parameterType: parameterType_1.default.UINT16 },
                { name: 'subid', parameterType: parameterType_1.default.UINT16 },
                { name: 'offset', parameterType: parameterType_1.default.UINT16 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'value', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'nvUpdate',
            ID: 53,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'sysid', parameterType: parameterType_1.default.UINT8 },
                { name: 'itemid', parameterType: parameterType_1.default.UINT16 },
                { name: 'subid', parameterType: parameterType_1.default.UINT16 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'value', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'nvCompact',
            ID: 54,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'threshold', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'resetInd',
            ID: 128,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'reason', parameterType: parameterType_1.default.UINT8 },
                { name: 'transportrev', parameterType: parameterType_1.default.UINT8 },
                { name: 'productid', parameterType: parameterType_1.default.UINT8 },
                { name: 'majorrel', parameterType: parameterType_1.default.UINT8 },
                { name: 'minorrel', parameterType: parameterType_1.default.UINT8 },
                { name: 'hwrev', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'osalTimerExpired',
            ID: 129,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'id', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'jammerInd',
            ID: 130,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'jammerind', parameterType: parameterType_1.default.UINT8 },
            ],
        },
    ],
    [constants_1.Subsystem.MAC]: [
        {
            name: 'resetReq',
            ID: 1,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'setdefault', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'init',
            ID: 2,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'startReq',
            ID: 3,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'starttime', parameterType: parameterType_1.default.UINT32 },
                { name: 'panid', parameterType: parameterType_1.default.UINT16 },
                { name: 'logicalchannel', parameterType: parameterType_1.default.UINT8 },
                { name: 'channelpage', parameterType: parameterType_1.default.UINT8 },
                { name: 'beaconorder', parameterType: parameterType_1.default.UINT8 },
                { name: 'superframeorder', parameterType: parameterType_1.default.UINT8 },
                { name: 'pancoordinator', parameterType: parameterType_1.default.UINT8 },
                { name: 'batterylifeext', parameterType: parameterType_1.default.UINT8 },
                { name: 'coordrealignment', parameterType: parameterType_1.default.UINT8 },
                { name: 'realignkeysource', parameterType: parameterType_1.default.BUFFER },
                { name: 'realignsecuritylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'realignkeyidmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'realignkeyindex', parameterType: parameterType_1.default.UINT8 },
                { name: 'beaconkeysource', parameterType: parameterType_1.default.BUFFER },
                { name: 'beaconsecuritylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'beaconkeyidmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'beaconkeyindex', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'syncReq',
            ID: 4,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'logicalchannel', parameterType: parameterType_1.default.UINT8 },
                { name: 'channelpage', parameterType: parameterType_1.default.UINT8 },
                { name: 'trackbeacon', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'dataReq',
            ID: 5,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'destaddressmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'destaddress', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'destpanid', parameterType: parameterType_1.default.UINT16 },
                { name: 'srcaddressmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'handle', parameterType: parameterType_1.default.UINT8 },
                { name: 'txoption', parameterType: parameterType_1.default.UINT8 },
                { name: 'logicalchannel', parameterType: parameterType_1.default.UINT8 },
                { name: 'power', parameterType: parameterType_1.default.UINT8 },
                { name: 'keysource', parameterType: parameterType_1.default.BUFFER },
                { name: 'securitylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyidmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyindex', parameterType: parameterType_1.default.UINT8 },
                { name: 'msdulength', parameterType: parameterType_1.default.UINT8 },
                { name: 'msdu', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'associateReq',
            ID: 6,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'logicalchannel', parameterType: parameterType_1.default.UINT8 },
                { name: 'channelpage', parameterType: parameterType_1.default.UINT8 },
                { name: 'coordaddressmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'coordaddress', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'coordpanid', parameterType: parameterType_1.default.UINT16 },
                { name: 'capabilityinformation', parameterType: parameterType_1.default.UINT8 },
                { name: 'keysource', parameterType: parameterType_1.default.BUFFER },
                { name: 'securitylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyidmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyindex', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'disassociateReq',
            ID: 7,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'deviceaddressmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'deviceaddress', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'devicepanid', parameterType: parameterType_1.default.UINT16 },
                { name: 'disassociatereason', parameterType: parameterType_1.default.UINT8 },
                { name: 'txindirect', parameterType: parameterType_1.default.UINT8 },
                { name: 'keysource', parameterType: parameterType_1.default.BUFFER },
                { name: 'securitylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyidmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyindex', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'getReq',
            ID: 8,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'attribute', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'data', parameterType: parameterType_1.default.BUFFER16 },
            ],
        },
        {
            name: 'setReq',
            ID: 9,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'attribute', parameterType: parameterType_1.default.UINT8 },
                { name: 'attributevalue', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'scanReq',
            ID: 12,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'scanchannels', parameterType: parameterType_1.default.UINT32 },
                { name: 'scantype', parameterType: parameterType_1.default.UINT8 },
                { name: 'scanduration', parameterType: parameterType_1.default.UINT8 },
                { name: 'channelpage', parameterType: parameterType_1.default.UINT8 },
                { name: 'maxresults', parameterType: parameterType_1.default.UINT8 },
                { name: 'keysource', parameterType: parameterType_1.default.BUFFER },
                { name: 'securitylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyidmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyindex', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'pollReq',
            ID: 13,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'coordaddressmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'coordaddress', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'coordpanid', parameterType: parameterType_1.default.UINT16 },
                { name: 'keysource', parameterType: parameterType_1.default.BUFFER },
                { name: 'securitylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyidmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyindex', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'purgeReq',
            ID: 14,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'msduhandle', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'setRxGainReq',
            ID: 15,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'mode', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'securityGetReq',
            ID: 48,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'attribute', parameterType: parameterType_1.default.UINT8 },
                { name: 'index1', parameterType: parameterType_1.default.UINT8 },
                { name: 'index2', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'securitySetReq',
            ID: 49,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'attribute', parameterType: parameterType_1.default.UINT8 },
                { name: 'attributevalue', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'associateRsp',
            ID: 80,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'extaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'assocshortaddress', parameterType: parameterType_1.default.UINT16 },
                { name: 'assocstatus', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'orphanRsp',
            ID: 81,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'extaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'assocshortaddress', parameterType: parameterType_1.default.UINT16 },
                { name: 'associatedmember', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'syncLossInd',
            ID: 128,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'panid', parameterType: parameterType_1.default.UINT16 },
                { name: 'logicalchannel', parameterType: parameterType_1.default.UINT8 },
                { name: 'channelpage', parameterType: parameterType_1.default.UINT8 },
                { name: 'keysource', parameterType: parameterType_1.default.BUFFER8 },
                { name: 'securitylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyidmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyindex', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'associateInd',
            ID: 129,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'deviceextendedaddress', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'capabilities', parameterType: parameterType_1.default.UINT8 },
                { name: 'keysource', parameterType: parameterType_1.default.BUFFER8 },
                { name: 'securitylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyidmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyindex', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'associateCnf',
            ID: 130,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'deviceshortaddress', parameterType: parameterType_1.default.UINT16 },
                { name: 'keysource', parameterType: parameterType_1.default.BUFFER8 },
                { name: 'securitylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyidmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyindex', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'beaconNotifyInd',
            ID: 131,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'bsn', parameterType: parameterType_1.default.UINT8 },
                { name: 'timestamp', parameterType: parameterType_1.default.UINT32 },
                { name: 'coordinatoraddressmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'coordinatorextendedaddress', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'panid', parameterType: parameterType_1.default.UINT16 },
                { name: 'superframespec', parameterType: parameterType_1.default.UINT16 },
                { name: 'logicalchannel', parameterType: parameterType_1.default.UINT8 },
                { name: 'gtspermit', parameterType: parameterType_1.default.UINT8 },
                { name: 'linkquality', parameterType: parameterType_1.default.UINT8 },
                { name: 'securityfailure', parameterType: parameterType_1.default.UINT8 },
                { name: 'keysource', parameterType: parameterType_1.default.BUFFER8 },
                { name: 'securitylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyidmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyindex', parameterType: parameterType_1.default.UINT8 },
                { name: 'pendingaddrspec', parameterType: parameterType_1.default.UINT8 },
                { name: 'addresslist', parameterType: parameterType_1.default.BUFFER32 },
                { name: 'sdulength', parameterType: parameterType_1.default.UINT8 },
                { name: 'nsdu', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'dataCnf',
            ID: 132,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'handle', parameterType: parameterType_1.default.UINT8 },
                { name: 'timestamp', parameterType: parameterType_1.default.UINT32 },
                { name: 'timestamp2', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'dataInd',
            ID: 133,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddrmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'srcaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'dstaddrmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'dstaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'timestamp', parameterType: parameterType_1.default.UINT32 },
                { name: 'timestamp2', parameterType: parameterType_1.default.UINT16 },
                { name: 'srcpanid', parameterType: parameterType_1.default.UINT16 },
                { name: 'dstpanid', parameterType: parameterType_1.default.UINT16 },
                { name: 'linkquality', parameterType: parameterType_1.default.UINT8 },
                { name: 'correlation', parameterType: parameterType_1.default.UINT8 },
                { name: 'rssi', parameterType: parameterType_1.default.UINT8 },
                { name: 'dsn', parameterType: parameterType_1.default.UINT8 },
                { name: 'keysource', parameterType: parameterType_1.default.BUFFER8 },
                { name: 'securitylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyidmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyindex', parameterType: parameterType_1.default.UINT8 },
                { name: 'length', parameterType: parameterType_1.default.UINT8 },
                { name: 'data', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'disassociateInd',
            ID: 134,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'extendedaddress', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'disassociatereason', parameterType: parameterType_1.default.UINT8 },
                { name: 'keysource', parameterType: parameterType_1.default.BUFFER8 },
                { name: 'securitylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyidmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyindex', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'disassociateCnf',
            ID: 135,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'deviceaddrmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'deviceaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'devicepanid', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'orphanInd',
            ID: 138,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'extendedaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'keysource', parameterType: parameterType_1.default.BUFFER8 },
                { name: 'securitylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyidmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyindex', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'pollCnf',
            ID: 139,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'scanCnf',
            ID: 140,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'ed', parameterType: parameterType_1.default.UINT8 },
                { name: 'scantype', parameterType: parameterType_1.default.UINT8 },
                { name: 'channelpage', parameterType: parameterType_1.default.UINT8 },
                { name: 'unscannedchannellist', parameterType: parameterType_1.default.UINT32 },
                { name: 'resultlistcount', parameterType: parameterType_1.default.UINT8 },
                { name: 'resultlistmaxlength', parameterType: parameterType_1.default.UINT8 },
                { name: 'resultlist', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'commStatusInd',
            ID: 141,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'srcaddrmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'srcaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'dstaddrmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'dstaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'devicepanid', parameterType: parameterType_1.default.UINT16 },
                { name: 'reason', parameterType: parameterType_1.default.UINT8 },
                { name: 'keysource', parameterType: parameterType_1.default.BUFFER8 },
                { name: 'securitylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyidmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'keyindex', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'startCnf',
            ID: 142,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'rxEnableCnf',
            ID: 143,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'purgeCnf',
            ID: 144,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'handle', parameterType: parameterType_1.default.UINT8 },
            ],
        },
    ],
    [constants_1.Subsystem.AF]: [
        {
            name: 'register',
            ID: 0,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'appprofid', parameterType: parameterType_1.default.UINT16 },
                { name: 'appdeviceid', parameterType: parameterType_1.default.UINT16 },
                { name: 'appdevver', parameterType: parameterType_1.default.UINT8 },
                { name: 'latencyreq', parameterType: parameterType_1.default.UINT8 },
                { name: 'appnuminclusters', parameterType: parameterType_1.default.UINT8 },
                { name: 'appinclusterlist', parameterType: parameterType_1.default.LIST_UINT16 },
                { name: 'appnumoutclusters', parameterType: parameterType_1.default.UINT8 },
                { name: 'appoutclusterlist', parameterType: parameterType_1.default.LIST_UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'dataRequest',
            ID: 1,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'destendpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'srcendpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'clusterid', parameterType: parameterType_1.default.UINT16 },
                { name: 'transid', parameterType: parameterType_1.default.UINT8 },
                { name: 'options', parameterType: parameterType_1.default.UINT8 },
                { name: 'radius', parameterType: parameterType_1.default.UINT8 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'data', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'dataRequestExt',
            ID: 2,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddrmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'dstaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'destendpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'dstpanid', parameterType: parameterType_1.default.UINT16 },
                { name: 'srcendpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'clusterid', parameterType: parameterType_1.default.UINT16 },
                { name: 'transid', parameterType: parameterType_1.default.UINT8 },
                { name: 'options', parameterType: parameterType_1.default.UINT8 },
                { name: 'radius', parameterType: parameterType_1.default.UINT8 },
                { name: 'len', parameterType: parameterType_1.default.UINT16 },
                { name: 'data', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'dataRequestSrcRtg',
            ID: 3,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'destendpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'srcendpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'clusterid', parameterType: parameterType_1.default.UINT16 },
                { name: 'transid', parameterType: parameterType_1.default.UINT8 },
                { name: 'options', parameterType: parameterType_1.default.UINT8 },
                { name: 'radius', parameterType: parameterType_1.default.UINT8 },
                { name: 'relaycount', parameterType: parameterType_1.default.UINT8 },
                { name: 'relaylist', parameterType: parameterType_1.default.LIST_UINT16 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'data', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'delete',
            ID: 4,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'interPanCtl',
            ID: 16,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'cmd', parameterType: parameterType_1.default.UINT8 },
                { name: 'data', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'dataStore',
            ID: 17,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'index', parameterType: parameterType_1.default.UINT16 },
                { name: 'length', parameterType: parameterType_1.default.UINT8 },
                { name: 'data', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'dataRetrieve',
            ID: 18,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'timestamp', parameterType: parameterType_1.default.UINT32 },
                { name: 'index', parameterType: parameterType_1.default.UINT16 },
                { name: 'length', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'length', parameterType: parameterType_1.default.UINT8 },
                { name: 'data', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'apsfConfigSet',
            ID: 19,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'framedelay', parameterType: parameterType_1.default.UINT8 },
                { name: 'windowsize', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'apsfConfigGet',
            ID: 20,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'framedelay', parameterType: parameterType_1.default.UINT8 },
                { name: 'windowsize', parameterType: parameterType_1.default.UINT8 },
                { name: 'nomean', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'dataConfirm',
            ID: 128,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'transid', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'incomingMsg',
            ID: 129,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'groupid', parameterType: parameterType_1.default.UINT16 },
                { name: 'clusterid', parameterType: parameterType_1.default.UINT16 },
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'srcendpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'dstendpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'wasbroadcast', parameterType: parameterType_1.default.UINT8 },
                { name: 'linkquality', parameterType: parameterType_1.default.UINT8 },
                { name: 'securityuse', parameterType: parameterType_1.default.UINT8 },
                { name: 'timestamp', parameterType: parameterType_1.default.UINT32 },
                { name: 'transseqnumber', parameterType: parameterType_1.default.UINT8 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'data', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'incomingMsgExt',
            ID: 130,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'groupid', parameterType: parameterType_1.default.UINT16 },
                { name: 'clusterid', parameterType: parameterType_1.default.UINT16 },
                { name: 'srcaddrmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'srcaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'srcendpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'srcpanid', parameterType: parameterType_1.default.UINT16 },
                { name: 'dstendpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'wasbroadcast', parameterType: parameterType_1.default.UINT8 },
                { name: 'linkquality', parameterType: parameterType_1.default.UINT8 },
                { name: 'securityuse', parameterType: parameterType_1.default.UINT8 },
                { name: 'timestamp', parameterType: parameterType_1.default.UINT32 },
                { name: 'transseqnumber', parameterType: parameterType_1.default.UINT8 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'data', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'reflectError',
            ID: 131,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'transid', parameterType: parameterType_1.default.UINT8 },
                { name: 'dstaddrmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
            ],
        },
    ],
    [constants_1.Subsystem.ZDO]: [
        {
            name: 'nwkAddrReq',
            ID: 0,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'ieeeaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'reqtype', parameterType: parameterType_1.default.UINT8 },
                { name: 'startindex', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'ieeeAddrReq',
            ID: 1,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'shortaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'reqtype', parameterType: parameterType_1.default.UINT8 },
                { name: 'startindex', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'nodeDescReq',
            ID: 2,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'nwkaddrofinterest', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'powerDescReq',
            ID: 3,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'nwkaddrofinterest', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'simpleDescReq',
            ID: 4,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'nwkaddrofinterest', parameterType: parameterType_1.default.UINT16 },
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'activeEpReq',
            ID: 5,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'nwkaddrofinterest', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'matchDescReq',
            ID: 6,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'nwkaddrofinterest', parameterType: parameterType_1.default.UINT16 },
                { name: 'profileid', parameterType: parameterType_1.default.UINT16 },
                { name: 'numinclusters', parameterType: parameterType_1.default.UINT8 },
                { name: 'inclusterlist', parameterType: parameterType_1.default.LIST_UINT16 },
                { name: 'numoutclusters', parameterType: parameterType_1.default.UINT8 },
                { name: 'outclusterlist', parameterType: parameterType_1.default.LIST_UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'complexDescReq',
            ID: 7,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'nwkaddrofinterest', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'userDescReq',
            ID: 8,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'nwkaddrofinterest', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'endDeviceAnnce',
            ID: 10,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'ieeeaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'capability', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'userDescSet',
            ID: 11,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'nwkaddrofinterest', parameterType: parameterType_1.default.UINT16 },
                { name: 'descriptor_len', parameterType: parameterType_1.default.UINT8 },
                { name: 'userdescriptor', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'serverDiscReq',
            ID: 12,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'servermask', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'endDeviceBindReq',
            ID: 32,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'localcoord', parameterType: parameterType_1.default.UINT16 },
                { name: 'localieee', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'profileid', parameterType: parameterType_1.default.UINT16 },
                { name: 'numinclusters', parameterType: parameterType_1.default.UINT8 },
                { name: 'inclusterlist', parameterType: parameterType_1.default.LIST_UINT16 },
                { name: 'numoutclusters', parameterType: parameterType_1.default.UINT8 },
                { name: 'outclusterlist', parameterType: parameterType_1.default.LIST_UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'bindReq',
            ID: 33,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'srcaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'srcendpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'clusterid', parameterType: parameterType_1.default.UINT16 },
                { name: 'dstaddrmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'dstaddress', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'dstendpoint', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'unbindReq',
            ID: 34,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'srcaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'srcendpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'clusterid', parameterType: parameterType_1.default.UINT16 },
                { name: 'dstaddrmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'dstaddress', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'dstendpoint', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'setLinkKey',
            ID: 35,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'shortaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'ieeeaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'linkkey', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'removeLinkKey',
            ID: 36,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'ieeeaddr', parameterType: parameterType_1.default.IEEEADDR },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'getLinkKey',
            ID: 37,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'ieeeaddr', parameterType: parameterType_1.default.IEEEADDR },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'ieeeaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'linkkeydata', parameterType: parameterType_1.default.BUFFER16 },
            ],
        },
        {
            name: 'nwkDiscoveryReq',
            ID: 38,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'scanchannels', parameterType: parameterType_1.default.UINT32 },
                { name: 'scanduration', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'joinReq',
            ID: 39,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'logicalchannel', parameterType: parameterType_1.default.UINT8 },
                { name: 'panid', parameterType: parameterType_1.default.UINT16 },
                { name: 'extendedpanid', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'chosenparent', parameterType: parameterType_1.default.UINT16 },
                { name: 'parentdepth', parameterType: parameterType_1.default.UINT8 },
                { name: 'stackprofile', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'mgmtNwkDiscReq',
            ID: 48,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'scanchannels', parameterType: parameterType_1.default.UINT32 },
                { name: 'scanduration', parameterType: parameterType_1.default.UINT8 },
                { name: 'startindex', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'mgmtLqiReq',
            ID: 49,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'startindex', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'mgmtRtgReq',
            ID: 50,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'startindex', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'mgmtBindReq',
            ID: 51,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'startindex', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'mgmtLeaveReq',
            ID: 52,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'deviceaddress', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'removechildrenRejoin', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'mgmtDirectJoinReq',
            ID: 53,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'deviceaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'capinfo', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'mgmtPermitJoinReq',
            ID: 54,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'addrmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'duration', parameterType: parameterType_1.default.UINT8 },
                { name: 'tcsignificance', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'mgmtNwkUpdateReq',
            ID: 55,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'dstaddrmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'channelmask', parameterType: parameterType_1.default.UINT32 },
                { name: 'scanduration', parameterType: parameterType_1.default.UINT8 },
                { name: 'scancount', parameterType: parameterType_1.default.UINT8 },
                { name: 'nwkmanageraddr', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'msgCbRegister',
            ID: 62,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'clusterid', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'msgCbRemove',
            ID: 63,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'clusterid', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'startupFromApp',
            ID: 64,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'startdelay', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'autoFindDestination',
            ID: 65,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'nwkAddrRsp',
            ID: 128,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'ieeeaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'startindex', parameterType: parameterType_1.default.UINT8 },
                { name: 'numassocdev', parameterType: parameterType_1.default.UINT8 },
                { name: 'assocdevlist', parameterType: parameterType_1.default.LIST_ASSOC_DEV },
            ],
        },
        {
            name: 'ieeeAddrRsp',
            ID: 129,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'ieeeaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'startindex', parameterType: parameterType_1.default.UINT8 },
                { name: 'numassocdev', parameterType: parameterType_1.default.UINT8 },
                { name: 'assocdevlist', parameterType: parameterType_1.default.LIST_ASSOC_DEV },
            ],
        },
        {
            name: 'nodeDescRsp',
            ID: 130,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'logicaltype_cmplxdescavai_userdescavai', parameterType: parameterType_1.default.UINT8 },
                { name: 'apsflags_freqband', parameterType: parameterType_1.default.UINT8 },
                { name: 'maccapflags', parameterType: parameterType_1.default.UINT8 },
                { name: 'manufacturercode', parameterType: parameterType_1.default.UINT16 },
                { name: 'maxbuffersize', parameterType: parameterType_1.default.UINT8 },
                { name: 'maxintransfersize', parameterType: parameterType_1.default.UINT16 },
                { name: 'servermask', parameterType: parameterType_1.default.UINT16 },
                { name: 'maxouttransfersize', parameterType: parameterType_1.default.UINT16 },
                { name: 'descriptorcap', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'powerDescRsp',
            ID: 131,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'currentpowermode_avaipowersrc', parameterType: parameterType_1.default.UINT8 },
                { name: 'currentpowersrc_currentpowersrclevel', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'simpleDescRsp',
            ID: 132,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'profileid', parameterType: parameterType_1.default.UINT16 },
                { name: 'deviceid', parameterType: parameterType_1.default.UINT16 },
                { name: 'deviceversion', parameterType: parameterType_1.default.UINT8 },
                { name: 'numinclusters', parameterType: parameterType_1.default.UINT8 },
                { name: 'inclusterlist', parameterType: parameterType_1.default.LIST_UINT16 },
                { name: 'numoutclusters', parameterType: parameterType_1.default.UINT8 },
                { name: 'outclusterlist', parameterType: parameterType_1.default.LIST_UINT16 },
            ],
        },
        {
            name: 'activeEpRsp',
            ID: 133,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'activeepcount', parameterType: parameterType_1.default.UINT8 },
                { name: 'activeeplist', parameterType: parameterType_1.default.LIST_UINT8 },
            ],
        },
        {
            name: 'matchDescRsp',
            ID: 134,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'matchlength', parameterType: parameterType_1.default.UINT8 },
                { name: 'matchlist', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'complexDescRsp',
            ID: 135,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'complexlength', parameterType: parameterType_1.default.UINT8 },
                { name: 'complexdesclist', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'userDescRsp',
            ID: 136,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'userlength', parameterType: parameterType_1.default.UINT8 },
                { name: 'userdescriptor', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'userDescConf',
            ID: 137,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'serverDiscRsp',
            ID: 138,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'servermask', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'endDeviceBindRsp',
            ID: 160,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'bindRsp',
            ID: 161,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'unbindRsp',
            ID: 162,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'mgmtNwkDiscRsp',
            ID: 176,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'networkcount', parameterType: parameterType_1.default.UINT8 },
                { name: 'startindex', parameterType: parameterType_1.default.UINT8 },
                { name: 'networklistcount', parameterType: parameterType_1.default.UINT8 },
                { name: 'networklist', parameterType: parameterType_1.default.LIST_NETWORK },
            ],
        },
        {
            name: 'mgmtLqiRsp',
            ID: 177,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'neighbortableentries', parameterType: parameterType_1.default.UINT8 },
                { name: 'startindex', parameterType: parameterType_1.default.UINT8 },
                { name: 'neighborlqilistcount', parameterType: parameterType_1.default.UINT8 },
                { name: 'neighborlqilist', parameterType: parameterType_1.default.LIST_NEIGHBOR_LQI },
            ],
        },
        {
            name: 'mgmtRtgRsp',
            ID: 178,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'routingtableentries', parameterType: parameterType_1.default.UINT8 },
                { name: 'startindex', parameterType: parameterType_1.default.UINT8 },
                { name: 'routingtablelistcount', parameterType: parameterType_1.default.UINT8 },
                { name: 'routingtablelist', parameterType: parameterType_1.default.LIST_ROUTING_TABLE },
            ],
        },
        {
            name: 'mgmtBindRsp',
            ID: 179,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'bindingtableentries', parameterType: parameterType_1.default.UINT8 },
                { name: 'startindex', parameterType: parameterType_1.default.UINT8 },
                { name: 'bindingtablelistcount', parameterType: parameterType_1.default.UINT8 },
                { name: 'bindingtablelist', parameterType: parameterType_1.default.LIST_BIND_TABLE },
            ],
        },
        {
            name: 'mgmtLeaveRsp',
            ID: 180,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'mgmtDirectJoinRsp',
            ID: 181,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'mgmtPermitJoinRsp',
            ID: 182,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'stateChangeInd',
            ID: 192,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'state', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'endDeviceAnnceInd',
            ID: 193,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'ieeeaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'capabilities', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'matchDescRspSent',
            ID: 194,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'numinclusters', parameterType: parameterType_1.default.UINT8 },
                { name: 'inclusterlist', parameterType: parameterType_1.default.LIST_UINT16 },
                { name: 'numoutclusters', parameterType: parameterType_1.default.UINT8 },
                { name: 'outclusterlist', parameterType: parameterType_1.default.LIST_UINT16 },
            ],
        },
        {
            name: 'statusErrorRsp',
            ID: 195,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'srcRtgInd',
            ID: 196,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'relaycount', parameterType: parameterType_1.default.UINT8 },
                { name: 'relaylist', parameterType: parameterType_1.default.LIST_UINT16 },
            ],
        },
        {
            name: 'beacon_notify_ind',
            ID: 197,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'beaconcount', parameterType: parameterType_1.default.UINT8 },
                { name: 'beaconlist', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'joinCnf',
            ID: 198,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'deviceaddress', parameterType: parameterType_1.default.UINT16 },
                { name: 'parentaddress', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'nwkDiscoveryCnf',
            ID: 199,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'concentratorIndCb',
            ID: 200,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'extaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'pktCost', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'leaveInd',
            ID: 201,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'extaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'request', parameterType: parameterType_1.default.UINT8 },
                { name: 'removechildren', parameterType: parameterType_1.default.UINT8 },
                { name: 'rejoin', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'setRejoinParametersReq',
            ID: 204,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'backoffduration', parameterType: parameterType_1.default.UINT32 },
                { name: 'scanduration', parameterType: parameterType_1.default.UINT32 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'msgCbIncoming',
            ID: 255,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'srcaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'wasbroadcast', parameterType: parameterType_1.default.UINT8 },
                { name: 'clusterid', parameterType: parameterType_1.default.UINT16 },
                { name: 'securityuse', parameterType: parameterType_1.default.UINT8 },
                { name: 'seqnum', parameterType: parameterType_1.default.UINT8 },
                { name: 'macdstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'msgdata', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'endDeviceTimeoutReq',
            ID: 13,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'parentaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'reqrimeout', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'sendData',
            ID: 40,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'shortaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'transseq', parameterType: parameterType_1.default.UINT8 },
                { name: 'cmd', parameterType: parameterType_1.default.UINT16 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'buf', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'nwkAddrOfInterestReq',
            ID: 41,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'shortaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'cmd', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'secAddLinkKey',
            ID: 66,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'shortaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'extaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'linkkey', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'secEntryLookupExt',
            ID: 67,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'extaddr', parameterType: parameterType_1.default.IEEEADDR },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'ami', parameterType: parameterType_1.default.UINT16 },
                { name: 'keynvid', parameterType: parameterType_1.default.UINT16 },
                { name: 'authenticateoption', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'secDeviceRemove',
            ID: 68,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'extaddr', parameterType: parameterType_1.default.IEEEADDR },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'extRouteDisc',
            ID: 69,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstAddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'options', parameterType: parameterType_1.default.UINT8 },
                { name: 'radius', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'extRouteCheck',
            ID: 70,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'rtstatus', parameterType: parameterType_1.default.UINT8 },
                { name: 'options', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'extRemoveGroup',
            ID: 71,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'groupid', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'extRemoveAllGroup',
            ID: 72,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'extFindAllGroupsEndpoint',
            ID: 73,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'groups', parameterType: parameterType_1.default.UINT8 },
                { name: 'grouplist', parameterType: parameterType_1.default.LIST_UINT16 },
            ],
        },
        {
            name: 'extFindGroup',
            ID: 74,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'groupid', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'groupid', parameterType: parameterType_1.default.UINT16 },
                { name: 'namelen', parameterType: parameterType_1.default.UINT8 },
                { name: 'groupname', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'extAddGroup',
            ID: 75,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'groupid', parameterType: parameterType_1.default.UINT16 },
                { name: 'namelen', parameterType: parameterType_1.default.UINT8 },
                { name: 'groupname', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'extCountAllGroups',
            ID: 76,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'extRxIdle',
            ID: 77,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'setflag', parameterType: parameterType_1.default.UINT8 },
                { name: 'setvalue', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'extUpdateNwkKey',
            ID: 78,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'keyseqnum', parameterType: parameterType_1.default.UINT8 },
                { name: 'key', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'extSwitchNwkKey',
            ID: 79,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'dstaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'keyseqnum', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'extNwkInfo',
            ID: 80,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'shortaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'devstate', parameterType: parameterType_1.default.UINT8 },
                { name: 'panid', parameterType: parameterType_1.default.UINT16 },
                { name: 'parentaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'extendedpanid', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'parentextaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'channel', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'extSecApsRemoveReq',
            ID: 81,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'parentaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'extaddr', parameterType: parameterType_1.default.IEEEADDR },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'forceConcentratorChange',
            ID: 82,
            type: constants_1.Type.SREQ,
            request: [],
            response: [],
        },
        {
            name: 'extSetParams',
            ID: 83,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'usemulticast', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'tcDeviceInd',
            ID: 202,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'extaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'parentaddr', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'permitJoinInd',
            ID: 203,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'duration', parameterType: parameterType_1.default.UINT8 },
            ],
        },
    ],
    [constants_1.Subsystem.SAPI]: [
        {
            name: 'systemReset',
            ID: 9,
            type: constants_1.Type.AREQ,
            request: [],
        },
        {
            name: 'startRequest',
            ID: 0,
            type: constants_1.Type.SREQ,
            request: [],
            response: [],
        },
        {
            name: 'bindDevice',
            ID: 1,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'action', parameterType: parameterType_1.default.UINT8 },
                { name: 'commandid', parameterType: parameterType_1.default.UINT16 },
                { name: 'destination', parameterType: parameterType_1.default.IEEEADDR },
            ],
            response: [],
        },
        {
            name: 'allowBind',
            ID: 2,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'timeout', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [],
        },
        {
            name: 'sendDataRequest',
            ID: 3,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'destination', parameterType: parameterType_1.default.UINT16 },
                { name: 'commandid', parameterType: parameterType_1.default.UINT16 },
                { name: 'handle', parameterType: parameterType_1.default.UINT8 },
                { name: 'txoptions', parameterType: parameterType_1.default.UINT8 },
                { name: 'radius', parameterType: parameterType_1.default.UINT8 },
                { name: 'payloadlen', parameterType: parameterType_1.default.UINT8 },
                { name: 'payloadvalue', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [],
        },
        {
            name: 'readConfiguration',
            ID: 4,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'configid', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'configid', parameterType: parameterType_1.default.UINT8 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'value', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'writeConfiguration',
            ID: 5,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'configid', parameterType: parameterType_1.default.UINT8 },
                { name: 'len', parameterType: parameterType_1.default.UINT8 },
                { name: 'value', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'getDeviceInfo',
            ID: 6,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'param', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'param', parameterType: parameterType_1.default.UINT8 },
                { name: 'value', parameterType: parameterType_1.default.BUFFER8 },
            ],
        },
        {
            name: 'findDeviceRequest',
            ID: 7,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'searchKey', parameterType: parameterType_1.default.IEEEADDR },
            ],
            response: [],
        },
        {
            name: 'permitJoiningRequest',
            ID: 8,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'destination', parameterType: parameterType_1.default.UINT16 },
                { name: 'timeout', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'startConfirm',
            ID: 128,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'bindConfirm',
            ID: 129,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'commandid', parameterType: parameterType_1.default.UINT16 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'allowBindConfirm',
            ID: 130,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'source', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'sendDataConfirm',
            ID: 131,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'handle', parameterType: parameterType_1.default.UINT8 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'findDeviceConfirm',
            ID: 133,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'searchtype', parameterType: parameterType_1.default.UINT8 },
                { name: 'searchkey', parameterType: parameterType_1.default.UINT16 },
                { name: 'result', parameterType: parameterType_1.default.IEEEADDR },
            ],
        },
        {
            name: 'receiveDataIndication',
            ID: 135,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'source', parameterType: parameterType_1.default.UINT16 },
                { name: 'command', parameterType: parameterType_1.default.UINT16 },
                { name: 'len', parameterType: parameterType_1.default.UINT16 },
                { name: 'data', parameterType: parameterType_1.default.BUFFER },
            ],
        },
    ],
    [constants_1.Subsystem.UTIL]: [
        {
            name: 'getDeviceInfo',
            ID: 0,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'ieeeaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'shortaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'devicetype', parameterType: parameterType_1.default.UINT8 },
                { name: 'devicestate', parameterType: parameterType_1.default.UINT8 },
                { name: 'numassocdevices', parameterType: parameterType_1.default.UINT8 },
                { name: 'assocdeviceslist', parameterType: parameterType_1.default.LIST_UINT16 },
            ],
        },
        {
            name: 'getNvInfo',
            ID: 1,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'ieeeaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'scanchannels', parameterType: parameterType_1.default.UINT32 },
                { name: 'panid', parameterType: parameterType_1.default.UINT16 },
                { name: 'securitylevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'preconfigkey', parameterType: parameterType_1.default.BUFFER16 },
            ],
        },
        {
            name: 'setPanid',
            ID: 2,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'panid', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'setChannels',
            ID: 3,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'channels', parameterType: parameterType_1.default.UINT32 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'setSeclevel',
            ID: 4,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'securitylevel', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'setPrecfgkey',
            ID: 5,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'preconfigkey', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'callbackSubCmd',
            ID: 6,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'subsystemid', parameterType: parameterType_1.default.UINT16 },
                { name: 'action', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'keyEvent',
            ID: 7,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'keys', parameterType: parameterType_1.default.UINT8 },
                { name: 'shift', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'timeAlive',
            ID: 9,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'seconds', parameterType: parameterType_1.default.UINT32 },
            ],
        },
        {
            name: 'ledControl',
            ID: 10,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'ledid', parameterType: parameterType_1.default.UINT8 },
                { name: 'mode', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'testLoopback',
            ID: 16,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'data', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'data', parameterType: parameterType_1.default.BUFFER },
            ],
        },
        {
            name: 'dataReq',
            ID: 17,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'securityuse', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'srcMatchEnable',
            ID: 32,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'srcMatchAddEntry',
            ID: 33,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'addressmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'address', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'panid', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'srcMatchDelEntry',
            ID: 34,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'addressmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'address', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'panid', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'srcMatchCheckSrcAddr',
            ID: 35,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'addressmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'address', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'panid', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'srcMatchAckAllPending',
            ID: 36,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'option', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'srcMatchCheckAllPending',
            ID: 37,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'value', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'addrmgrExtAddrLookup',
            ID: 64,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'extaddr', parameterType: parameterType_1.default.IEEEADDR },
            ],
            response: [
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'addrmgrNwkAddrLookup',
            ID: 65,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'extaddr', parameterType: parameterType_1.default.IEEEADDR },
            ],
        },
        {
            name: 'apsmeLinkKeyDataGet',
            ID: 68,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'extaddr', parameterType: parameterType_1.default.IEEEADDR },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'seckey', parameterType: parameterType_1.default.BUFFER16 },
                { name: 'txfrmcntr', parameterType: parameterType_1.default.UINT32 },
                { name: 'rxfrmcntr', parameterType: parameterType_1.default.UINT32 },
            ],
        },
        {
            name: 'apsmeLinkKeyNvIdGet',
            ID: 69,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'extaddr', parameterType: parameterType_1.default.IEEEADDR },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'linkkeynvid', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'assocCount',
            ID: 72,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'startrelation', parameterType: parameterType_1.default.UINT8 },
                { name: 'endrelation', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'count', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'assocFindDevice',
            ID: 73,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'number', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'device', parameterType: parameterType_1.default.BUFFER18 },
            ],
        },
        {
            name: 'assocGetWithAddress',
            ID: 74,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'extaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'device', parameterType: parameterType_1.default.BUFFER18 },
            ],
        },
        {
            name: 'apsmeRequestKeyCmd',
            ID: 75,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'partneraddr', parameterType: parameterType_1.default.IEEEADDR },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'zclKeyEstInitEst',
            ID: 128,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'taskid', parameterType: parameterType_1.default.UINT8 },
                { name: 'seqnum', parameterType: parameterType_1.default.UINT8 },
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'addrmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'extaddr', parameterType: parameterType_1.default.IEEEADDR },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'zclKeyEstSign',
            ID: 129,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'inputlen', parameterType: parameterType_1.default.UINT8 },
                { name: 'input', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'key', parameterType: parameterType_1.default.BUFFER42 },
            ],
        },
        {
            name: 'syncReq',
            ID: 224,
            type: constants_1.Type.AREQ,
            request: [],
        },
        {
            name: 'zclKeyEstablishInd',
            ID: 225,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'taskid', parameterType: parameterType_1.default.UINT8 },
                { name: 'event', parameterType: parameterType_1.default.UINT8 },
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
                { name: 'waittime', parameterType: parameterType_1.default.UINT8 },
                { name: 'suite', parameterType: parameterType_1.default.UINT16 },
            ],
        },
        {
            name: 'gpioSetDirection',
            ID: 20,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'port', parameterType: parameterType_1.default.UINT8 },
                { name: 'bit', parameterType: parameterType_1.default.UINT8 },
                { name: 'direction', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'oldp0dir', parameterType: parameterType_1.default.UINT8 },
                { name: 'oldp1dir', parameterType: parameterType_1.default.UINT8 },
                { name: 'oldp2dir', parameterType: parameterType_1.default.UINT8 },
                { name: 'p0dir', parameterType: parameterType_1.default.UINT8 },
                { name: 'p1dir', parameterType: parameterType_1.default.UINT8 },
                { name: 'p2dir', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'gpioRead',
            ID: 21,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'p0', parameterType: parameterType_1.default.UINT8 },
                { name: 'p1', parameterType: parameterType_1.default.UINT8 },
                { name: 'p2', parameterType: parameterType_1.default.UINT8 },
                { name: 'p0dir', parameterType: parameterType_1.default.UINT8 },
                { name: 'p1dir', parameterType: parameterType_1.default.UINT8 },
                { name: 'p2dir', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'gpioWrite',
            ID: 22,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'port', parameterType: parameterType_1.default.UINT8 },
                { name: 'bit', parameterType: parameterType_1.default.UINT8 },
                { name: 'value', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'oldp0', parameterType: parameterType_1.default.UINT8 },
                { name: 'oldp1', parameterType: parameterType_1.default.UINT8 },
                { name: 'oldp2', parameterType: parameterType_1.default.UINT8 },
                { name: 'p0', parameterType: parameterType_1.default.UINT8 },
                { name: 'p1', parameterType: parameterType_1.default.UINT8 },
                { name: 'p2', parameterType: parameterType_1.default.UINT8 },
                { name: 'p0dir', parameterType: parameterType_1.default.UINT8 },
                { name: 'p1dir', parameterType: parameterType_1.default.UINT8 },
                { name: 'p2dir', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'srngGen',
            ID: 76,
            type: constants_1.Type.SREQ,
            request: [],
            response: [
                { name: 'outrng', parameterType: parameterType_1.default.BUFFER100 },
            ],
        },
        {
            name: 'bindAddEntry',
            ID: 77,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'addrmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'dstaddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'dstendpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'numclusterids', parameterType: parameterType_1.default.UINT8 },
                { name: 'clusterids', parameterType: parameterType_1.default.LIST_UINT16 },
            ],
            response: [
                { name: 'srcep', parameterType: parameterType_1.default.UINT8 },
                { name: 'dstgroupmode', parameterType: parameterType_1.default.UINT8 },
                { name: 'dstidx', parameterType: parameterType_1.default.UINT16 },
                { name: 'dstep', parameterType: parameterType_1.default.UINT8 },
                { name: 'numclusterids', parameterType: parameterType_1.default.UINT8 },
                { name: 'clusterids', parameterType: parameterType_1.default.BUFFER8 },
            ],
        },
    ],
    [constants_1.Subsystem.DEBUG]: [
        {
            name: 'setThreshold',
            ID: 0,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'componentid', parameterType: parameterType_1.default.UINT8 },
                { name: 'threshold', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'msg',
            ID: 128,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'length', parameterType: parameterType_1.default.UINT8 },
                { name: 'string', parameterType: parameterType_1.default.BUFFER },
            ],
        },
    ],
    [constants_1.Subsystem.APP]: [
        {
            name: 'msg',
            ID: 0,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'appendpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'destaddress', parameterType: parameterType_1.default.UINT16 },
                { name: 'destendpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'clusterid', parameterType: parameterType_1.default.UINT16 },
                { name: 'msglen', parameterType: parameterType_1.default.UINT8 },
                { name: 'message', parameterType: parameterType_1.default.BUFFER },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'userTest',
            ID: 1,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'srcep', parameterType: parameterType_1.default.UINT8 },
                { name: 'commandid', parameterType: parameterType_1.default.UINT16 },
                { name: 'param1', parameterType: parameterType_1.default.UINT16 },
                { name: 'param2', parameterType: parameterType_1.default.UINT16 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'zllTlInd',
            ID: 129,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'nwkaddr', parameterType: parameterType_1.default.UINT16 },
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'profileid', parameterType: parameterType_1.default.UINT16 },
                { name: 'deviceid', parameterType: parameterType_1.default.UINT16 },
                { name: 'version', parameterType: parameterType_1.default.UINT8 },
            ],
        },
    ],
    [constants_1.Subsystem.APP_CNF]: [
        {
            name: 'bdbStartCommissioning',
            ID: 5,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'mode', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'bdbSetChannel',
            ID: 8,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'isPrimary', parameterType: parameterType_1.default.UINT8 },
                { name: 'channel', parameterType: parameterType_1.default.UINT32 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
        {
            name: 'bdbComissioningNotifcation',
            ID: 128,
            type: constants_1.Type.AREQ,
            request: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
    ],
    [constants_1.Subsystem.GREENPOWER]: [
        {
            name: 'secReq',
            ID: 3,
            type: constants_1.Type.SREQ,
            request: [
                { name: 'applicationID', parameterType: parameterType_1.default.UINT8 },
                { name: 'srcID', parameterType: parameterType_1.default.UINT32 },
                { name: 'gdpIeeeAddr', parameterType: parameterType_1.default.IEEEADDR },
                { name: 'endpoint', parameterType: parameterType_1.default.UINT8 },
                { name: 'gpdfSecurityLevel', parameterType: parameterType_1.default.UINT8 },
                { name: 'gpdfSecurityFrameCounter', parameterType: parameterType_1.default.UINT8 },
                { name: 'dgpStubHandle', parameterType: parameterType_1.default.UINT8 },
            ],
            response: [
                { name: 'status', parameterType: parameterType_1.default.UINT8 },
            ],
        },
    ],
};
exports.default = Definition;
//# sourceMappingURL=definition.js.map