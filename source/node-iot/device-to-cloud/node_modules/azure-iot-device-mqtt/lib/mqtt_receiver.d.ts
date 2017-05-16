/// <reference types="node" />
/// <reference types="mqtt" />
import { EventEmitter } from 'events';
import { Client as MqttClient } from 'mqtt';
import { Receiver } from 'azure-iot-common';
import { DeviceMethodRequest, DeviceMethodResponse } from 'azure-iot-device';
/**
 * @class           module:azure-iot-device-mqtt.MqttReceiver
 * @classdesc       Object that is used to receive and settle messages from the server.
 *
 * @param  {Object}  mqttClient    MQTT Client object.
 * @param  {string}  topicMessage  MQTT topic name for receiving C2D messages
 * @throws {ReferenceError}        If either mqttClient or topicMessage is falsy
 * @emits  message                 When a message is received
 */
/**
 * @event module:azure-iot-device-mqtt.MqttReceiver#message
 * @type {Message}
 */
export declare class MqttReceiver extends EventEmitter implements Receiver {
    private _mqttClient;
    private _topics;
    constructor(mqttClient: MqttClient, topicMessage: string);
    onDeviceMethod(methodName: string, callback: (methodRequest: DeviceMethodRequest, methodResponse: DeviceMethodResponse) => void): void;
    private _setupSubscription(topic);
    private _removeSubscription(topic);
    private _dispatchMqttMessage(topic, payload);
    private _onC2DMessage(topic, payload);
    private _onDeviceMethod(topic, payload);
}
