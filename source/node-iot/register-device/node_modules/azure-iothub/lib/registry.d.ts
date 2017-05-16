import { SharedAccessSignature } from 'azure-iot-common';
import { RestApiClient } from './rest_api_client';
import { Query } from './query';
import { Device } from './device';
import { Callback } from './interfaces';
/**
 * @class           module:azure-iothub.Registry
 * @classdesc       Constructs a Registry object with the given configuration
 *                  object. The Registry class provides access to the IoT Hub
 *                  identity service. Normally, consumers will call one of the
 *                  factory methods, e.g.,
 *                  {@link module:azure-iothub.Registry.fromConnectionString|fromSharedAccessSignature},
 *                  to create a Registry object.
 * @param {Object}  config      An object containing the necessary information to connect to the IoT Hub instance:
 *                              - host: the hostname for the IoT Hub instance
 *                              - sharedAccessSignature: A shared access signature with valid access rights and expiry.
 */
export declare class Registry {
    private _config;
    private _restApiClient;
    constructor(config: Registry.TransportConfig, restApiClient?: RestApiClient);
    /**
     * @method            module:azure-iothub.Registry#create
     * @description       Creates a new device identity on an IoT hub.
     * @param {Object}    deviceInfo  The object must include a `deviceId` property
     *                                with a valid device identifier.
     * @param {Function}  done        The function to call when the operation is
     *                                complete. `done` will be called with three
     *                                arguments: an Error object (can be null), a
     *                                {@link module:azure-iothub.Device|Device}
     *                                object representing the created device
     *                                identity, and a transport-specific response
     *                                object useful for logging or debugging.
     */
    create(deviceInfo: Registry.DeviceDescription, done: Registry.DeviceCallback): void;
    /**
     * @method            module:azure-iothub.Registry#update
     * @description       Updates an existing device identity on an IoT hub with
     *                    the given device information.
     * @param {Object}    deviceInfo  An object which must include a `deviceId`
     *                                property whose value is a valid device
     *                                identifier.
     * @param {Function}  done        The function to call when the operation is
     *                                complete. `done` will be called with three
     *                                arguments: an Error object (can be null), a
     *                                {@link module:azure-iothub.Device|Device}
     *                                object representing the updated device
     *                                identity, and a transport-specific response
     *                                object useful for logging or debugging.
     */
    update(deviceInfo: Registry.DeviceDescription, done: Registry.DeviceCallback): void;
    /**
     * @method            module:azure-iothub.Registry#get
     * @description       Requests information about an existing device identity
     *                    on an IoT hub.
     * @param {String}    deviceId    The identifier of an existing device identity.
     * @param {Function}  done        The function to call when the operation is
     *                                complete. `done` will be called with three
     *                                arguments: an Error object (can be null), a
     *                                {@link module:azure-iothub.Device|Device}
     *                                object representing the created device
     *                                identity, and a transport-specific response
     *                                object useful for logging or debugging.
     */
    get(deviceId: string, done: Registry.DeviceCallback): void;
    /**
     * @method            module:azure-iothub.Registry#list
     * @description       Requests information about the first 1000 device
     *                    identities on an IoT hub.
     * @param {Function}  done        The function to call when the operation is
     *                                complete. `done` will be called with three
     *                                arguments: an Error object (can be null), an
     *                                array of
     *                                {@link module:azure-iothub.Device|Device}
     *                                objects representing the listed device
     *                                identities, and a transport-specific response
     *                                object useful for logging or debugging.
     */
    list(done: Callback<Device[]>): void;
    /**
     * @method            module:azure-iothub.Registry#delete
     * @description       Removes an existing device identity from an IoT hub.
     * @param {String}    deviceId    The identifier of an existing device identity.
     * @param {Function}  done        The function to call when the operation is
     *                                complete. `done` will be called with three
     *                                arguments: an Error object (can be null), an
     *                                always-null argument (for consistency with
     *                                the other methods), and a transport-specific
     *                                response object useful for logging or
     *                                debugging.
     */
    delete(deviceId: string, done: Registry.ResponseCallback): void;
    /**
     * @method            module:azure-iothub.Registry#addDevices
     * @description       Adds an array of devices.
     *
     * @param {Object}    devices     An array of objects which must include a `deviceId`
     *                                property whose value is a valid device
     *                                identifier.
     * @param {Function}  done        The function to call when the operation is
     *                                complete. `done` will be called with three
     *                                arguments: an Error object (can be null), a
     *                                BulkRegistryOperationResult
     *                                and a transport-specific response object useful
     *                                for logging or debugging.
     */
    addDevices(devices: Registry.DeviceDescription[], done: Registry.BulkDeviceIdentityCallback): void;
    /**
     * @method            module:azure-iothub.Registry#updateDevices
     * @description       Updates an array of devices.
     *
     * @param {Object}    devices     An array of objects which must include a `deviceId`
     *                                property whose value is a valid device
     *                                identifier.
     * @param {boolean}   forceUpdate if `forceUpdate` is true then the device will be
     *                                updated regardless of an etag.  Otherwise the etags
     *                                must match.
     * @param {Function}  done        The function to call when the operation is
     *                                complete. `done` will be called with three
     *                                arguments: an Error object (can be null), a
     *                                BulkRegistryOperationResult
     *                                and a transport-specific response object useful
     *                                for logging or debugging.
     */
    updateDevices(devices: Registry.DeviceDescription[], forceUpdate: boolean, done?: Registry.BulkDeviceIdentityCallback): void;
    /**
     * @method            module:azure-iothub.Registry#removeDevices
     * @description       Updates an array of devices.
     *
     * @param {Object}    devices     An array of objects which must include a `deviceId`
     *                                property whose value is a valid device
     *                                identifier.
     * @param {boolean}   forceRemove if `forceRemove` is true then the device will be
     *                                removed regardless of an etag.  Otherwise the etags
     *                                must match.
     * @param {Function}  done        The function to call when the operation is
     *                                complete. `done` will be called with three
     *                                arguments: an Error object (can be null), a
     *                                BulkRegistryOperationResult
     *                                and a transport-specific response object useful
     *                                for logging or debugging.
     */
    removeDevices(devices: Registry.DeviceDescription[], forceRemove: boolean, done: Registry.BulkDeviceIdentityCallback): void;
    /**
     * @method              module:azure-iothub.Registry#importDevicesFromBlob
     * @description         Imports devices from a blob in bulk job.
     * @param {String}      inputBlobContainerUri   The URI to a container with a blob named 'devices.txt' containing a list of devices to import.
     * @param {String}      outputBlobContainerUri  The URI to a container where a blob will be created with logs of the import process.
     * @param {Function}    done                    The function to call when the job has been created, with two arguments: an error object if an
     *                                              an error happened, (null otherwise) and the job status that can be used to track progress of the devices import.
     */
    importDevicesFromBlob(inputBlobContainerUri: string, outputBlobContainerUri: string, done: Registry.JobCallback): void;
    /**
     * @method              module:azure-iothub.Registry#exportDevicesToBlob
     * @description         Export devices to a blob in a bulk job.
     * @param {String}      outputBlobContainerUri  The URI to a container where a blob will be created with logs of the export process.
     * @param {Boolean}     excludeKeys             Boolean indicating whether security keys should be excluded from the exported data.
     * @param {Function}    done                    The function to call when the job has been created, with two arguments: an error object if an
     *                                              an error happened, (null otherwise) and the job status that can be used to track progress of the devices export.
     */
    exportDevicesToBlob(outputBlobContainerUri: string, excludeKeys: boolean, done: Registry.JobCallback): void;
    /**
     * @method              module:azure-iothub.Registry#listJobs
     * @description         List the last import/export jobs (including the active one, if any).
     * @param {Function}    done    The function to call with two arguments: an error object if an error happened,
     *                              (null otherwise) and the list of past jobs as an argument.
     */
    listJobs(done: Callback<any>): void;
    /**
     * @method              module:azure-iothub.Registry#getJob
     * @description         Get the status of a bulk import/export job.
     * @param {String}      jobId   The identifier of the job for which the user wants to get status information.
     * @param {Function}    done    The function to call with two arguments: an error object if an error happened,
     *                              (null otherwise) and the status of the job whose identifier was passed as an argument.
     */
    getJob(jobId: string, done: Registry.JobCallback): void;
    /**
     * @method              module:azure-iothub.Registry#cancelJob
     * @description         Cancel a bulk import/export job.
     * @param {String}      jobId   The identifier of the job for which the user wants to get status information.
     * @param {Function}    done    The function to call with two arguments: an error object if an error happened,
     *                              (null otherwise) and the (cancelled) status of the job whose identifier was passed as an argument.
     */
    cancelJob(jobId: string, done: Registry.JobCallback): void;
    /**
     * @method              module:azure-iothub.Registry#getTwin
     * @description         Gets the Device Twin of the device with the specified device identifier.
     * @param {String}      deviceId   The device identifier.
     * @param {Function}    done       The callback that will be called with either an Error object or
     *                                 the device twin instance.
     */
    getTwin(deviceId: string, done: Registry.ResponseCallback): void;
    /**
     * @method              module:azure-iothub.Registry#updateTwin
     * @description         Updates the Device Twin of a specific device with the given patch.
     * @param {String}      deviceId   The device identifier.
     * @param {Object}      patch      The desired properties and tags to patch the device twin with.
     * @param {string}      etag       The latest etag for this device twin or '*' to force an update even if
     *                                 the device twin has been updated since the etag was obtained.
     * @param {Function}    done       The callback that will be called with either an Error object or
     *                                 the device twin instance.
     */
    updateTwin(deviceId: string, patch: any, etag: string, done: Registry.ResponseCallback): void;
    /**
     * @method              module:azure-iothub.Registry#createQuery
     * @description         Creates a query that can be run on the IoT Hub instance to find information about devices or jobs.
     * @param {String}      sqlQuery   The query written as an SQL string.
     * @param {Number}      pageSize   The desired number of results per page (optional. default: 1000, max: 10000).
     *
     * @throws {ReferenceError}        If the sqlQuery argument is falsy.
     * @throws {TypeError}             If the sqlQuery argument is not a string or the pageSize argument not a number, null or undefined.
     */
    createQuery(sqlQuery: string, pageSize?: number): Query;
    /**
     * @method                module:azure-iothub.Registry#getRegistryStatistics
     * @description           Gets statistics about the devices in the device identity registry.
     * @param {Function}      done   The callback that will be called with either an Error object or
     *                               the device registry statistics.
     */
    getRegistryStatistics(done: Callback<Registry.RegistryStatistics>): void;
    private _bulkOperation(devices, done);
    private _processBulkDevices(devices, operation, force, forceTrueAlternative, forceFalseAlternative, done);
    private _executeQueryFunc(sqlQuery, pageSize);
    /**
     * @method          module:azure-iothub.Registry.fromConnectionString
     * @description     Constructs a Registry object from the given connection
     *                  string using the default transport
     *                  ({@link module:azure-iothub.Http|Http}).
     * @param {String}  value       A connection string which encapsulates the
     *                              appropriate (read and/or write) Registry
     *                              permissions.
     * @returns {module:azure-iothub.Registry}
     */
    static fromConnectionString(value: string): Registry;
    /**
     * @method            module:azure-iothub.Registry.fromSharedAccessSignature
     * @description       Constructs a Registry object from the given shared access
     *                    signature using the default transport
     *                    ({@link module:azure-iothub.Http|Http}).
     * @param {String}    value     A shared access signature which encapsulates
     *                              the appropriate (read and/or write) Registry
     *                              permissions.
     * @returns {module:azure-iothub.Registry}
     */
    static fromSharedAccessSignature(value: string): Registry;
}
export declare namespace Registry {
    interface TransportConfig {
        host: string;
        sharedAccessSignature: string | SharedAccessSignature;
    }
    interface JobStatus {
    }
    interface QueryDescription {
        query: string;
    }
    interface RegistryStatistics {
        totalDeviceCount: number;
        enabledDeviceCount: number;
        disabledDeviceCount: number;
    }
    type DeviceCallback = (err: Error, device?: Device, response?: any) => void;
    type ResponseCallback = (err: Error, result?: any, response?: any) => void;
    type JobCallback = (err: Error, jobStatus?: JobStatus) => void;
    type BulkDeviceIdentityCallback = (err: Error, result: BulkRegistryOperationResult, response: any) => void;
    interface DeviceDescription {
        deviceId: string;
        [x: string]: any;
    }
    interface DeviceRegistryOperationError {
        deviceId: string;
        errorCode: Error;
        errorStatus: string;
    }
    interface BulkRegistryOperationResult {
        isSuccessful: boolean;
        errors: DeviceRegistryOperationError[];
    }
    type BulkRegistryOperationType = 'create' | 'Update' | 'UpdateIfMatchETag' | 'Delete' | 'DeleteIfMatchETag';
}
