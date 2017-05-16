// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var amqp_message_js_1 = require("./amqp_message.js");
var azure_iot_common_1 = require("azure-iot-common");
/**
 * @class            module:azure-iot-amqp-base.AmqpReceiver
 * @classdesc        The `AmqpReceiver` class is used to receive and settle messages.
 *
 * @param {Object}   amqpReceiver   The Receiver object that is created by the client using the `node-amqp10` library.
 *
 * @fires module:azure-iot-amqp-base.AmqpReceiver#message
 * @fires module:azure-iot-amqp-base.AmqpReceiver#errorReceived
 */
/* Codes_SRS_NODE_IOTHUB_AMQPRECEIVER_16_001: [The AmqpReceiver method shall create a new instance of AmqpReceiver.]*/
/* Codes_SRS_NODE_IOTHUB_AMQPRECEIVER_16_002: [The created AmqpReceiver object shall emit a ‘message’ event when a message is received.]*/
/* Codes_SRS_NODE_IOTHUB_AMQPRECEIVER_16_003: [The created AmqpReceiver object shall emit a ‘errorReceived’ event when an error is received.]*/
/* Codes_SRS_NODE_IOTHUB_AMQPRECEIVER_16_004: [If the receiver object passed as an argument is falsy, the AmqpReceiver should throw an ReferenceError]*/
var AmqpReceiver = (function (_super) {
    __extends(AmqpReceiver, _super);
    function AmqpReceiver(amqpReceiver) {
        var _this = this;
        if (!amqpReceiver) {
            throw new ReferenceError('amqpReceiver');
        }
        _this = _super.call(this) || this;
        _this._amqpReceiver = amqpReceiver;
        _this._listenersInitialized = false;
        var self = _this;
        _this.on('removeListener', function () {
            // stop listening for AMQP events if our consumers stop listening for our events
            if (self._listenersInitialized && self.listeners('message').length === 0) {
                self._removeAmqpReceiverListeners();
            }
        });
        _this.on('newListener', function () {
            // lazy-init AMQP event listeners
            if (!self._listenersInitialized) {
                self._setupAmqpReceiverListeners();
            }
        });
        return _this;
    }
    /**
     * @method          module:azure-iot-amqp-base.AmqpReceiver#complete
     * @description     Sends a completion feedback message to the service.
     * @param {AmqpMessage}   message  The message that is being settled.
     */
    /* Codes_SRS_NODE_IOTHUB_AMQPRECEIVER_16_006: [If the message object passed as an argument is falsy, a ReferenceError should be thrown]*/
    AmqpReceiver.prototype.complete = function (message, done) {
        if (!message) {
            throw new ReferenceError('Invalid message object.');
        }
        this._amqpReceiver.accept(message.transportObj);
        if (done)
            done(null, new azure_iot_common_1.results.MessageCompleted());
    };
    /**
     * @method          module:azure-iot-amqp-base.AmqpReceiver#abandon
     * @description     Sends an abandon/release feedback message
     * @param {AmqpMessage}   message  The message that is being settled.
     */
    /* Codes_SRS_NODE_IOTHUB_AMQPRECEIVER_16_008: [If the message object passed as an argument is falsy, a ReferenceError should be thrown]*/
    AmqpReceiver.prototype.abandon = function (message, done) {
        if (!message) {
            throw new ReferenceError('Invalid message object.');
        }
        this._amqpReceiver.release(message.transportObj);
        if (done)
            done(null, new azure_iot_common_1.results.MessageAbandoned());
    };
    /**
     * @method          module:azure-iot-amqp-base.AmqpReceiver#reject
     * @description     Sends an reject feedback message
     * @param {AmqpMessage}   message  The message that is being settled.
     */
    /* Codes_SRS_NODE_IOTHUB_AMQPRECEIVER_16_010: [If the message object passed as an argument is falsy, a ReferenceError should be thrown]*/
    AmqpReceiver.prototype.reject = function (message, done) {
        if (!message) {
            throw new ReferenceError('Invalid message object.');
        }
        this._amqpReceiver.reject(message.transportObj);
        if (done)
            done(null, new azure_iot_common_1.results.MessageRejected());
    };
    AmqpReceiver.prototype._onAmqpErrorReceived = function (err) {
        /**
         * @event module:azure-iot-amqp-base.AmqpReceiver#errorReceived
         * @type {Error}
         */
        this.emit('errorReceived', err);
    };
    AmqpReceiver.prototype._onAmqpMessage = function (amqpMessage) {
        /**
         * @event module:azure-iot-amqp-base.AmqpReceiver#message
         * @type {Message}
         */
        var msg = amqp_message_js_1.AmqpMessage.toMessage(amqpMessage);
        this.emit('message', msg);
    };
    AmqpReceiver.prototype._setupAmqpReceiverListeners = function () {
        this._listeners = [
            { eventName: 'errorReceived', listener: this._onAmqpErrorReceived.bind(this) },
            { eventName: 'message', listener: this._onAmqpMessage.bind(this) }
        ];
        for (var i = 0; i < this._listeners.length; ++i) {
            var listener = this._listeners[i];
            this._amqpReceiver.on(listener.eventName, listener.listener);
        }
        this._listenersInitialized = true;
    };
    AmqpReceiver.prototype._removeAmqpReceiverListeners = function () {
        if (this._listenersInitialized === true) {
            for (var i = 0; i < this._listeners.length; ++i) {
                var listener = this._listeners[i];
                this._amqpReceiver.removeListener(listener.eventName, listener.listener);
            }
            this._listenersInitialized = false;
        }
    };
    return AmqpReceiver;
}(events_1.EventEmitter));
exports.AmqpReceiver = AmqpReceiver;
//# sourceMappingURL=amqp_receiver.js.map