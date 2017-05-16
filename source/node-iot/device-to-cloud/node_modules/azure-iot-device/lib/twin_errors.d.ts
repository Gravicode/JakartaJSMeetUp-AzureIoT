export declare class TwinBaseError extends Error {
    response?: any;
}
export declare function translateError(response: any, status: number): TwinBaseError;
