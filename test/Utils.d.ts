/// <reference types="mocha" />
import * as mocha from "mocha";
import * as DataPeps from "../src/DataPeps";
export declare function itError(description: string, action: () => Promise<any>, kind: DataPeps.ErrorKind, payload?: () => any): mocha.ITest;
export declare function expectError(action: Promise<any>, kind: DataPeps.ErrorKind, payload?: any): Promise<any>;
export declare type TestResource = DataPeps.Resource<{
    description: string;
}>;
export declare class ResourceContent {
    plain: Uint8Array;
    encrypted: Uint8Array;
    constructor(resource: DataPeps.Resource<{}>, content: string);
}
export declare class Resource {
    resource: DataPeps.Resource<{}>;
    content: ResourceContent;
    constructor(resource: DataPeps.Resource<{}>, content: string);
}
export declare function sleep(ms: number): Promise<void>;
export declare function wait(ms: number, predicate: () => boolean): Promise<boolean>;
export declare function checkFetchedResource(resourceFetched: DataPeps.Resource<{}>, resourceExpected: Resource): void;
export declare function checkResourceNotFoundError(err: any, resourceId: DataPeps.ID, errorOccurred: {
    isTrue: boolean;
}): void;
export declare function checkIdentityNotFoundError(err: any, errorOccurred: {
    isTrue: boolean;
}): void;
export declare function checkPayloadApplicationInvalidTokenError(err: any, errorOccurred: {
    isTrue: boolean;
}): void;
export declare function fetchAndCheckResource(session: DataPeps.Session, resource: Resource): Promise<DataPeps.Resource<{}>>;
