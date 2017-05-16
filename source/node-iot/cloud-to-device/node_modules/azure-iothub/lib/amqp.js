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
var dbg = require("debug");
var azure_iot_common_1 = require("azure-iot-common");
var azure_iot_amqp_base_1 = require("azure-iot-amqp-base");
var amqp_service_errors_js_1 = require("./amqp_service_errors.js");
var UnauthorizedError = azure_iot_common_1.errors.UnauthorizedError;
var DeviceNotFoundError = azure_iot_common_1.errors.DeviceNotFoundError;
var NotConnectedError = azure_iot_common_1.errors.NotConnectedError;
var debug = dbg('azure-iothub');
// tslint:disable-next-line:no-var-requires
var packageJson = require('../package.json');
function handleResult(errorMessage, done) {
    return function (err, result) {
        /*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_021: [** All asynchronous instance methods shall not throw if `done` is not specified or falsy]*/
        if (done) {
            if (err) {
                /*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_018: [All asynchronous instance methods shall call the `done` callback with either no arguments or a first null argument and a second argument that is the result of the operation if the operation succeeded.]*/
                done(amqp_service_errors_js_1.translateError(errorMessage, err));
            }
            else {
                /*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_017: [All asynchronous instance methods shall call the `done` callback with a single parameter that is derived from the standard Javascript `Error` object if the operation failed.]*/
                done(null, result);
            }
        }
    };
}
function getTranslatedError(err, message) {
    if (err instanceof UnauthorizedError || err instanceof NotConnectedError || err instanceof DeviceNotFoundError) {
        return err;
    }
    return amqp_service_errors_js_1.translateError(message, err);
}
/**
 * @class       module:azure-iothub.Amqp
 * @classdesc   Constructs an {@linkcode Amqp} object that can be used in an application
 *              to connect to IoT Hub instance, using the AMQP protocol.
 *
 * @params {Object}  config    The configuration object that should be used to connect to the IoT Hub service.
 * @params {Object}  amqpBase  OPTIONAL: The Base AMQP transport object. Amqp will use azure-iot-common.Amqp if no argument is provided.
 */
/*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_001: [The Amqp constructor shall accept a config object with those 4 properties:
host – (string) the fully-qualified DNS hostname of an IoT Hub
hubName - (string) the name of the IoT Hub instance (without suffix such as .azure-devices.net).
keyName – (string) the name of a key that can be used to communicate with the IoT Hub instance
sharedAccessSignature – (string) the key associated with the key name.] */
var Amqp = (function (_super) {
    __extends(Amqp, _super);
    function Amqp(config, amqpBase) {
        var _this = _super.call(this) || this;
        _this._renewalNumberOfMilliseconds = 2700000;
        _this._amqp = amqpBase ? amqpBase : new azure_iot_amqp_base_1.Amqp(true, packageJson.name + '/' + packageJson.version);
        _this._config = config;
        _this._renewalTimeout = null;
        _this._amqp.setDisconnectHandler(function (err) {
            _this.emit('disconnect', err);
        });
        return _this;
    }
    /**
     * @method             module:azure-iothub.Amqp#connect
     * @description        Establishes a connection with the IoT Hub instance.
     * @param {Function}   done   Called when the connection is established of if an error happened.
     */
    /*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_019: [The `connect` method shall call the `connect` method of the base AMQP transport and translate its result to the caller into a transport-agnostic object.]*/
    Amqp.prototype.connect = function (done) {
        var _this = this;
        var uri = this._getConnectionUri();
        this._amqp.connect(uri, undefined, function (err, connectResult) {
            if (err) {
                if (done)
                    done(amqp_service_errors_js_1.translateError('AMQP Transport: Could not connect', err));
            }
            else {
                /*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_06_001: [`initializeCBS` shall be invoked.]*/
                _this._amqp.initializeCBS(function (err) {
                    if (err) {
                        /*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_06_002: [If `initializeCBS` is not successful then the client will remain disconnected and the callback, if provided, will be invoked with an error object.]*/
                        _this._amqp.disconnect(function () {
                            if (done)
                                done(getTranslatedError(err, 'AMQP Transport: Could not initialize CBS'));
                        });
                    }
                    else {
                        /*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_06_003: [If `initializeCBS` is successful, `putToken` shall be invoked with the first parameter audience, created from the sr of the sas signature, the next parameter of the actual sas, and a callback.]*/
                        var audience = azure_iot_common_1.SharedAccessSignature.parse(_this._config.sharedAccessSignature.toString(), ['sr', 'sig', 'se']).sr;
                        var applicationSuppliedSas_1 = typeof (_this._config.sharedAccessSignature) === 'string';
                        var sasToken = applicationSuppliedSas_1 ? _this._config.sharedAccessSignature : _this._config.sharedAccessSignature.extend(azure_iot_common_1.anHourFromNow());
                        _this._amqp.putToken(audience, sasToken, function (err) {
                            if (err) {
                                /*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_06_004: [** If `putToken` is not successful then the client will remain disconnected and the callback, if provided, will be invoked with an error object.]*/
                                _this._amqp.disconnect(function () {
                                    if (done)
                                        done(getTranslatedError(err, 'AMQP Transport: Could not authorize with puttoken'));
                                });
                            }
                            else {
                                if (!applicationSuppliedSas_1) {
                                    _this._renewalTimeout = setTimeout(_this._handleSASRenewal.bind(_this), _this._renewalNumberOfMilliseconds);
                                }
                                if (done)
                                    done(null, connectResult);
                            }
                        });
                    }
                });
            }
        });
    };
    /**
     * @method             module:azure-iothub.Amqp#disconnect
     * @description        Disconnects the link to the IoT Hub instance.
     * @param {Function}   done   Called when disconnected of if an error happened.
     */
    /*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_020: [** The `disconnect` method shall call the `disconnect` method of the base AMQP transport and translate its result to the caller into a transport-agnostic object.]*/
    Amqp.prototype.disconnect = function (done) {
        if (this._renewalTimeout) {
            clearTimeout(this._renewalTimeout);
        }
        this._amqp.disconnect(handleResult('AMQP Transport: Could not disconnect', done));
    };
    /**
     * @method             module:azure-iothub.Amqp#send
     * @description        Sends a message to the IoT Hub.
     * @param {Message}  message    The [message]{@linkcode module:common/message.Message}
     *                              to be sent.
     * @param {Function} done       The callback to be invoked when `send`
     *                              completes execution.
     */
    /*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_002: [The send method shall construct an AMQP request using the message passed in argument as the body of the message.]*/
    /*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_003: [The message generated by the send method should have its “to” field set to the device ID passed as an argument.]*/
    Amqp.prototype.send = function (deviceId, message, done) {
        var serviceEndpoint = '/messages/devicebound';
        var deviceEndpoint = azure_iot_common_1.endpoint.messagePath(encodeURIComponent(deviceId));
        this._amqp.send(message, serviceEndpoint, deviceEndpoint, handleResult('AMQP Transport: Could not send message', done));
    };
    /**
     * @deprecated
     * @method             module:azure-iothub.Amqp#getReceiver
     * @description        Gets the {@linkcode AmqpReceiver} object that can be used to receive messages from the IoT Hub instance and accept/reject/release them.
     * @param {Function}   done      Callback used to return the {@linkcode AmqpReceiver} object.
     */
    Amqp.prototype.getReceiver = function (done) {
        var feedbackEndpoint = '/messages/serviceBound/feedback';
        this._amqp.getReceiver(feedbackEndpoint, handleResult('AMQP Transport: Could not get receiver', done));
    };
    /**
     * @method             module:azure-iothub.Amqp#getFeedbackReceiver
     * @description        Gets the {@linkcode AmqpReceiver} object that can be used to receive messages from the IoT Hub instance and accept/reject/release them.
     * @param {Function}   done      Callback used to return the {@linkcode AmqpReceiver} object.
     */
    /*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_013: [The `getFeedbackReceiver` method shall request an `AmqpReceiver` object from the base AMQP transport for the `/messages/serviceBound/feedback` endpoint.]*/
    Amqp.prototype.getFeedbackReceiver = function (done) {
        var feedbackEndpoint = '/messages/serviceBound/feedback';
        this._amqp.getReceiver(feedbackEndpoint, handleResult('AMQP Transport: Could not get receiver', done));
    };
    /**
     * @method             module:azure-iothub.Amqp#getFileNotificationReceiver
     * @description        Gets the {@linkcode AmqpReceiver} object that can be used to receive messages from the IoT Hub instance and accept/reject/release them.
     * @param {Function}   done      Callback used to return the {@linkcode AmqpReceiver} object.
     */
    /*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_016: [The `getFeedbackReceiver` method shall request an `AmqpReceiver` object from the base AMQP transport for the `/messages/serviceBound/filenotifications` endpoint.]*/
    Amqp.prototype.getFileNotificationReceiver = function (done) {
        var fileNotificationEndpoint = '/messages/serviceBound/filenotifications';
        this._amqp.getReceiver(fileNotificationEndpoint, handleResult('AMQP Transport: Could not get file notification receiver', done));
    };
    Amqp.prototype._getConnectionUri = function () {
        return 'amqps://' + this._config.host;
    };
    Amqp.prototype._handleSASRenewal = function () {
        var _this = this;
        this._amqp.putToken(azure_iot_common_1.SharedAccessSignature.parse(this._config.sharedAccessSignature.toString(), ['sr', 'sig', 'se']).sr, this._config.sharedAccessSignature.extend(azure_iot_common_1.anHourFromNow()), function (err) {
            if (err) {
                debug('error from the put token' + err);
                _this._amqp.disconnect(function (disconnectError) {
                    if (disconnectError) {
                        debug('error from disconnect following failed put token' + err);
                    }
                });
            }
            else {
                _this._renewalTimeout = setTimeout(_this._handleSASRenewal.bind(_this), _this._renewalNumberOfMilliseconds);
            }
        });
    };
    return Amqp;
}(events_1.EventEmitter));
exports.Amqp = Amqp;
//# sourceMappingURL=amqp.js.map