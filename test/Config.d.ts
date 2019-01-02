import * as DataPeps from "../src/DataPeps";
declare let sdk: typeof DataPeps;
export { sdk };
export declare let admin: DataPeps.Identity<any>;
export declare let adminSecret: string;
export declare function init(): Promise<void>;
export declare function adminLogin(): Promise<DataPeps.Session>;
