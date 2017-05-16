/// <reference types="node" />
/*! Copyright (c) Microsoft. All rights reserved.
 *! Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */
import { Properties } from './properties';
/**
 * @class module:azure-iot-common.Message
 * @classdesc Constructs a {@linkcode Message} object with the given data.
 *            `data` can be a Node [Buffer]{@linkcode https://nodejs.org/api/globals.html#globals_class_buffer}
 *            object or anything that can be used to construct a `Buffer`
 *            object from.
 * @property {Object}   properties      A map containing string
 *                                      keys and values for storing
 *                                      custom message properties.
 * @property {String}   messageId       Used to correlate two-way
 *                                      communication.
 *                                      Format: A case-sensitive string
 *                                      (up to 128 char long) of ASCII
 *                                      7-bit alphanumeric chars and the
 *                                      following special symbols:
 *                                      <br/>`- : . + % _ # * ? ! ( ) , = @ ; $ '`
 * @property {String}   to              Destination of the message
 * @property {Date}     expiryTimeUtc   Expiry time in UTC interpreted by hub on
 *                                      C2D messages. Ignored in other cases.
 * @property {String}   lockToken       Used by receiver to Abandon, Reject or
 *                                      Complete the message
 * @property {String}   correlationId   Used in message responses and feedback
 * @property {String}   userId          Used to specify the entity creating the
 *                                      message
 * @see {@link https://nodejs.org/api/globals.html#globals_class_buffer|Buffer}
 */
export declare class Message {
    data: any;
    properties: Properties;
    messageId: string;
    to: string;
    expiryTimeUtc: any;
    lockToken: string;
    correlationId: string;
    userId: string;
    ack: string;
    transportObj: any;
    constructor(data: Message.BufferConvertible);
    /**
     * @method          module:azure-iot-common.Message#getData
     * @description     Returns the data that was passed in to the [constructor]{@link Message}.
     *
     * @returns {*} The data that was passed to the [constructor]{@link Message}.
     */
    getData(): Message.BufferConvertible;
    /**
     * @method          module:azure-iot-common.Message#getBytes
     * @description     Returns the data passed to the constructor as a Node
     *                  [Buffer]{@linkcode https://nodejs.org/api/globals.html#globals_class_buffer}
     *                  of bytes.
     *
     * @returns {Buffer}
     */
    getBytes(): Buffer;
}
export declare namespace Message {
    type BufferConvertible = Buffer | String | any[] | ArrayBuffer;
}
