import { Message } from 'azure-iot-common';
export declare type GenericAmqpBaseCallback = (err: Error | null, result?: any) => void;
/**
 * @class module:azure-iot-amqp-base.Amqp
 * @classdesc Basic AMQP functionality used by higher-level IoT Hub libraries.
 *            Usually you'll want to avoid using this class and instead rely on higher-level implementations
 *            of the AMQP transport (see [azure-iot-device-amqp.Amqp]{@link module:azure-iot-device-amqp.Amqp} for example).
 *
 * @param   {Boolean}   autoSettleMessages      Boolean indicating whether messages should be settled automatically or if the calling code will handle it.
 * @param   {String}    sdkVersionString        String identifying the SDK used (device or service).
 */
export declare class Amqp {
    private _connected;
    private uri;
    private _amqp;
    private _receivers;
    private _senders;
    private _putToken;
    constructor(autoSettleMessages: boolean, sdkVersionString: string);
    /**
     * @method             module:azure-iot-amqp-base.Amqp#connect
     * @description        Establishes a connection with the IoT Hub instance.
     * @param {String}     uri           The uri to connect with.
     * @param {Object}     sslOptions    SSL certificate options.
     * @param {Function}   done          Callback called when the connection is established or if an error happened.
     */
    connect(uri: string, sslOptions: any, done: GenericAmqpBaseCallback): void;
    /**
     * @method             module:azure-iot-amqp-base.Amqp#setDisconnectCallback
     * @description        Sets the callback that should be called in case of disconnection.
     * @param {Function}   disconnectCallback   Called when the connection disconnected.
     */
    setDisconnectHandler(disconnectCallback: GenericAmqpBaseCallback): void;
    /**
     * @method             module:azure-iot-amqp-base.Amqp#disconnect
     * @description        Disconnects the link to the IoT Hub instance.
     * @param {Function}   done   Called when disconnected of if an error happened.
     */
    disconnect(done: GenericAmqpBaseCallback): void;
    /**
     * @method             module:azure-iot-amqp-base.Amqp#send
     * @description        Sends a message to the IoT Hub instance.
     *
     * @param {Message}   message   The message to send.
     * @param {string}    endpoint  The endpoint to use when sending the message.
     * @param {string}    to        The destination of the message.
     * @param {Function}  done      Called when the message is sent or if an error happened.
     */
    send(message: Message, endpoint: string, to: string, done: GenericAmqpBaseCallback): void;
    /**
     * @method             module:azure-iot-amqp-base.Amqp#getReceiver
     * @description        Gets the {@linkcode AmqpReceiver} object that can be used to receive messages from the IoT Hub instance and accept/reject/release them.
     *
     * @param {string}    endpoint  Endpoint used for the receiving link.
     * @param {Function}  done      Callback used to return the {@linkcode AmqpReceiver} object.
     */
    getReceiver(endpoint: string, done: GenericAmqpBaseCallback): void;
    /**
     * @method             module:azure-iot-amqp-base.Amqp#attachReceiverLink
     * @description        Creates and attaches an AMQP receiver link for the specified endpoint.
     *
     * @param {string}    endpoint    Endpoint used for the receiver link.
     * @param {Object}    linkOptions Configuration options to be merged with the AMQP10 policies for the link..
     * @param {Function}  done        Callback used to return the link object or an Error.
     */
    attachReceiverLink(endpoint: string, linkOptions: any, done: GenericAmqpBaseCallback): void;
    /**
     * @method             module:azure-iot-amqp-base.Amqp#attachSenderLink
     * @description        Creates and attaches an AMQP sender link for the specified endpoint.
     *
     * @param {string}    endpoint    Endpoint used for the sender link.
     * @param {Object}    linkOptions Configuration options to be merged with the AMQP10 policies for the link..
     * @param {Function}  done        Callback used to return the link object or an Error.
     */
    attachSenderLink(endpoint: string, linkOptions: any, done: GenericAmqpBaseCallback): void;
    /**
     * @method             module:azure-iot-amqp-base.Amqp#detachReceiverLink
     * @description        Detaches an AMQP receiver link for the specified endpoint if it exists.
     *
     * @param {string}    endpoint  Endpoint used to identify which link should be detached.
     * @param {Function}  done      Callback used to signal success or failure of the detach operation.
     */
    detachReceiverLink(endpoint: string, detachCallback: GenericAmqpBaseCallback): void;
    /**
     * @method             module:azure-iot-amqp-base.Amqp#detachSenderLink
     * @description        Detaches an AMQP sender link for the specified endpoint if it exists.
     *
     * @param {string}    endpoint  Endpoint used to identify which link should be detached.
     * @param {Function}  done      Callback used to signal success or failure of the detach operation.
     */
    detachSenderLink(endpoint: string, detachCallback: GenericAmqpBaseCallback): void;
    _detachLink(link: any, detachCallback: GenericAmqpBaseCallback): void;
    /**
     * @method             module:azure-iot-amqp-base.Amqp#putToken
     * @description        Sends a put token operation to the IoT Hub to provide authentication for a device.
     * @param              audience          The path that describes what is being authenticated.  An example would be
     *                                       hub.azure-devices.net%2Fdevices%2Fmydevice
     * @param              token             The actual sas token being used to authenticate the device.  For the most
     *                                       part the audience is likely to be the sr field of the token.
     * @param {Function}   putTokenCallback  Called when the put token operation terminates.
     */
    putToken(audience: string, token: string, putTokenCallback: GenericAmqpBaseCallback): void;
    /**
     * @method             module:azure-iot-amqp-base.Amqp#initializeCBS
     * @description        If CBS authentication is to be used, set it up.
     * @param {Function}   initializeCBSCallback  Called when the initialization terminates.
     */
    initializeCBS(initializeCBSCallback: GenericAmqpBaseCallback): void;
    private _removeExpiredPutTokens();
    private _safeCallback(callback, error?, result?);
}
