import { expect } from "chai";
import {
  MasterPrivateSeed,
  IdentityKeySet,
  IdentityEncryptedKeySet
} from "../../../src/IdentityKeySet";

describe("ut.ref.IdentityKeySet", () => {
  let keySetID = { login: "alice", version: 9 };

  it("recover with a master seed", () => {
    IdentityKeySet.recover(keySetID, seed, encryptedKeySet);
  });

  // That's the reference seed
  let seed: MasterPrivateSeed = {
    masterSalt: new Uint8Array([
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
    ]),
    publicKey: new Uint8Array([
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
    ]),
    secretKey: new Uint8Array([
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
  };

  // That's the reference encryptedKey
  let encryptedKeySet: IdentityEncryptedKeySet = {
    sharingEncrypted: {
      nonce: new Uint8Array([
        7,
        242,
        238,
        141,
        244,
        74,
        74,
        203,
        39,
        57,
        131,
        9,
        194,
        144,
        41,
        114,
        30,
        18,
        167,
        35,
        89,
        83,
        204,
        7
      ]),
      publicKey: new Uint8Array([
        205,
        47,
        1,
        82,
        236,
        0,
        91,
        136,
        147,
        129,
        35,
        1,
        44,
        192,
        138,
        213,
        158,
        180,
        19,
        253,
        58,
        160,
        119,
        94,
        150,
        176,
        242,
        242,
        255,
        11,
        64,
        124
      ]),
      encryptedKey: new Uint8Array([
        15,
        132,
        129,
        5,
        87,
        145,
        70,
        200,
        222,
        124,
        69,
        32,
        79,
        140,
        98,
        223,
        223,
        225,
        206,
        42,
        173,
        203,
        182,
        38,
        193,
        83,
        246,
        196,
        36,
        220,
        153,
        88,
        46,
        197,
        116,
        182,
        214,
        100,
        139,
        128,
        186,
        230,
        73,
        105,
        146,
        242,
        151,
        114,
        121,
        3,
        105,
        211,
        59,
        206,
        138,
        181,
        29,
        200,
        182,
        86,
        98,
        141,
        82,
        11,
        161,
        197,
        236,
        187,
        26,
        149,
        171,
        16,
        221,
        99,
        81,
        227,
        217,
        128,
        94,
        253,
        159,
        79,
        176,
        201,
        194,
        126,
        196,
        106,
        62,
        209,
        162,
        118,
        164,
        237,
        244,
        253,
        117,
        9,
        247,
        14,
        187,
        249,
        10,
        238,
        56,
        220,
        226,
        28,
        207,
        129,
        158,
        96,
        135,
        127,
        107,
        109,
        233,
        21,
        219,
        160,
        254,
        68,
        95,
        65,
        112,
        130,
        183,
        78,
        112,
        139,
        59,
        235,
        171,
        85,
        104,
        41,
        211,
        176,
        124,
        79,
        123,
        4,
        38,
        2,
        39,
        233,
        124,
        149,
        156,
        229,
        112,
        64,
        243,
        37,
        133,
        139,
        204,
        167,
        157,
        88,
        206,
        140,
        252,
        246,
        76,
        37,
        234,
        14,
        237,
        33,
        33,
        56,
        35,
        203,
        160,
        206
      ])
    },
    boxEncrypted: {
      nonce: new Uint8Array([
        146,
        214,
        0,
        157,
        61,
        203,
        0,
        183,
        57,
        202,
        242,
        159,
        35,
        85,
        46,
        16,
        159,
        193,
        145,
        72,
        6,
        11,
        107,
        41
      ]),
      publicKey: new Uint8Array([
        28,
        234,
        63,
        199,
        133,
        130,
        192,
        104,
        74,
        116,
        162,
        203,
        243,
        216,
        195,
        190,
        40,
        4,
        231,
        122,
        45,
        218,
        2,
        18,
        124,
        213,
        214,
        162,
        185,
        142,
        204,
        97
      ]),
      encryptedKey: new Uint8Array([
        98,
        123,
        1,
        236,
        229,
        68,
        46,
        139,
        230,
        245,
        113,
        92,
        6,
        212,
        176,
        103,
        140,
        254,
        42,
        42,
        114,
        158,
        252,
        234,
        189,
        90,
        212,
        118,
        58,
        134,
        225,
        75,
        69,
        165,
        252,
        11,
        49,
        51,
        241,
        48,
        119,
        255,
        193,
        248,
        99,
        34,
        101,
        96,
        79,
        138,
        101,
        114,
        7,
        126,
        242,
        125,
        65,
        84,
        228,
        46,
        22,
        119,
        175,
        8,
        250,
        187,
        88,
        140,
        82,
        220,
        63,
        132,
        118,
        109,
        107,
        11,
        7,
        101,
        172,
        25,
        44,
        196,
        235,
        144,
        46,
        236,
        208,
        105,
        170,
        184,
        32,
        64,
        239,
        73,
        76,
        180,
        75,
        78,
        198,
        157,
        205,
        85,
        219,
        166,
        3,
        202,
        12,
        178,
        129,
        109,
        166,
        75,
        180,
        56,
        85,
        44,
        218,
        228,
        186,
        201,
        22,
        19,
        7,
        185,
        168,
        159,
        191,
        134,
        226,
        252,
        122,
        202,
        151,
        58,
        117,
        254,
        169,
        39,
        190,
        240,
        245,
        75,
        227,
        12,
        199,
        83,
        209,
        113,
        173,
        239,
        106,
        55,
        94,
        135,
        44,
        198,
        143,
        130,
        139,
        181,
        15,
        249,
        108,
        80,
        159,
        120,
        20,
        231,
        106,
        248,
        40,
        109,
        246,
        6,
        130,
        15
      ])
    },
    signEncrypted: {
      nonce: new Uint8Array([
        249,
        209,
        246,
        103,
        232,
        174,
        133,
        168,
        154,
        180,
        109,
        19,
        186,
        143,
        140,
        134,
        37,
        173,
        50,
        228,
        203,
        97,
        191,
        131
      ]),
      publicKey: new Uint8Array([
        255,
        112,
        60,
        159,
        242,
        207,
        99,
        204,
        176,
        199,
        244,
        151,
        141,
        89,
        214,
        57,
        4,
        252,
        182,
        27,
        34,
        205,
        227,
        118,
        240,
        1,
        91,
        76,
        168,
        166,
        249,
        76
      ]),
      encryptedKey: new Uint8Array([
        176,
        216,
        173,
        104,
        194,
        237,
        17,
        220,
        25,
        218,
        236,
        83,
        120,
        152,
        226,
        23,
        176,
        134,
        196,
        218,
        195,
        135,
        116,
        170,
        81,
        115,
        21,
        85,
        242,
        232,
        4,
        24,
        13,
        123,
        87,
        235,
        225,
        45,
        188,
        239,
        175,
        63,
        7,
        30,
        21,
        195,
        37,
        22,
        153,
        212,
        218,
        96,
        63,
        209,
        49,
        56,
        28,
        139,
        209,
        232,
        69,
        236,
        228,
        11,
        181,
        174,
        16,
        82,
        91,
        120,
        220,
        112,
        39,
        235,
        210,
        2,
        87,
        222,
        173,
        134,
        62,
        77,
        155,
        35,
        115,
        142,
        109,
        155,
        242,
        56,
        174,
        120,
        115,
        68,
        231,
        193,
        252,
        165,
        9,
        185,
        234,
        174,
        136,
        8,
        208,
        57,
        66,
        168,
        109,
        135,
        99,
        187,
        42,
        197,
        234,
        241,
        40,
        48,
        217,
        85,
        69,
        127,
        143,
        170,
        166,
        0,
        234,
        94,
        18,
        59,
        208,
        225,
        100,
        19,
        83,
        116,
        217,
        106,
        162,
        226,
        112,
        158,
        158,
        147,
        21,
        156,
        32,
        220,
        15,
        147,
        233,
        137,
        125,
        20,
        69,
        28,
        167,
        252,
        191,
        94,
        238,
        242,
        192,
        72,
        17,
        245,
        154,
        40,
        205,
        167,
        42,
        184,
        190,
        6,
        119,
        1,
        52,
        253,
        193,
        108,
        26,
        70,
        33,
        141,
        221,
        56,
        43,
        213,
        171,
        76,
        208,
        171,
        216,
        24,
        124,
        193,
        7,
        88,
        8,
        241,
        226,
        88,
        14,
        4,
        7,
        132,
        108,
        55
      ])
    },
    readEncrypted: {
      nonce: new Uint8Array([
        115,
        76,
        148,
        131,
        33,
        152,
        119,
        50,
        128,
        21,
        226,
        49,
        155,
        114,
        210,
        16,
        159,
        26,
        35,
        199,
        55,
        105,
        79,
        169
      ]),
      publicKey: new Uint8Array([
        97,
        234,
        89,
        208,
        120,
        34,
        40,
        34,
        123,
        171,
        212,
        156,
        79,
        72,
        108,
        229,
        59,
        32,
        244,
        116,
        219,
        134,
        185,
        119,
        89,
        117,
        114,
        213,
        88,
        113,
        191,
        88
      ]),
      encryptedKey: new Uint8Array([
        175,
        85,
        19,
        33,
        47,
        163,
        55,
        205,
        241,
        141,
        90,
        99,
        7,
        33,
        74,
        62,
        49,
        239,
        193,
        135,
        200,
        58,
        239,
        49,
        184,
        46,
        45,
        212,
        71,
        206,
        16,
        95,
        53,
        157,
        195,
        67,
        90,
        222,
        222,
        90,
        109,
        38,
        255,
        203,
        54,
        138,
        121,
        166,
        166,
        125,
        140,
        160,
        88,
        214,
        6,
        122,
        105,
        136,
        113,
        147,
        38,
        209,
        178,
        15,
        207,
        118,
        247,
        24,
        24,
        218,
        131,
        160,
        18,
        79,
        136,
        218,
        110,
        213,
        25,
        107,
        34,
        148,
        114,
        9,
        100,
        228,
        88,
        187,
        52,
        8,
        125,
        60,
        146,
        20,
        53,
        222,
        132,
        120,
        15,
        106,
        148,
        83,
        238,
        150,
        55,
        164,
        241,
        248,
        1,
        205,
        65,
        119,
        132,
        154,
        241,
        33,
        215,
        152,
        40,
        130,
        117,
        233,
        118,
        214,
        192,
        27,
        134,
        194,
        111,
        222,
        162,
        104,
        67,
        158,
        68,
        227,
        7,
        89,
        164,
        227,
        94,
        189,
        122,
        152,
        194,
        170,
        169,
        78,
        253,
        91,
        82,
        233,
        227,
        211,
        239,
        24,
        162,
        160,
        237,
        163,
        129,
        253,
        160,
        166,
        198,
        14,
        199,
        244,
        114,
        180,
        109,
        160,
        64,
        190,
        11,
        35,
        158,
        105,
        69,
        62,
        37,
        40,
        92,
        234,
        249,
        146,
        82,
        147,
        160,
        53,
        235,
        127,
        11,
        90,
        27,
        44,
        8,
        149,
        227,
        240,
        195,
        51,
        153,
        27,
        173,
        30,
        132,
        202
      ])
    }
  };
});
