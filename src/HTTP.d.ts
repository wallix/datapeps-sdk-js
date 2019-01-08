export declare let debug: boolean;
export { client };
export interface Request<T> {
    method: string;
    path: string;
    code: number;
    params?: any;
    body?: any;
    request?: () => Uint8Array;
    response?: (responseBinary: Uint8Array) => T;
    before?: (r: XMLHttpRequest, body: Uint8Array) => void;
    host?: string;
}
export declare class Client {
    host: string;
    debug: boolean;
    constructor(host: string);
    doRequest<T>(r: Request<T>): Promise<T>;
    private uri_query(url, params?);
}
export declare function configure(APIUrl: string, WSUrl?: string): void;
declare let client: Client;
