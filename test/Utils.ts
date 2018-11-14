import { expect } from "chai";
import * as mocha from "mocha";

import * as DataPeps from "../src/DataPeps";

export function itError(
  description: string,
  action: () => Promise<any>,
  kind: DataPeps.ErrorKind,
  payload?: any
): mocha.ITest {
  return it(`${description} expect error(${kind})`, async () =>
    await expectError(action(), kind, payload));
}

export async function expectError(
  action: Promise<any>,
  kind: DataPeps.ErrorKind,
  payload?: any
): Promise<any> {
  try {
    await action;
  } catch (e) {
    expect(e).to.not.be.null;
    expect(e).instanceof(DataPeps.Error);
    expect(e.kind).equal(kind);
    if (payload != null) {
      expect(payload).deep.equals(e.payload);
    }
    return;
  }
  throw new Error(`action should throw a DataPepsError(${kind})`);
}
