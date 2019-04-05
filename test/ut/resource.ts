import { Resource } from "../../src/DataPeps";
import { ResourceBox } from "../../src/ResourceInternal";
import * as nacl from "tweetnacl";
import { expect } from "chai";

describe("ut.resource", () => {
  it("encrypt/decrypt", () => {
    let resource: Resource<null> = new ResourceBox(
      null,
      "somekind",
      null,
      nacl.box.keyPair(),
      null
    );
    let clear = nacl.randomBytes(10);
    let encrypted = resource.encrypt(clear);
    expect(resource.decrypt(encrypted)).deep.equals(clear);
  });

  it("encryptString/decrypt with string", () => {
    let resource: Resource<null> = new ResourceBox(
      null,
      "somekind",
      null,
      nacl.box.keyPair(),
      null
    );
    let clear = "Hello world";
    let encrypted = resource.encrypt(clear);
    expect(resource.decrypt(encrypted)).deep.equals(clear);
  });
});
