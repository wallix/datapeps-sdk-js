import { Session } from "./Session";
export declare class GraphQL {
    private api;
    constructor(session: Session);
    getHeaders(body: string): Promise<Map<string, string>>;
}
