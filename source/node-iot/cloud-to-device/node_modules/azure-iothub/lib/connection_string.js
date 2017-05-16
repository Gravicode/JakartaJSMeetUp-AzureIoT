// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var azure_iot_common_1 = require("azure-iot-common");
function parse(source) {
    /*Codes_SRS_NODE_IOTHUB_CONNSTR_05_001: [The parse method shall return the result of calling azure-iot-common.ConnectionString.parse.]*/
    /*Codes_SRS_NODE_IOTHUB_CONNSTR_05_002: [It shall throw ArgumentError if any of 'HostName', 'SharedAccessKeyName', or 'SharedAccessKey' fields are not found in the source argument.]*/
    return azure_iot_common_1.ConnectionString.parse(source, ['HostName', 'SharedAccessKeyName', 'SharedAccessKey']);
}
exports.parse = parse;
//# sourceMappingURL=connection_string.js.map