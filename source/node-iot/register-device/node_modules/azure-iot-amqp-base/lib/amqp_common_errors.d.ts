export interface AmqpTransportError extends Error {
    amqpError?: Error;
}
export declare function translateError(message: string, amqpError: Error): AmqpTransportError;
