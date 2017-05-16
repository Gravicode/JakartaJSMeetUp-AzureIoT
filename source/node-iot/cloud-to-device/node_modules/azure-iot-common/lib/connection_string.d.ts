/*! Copyright (c) Microsoft. All rights reserved.
 *! Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */
export interface ConnectionString {
    HostName?: string;
    DeviceId?: string;
    SharedAccessKey?: string;
    SharedAccessKeyName?: string;
    GatewayHostName?: string;
    x509?: string;
}
export declare namespace ConnectionString {
    function parse(source: string, requiredFields?: string[]): ConnectionString;
}
