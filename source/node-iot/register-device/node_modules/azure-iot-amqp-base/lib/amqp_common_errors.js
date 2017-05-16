// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var azure_iot_common_1 = require("azure-iot-common");
var amqp10_1 = require("amqp10");
/*Codes_SRS_NODE_DEVICE_AMQP_COMMON_ERRORS_16_010: [ `translateError` shall accept 2 argument:
*- A custom error message to give context to the user.
*- the AMQP error object itself]
*/
function translateError(message, amqpError) {
    var error;
    if (amqpError.condition) {
        switch (amqpError.condition) {
            case 'amqp:not-found':
                /*Codes_SRS_NODE_DEVICE_AMQP_COMMON_ERRORS_16_006: [`translateError` shall return an `DeviceNotFoundError` if the AMQP error condition is `amqp:not-found`.]*/
                error = new azure_iot_common_1.errors.DeviceNotFoundError(message);
                break;
            case 'amqp:unauthorized-access':
                /*Codes_SRS_NODE_DEVICE_AMQP_COMMON_ERRORS_16_004: [`translateError` shall return an `UnauthorizedError` if the AMQP error condition is `amqp:unauthorized-access`.]*/
                error = new azure_iot_common_1.errors.UnauthorizedError(message);
                break;
            case 'amqp:internal-error':
                /*Codes_SRS_NODE_DEVICE_AMQP_COMMON_ERRORS_16_008: [`translateError` shall return an `InternalServerError` if the AMQP error condition is `amqp:internal-error`.]*/
                error = new azure_iot_common_1.errors.InternalServerError(message);
                break;
            case 'com.microsoft:timeout':
                /*Codes_SRS_NODE_DEVICE_AMQP_COMMON_ERRORS_16_009: [`translateError` shall return an `ServiceUnavailableError` if the AMQP error condition is `com.microsoft:timeout`.]*/
                error = new azure_iot_common_1.errors.ServiceUnavailableError(message);
                break;
            case 'amqp:link-message-size-exceeded':
                /*Codes_SRS_NODE_DEVICE_AMQP_COMMON_ERRORS_16_007: [`translateError` shall return an `MessageTooLargeError` if the AMQP error condition is `amqp:link-message-size-exceeded`.]*/
                error = new azure_iot_common_1.errors.MessageTooLargeError(message);
                break;
            case 'amqp:resource-limit-exceeded':
                /*Codes_SRS_NODE_DEVICE_AMQP_COMMON_ERRORS_16_011: [`translateError` shall return an `IotHubQuotaExceededError` if the AMQP error condition is `amqp:resource-limit-exceeded`.]*/
                error = new azure_iot_common_1.errors.IotHubQuotaExceededError(message);
                break;
            case 'com.microsoft:argument-out-of-range':
                /*Codes_SRS_NODE_DEVICE_AMQP_COMMON_ERRORS_16_003: [`translateError` shall return an `ArgumentError` if the AMQP error condition is `com.microsoft:argument-out-of-range`.]*/
                error = new azure_iot_common_1.errors.ArgumentError(message);
                break;
            default:
                /*Codes_SRS_NODE_DEVICE_AMQP_COMMON_ERRORS_16_002: [If the AMQP error code is unknown, `translateError` should return a generic Javascript `Error` object.]*/
                error = new Error(message);
        }
    }
    else if (amqpError instanceof amqp10_1.Errors.AuthenticationError) {
        error = new azure_iot_common_1.errors.UnauthorizedError(message);
    }
    else {
        /*Codes_SRS_NODE_DEVICE_AMQP_COMMON_ERRORS_16_002: [If the AMQP error code is unknown, `translateError` should return a generic Javascript `Error` object.]*/
        error = new Error(message);
    }
    /*Codes_SRS_NODE_DEVICE_AMQP_COMMON_ERRORS_16_001: [Any error object returned by `translateError` shall inherit from the generic `Error` Javascript object and have 2 properties:
    *- `amqpError` shall contain the error object returned by the AMQP layer.
    *- `message` shall contain a human-readable error message]
    */
    error.amqpError = amqpError;
    return error;
}
exports.translateError = translateError;
//# sourceMappingURL=amqp_common_errors.js.map