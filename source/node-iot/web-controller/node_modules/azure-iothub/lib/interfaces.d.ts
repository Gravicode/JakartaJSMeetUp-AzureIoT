/// <reference types="node" />
import { IncomingMessage } from 'http';
export declare type Callback<T> = (err?: Error, result?: T, response?: IncomingMessage) => void;
export interface DeviceMethodParams {
    methodName: string;
    payload?: any;
    responseTimeoutInSeconds?: number;
    connectTimeoutInSeconds?: number;
}
