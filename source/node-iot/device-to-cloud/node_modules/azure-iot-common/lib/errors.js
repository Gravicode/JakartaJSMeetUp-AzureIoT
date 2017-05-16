/*! Copyright (c) Microsoft. All rights reserved.
 *! Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @class       module:azure-iot-common.ArgumentError
 * @classdesc   Error thrown when an argument is invalid.
 *
 * @augments {Error}
 */
var ArgumentError = (function (_super) {
    __extends(ArgumentError, _super);
    function ArgumentError(message) {
        _super.call(this, message);
        this.name = 'ArgumentError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return ArgumentError;
}(Error));
exports.ArgumentError = ArgumentError;
/**
 * @class       module:azure-iot-common.DeviceMaximumQueueDepthExceededError
 * @classdesc   Error thrown when the message queue for a device is full.
 *
 * @augments {Error}
 */
var DeviceMaximumQueueDepthExceededError = (function (_super) {
    __extends(DeviceMaximumQueueDepthExceededError, _super);
    function DeviceMaximumQueueDepthExceededError(message) {
        _super.call(this, message);
        this.name = 'DeviceMaximumQueueDepthExceededError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return DeviceMaximumQueueDepthExceededError;
}(Error));
exports.DeviceMaximumQueueDepthExceededError = DeviceMaximumQueueDepthExceededError;
/**
 * @class       module:azure-iot-common.DeviceNotFoundError
 * @classdesc   Error thrown when a device cannot be found in the IoT Hub instance registry.
 *
 * @augments {Error}
 */
var DeviceNotFoundError = (function (_super) {
    __extends(DeviceNotFoundError, _super);
    function DeviceNotFoundError(message) {
        _super.call(this, message);
        this.name = 'DeviceNotFoundError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return DeviceNotFoundError;
}(Error));
exports.DeviceNotFoundError = DeviceNotFoundError;
/**
 * @class       module:azure-iot-common.FormatError
 * @classdesc   Error thrown when a string that is supposed to have a specific formatting is not formatted properly.
 *
 * @augments {Error}
 */
var FormatError = (function (_super) {
    __extends(FormatError, _super);
    function FormatError(message) {
        _super.call(this, message);
        this.name = 'FormatError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return FormatError;
}(Error));
exports.FormatError = FormatError;
/**
 * @class       module:azure-iot-common.UnauthorizedError
 * @classdesc   Error thrown when the connection parameters are wrong and the server refused the connection.
 *
 * @augments {Error}
 */
var UnauthorizedError = (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message) {
        _super.call(this, message);
        this.name = 'UnauthorizedError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return UnauthorizedError;
}(Error));
exports.UnauthorizedError = UnauthorizedError;
var NotImplementedError = (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError(message) {
        _super.call(this, message);
        this.name = 'NotImplementedError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return NotImplementedError;
}(Error));
exports.NotImplementedError = NotImplementedError;
var NotConnectedError = (function (_super) {
    __extends(NotConnectedError, _super);
    function NotConnectedError(message) {
        _super.call(this, message);
        this.name = 'NotConnectedError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return NotConnectedError;
}(Error));
exports.NotConnectedError = NotConnectedError;
var IotHubQuotaExceededError = (function (_super) {
    __extends(IotHubQuotaExceededError, _super);
    function IotHubQuotaExceededError(message) {
        _super.call(this, message);
        this.name = 'IotHubQuotaExceededError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return IotHubQuotaExceededError;
}(Error));
exports.IotHubQuotaExceededError = IotHubQuotaExceededError;
var MessageTooLargeError = (function (_super) {
    __extends(MessageTooLargeError, _super);
    function MessageTooLargeError(message) {
        _super.call(this, message);
        this.name = 'MessageTooLargeError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return MessageTooLargeError;
}(Error));
exports.MessageTooLargeError = MessageTooLargeError;
var InternalServerError = (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(message) {
        _super.call(this, message);
        this.name = 'InternalServerError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return InternalServerError;
}(Error));
exports.InternalServerError = InternalServerError;
var ServiceUnavailableError = (function (_super) {
    __extends(ServiceUnavailableError, _super);
    function ServiceUnavailableError(message) {
        _super.call(this, message);
        this.name = 'ServiceUnavailableError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return ServiceUnavailableError;
}(Error));
exports.ServiceUnavailableError = ServiceUnavailableError;
var IotHubNotFoundError = (function (_super) {
    __extends(IotHubNotFoundError, _super);
    function IotHubNotFoundError(message) {
        _super.call(this, message);
        this.name = 'IotHubNotFoundError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return IotHubNotFoundError;
}(Error));
exports.IotHubNotFoundError = IotHubNotFoundError;
var JobNotFoundError = (function (_super) {
    __extends(JobNotFoundError, _super);
    function JobNotFoundError(message) {
        _super.call(this, message);
        this.name = 'JobNotFoundError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return JobNotFoundError;
}(Error));
exports.JobNotFoundError = JobNotFoundError;
var TooManyDevicesError = (function (_super) {
    __extends(TooManyDevicesError, _super);
    function TooManyDevicesError(message) {
        _super.call(this, message);
        this.name = 'TooManyDevicesError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return TooManyDevicesError;
}(Error));
exports.TooManyDevicesError = TooManyDevicesError;
var ThrottlingError = (function (_super) {
    __extends(ThrottlingError, _super);
    function ThrottlingError(message) {
        _super.call(this, message);
        this.name = 'ThrottlingError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return ThrottlingError;
}(Error));
exports.ThrottlingError = ThrottlingError;
var DeviceAlreadyExistsError = (function (_super) {
    __extends(DeviceAlreadyExistsError, _super);
    function DeviceAlreadyExistsError(message) {
        _super.call(this, message);
        this.name = 'DeviceAlreadyExistsError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return DeviceAlreadyExistsError;
}(Error));
exports.DeviceAlreadyExistsError = DeviceAlreadyExistsError;
var InvalidEtagError = (function (_super) {
    __extends(InvalidEtagError, _super);
    function InvalidEtagError(message) {
        _super.call(this, message);
        this.name = 'InvalidEtagError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return InvalidEtagError;
}(Error));
exports.InvalidEtagError = InvalidEtagError;
/**
 * @class       module:azure-iot-common.TimeoutError
 * @classdesc   Error thrown when a timeout occurs
 *
 * @augments {Error}
 */
var TimeoutError = (function (_super) {
    __extends(TimeoutError, _super);
    function TimeoutError(message) {
        _super.call(this, message);
        this.name = 'TimeoutError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return TimeoutError;
}(Error));
exports.TimeoutError = TimeoutError;
/**
 * @class       module:azure-iot-common.BadDeviceResponseError
 * @classdesc   Error thrown when a device sends a bad response to a device method call.
 *
 * @augments {Error}
 */
var BadDeviceResponseError = (function (_super) {
    __extends(BadDeviceResponseError, _super);
    function BadDeviceResponseError(message) {
        _super.call(this, message);
        this.name = 'BadDeviceResponseError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return BadDeviceResponseError;
}(Error));
exports.BadDeviceResponseError = BadDeviceResponseError;
/**
 * @class       module:azure-iot-common.GatewayTimeoutError
 * @classdesc   Error thrown when the IoT Hub instance doesn't process the device method call in time.
 *
 * @augments {Error}
 */
var GatewayTimeoutError = (function (_super) {
    __extends(GatewayTimeoutError, _super);
    function GatewayTimeoutError(message) {
        _super.call(this, message);
        this.name = 'GatewayTimeoutError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return GatewayTimeoutError;
}(Error));
exports.GatewayTimeoutError = GatewayTimeoutError;
/**
 * @class       module:azure-iot-common.DeviceTimeoutError
 * @classdesc   Error thrown when the device doesn't process the method call in time.
 *
 * @augments {Error}
 */
var DeviceTimeoutError = (function (_super) {
    __extends(DeviceTimeoutError, _super);
    function DeviceTimeoutError(message) {
        _super.call(this, message);
        this.name = 'DeviceTimeoutError';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
    return DeviceTimeoutError;
}(Error));
exports.DeviceTimeoutError = DeviceTimeoutError;
//# sourceMappingURL=errors.js.map