import { Twin } from './twin';
import { Callback } from './interfaces';
import { Registry } from './registry';
/**
 * @class                  module:azure-iothub.Query
 * @classdesc              Constructs a Query object that provides APIs to trigger the execution of a device query.
 * @param {Function}       executeQueryFn  The function that should be called to get a new page.
 * @param {Registry}       registry        [optional] Registry client used to create Twin objects (used in nextAsTwin()).
 */
export declare class Query {
    continuationToken: string;
    hasMoreResults: boolean;
    private _registry;
    private _executeQueryFn;
    constructor(executeQueryFn: (continuationToken: string, done: Callback<any>) => void, registry?: Registry);
    /**
     * @method              module:azure-iothub.Query#next
     * @description         Gets the next page of results for this query.
     * @param {string}      continuationToken    Continuation Token used for paging through results (optional)
     * @param {Function}    done                 The callback that will be called with either an Error object or
     *                                           the results of the query.
     */
    next(continuationTokenOrCallback: string | Callback<any>, done?: Callback<any>): void;
    /**
     * @method              module:azure-iothub.Query#nextAsTwin
     * @description         Gets the next page of results for this query and cast them as Twins.
     * @param {string}      continuationToken    Continuation Token used for paging through results (optional)
     * @param {Function}    done                 The callback that will be called with either an Error object or
     *                                           the results of the query.
     */
    nextAsTwin(continuationToken: string | Callback<Twin[]>, done: Callback<Twin[]>): void;
}
