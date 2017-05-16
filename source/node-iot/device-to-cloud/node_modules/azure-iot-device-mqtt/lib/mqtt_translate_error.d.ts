/**
 * @method          module:azure-iot-device-mqtt.translateError
 * @description     Convert an error returned by MQTT.js into a transport-agnistic error.
 *
 * @param {Object}        mqttError the error returned by the MQTT.js library
 * @return {Object}   transport-agnostic error object
 */
export declare class MqttTransportError extends Error {
    transportError?: Error;
}
export declare function translateError(mqttError: Error): MqttTransportError;
