/// <reference types="long" />
import * as Long from "long";
/**
 * Type of identitfier of DataPeps objects.
 */
export declare type ID = Long | number;
export declare namespace ID {
    function compare(a: ID, b: ID): number;
    function clip<T extends Uint8Array | string>(id: ID, data: T): T;
    function unclip<T extends Uint8Array | string>(data: T): {
        id: ID;
        data: T;
    };
    /**
     * Returns the date from a DataPeps ID
     * @param id The id from which the date is extracted
     * @return(s) The date of the creation of this id
     */
    const dateFromID: (id: number | Long) => Date;
}
