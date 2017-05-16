import { RestApiClient } from './rest_api_client';
import { Query } from './query';
import { DeviceMethodParams } from './interfaces';
export declare type JobType = 'scheduleUpdateTwin' | 'scheduleDeviceMethod';
export declare type JobStatus = 'queued' | 'scheduled' | 'running' | 'cancelled' | 'finished';
export interface JobDescription {
    jobId: string | number;
    type: JobType;
    queryCondition?: string;
    updateTwin?: any;
    cloudToDeviceMethod?: DeviceMethodParams;
    startTime: string;
    maxExecutionTimeInSeconds: number;
}
/**
 * @class                     module:azure-iothub.JobClient
 * @classdesc                 Constructs a JobClient object that provides methods to update
 *                            create, monitor and cancel jobs on an IoT Hub instance.
 *
 * @param {RestApiClient}     restApiClient   The HTTP registry client used to execute REST API calls.
 *
 * @throws {ReferenceError}   If the restApiClient argument is falsy.
 */
export declare class JobClient {
    private _restApiClient;
    constructor(restApiClient: RestApiClient);
    /**
     * @method            module:azure-iothub.JobClient#getJob
     * @description       Requests information about an existing job.
     *
     * @param {String}    jobId       The identifier of an existing job.
     * @param {Function}  done        The function to call when the operation is
     *                                complete. `done` will be called with three
     *                                arguments: an Error object (can be null), a
     *                                job object, and a transport-specific response
     *                                object useful for logging or debugging.
     */
    getJob(jobId: string | number, done: JobClient.JobCallback): void;
    /**
     * @method            module:azure-iothub.JobClient#createQuery
     * @description       Creates a query that can be used to return pages of existing job based on type and status.
     *
     * @param {String}    jobType     The type that should be used to filter results.
     * @param {String}    jobStatus   The status that should be used to filter results.
     * @param {Number}    pageSize    The number of elements to return per page.
     */
    createQuery(jobType?: JobType, jobStatus?: JobStatus, pageSize?: number): Query;
    /**
     * @method            module:azure-iothub.JobClient#cancelJob
     * @description       Cancels an existing job.
     *
     * @param {String}    jobId       The identifier of an existing job.
     * @param {Function}  done        The function to call when the operation is
     *                                complete. `done` will be called with three
     *                                arguments: an Error object (can be null), a
     *                                job object, and a transport-specific response
     *                                object useful for logging or debugging.
     */
    cancelJob(jobId: string | number, done: JobClient.JobCallback): void;
    /**
     * @method            module:azure-iothub.JobClient#scheduleDeviceMethod
     * @description       Schedules a job that will execute a device method on a set of devices.
     *
     * @param {String}    jobId             The unique identifier that should be used for this job.
     * @param {String}    queryCondition    A SQL query WHERE clause used to compute the list of devices
     *                                      on which this job should be run.
     * @param {Object}    methodParams      An object describing the method and shall have the following properties:
     *                                      - methodName          The name of the method that shall be invoked.
     *                                      - payload             [optional] The payload to use for the method call.
     *                                      - responseTimeoutInSeconds [optional] The number of seconds IoT Hub shall wait for the device
     * @param {Date}      jobStartTime      Time time at which the job should start
     * @param {Number}    maxExecutionTimeInSeconds  The maximum time alloted for this job to run in seconds.
     * @param {Function}  done              The function to call when the operation is
     *                                      complete. `done` will be called with three
     *                                      arguments: an Error object (can be null), a
     *                                      job object, and a transport-specific response
     *                                      object useful for logging or debugging.
     *
     * @throws {ReferenceError}   If one or more of the jobId, queryCondition or methodParams arguments are falsy.
     * @throws {ReferenceError}   If methodParams.methodName is falsy.
     * @throws {TypeError}        If the callback is not the last parameter
     */
    scheduleDeviceMethod(jobId: string | number, queryCondition: string, methodParams: DeviceMethodParams, jobStartTime?: Date | JobClient.JobCallback, maxExecutionTimeInSeconds?: number | JobClient.JobCallback, done?: JobClient.JobCallback): void;
    /**
     * @method            module:azure-iothub.JobClient#scheduleTwinUpdate
     * @description       Schedule a job that will update a set of twins with the patch provided as a parameter.
     *
     * @param {String}    jobId             The unique identifier that should be used for this job.
     * @param {String}    queryCondition    A SQL query WHERE clause used to compute the list of devices
     *                                      on which this job should be run.
     * @param {Object}    patch             The twin patch that should be applied to the twins.
     * @param {Date}      jobStartTime      Time time at which the job should start
     * @param {Number}    maxExecutionTimeInSeconds  The maximum time alloted for this job to run in seconds.
     * @param {Function}  done              The function to call when the operation is
     *                                      complete. `done` will be called with three
     *                                      arguments: an Error object (can be null), a
     *                                      job object, and a transport-specific response
     *                                      object useful for logging or debugging.
     *
     * @throws {ReferenceError}   If one or more of the jobId, queryCondition or patch arguments are falsy.
     * @throws {TypeError}        If the callback is not the last parameter
     */
    scheduleTwinUpdate(jobId: string | number, queryCondition: string, patch: any, jobStartTime?: Date | JobClient.JobCallback, maxExecutionTimeInSeconds?: number | JobClient.JobCallback, done?: JobClient.JobCallback): void;
    private _getJobsFunc(jobType, jobStatus, pageSize);
    private _scheduleJob(jobDesc, done);
    /**
     * @method          module:azure-iothub.JobClient.fromConnectionString
     * @description     Constructs a JobClient object from the given connection string.
     *
     * @param   {String}          connectionString       A connection string which encapsulates the
     *                                                   appropriate (read and/or write) Registry
     *                                                   permissions.
     *
     * @throws  {ReferenceError}  If the connectionString argument is falsy.
     *
     * @returns {module:azure-iothub.JobClient}
     */
    static fromConnectionString(connectionString: string): JobClient;
    /**
     * @method            module:azure-iothub.JobClient.fromSharedAccessSignature
     * @description       Constructs a JobClient object from the given shared access signature.
     *
     * @param {String}    sharedAccessSignature     A shared access signature which encapsulates
     *                                              the appropriate (read and/or write) Registry
     *                                              permissions.
     *
     * @throws  {ReferenceError}  If the sharedAccessSignature argument is falsy.
     *
     * @returns {module:azure-iothub.JobClient}
     */
    static fromSharedAccessSignature(sharedAccessSignature: string): JobClient;
}
export declare namespace JobClient {
    type JobCallback = (err: Error, jobStatus?: any, response?: any) => void;
}
