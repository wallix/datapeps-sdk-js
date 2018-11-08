import * as DataPeps from "../../src/DataPeps";
import * as Long from "long";
import * as nacl from "tweetnacl";
import { expect } from "chai";

describe("ut.datapeps", () => {
  it("clip/unclip", () => {
    let id = new Long(
      Math.random() * 0xffffffff,
      Math.random() * 0xffffffff,
      true
    );
    let content = nacl.randomBytes(10);
    let clipped = DataPeps.clipID(id, content);
    let unclipped = DataPeps.unclipID(clipped);
    expect(unclipped.id).to.be.deep.equals(id);
    expect(unclipped.content).to.be.deep.equals(content);
  });
});
