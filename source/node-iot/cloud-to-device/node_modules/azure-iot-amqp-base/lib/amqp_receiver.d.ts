/// <reference types="node" />
import { EventEmitter } from 'events';
import { results, Receiver, Message } from 'azure-iot-common';
import { ReceiverLink as Amqp10ReceiverLink } from 'amqp10';
/**
 * @class            module:azure-iot-amqp-base.AmqpReceiver
 * @classdesc        The `AmqpReceiver` class is used to receive and settle messages.
 *
 * @param {Object}   amqpReceiver   The Receiver object that is created by the client using the `node-amqp10` library.
 *
 * @fires module:azure-iot-amqp-base.AmqpReceiver#message
 * @fires module:azure-iot-amqp-base.AmqpReceiver#errorReceived
 */
export declare class AmqpReceiver extends EventEmitter implements Receiver {
    private _listeners;
    private _listenersInitialized;
    private _amqpReceiver;
    constructor(amqpReceiver: Amqp10ReceiverLink);
    /**
     * @method          module:azure-iot-amqp-base.AmqpReceiver#complete
     * @description     Sends a completion feedback message to the service.
     * @param {AmqpMessage}   message  The message that is being settled.
     */
    complete(message: Message, done?: (err: Error, result?: results.MessageCompleted) => void): void;
    /**
     * @method          module:azure-iot-amqp-base.AmqpReceiver#abandon
     * @description     Sends an abandon/release feedback message
     * @param {AmqpMessage}   message  The message that is being settled.
     */
    abandon(message: Message, done?: (err: Error, result?: results.MessageAbandoned) => void): void;
    /**
     * @method          module:azure-iot-amqp-base.AmqpReceiver#reject
     * @description     Sends an reject feedback message
     * @param {AmqpMessage}   message  The message that is being settled.
     */
    reject(message: Message, done?: (err: Error, result?: results.MessageRejected) => void): void;
    private _onAmqpErrorReceived(err);
    private _onAmqpMessage(amqpMessage);
    private _setupAmqpReceiverListeners();
    private _removeAmqpReceiverListeners();
}
