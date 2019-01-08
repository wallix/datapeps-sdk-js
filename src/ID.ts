import * as Long from "long";

/**
 * Type of identitfier of DataPeps objects.
 */
export type ID = Long | number;

export namespace ID {
  export function compare(a: ID, b: ID): number {
    if (Long.isLong(a)) return (a as Long).compare(b);
    return new Long(a as number).compare(b);
  }

  export function clip<T extends Uint8Array | string>(id: ID, data: T): T {
    if (data instanceof Uint8Array) {
      let encapsulated = new Uint8Array(8 + data.length);
      let lid = Long.fromValue(id);
      let high: number = lid.getHighBitsUnsigned();
      encapsulated[0] = (high >>> 24) & 0xff;
      encapsulated[1] = (high >>> 16) & 0xff;
      encapsulated[2] = (high >>> 8) & 0xff;
      encapsulated[3] = high & 0xff;
      let low: number = lid.getLowBitsUnsigned();
      encapsulated[4] = (low >>> 24) & 0xff;
      encapsulated[5] = (low >>> 16) & 0xff;
      encapsulated[6] = (low >>> 8) & 0xff;
      encapsulated[7] = low & 0xff;
      encapsulated.set(data, 8);
      return encapsulated as T;
    }
    return `${id.toString()}.${data}` as T;
  }

  export function unclip<T extends Uint8Array | string>(
    data: T
  ): { id: ID; data: T } {
    if (data instanceof Uint8Array) {
      let high = (data[0] << 24) + (data[1] << 16) + (data[2] << 8) + data[3];
      let low = (data[4] << 24) + (data[5] << 16) + (data[6] << 8) + data[7];
      return { id: new Long(low, high, true), data: data.slice(8) as T };
    }
    let i = (data as string).indexOf(".");
    let strId = (data as string).slice(0, i);
    let id = Long.fromString(strId, true);
    return { id, data: data.slice(i + 1) as T };
  }

  /**
   * Returns the date from a DataPeps ID
   * @param id The id from which the date is extracted
   * @return(s) The date of the creation of this id
   */
  export const dateFromID = (id: ID): Date => {
    let l: Long;
    if (id instanceof Long) {
      l = id;
    } else {
      l = Long.fromNumber(id, true);
    }
    return new Date(l.getHighBitsUnsigned() * 1000);
  };
}
