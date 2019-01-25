export declare let debug: boolean;
export { client };
export interface Request<T> {
    headers?: Headers;
    body?: Uint8Array;
    method: string;
    path: string;
    params?: any;
    expectedCode: number;
    response?: (responseBinary: Uint8Array) => T;
    host?: string;
}
export declare class Client {
    host: string;
    debug: boolean;
    constructor(host: string);
    doRequest<T>(request: Request<T>): Promise<{
        body: T;
        headers: Headers;
    }>;
    private uri_query(url, params?);
}
export declare function configure(APIUrl: string, WSUrl?: string): void;
declare let client: Client;
