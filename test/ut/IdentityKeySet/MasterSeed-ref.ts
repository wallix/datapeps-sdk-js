import { expect } from "chai";
import { MasterPrivateSeed } from "../../../src/IdentityKeySet";

describe("ut.ref.MasterSeed", () => {
  it("fromSecret", () => {
    let secret = new Uint8Array([
      163,
      211,
      189,
      16,
      112,
      36,
      111,
      90,
      189,
      238,
      111,
      219,
      230,
      192,
      175
    ]);
    let salt = new Uint8Array([
      70,
      4,
      106,
      172,
      92,
      20,
      98,
      214,
      40,
      52,
      61,
      203,
      212,
      217,
      159,
      139
    ]);
    let seed = MasterPrivateSeed.fromSecret(secret, salt);
    expect(seed.masterSalt).deep.equal(salt);
    expect(seed.publicKey, "publicKey reference").deep.equal(
      new Uint8Array([
        162,
        206,
        97,
        122,
        109,
        170,
        119,
        115,
        100,
        29,
        38,
        103,
        1,
        159,
        186,
        207,
        84,
        247,
        90,
        197,
        198,
        168,
        229,
        67,
        123,
        93,
        120,
        232,
        67,
        19,
        168,
        34
      ])
    );
    expect(seed.secretKey, "secretKey reference").deep.equal(
      new Uint8Array([
        59,
        234,
        111,
        204,
        189,
        61,
        111,
        190,
        1,
        139,
        18,
        47,
        118,
        58,
        235,
        190,
        223,
        71,
        232,
        36,
        142,
        139,
        97,
        68,
        248,
        156,
        153,
        49,
        170,
        22,
        146,
        21
      ])
    );
  });
});
