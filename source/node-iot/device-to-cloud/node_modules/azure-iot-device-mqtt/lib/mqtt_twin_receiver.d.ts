/// <reference types="node" />
import { EventEmitter } from 'events';
/**
 * @class        module:azure-iot-device-mqtt.MqttTwinReceiver
 * @classdesc    Acts as a receiver for device-twin traffic
 *
 * @param {Object} config   configuration object
 * @fires MqttTwinReceiver#subscribed   an MQTT topic has been successfully subscribed to
 * @fires MqttTwinReceiver#error    an error has occured while subscribing to an MQTT topic
 * @fires MqttTwinReceiver#response   a response message has been received from the service
 * @fires MqttTwinReceiver#post a post message has been received from the service
 * @throws {ReferenceError} If client parameter is falsy.
 *
 */
export declare class MqttTwinReceiver extends EventEmitter {
    static errorEvent: string;
    static responseEvent: string;
    static postEvent: string;
    static subscribedEvent: string;
    private _client;
    private _boundMessageHandler;
    constructor(client: any);
    private _handleNewListener(eventName);
    private _handleRemoveListener(eventName);
    private _startListeningIfFirstSubscription();
    private _stopListeningIfLastUnsubscription();
    private _onMqttMessage(topic, message);
    private _onResponseMessage(topic, message);
    private _onPostMessage(topic, message);
    private _handleError(err);
}
