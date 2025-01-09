import { Persistence } from "./Persistence";

const { createHmac } = require("node:crypto");

const SECRET_KEY = "L16wsStHbN1V44K0f7xM4vJb3lvC3rrHGRCloTOD3f";
const IS_PROD = false;

interface IClaims {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  authorities: string;
}

interface IUser {
  id: number;
  name: string;
  iat?: string;
  roles?: string;
  enabled?: boolean;
  password?: string;
}

export const Auth = {
  _getIat: Math.round((new Date().getTime() / 1000)),
  // in seconds from now:
  // (new Date().getTime() + seconds * 1000)/1000
  // 1 hour from now:
  _getExp: Math.round((new Date().getTime() + 60 * 60 * 1000) / 1000),

  _decodeBase64: (data: string) => {
    return Buffer.from(data, "base64").toString("ascii");
  },

  _basicAuthFilter: (data: string) => {
    try {
      const decode = Auth._decodeBase64(data);

      const [username, password] = decode.split(":");

      const cPass = password;

      const hmac = createHmac("sha256", SECRET_KEY);

      hmac.update(cPass);

      const signature = hmac.digest("hex");

      const { users = [] } = Persistence.get();

      const candidate = users.find(
        (user: IUser) => user.name === username && user.password === signature,
      );

      if (candidate) {
        if (!IS_PROD) {
          console.log("BasicAuth");
        }

        const { password, ...returnUserData } = candidate;
        return returnUserData as IUser;
      }

      return false;
    } catch (e) {
      throw new Error(`err: _basicAuthFilter ${e instanceof Error ? e.message : ""}`);
    }
  },

  /**          JWT
   * SHA-256 hash function reference implementation.
   *
   * This is an annotated direct implementation of FIPS 180-4, without any optimisations. It is
   * intended to aid understanding of the algorithm rather than for production use.
   *
   * While it could be used where performance is not critical, I would recommend using the ‘Web
   * Cryptography API’ (developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest) for the browser,
   * or the ‘crypto’ library (nodejs.org/api/crypto.html#crypto_class_hash) in Node.js.
   *
   * See csrc.nist.gov/groups/ST/toolkit/secure_hashing.html
   *     csrc.nist.gov/groups/ST/toolkit/examples.html
   */
  _parseJwt: (token: string) => {
    try {
      const tokenParts = token.split(".");

      const payloadClaims: IClaims = JSON.parse(atob(tokenParts[1]));
      // console.log(atob(tokenParts[0]));
      // console.log(atob(tokenParts[1]));

      const hmac = createHmac("sha256", SECRET_KEY);

      const data = `${tokenParts[0]}.${tokenParts[1]}`;

      hmac.update(data);

      const signature = hmac.digest("hex");

      if (!IS_PROD) {
        console.log("isExp:", payloadClaims.exp < Auth._getIat);
      }

      if (payloadClaims.exp < Auth._getIat) {
        return null;
      }

      if (signature === tokenParts[2]) {
        return payloadClaims;
      }

      return null;
    } catch (e) {
      throw new Error(`err: _parseJwt ${e instanceof Error ? e.message : ""}`);
    }
  },

  _authFilterByToken: (data: string) => {
    try {
      const decode = Auth._parseJwt(data);

      const { users = [] } = Persistence.get();

      const candidate = users.find(
        (user: IUser) => user.name === decode?.sub
      );

      if (candidate) {
        if (!IS_PROD) {
          console.log(`JWTAuth, User: "${decode?.sub}", roles: "${decode?.authorities}"`);
        }

        const { password, ...returnUserData } = candidate;
        return returnUserData as IUser;
      }

      if (!IS_PROD) {
        console.log("authFilterByToken: No candidate");
      }
      return false;
    } catch (e) {
      if (!IS_PROD) {
        console.log(e instanceof Error ? e.message : "err: _authFilterByToken");
      }
      return false;
    }
  },

  _getAuthData: (req: any): string[] => {
    if (!req?.headers?.authorization) {
      return ["none"];
    }

    const [type = "", data = ""] = req.headers.authorization.split(" ") || "";

    switch (type) {
      case "Basic":
        return [type, data];

      case "Bearer":
        return [type, data];

      default:
        return ["none"];
    }
  },

  getCustomJWT: (sub: string) => {
    const { users = [] } = Persistence.get();

    const candidate = users.find(
      (user: IUser) => user.name === sub
    );

    if (!candidate) {
      throw new Error("getCustomJWT: User Not found");
    }

    const jwtHeader = { alg: "RS256" };

    const authorities = candidate.roles;

    const iat = Auth._getIat;

    const exp = Auth._getExp;

    if (!IS_PROD) {
      console.log(authorities);
    }

    const claims = {
      iss: "self",
      sub, // "admin"
      exp, // 1732827822
      iat, // 1732820622
      authorities // "ROLE_ADMIN"
    };

    const data = `${btoa(JSON.stringify(jwtHeader))}.${btoa(JSON.stringify(claims))}`;

    // https://nodejs.org/api/crypto.html#crypto_class_hash

    const hmac = createHmac("sha256", SECRET_KEY);

    hmac.update(data);

    const signature = hmac.digest("hex");

    return `${data}.${signature}`;
  },

  isAuth: (req: any): IUser | false => {
    const [type, data] = Auth._getAuthData(req);

    if (type === "Bearer") {
      return Auth._authFilterByToken(data);
    }

    if (type === "Basic") {
      return Auth._basicAuthFilter(data);
    }

    return false;
  },

};
