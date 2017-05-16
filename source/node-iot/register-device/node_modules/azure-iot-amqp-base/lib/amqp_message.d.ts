import { Message } from 'azure-iot-common';
/**
 * @class           module:azure-iot-amqp-base.AmqpMessage
 * @classdesc       AMQP-specific message class used to prepare a [azure-iot-common.Message]{@link module:azure-iot-common.Message}
 *                  before it's sent over the wire using the AMQP protocol.
 */
export declare class AmqpMessage {
    properties: {
        to?: string;
        absoluteExpiryTime?: Date;
        messageId?: string;
        correlationId?: string;
        reply_to?: string;
    };
    body: any;
    applicationProperties: {
        [key: string]: any;
    };
    /**
     * @method          module:azure-iot-amqp-base.AmqpMessage.fromMessage
     * @description     Takes a azure-iot-common.Message{@link module:azure-iot-common.Message} object and creates an AMQP message from it.
     *
     * @param {module:azure-iot-common.Message}   message   The {@linkcode Message} object from which to create an AMQP message.
     */
    static fromMessage(message: Message): AmqpMessage;
    /**
     * @method          module:azure-iot-amqp-base.AmqpMessage.toMessage
     * @description     Creates a transport-agnostic azure-iot-common.Message{@link module:azure-iot-common.Message} object from transport-specific AMQP message.
     *
     * @param {AmqpMessage}   message   The {@linkcode AmqpMessage} object from which to create an Message.
     */
    static toMessage(amqpMessage: AmqpMessage): Message;
}
