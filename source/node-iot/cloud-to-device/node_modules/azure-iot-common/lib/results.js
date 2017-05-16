/*! Copyright (c) Microsoft. All rights reserved.
 *! Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */
'use strict';
/**
 * @class       module:azure-iot-common.MessageEnqueued
 * @classdesc   Result returned when a message was successfully enqueued.
 *
 * @property {Object} transportObj  The transport-specific object
 *
 * @augments {Object}
 */
var MessageEnqueued = (function () {
    function MessageEnqueued(transportObj) {
        this.transportObj = transportObj;
    }
    return MessageEnqueued;
}());
exports.MessageEnqueued = MessageEnqueued;
/**
 * @class       module:azure-iot-common.MessageCompleted
 * @classdesc   Result returned when a message was successfully rejected.
 *
 * @property {Object} transportObj  The transport-specific object
 *
 * @augments {Object}
 */
var MessageCompleted = (function () {
    function MessageCompleted(transportObj) {
        this.transportObj = transportObj;
    }
    return MessageCompleted;
}());
exports.MessageCompleted = MessageCompleted;
/**
 * @class       module:azure-iot-common.MessageRejected
 * @classdesc   Result returned when a message was successfully rejected.
 *
 * @property {Object} transportObj  The transport-specific object
 *
 * @augments {Object}
 */
var MessageRejected = (function () {
    function MessageRejected(transportObj) {
        this.transportObj = transportObj;
    }
    return MessageRejected;
}());
exports.MessageRejected = MessageRejected;
/**
 * @class       module:azure-iot-common.MessageAbandoned
 * @classdesc   Result returned when a message was successfully abandoned.
 *
 * @property {Object} transportObj  The transport-specific object
 *
 * @augments {Object}
 */
var MessageAbandoned = (function () {
    function MessageAbandoned(transportObj) {
        this.transportObj = transportObj;
    }
    return MessageAbandoned;
}());
exports.MessageAbandoned = MessageAbandoned;
/**
 * @class       module:azure-iot-common.Connected
 * @classdesc   Result returned when a transport is successfully connected.
 *
 * @property {Object} transportObj  The transport-specific object
 *
 * @augments {Object}
 */
var Connected = (function () {
    function Connected(transportObj) {
        this.transportObj = transportObj;
    }
    return Connected;
}());
exports.Connected = Connected;
/**
 * @class       module:azure-iot-common.Disconnected
 * @classdesc   Result returned when a transport is successfully disconnected.
 *
 * @property {Object} transportObj  The transport-specific object.
 * @property {String} reason        The reason why the disconnected event is emitted.
 *
 * @augments {Object}
 */
var Disconnected = (function () {
    function Disconnected(transportObj, reason) {
        this.transportObj = transportObj;
        this.reason = reason;
    }
    return Disconnected;
}());
exports.Disconnected = Disconnected;
/**
 * @class       module:azure-iot-common.TransportConfigured
 * @classdesc   Result returned when a transport is successfully configured.
 *
 * @property {Object} transportObj  The transport-specific object.
 *
 * @augments {Object}
 */
var TransportConfigured = (function () {
    function TransportConfigured(transportObj) {
        this.transportObj = transportObj;
    }
    return TransportConfigured;
}());
exports.TransportConfigured = TransportConfigured;
/**
 * @class       module:azure-iot-common.SharedAccessSignatureUpdated
 * @classdesc   Result returned when a SAS token has been successfully updated.
 *
 * @param {Boolean} needToReconnect  Value indicating whether the client needs to reconnect or not.
 *
 * @augments {Object}
 */
var SharedAccessSignatureUpdated = (function () {
    function SharedAccessSignatureUpdated(needToReconnect) {
        this.needToReconnect = needToReconnect;
    }
    return SharedAccessSignatureUpdated;
}());
exports.SharedAccessSignatureUpdated = SharedAccessSignatureUpdated;
//# sourceMappingURL=results.js.map