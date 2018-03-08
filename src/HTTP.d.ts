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
    wsHost: string;
    debug: boolean;
    constructor(host: string, wsHost: string);
    doRequest<T>(r: Request<T>): Promise<T>;
    private uri_query(url, params?);
}
