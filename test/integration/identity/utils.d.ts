import { Identity, IdentitySortingField, IdentitySortingOrder } from "../../../src/DataPeps";
export declare function expectContainsAllIdentities(expected: Identity<Uint8Array>[], result: Identity<Uint8Array>[], both?: boolean): void;
export declare function expectIdentitiesListAreEquals(expected: Identity<Uint8Array>[], result: Identity<Uint8Array>[]): void;
export declare function sortIdentities(sortingField: IdentitySortingField, sortingOrder: IdentitySortingOrder, identities: Identity<any>[]): Identity<any>[];
