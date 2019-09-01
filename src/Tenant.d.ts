import { api } from "./proto";
import { Session } from "./Session";
export declare namespace Tenant {
    type Customer = {
        id: number;
        name: string;
    };
}
export declare class Tenant {
    private api;
    constructor(session: Session);
    getCustomers(): Promise<api.TenantGetCustomersResponse>;
}
