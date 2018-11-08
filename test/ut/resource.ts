import * as DataPeps from "../../src/DataPeps";
import { Resource, ResourceImpl } from "../../src/Resource";
import * as Long from "long";
import * as nacl from "tweetnacl";
import { expect } from "chai";

describe("ut.resource", () => {
  it("encrypt/decrypt", () => {
    let resource: DataPeps.Resource<null> = new Resource(
      null,
      "somekind",
      null,
      nacl.box.keyPair(),
      null
    );
    let clear = nacl.randomBytes(1024);
    let encrypted = resource.encrypt(clear);
    expect(resource.decrypt(encrypted)).deep.equals(clear);
  });

  it("encryptString/decryptString", () => {
    let resource: DataPeps.Resource<null> = new Resource(
      null,
      "somekind",
      null,
      nacl.box.keyPair(),
      null
    );
    let clear = "Hello world";
    let encrypted = resource.encryptString(clear);
    expect(resource.decryptString(encrypted)).deep.equals(clear);
  });
});
