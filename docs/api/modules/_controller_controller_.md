[zigbee-herdsman](../README.md) › ["controller/controller"](_controller_controller_.md)

# External module: "controller/controller"

## Index

### Classes

* [Controller](../classes/_controller_controller_.controller.md)

### Interfaces

* [Options](../interfaces/_controller_controller_.options.md)

### Object literals

* [DefaultOptions](_controller_controller_.md#const-defaultoptions)
* [debug](_controller_controller_.md#const-debug)

## Object literals

### `Const` DefaultOptions

### ▪ **DefaultOptions**: *object*

*Defined in [controller/controller.ts:29](https://github.com/Koenkk/zigbee-herdsman/blob/master/src/controller/controller.ts#L29)*

###  acceptJoiningDeviceHandler

• **acceptJoiningDeviceHandler**: *null* =  null

*Defined in [controller/controller.ts:44](https://github.com/Koenkk/zigbee-herdsman/blob/master/src/controller/controller.ts#L44)*

###  backupPath

• **backupPath**: *null* =  null

*Defined in [controller/controller.ts:43](https://github.com/Koenkk/zigbee-herdsman/blob/master/src/controller/controller.ts#L43)*

###  databasePath

• **databasePath**: *null* =  null

*Defined in [controller/controller.ts:42](https://github.com/Koenkk/zigbee-herdsman/blob/master/src/controller/controller.ts#L42)*

▪ **network**: *object*

*Defined in [controller/controller.ts:30](https://github.com/Koenkk/zigbee-herdsman/blob/master/src/controller/controller.ts#L30)*

* **channelList**: *number[]* =  [11]

* **extenedPanID**: *number[]* =  [0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD]

* **networkKey**: *number[]* =  [0x01, 0x03, 0x05, 0x07, 0x09, 0x0B, 0x0D, 0x0F, 0x00, 0x02, 0x04, 0x06, 0x08, 0x0A, 0x0C, 0x0D]

* **networkKeyDistribute**: *false* = false

* **panID**: *number* = 6754

▪ **serialPort**: *object*

*Defined in [controller/controller.ts:37](https://github.com/Koenkk/zigbee-herdsman/blob/master/src/controller/controller.ts#L37)*

* **baudRate**: *number* = 115200

* **path**: *null* =  null

* **rtscts**: *true* = true

___

### `Const` debug

### ▪ **debug**: *object*

*Defined in [controller/controller.ts:47](https://github.com/Koenkk/zigbee-herdsman/blob/master/src/controller/controller.ts#L47)*

###  error

• **error**: *Debugger* =  Debug('zigbee-herdsman:controller:error')

*Defined in [controller/controller.ts:48](https://github.com/Koenkk/zigbee-herdsman/blob/master/src/controller/controller.ts#L48)*

###  log

• **log**: *Debugger* =  Debug('zigbee-herdsman:controller:log')

*Defined in [controller/controller.ts:49](https://github.com/Koenkk/zigbee-herdsman/blob/master/src/controller/controller.ts#L49)*
