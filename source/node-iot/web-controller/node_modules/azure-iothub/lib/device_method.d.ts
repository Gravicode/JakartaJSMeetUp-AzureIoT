import { RestApiClient } from './rest_api_client';
import { DeviceMethodParams } from './interfaces';
/**
 * @class                  module:azure-iothub.DeviceMethod
 * @classdesc              Constructs a DeviceMethod object that provides APIs to trigger the execution of a device method.
 * @param {Object}         params              An object describing the method and shall have the following properties:
 *                                             - methodName          The name of the method that shall be invoked.
 *                                             - payload             [optional] The payload to use for the method call.
 *                                             - timeoutInSeconds    [optional] The number of seconds IoT Hub shall wait for the device
 *                                                                   to send a response before deeming the method execution a failure.
 * @param {RestApiClient}  restApiClient       The REST client used to execute API calls.
 */
export declare class DeviceMethod {
    static defaultResponseTimeout: number;
    static defaultConnectTimeout: number;
    static defaultPayload: any;
    params: DeviceMethodParams;
    private _client;
    constructor(params: DeviceMethodParams, restApiClient: RestApiClient);
    /**
     * @method            module:azure-iothub.DeviceMethod.invokeOn
     * @description       Invokes the method on the specified device with the specified payload.
     * @param {String}    deviceId    Identifier of the device on which the method will run.
     * @param {Function}  done        The function to call when the operation is
     *                                complete. `done` will be called with three
     *                                arguments: an Error object (can be null), a
     *                                {@link module:azure-iothub.Twin|Twin}
     *                                object representing the created device
     *                                identity, and a transport-specific response
     *                                object useful for logging or debugging.
     */
    invokeOn(deviceId: string, done: DeviceMethod.ResponseCallback): void;
}
export declare namespace DeviceMethod {
    type ResponseCallback = (err: Error, device?: any, response?: any) => void;
}
