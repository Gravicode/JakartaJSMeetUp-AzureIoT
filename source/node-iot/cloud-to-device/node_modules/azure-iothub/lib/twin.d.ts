import { DeviceIdentity } from './device';
import { Registry } from './registry';
import { Callback } from './interfaces';
export interface TwinPropertyCollection {
    [key: string]: any;
}
export interface TwinProperties {
    reported: TwinPropertyCollection;
    desired: TwinPropertyCollection;
}
export interface TwinData {
    deviceId: string;
    etag: string;
    tags: TwinPropertyCollection;
    properties: TwinProperties;
}
/**
 * @class                  module:azure-iothub.Twin
 * @classdesc              Constructs a Twin object that provides APIs to update
 *                         parts of the twin of a device in the IoT Hub service.
 * @param {string|Object}  device      A device identifier string or an object describing the device. If an Object,
 *                                     it must contain a deviceId property.
 * @param {Registry}       registryClient   The HTTP registry client used to execute REST API calls.
 */
export declare class Twin implements TwinData {
    deviceId: string;
    etag: string;
    tags: {
        [key: string]: string;
    };
    properties: TwinProperties;
    private _registry;
    constructor(device: DeviceIdentity | string, registryClient: Registry);
    /**
     * @method            module:azure-iothub.Twin.get
     * @description       Gets the latest version of this device twin from the IoT Hub service.
     * @param {Function}  done        The function to call when the operation is
     *                                complete. `done` will be called with three
     *                                arguments: an Error object (can be null), a
     *                                {@link module:azure-iothub.Twin|Twin}
     *                                object representing the created device
     *                                identity, and a transport-specific response
     *                                object useful for logging or debugging.
     */
    get(done: Callback<Twin>): void;
    /**
     * @method            module:azure-iothub.Twin.update
     * @description       Update the device twin with the patch provided as argument.
     * @param {Object}    patch       Object containing the new values to apply to this device twin.
     * @param {Function}  done        The function to call when the operation is
     *                                complete. `done` will be called with three
     *                                arguments: an Error object (can be null), a
     *                                {@link module:azure-iothub.Twin|Twin}
     *                                object representing the created device
     *                                identity, and a transport-specific response
     *                                object useful for logging or debugging.
     */
    update(patch: any, done: Callback<Twin>): void;
    toJSON(): object;
}
