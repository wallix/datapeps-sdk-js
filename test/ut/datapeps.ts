import * as nacl from "tweetnacl";
import { expect } from "chai";
import { randomID } from "./utils";
import { ID } from "../../src/DataPeps";
import * as Long from "long";

describe("ut.datapeps", () => {
  it("clip/unclip", () => {
    let id = randomID();
    let content = nacl.randomBytes(10);
    let clipped = ID.clip(id, content);
    let unclipped = ID.unclip(clipped);
    expect(unclipped.id).to.be.deep.equals(id);
    expect(unclipped.data).to.be.deep.equals(content);
  });

  it("clip/unclip with string", () => {
    let id = randomID();
    let content = "ijedjieza:87SZ89HKJNDeytd-etdè-ez";
    let clipped = ID.clip(id, content);
    let unclipped = ID.unclip(clipped);
    expect(unclipped.id).to.be.deep.equals(id);
    expect(unclipped.data).to.be.deep.equals(content);
  });
});
