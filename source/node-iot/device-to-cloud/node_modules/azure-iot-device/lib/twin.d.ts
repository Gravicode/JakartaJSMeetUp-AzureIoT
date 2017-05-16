/// <reference types="node" />
import { EventEmitter } from 'events';
import { Client } from './client';
export declare class Twin extends EventEmitter {
    static timeout: number;
    static errorEvent: string;
    static subscribedEvent: string;
    static responseEvent: string;
    static postEvent: string;
    static desiredPath: string;
    properties: any;
    private _rid;
    private _client;
    private _receiver;
    constructor(client: Client);
    updateSharedAccessSignature(): void;
    private _connectSubscribeAndGetProperties(done);
    private _subscribe(done);
    private _sendTwinRequest(method, resource, properties, body, done);
    private _updateReportedProperties(state, done);
    private _mergePatch(dest, patch);
    private _clearCachedProperties();
    private _getPropertiesFromService(done);
    private _fireChangeEvents(desiredProperties);
    private _onServicePost(body);
    private _handleNewListener(eventName);
    /**
     * @method          module:azure-iot-device.Twin#fromDeviceClient
     * @description     Get a Twin object for the given client connection
     *
     * @param {Object}      client  The [client]{@link module:azure-iot-device.Client} object that this Twin object is associated with.
     *
     * @param {Function}      done  the callback to be invoked when this function completes.
     *
     * @throws {ReferenceError}   One of the required parameters is falsy
     */
    static fromDeviceClient(client: Client, done: (err?: Error, result?: Twin) => void): void;
}
