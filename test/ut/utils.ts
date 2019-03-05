import * as DataPeps from "../../src/DataPeps";
import * as Long from "long";

export function randomID(): DataPeps.ID {
  return new Long(Math.random() * 0xffffffff, Math.random() * 0xffffffff, true);
}
