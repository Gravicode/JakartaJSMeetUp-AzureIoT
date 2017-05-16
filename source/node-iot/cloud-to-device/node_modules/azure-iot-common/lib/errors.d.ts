/// <reference types="node" />
/*! Copyright (c) Microsoft. All rights reserved.
 *! Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */
/**
 * @class       module:azure-iot-common.ArgumentError
 * @classdesc   Error thrown when an argument is invalid.
 *
 * @augments {Error}
 */
export declare class ArgumentError extends Error {
    constructor(message?: string);
}
/**
 * @class       module:azure-iot-common.DeviceMaximumQueueDepthExceededError
 * @classdesc   Error thrown when the message queue for a device is full.
 *
 * @augments {Error}
 */
export declare class DeviceMaximumQueueDepthExceededError extends Error {
    constructor(message?: string);
}
/**
 * @class       module:azure-iot-common.DeviceNotFoundError
 * @classdesc   Error thrown when a device cannot be found in the IoT Hub instance registry.
 *
 * @augments {Error}
 */
export declare class DeviceNotFoundError extends Error {
    constructor(message?: string);
}
/**
 * @class       module:azure-iot-common.FormatError
 * @classdesc   Error thrown when a string that is supposed to have a specific formatting is not formatted properly.
 *
 * @augments {Error}
 */
export declare class FormatError extends Error {
    constructor(message?: string);
}
/**
 * @class       module:azure-iot-common.UnauthorizedError
 * @classdesc   Error thrown when the connection parameters are wrong and the server refused the connection.
 *
 * @augments {Error}
 */
export declare class UnauthorizedError extends Error {
    constructor(message?: string);
}
export declare class NotImplementedError extends Error {
    constructor(message?: string);
}
export declare class NotConnectedError extends Error {
    constructor(message?: string);
}
export declare class IotHubQuotaExceededError extends Error {
    constructor(message?: string);
}
export declare class MessageTooLargeError extends Error {
    constructor(message?: string);
}
export declare class InternalServerError extends Error {
    constructor(message?: string);
}
export declare class ServiceUnavailableError extends Error {
    constructor(message?: string);
}
export declare class IotHubNotFoundError extends Error {
    constructor(message?: string);
}
export declare class JobNotFoundError extends Error {
    constructor(message?: string);
}
export declare class TooManyDevicesError extends Error {
    constructor(message?: string);
}
export declare class ThrottlingError extends Error {
    constructor(message?: string);
}
export declare class DeviceAlreadyExistsError extends Error {
    constructor(message?: string);
}
export declare class InvalidEtagError extends Error {
    constructor(message?: string);
}
/**
 * @class       module:azure-iot-common.TimeoutError
 * @classdesc   Error thrown when a timeout occurs
 *
 * @augments {Error}
 */
export declare class TimeoutError extends Error {
    constructor(message?: string);
}
/**
 * @class       module:azure-iot-common.BadDeviceResponseError
 * @classdesc   Error thrown when a device sends a bad response to a device method call.
 *
 * @augments {Error}
 */
export declare class BadDeviceResponseError extends Error {
    constructor(message?: string);
}
/**
 * @class       module:azure-iot-common.GatewayTimeoutError
 * @classdesc   Error thrown when the IoT Hub instance doesn't process the device method call in time.
 *
 * @augments {Error}
 */
export declare class GatewayTimeoutError extends Error {
    constructor(message?: string);
}
/**
 * @class       module:azure-iot-common.DeviceTimeoutError
 * @classdesc   Error thrown when the device doesn't process the method call in time.
 *
 * @augments {Error}
 */
export declare class DeviceTimeoutError extends Error {
    constructor(message?: string);
}
