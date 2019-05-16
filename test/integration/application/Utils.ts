import { Uint8Tool } from "../../../src/Tools";
import { ApplicationJWT } from "../../../src/DataPeps";
import * as JWT from "jsonwebtoken";

const HSKey = Uint8Tool.encode("aVerySecretKey");
const HSKeySecond = Uint8Tool.encode("anotherVerySecretKey");
let HSKeys = [HSKey, HSKeySecond];
const RSKey = Uint8Tool.encode(
  "\n-----BEGIN PUBLIC KEY----- \nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy2kQaxIDLw6vXEmSyDIU\nW2+7zumTbO9KE2o5/afE55lUyTV8lY+kVZDoRToP6yfiUKYC9t3fFBui50rBdtXJ\nd8TgD7ecw9tdoLiQ8usELOIV1Il+e0NUOocypPRYuI26RzOBQ98ULtqXWRPvW7G3\nXhvwhB7FY31LXSRtbTA2ZOXhl64ZfWYBqWwsFMQ0wmWxnnF60J+NDESR1dWKHrzB\n0gaJAk341Mm0Golftan/R3Bd4uJ3u48gDr2uOzpSZB3m9VbK3sn1/1a2V/1mL20y\n/799hgxtB04Wz+cjm1O6gRuau7q7qxNRkvWL+hoXBXWUv2/WrBcglDr0f9tsvnh4\nfwIDAQAB\n-----END PUBLIC KEY-----"
);
const RSKeySecond = Uint8Tool.encode(
  "\n-----BEGIN PUBLIC KEY----- \nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoZJlZadumbM2o9eXfc2e\ni1qXVsCg+urAhybiaNYKNrn7iY8ATfRbfiWzEvZxZ9JR3OEjL1J99MGNvuUzwrlv\nJ3SLD3LcgFqcDATkxyJYk5QLdKgz1qYrhsmhHgi12Q/AmGLgyUuPl64fsr+8foxt\nm6KSpIKPasOU04UNn4HGJaEOX6jLyvGyHXb+3XAKn4FO4/zP0HK+rTNnfX/6+onU\nXZZgr9xrzQpWHGTE06js1izI+LEZK0lfYtJAJrjeOTbRyCLkcN9w4kxDU3VYNHFe\nvg0YMPBSYdel2NygfCo0ziK+XJzzdvSSOO3uBzVL76AyzOoirlkepLdy0ZUsQFW7\nlQIDAQAB\n-----END PUBLIC KEY-----"
);
let RSKeys = [RSKey, RSKeySecond];
const RSSecretKey = Uint8Tool.encode(
  "-----BEGIN RSA PRIVATE KEY----- \nMIIEpQIBAAKCAQEAy2kQaxIDLw6vXEmSyDIUW2+7zumTbO9KE2o5/afE55lUyTV8\nlY+kVZDoRToP6yfiUKYC9t3fFBui50rBdtXJd8TgD7ecw9tdoLiQ8usELOIV1Il+\ne0NUOocypPRYuI26RzOBQ98ULtqXWRPvW7G3XhvwhB7FY31LXSRtbTA2ZOXhl64Z\nfWYBqWwsFMQ0wmWxnnF60J+NDESR1dWKHrzB0gaJAk341Mm0Golftan/R3Bd4uJ3\nu48gDr2uOzpSZB3m9VbK3sn1/1a2V/1mL20y/799hgxtB04Wz+cjm1O6gRuau7q7\nqxNRkvWL+hoXBXWUv2/WrBcglDr0f9tsvnh4fwIDAQABAoIBAQChrWnSYOfM8HQr\n+4LCwyNxJhd2OCvpCy2qzuU3G7GjkDlXEL9stVaeeGZWF/dtJy94gOucQvA8MFdE\nViP+C6FuJDsf4wakmmkKBYmYu3p/HljRrVOuL+7z8mArwtf+IRCt5V9ajiahszdX\nI0Q+crxX/gcnTLoCASX0665aelbRzIX1tNoM0a1RNA3/uzm2Nk+2inaZxiOR4NWP\nfQgRzWKRQcuNEioRj6Y+5YwujpBwXHrIicKYk5ov44PkUXRClhUHOY9p32t/sQ5n\n1tRQ/Tv0TUQ/IGJTGbocm6Ual6H/JFR/ndNfFywAmXLG4wVYW5A/hG3PeyM1nzUT\n/uQMPuMZAoGBAPw5/BP2IsUHZMrgNI/+Si49H6e/PwvlFwuzKPV+zKSJj1pq7Nlp\n9G9jd6mkRNKVJbzyDz0WxsUQ+ckzteBddQ/+Py3I6ynFn4yGk6YKa21FV0NU3CLi\ncORpAFVNMdhLUu5YpZ50cEWhbBU4nXbZuJTRO2NZJh83d9+lfiAYsXYzAoGBAM50\nHb0AjGDaa62i5Rlp9gusjzSiQcwS+3VB7qXmY8ANYwiZIV3VH/Ce7ieSeugL5wk9\nlik/6/8SynJcVut2aHtLQTJgEeRJQxzHyhVXwsxtyhOmoHSWhBdqOFVjZMgQ8X/t\nEIxytrWCQZpBn3pd6R5xrvd+jsL0YGKv/fLR8bCFAoGBAOv3U11ZaC3sPN+P4ZzU\nyZF4naTRxqnaKTVI54jEl69XAkYUwoCkH4oWBF0w0TIxVpzt2FPOeybiOs2BEyZU\nSLAtq+2pilgKCrntLTSpitcvh/P17/yy2+rUUPt8vKUd0vgo9sjHJkH+Qp+X17jY\n91ZCaM0JGiEaQ4t3yAc/EscBAoGAWFZi6x4y8rZC4LcUpD0spG4fkHvk/3cX1WJy\nxNXB1MllmKY9GrM4yXKXoKMSp/t/zfpmKBxL1IarzScpofK2XhsjOHTW8wFOECCE\nnYFBvsszbhkcCwbkWkh+9jpjQx/M1doP/KiQ+TVU8LYnkOph9z7ZiNjEKTL7kv6P\nALlIWykCgYEAxG42A1NZ5Mmu7Ekj/SYvqNzec9xcBfvmZvSZXnAxbHq39nCZL5rx\nZkNcAoPqjKeZPWJCMxGSXIp/oJlddzWStrN1DmdzisHHDMyIT0mNkLWeg5tvMKw2\noE8BxQLoYZ2SOqZN2GINoxlk9CcjYkAX7P6DxxS51dW+s6D+KZlbYAU=\n-----END RSA PRIVATE KEY-----"
);
const RSSecretKeySecond = Uint8Tool.encode(
  "-----BEGIN RSA PRIVATE KEY----- \nMIIEpQIBAAKCAQEAoZJlZadumbM2o9eXfc2ei1qXVsCg+urAhybiaNYKNrn7iY8A\nTfRbfiWzEvZxZ9JR3OEjL1J99MGNvuUzwrlvJ3SLD3LcgFqcDATkxyJYk5QLdKgz\n1qYrhsmhHgi12Q/AmGLgyUuPl64fsr+8foxtm6KSpIKPasOU04UNn4HGJaEOX6jL\nyvGyHXb+3XAKn4FO4/zP0HK+rTNnfX/6+onUXZZgr9xrzQpWHGTE06js1izI+LEZ\nK0lfYtJAJrjeOTbRyCLkcN9w4kxDU3VYNHFevg0YMPBSYdel2NygfCo0ziK+XJzz\ndvSSOO3uBzVL76AyzOoirlkepLdy0ZUsQFW7lQIDAQABAoIBAQChh6q3plx8bR8D\nTla1/wuyZi9HG+3U7Tzt4YIZLWOosuc27zBuvw15YFdXbeqS0UHmgW6bsO0b9SWw\n45SL6Lenymv8Vej8qZm4qmvOahgD8s5BIqgwwJBjgNEDJdIn4Ae8UZ5JoLE+A2bN\nXcMlAV/TaQUSUzTul/oCPdMQ1L00f+kDldL9GDsshtDKKG+BHmBH3+wdS4A1l1QV\npKAj/Gz/IttuWapsGzNcs26y7iwOkU4ai6P38Em4dBT93cDjjO8txpd7l/IUobP1\nVnlduMXFiptNx52HxLSVsiyUXVwzHyV7/2knW1LHlCNjihftpd4ECw79t7K64Zk3\nmvizUJ4BAoGBANDAqDp2O7U8PgxiJdwcqHBU7ON/fnH6LEy7MSdC5CRTXIZ+v72m\nEYvh58/uRaaYJTAldE++lOj8dCq9bmlVcwG0sKYUf1v9iHf/rKwTIO+zwl7ljWIK\nIDfFQ0tIfyOGRrtb6Iws3wZ7Ir1piryMcoAelGodwotqG8hy2kmKBxD9AoGBAMYk\nCgtZaw/tp7wW6q7hUOSpMVpqnknRwXy7dbBc03HqyAiCzLBhVtCi/LF6z74Ixugc\nV5yWUs6jJBRXRpXkhgl8UwcmvU0LsnGnI3MZjc9h/9PEp5lS5OSQmmL9/cXiqldK\n1CQfHmIoSu2hzVYX2zHcX4YkqSPxEr22vDJ9AcR5AoGBAKd3533/HCdpDN4iXv0W\ngIqdlu1reqU1bhSgl+5HW39I4RGE3Y3njGwL70yAeqALrsnRQl43Jn9DCG7BSbJ3\nOqxDqPOTvhiubKzYEE57ihDCxUwcHDBqry4Oss3SeyykrFnigczysnkgj94krYhV\npAXkgmwfM9NkbKWCflxAvyqBAoGAP5xyXRJn/MUfhJMW5O4ROlfXMF/qUWi15YWJ\nUwV6HKhzb8gOTtHxPSoWViRHbYsD0KDIv8zC6PQXMTCTyKuFHKZ9QV5+h62prDMs\nfldF375mk2YfKGokcfy6k+1W+6C5byzmznHvHzQwWfoIIgumo2tMf5RleNR8X8u6\nv7rCRoECgYEAn7j0qx4wnQ0whghabqr9p7z12syjqI0oCqBIkVCEBW8p32wEpwZI\nqcElC8zHfH5x7zBwuI9q7df+HYrZ1YzC2pkn69w2+QAgJ0GC90EujBH+5eauJENl\n/CCR1/PiQjxMFYPxNTxm8z9HLbEl/nPDXIVY14fPyTHrOcheh0awszI=\n-----END RSA PRIVATE KEY-----"
);
let RSSecretKeys = [RSSecretKey, RSSecretKeySecond];
const ESKey = Uint8Tool.encode(
  "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEQ4/x3bCZotGA3n+5CxFmuNZnzB7L\nZUd9C885FDhZN8+oRavvPrWSiGKv72hMKsfL9wVpEygSzZWXqZW+H/w7Jw==\n-----END PUBLIC KEY-----\n"
);
const ESKeySecond = Uint8Tool.encode(`-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE+TxMEnxP9zK7aoB36VJsd/IVSHhM
C7BnFZvRtvZdSvjbrYCdavvVHLmzjOMZ6ID5gcM9P9cgMLCr2CEBzUhhzw==
-----END PUBLIC KEY-----
`);
let ESKeys = [ESKey, ESKeySecond];
const ESSecretKey = Uint8Tool.encode(
  "-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIPb0cw03iNESoTNmdGXxh/DUnuhGb7MIrJZl16dIGsojoAoGCCqGSM49\nAwEHoUQDQgAEQ4/x3bCZotGA3n+5CxFmuNZnzB7LZUd9C885FDhZN8+oRavvPrWS\niGKv72hMKsfL9wVpEygSzZWXqZW+H/w7Jw==\n-----END EC PRIVATE KEY-----"
);
const ESSecretKeySecond = Uint8Tool.encode(`-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIAcnMc5TJC2HdacK6ko1X1IxARA8fqxd1MzyZUNvoLGvoAoGCCqGSM49
AwEHoUQDQgAE+TxMEnxP9zK7aoB36VJsd/IVSHhMC7BnFZvRtvZdSvjbrYCdavvV
HLmzjOMZ6ID5gcM9P9cgMLCr2CEBzUhhzw==
-----END EC PRIVATE KEY-----`);
let ESSecretKeys = [ESSecretKey, ESSecretKeySecond];

const hsBadSecretKey = "badbadnotgood";

const rsaBadSecretKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgEQEKWAXTGo7N2Qqi6xgJt62WgvxlnCRBstz+A28eFjrEJiICrOR
FT72ntoeQNM6QzB994+4iAu6bgR3Fq+EJgWhgcjpjnGZGkmehVacqdKgjSclFyHN
0XMnRauwp6UVlqX7nh6w6QXLUsVRRNkGtYlpAoUudFMrzIZjhsN4xIMxAgMBAAEC
gYAmnmJLwA7QRn0l745Mum93hvxLyclMctvzyw3t5rRCcH2EzcGdwWPZ0zfQytqt
1Gfv8aYNwY3lct4ixOdpktPvSqy4dlcoC91ihDI3SzpTr+mInWxf0sBGsZHjd/94
0SuEPlLz9EsAuGRLZ1MWcQGXZgm/SRklsWo/LWHoLYVqPQJBAIZUick15MOzREbr
tdwg5vBi1prcT9xU9nblX4r7Icvk4kOFCzzfAvSdzgkkKBJsg2qUHsb5Hp0r/+Ve
0earX7sCQQCBnz+5dnshzGIvui+loYlpAdZ5VxgKIO3cYaqO0QgPt4wo7ipcZprN
JqIuwkhsc9b8zoAION9wEyTMA0qsZuwDAkAQdxJAgIOe3T1UOBYdekb0VhkZ+EEt
r5haMHlKjsewt0hooEklV+yD0Ufs5Oqof3aIPMmc9/Ihr7/4/GtcC8t7AkAtrCMU
Aj9YpV9jWcM4JTb5nQApORrrVrb5FCC4ucaRYycrtN+QN0cMSjSTLTm/nQF/inNq
cj+oidZJXE+Pd6RpAkBJERT8s8Oqd+bMNJfoq491U9oWm8OAkGyQJg8+hPNDd1+O
TueuJ5lmKkvL4rj2g0FAT494kVQX8ehzdpsK/BHi
-----END RSA PRIVATE KEY-----`;

const ecdsaBadSecretKey = `-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIDzzdyNssoQ8INJVzkF2iUSCX2tKKW4VdxRWx3iqwD2joAcGBSuBBAAK
oUQDQgAE8AAAdm47cDORi5tu2ozSPqtsKOJR9Zy/GIPmTl35MlDaGQciYTKKSfa5
+D7iGI4DYI/vxYsLEKjxpWLajz7XCw==
-----END EC PRIVATE KEY-----`;

export function getBadAlgoKey(algo: ApplicationJWT.Algorithm): string {
  switch (algo) {
    case ApplicationJWT.Algorithm.HS256:
    case ApplicationJWT.Algorithm.HS384:
    case ApplicationJWT.Algorithm.HS512:
      return hsBadSecretKey;
    case ApplicationJWT.Algorithm.RS256:
    case ApplicationJWT.Algorithm.RS384:
    case ApplicationJWT.Algorithm.RS512:
      return rsaBadSecretKey;
    case ApplicationJWT.Algorithm.ES256:
    case ApplicationJWT.Algorithm.ES384:
    case ApplicationJWT.Algorithm.ES512:
      return ecdsaBadSecretKey;
    default:
      throw "unknown ApplicationJWTAlgorithm: " + algo;
  }
}

export function invalidKey(
  signAlgorithm: ApplicationJWT.Algorithm
): Uint8Array {
  switch (signAlgorithm) {
    case ApplicationJWT.Algorithm.HS256:
    case ApplicationJWT.Algorithm.HS384:
    case ApplicationJWT.Algorithm.HS512:
      return new Uint8Array(0);
    case ApplicationJWT.Algorithm.RS256:
    case ApplicationJWT.Algorithm.RS384:
    case ApplicationJWT.Algorithm.RS512:
      return ESKey;
    case ApplicationJWT.Algorithm.ES256:
    case ApplicationJWT.Algorithm.ES384:
    case ApplicationJWT.Algorithm.ES512:
      return RSKey;
    default:
      throw `Unknown JWTAlgorithm(${signAlgorithm})`;
  }
}

function getKey(
  algo: ApplicationJWT.Algorithm,
  secret: boolean,
  first?: boolean
): Uint8Array {
  if (first == null) {
    first = true;
  }
  let index = first ? 0 : 1;
  switch (algo) {
    case ApplicationJWT.Algorithm.HS256:
    case ApplicationJWT.Algorithm.HS384:
    case ApplicationJWT.Algorithm.HS512:
      return HSKeys[index];
    case ApplicationJWT.Algorithm.RS256:
    case ApplicationJWT.Algorithm.RS384:
    case ApplicationJWT.Algorithm.RS512:
      return secret ? RSSecretKeys[index] : RSKeys[index];
    case ApplicationJWT.Algorithm.ES256:
    case ApplicationJWT.Algorithm.ES384:
    case ApplicationJWT.Algorithm.ES512:
      return secret ? ESSecretKeys[index] : ESKeys[index];
    default:
      throw "unknown ApplicationJWTAlgorithm: " + algo;
  }
}

export type JWTConfig = {
  keys: {
    pk: Uint8Array;
    sk: Uint8Array;
    secondPk: Uint8Array;
    secondSk: Uint8Array;
  };
  config: {
    key: Uint8Array;
    signAlgorithm: ApplicationJWT.Algorithm;
    claimForLogin: string;
  };
};

export const configs: JWTConfig[] = Object.keys(ApplicationJWT.Algorithm)
  .filter(key => !isNaN(Number(key)))
  .map(key => {
    let signAlgorithm = Number(key) as ApplicationJWT.Algorithm;
    return {
      keys: {
        pk: getKey(signAlgorithm, false),
        sk: getKey(signAlgorithm, true),
        secondPk: getKey(signAlgorithm, false, false),
        secondSk: getKey(signAlgorithm, true, false)
      },
      config: {
        key: getKey(signAlgorithm, false),
        signAlgorithm,
        claimForLogin: "login"
      }
    };
  });

class MockApplicationSession {
  login: string;
}

export function createConnector<Secret>(
  appSecretKey: string | Uint8Array,
  appSignAlgorithm: ApplicationJWT.Algorithm,
  userSecret: Secret
): ApplicationJWT.Connector<MockApplicationSession, Secret> {
  let _appSecretKey: string | Buffer;
  if (appSecretKey instanceof Uint8Array) {
    _appSecretKey = Buffer.from(appSecretKey.buffer);
  } else {
    _appSecretKey = appSecretKey;
  }
  return {
    createSession: async (login: string, secret: Secret) => {
      if (secret instanceof Uint8Array) {
        if (!(userSecret instanceof Uint8Array)) {
          throw new Error("bad type of secret");
        }
        if (
          secret.length != userSecret.length ||
          !secret.every((b, i) => b == userSecret[i])
        ) {
          throw new Error("Uint8Array secrets doesn't match");
        }
      } else if (secret !== userSecret) {
        throw new Error("secrets doesn't match");
      }
      return { login };
    },
    getToken: async (session: MockApplicationSession) => {
      return JWT.sign({ login: session.login }, _appSecretKey, {
        algorithm: ApplicationJWT.Algorithm[appSignAlgorithm]
      });
    }
  };
}
