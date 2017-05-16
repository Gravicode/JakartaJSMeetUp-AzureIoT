/// <reference types="mqtt" />
import { Client as MqttClient } from 'mqtt';
import { MqttReceiver } from './mqtt_receiver';
import { Message } from 'azure-iot-common';
import { ClientConfig } from 'azure-iot-device';
/**
 * @class           module:azure-iot-device-mqtt.MqttBase
 * @classdesc       Base MQTT transport implementation used by higher-level IoT Hub libraries.
 *                  You generally want to use these higher-level objects (such as [azure-iot-device-mqtt.Mqtt]{@link module:azure-iot-device-mqtt.Mqtt})
 *                  rather than this one.
 *
 * @param {Object}  config      The configuration object derived from the connection string.
 */
export declare class MqttBase {
    client: MqttClient;
    private mqttprovider;
    private _options;
    private _receiver;
    private _topicTelemetryPublish;
    private _topicMessageSubscribe;
    constructor(mqttprovider?: any);
    /**
     * @method            module:azure-iot-device-mqtt.MqttBase#connect
     * @description       Establishes a secure connection to the IoT Hub instance using the MQTT protocol.
     *
     * @param {Function}  done  Callback that shall be called when the connection is established.
     */
    connect(config: ClientConfig, done: (err?: Error, result?: any) => void): void;
    /**
     * @method            module:azure-iot-device-mqtt.MqttBase#disconnect
     * @description       Terminates the connection to the IoT Hub instance.
     *
     * @param {Function}  done      Callback that shall be called when the connection is terminated.
     */
    disconnect(done: (err?: Error, result?: any) => void): void;
    /**
     * @method            module:azure-iot-device-mqtt.MqttBase#publish
     * @description       Publishes a message to the IoT Hub instance using the MQTT protocol.
     *
     * @param {Object}    message   Message to send to the IoT Hub instance.
     * @param {Function}  done      Callback that shall be called when the connection is established.
     */
    publish(message: Message, done: (err?: Error, result?: any) => void): void;
    /**
     * @method              module:azure-iot-device-mqtt.MqttBase#getReceiver
     * @description         Gets a receiver object that is used to receive and settle messages.
     *
     * @param {Function}    done   callback that shall be called with a receiver object instance.
     */
    getReceiver(done: (err?: Error, receiver?: MqttReceiver) => void): void;
}
