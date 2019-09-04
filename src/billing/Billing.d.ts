/// <reference types="long" />
import { services } from "../proto";
import { Session } from "../Session";
import billing = services.interfaces.billing;
export declare class BillingAPI {
    private api;
    constructor(session: Session);
    getSimpleBill(tenantName: string, period: {
        from: number | Long;
        to: number | Long;
    }): Promise<billing.ITenantSimpleBill>;
}
