const fs = require("fs");
const jsonServer = require("json-server");
const path = require("path");
const { createHmac } = require("node:crypto");

const SECRET_KEY = "L16wsStHbN1V44K0f7xM4vJb3lvC3rrHGRCloTOD3f";

/**
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

const decodeBase64 = (data) => {
  return Buffer.from(data, "base64").toString("ascii");
};

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, "db.json"));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

/**
*  задержка - как в реальном АПИ
*/
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800);
  });

  next();
});

const getData = () => {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"));
};

const putData = (json) => {
  const data = JSON.stringify(json);
  fs.writeFileSync(path.resolve(__dirname, "db.json"), data, "UTF-8");
};

const serverSideErr500 = {
  isSuccess: false,
  statusCode: 500,
  message: "Server Side Err" // e.message
};

const err403 = (unit) => ({
  isSuccess: false,
  statusCode: 403,
  message: `${unit} not found`
});

const CustomReturnData = (message, data) => ({
  isSuccess: true,
  statusCode: 200,
  message,
  data
});

const getIat = Math.round((new Date().getTime() / 1000));
// in seconds from now:
// (new Date().getTime() + seconds * 1000)/1000
// 1 hour from now:
const getExp = Math.round((new Date().getTime() + 60 * 60 * 1000) / 1000);

const authFilterByUsernameAndPassword = (data) => {
  try {
    const decode = decodeBase64(data);

    const [username, password] = decode.split(":");

    const { users = [] } = getData();

    const candidate = users.find(
      (user) => user.name === username && user.password === password,
    );

    if (candidate) {
      console.log("Auth by Basic");
      return username;
    }

    return false;
  } catch (e) {
    throw new Error(e.message);
  }
};

const makeFakeTokenByName = (sub) => {
  const { users = [] } = getData();

  const candidate = users.find(
    (user) => user.name === sub
  );

  if (!candidate) {
    return "";
  }

  const jwtHeader = { alg: "RS256" };

  const authorities = candidate.roles;
  console.log(authorities);

  const iat = getIat;

  const exp = getExp;

  console.log(iat, exp);

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

  console.log("own signature:");
  // console.log("45c00f7a986fbab2099a8174605ec63f35fbb4127fb912414c308402d14e01bc");
  console.log(signature);
  return `${data}.${signature}`;
};

const parseJwt = (token) => {
  try {
    const tokenParts = token.split(".");
    const payloadClaims = JSON.parse(atob(tokenParts[1]));
    console.log(atob(tokenParts[0]));
    console.log(atob(tokenParts[1]));

    const hmac = createHmac("sha256", SECRET_KEY);

    const data = `${tokenParts[0]}.${tokenParts[1]}`;

    hmac.update(data);

    const signature = hmac.digest("hex");

    console.log("shouldExp: ", payloadClaims.exp, "curr: ", getIat, "isExp:", payloadClaims.exp < getIat);

    if (payloadClaims.exp < getIat) {
      console.log("is JWT expired: ", true);
      return null;
    }

    if (signature === tokenParts[2]) {
      console.log("is JWT valid:", true);
      return payloadClaims;
    }

    console.log("is JWT valid:", false);
    return null;
  } catch (e) {
    return null;
  }
};

const authFilterByToken = (data) => {
  try {
    const decode = parseJwt(data);

    console.log(decode.sub);

    const { users = [] } = getData();

    const candidate = users.find(
      (user) => user.name === decode.sub
    );

    if (candidate) {
      console.log("Auth by Token");
      return String(decode.sub);
    }

    return false;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getAuthData = (req) => {
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
};

const isAuth = (req) => {
  const [type, data] = getAuthData(req);

  if (type === "Bearer") {
    return authFilterByToken(data);
  }

  if (type === "Basic") {
    return authFilterByUsernameAndPassword(data);
  }

  return false;
};

const getToken = (name) => {
  return makeFakeTokenByName(name);
};

/**   Authentication of user by login and password -> token
 *
 *     POST /api/v1/users/login
 *
 */
server.post("/api/v1/users/login", (req, res) => {
  try {
    const username = isAuth(req);

    if (!username) {
      return res.status(403).json(err403("User"));
    }

    const { users = [] } = getData();

    const candidate = users.find(
      (user) => user.name === username
    );

    if (candidate) {
      console.log(getToken(username));
      const data = {
        user: candidate,
        token: getToken(username)
      };

      return res.json(CustomReturnData("Login user info and JWT", data));
    }

    return res.status(403).json(err403("User"));
  } catch (e) {
    console.log(e);

    return res.status(500).json(serverSideErr500);
  }
});

/**  Get profile by ID (authOnly)
 *
 *  GET /api/v1/profiles/{profileId}
 *
 */
server.get("/api/v1/profiles/:profileId", (req, res) => {
  try {
    const username = isAuth(req);

    if (!username) {
      return res.status(403).json(err403("User"));
    }

    const { profiles = [], users = [] } = getData();

    const userCandidate = users.find(
      (user) => user.name === username
    );

    const profileCandidate = profiles.find(
      (profile) => profile.owner === userCandidate.id // && profile.owner === Number(req.params.profileId)
    );

    if (profileCandidate) {
      return res.json(CustomReturnData("Profile info", profileCandidate));
    }

    return res.status(403).json(err403("Profile"));
  } catch (e) {
    return res.status(500).json(serverSideErr500);
  }
});

/**   Update Profile (authOnly)
 *
 * PUT /api/v1/profiles/{profileId}
 *
 */
server.put("/api/v1/profiles/:profileId", (req, res) => {
  try {
    const username = isAuth(req);

    if (!username) {
      return res.status(403).json(err403("User"));
    }

    const data = getData();

    const { users = [], profiles = [] } = data;

    const userCandidate = users.find(
      (user) => user.name === username // && user.password === password,
    );

    const profileCandidate = profiles.find(
      (profile) => profile.owner === Number(req.params.profileId)
    );

    if (userCandidate && profileCandidate) {
      const json = { ...data };
      const clientData = req.body;
      const newData = { ...profileCandidate, ...clientData };
      json.profiles[profiles.indexOf(profileCandidate)] = newData;
      putData(json);
      console.log(json);
      return res.json(CustomReturnData("Profile info", newData));
    }

    return res.status(403).json(err403("User"));
  } catch (e) {
    console.log(e);

    return res.status(500).json(serverSideErr500);
  }
});

/** Get All books (authOnly)
 *
 *  GET /api/v1/books
 *
 */
server.get("/api/v1/books", (req, res) => {
  try {
    const username = isAuth(req);

    if (!username) {
      return res.status(403).json(err403("User"));
    }

    const { books = [] } = getData();

    return res.json(CustomReturnData("All books", books));
  } catch (e) {
    return res.status(500).json(serverSideErr500);
  }
});

/** Get book by ID (authOnly)
 *
 *  GET /api/v1/books/{id}
 *
 */
server.get("/api/v1/books/:id", (req, res) => {
  try {
    if (!isAuth(req)) {
      return res.status(403).json(err403("User"));
    }

    const { books = [] } = getData();

    const bookCandidate = books.find(
      (book) => book.id === Number(req.params.id)
    );

    if (bookCandidate) {
      return res.json(CustomReturnData("Book Details", bookCandidate));
    }

    return res.status(404).json(CustomReturnData(`Book with id: ${req.params.id}`, null));
  } catch (e) {
    console.log(e);

    return res.status(500).json(serverSideErr500);
  }
});

/** Get Comments by BookID (authOnly)
 *
 *  GET /api/v1/comments/{bookId}
 *
 */
server.get("/api/v1/comments/:bookId", (req, res) => {
  try {
    if (!isAuth(req)) {
      return res.status(403).json(err403("User"));
    }

    const { comments = [], profiles = [] } = getData();

    const filteredCommentsByBookId = comments
      .filter((comment) => comment.bookId === Number(req.params.bookId))
      .map((comment) => {
        const profileCandidate = profiles
          .find((profile) => profile.owner === comment.owner);
        const { id, firstname: name, image } = profileCandidate;
        return { ...comment, owner: { id, name, image } };
      });
    // _expand "user"
    console.log("PARAMS: ", Number(req.params.bookId));
    console.log("QUERY: ", req.query, Number(req.query.bookId), req.query._expand);

    return res.json(CustomReturnData("Comments", filteredCommentsByBookId || []));
  } catch (e) {
    console.log(e);

    return res.status(500).json(serverSideErr500);
  }
});

/**
 *      CHECK AUTH
 */
// eslint-disable-next-line consistent-return
server.use((req, res, next) => {
  try {
    if (!isAuth(req)) {
      return res.status(403).json(err403("AUTH ERROR"));
    }
  } catch (e) {
    console.log(e);

    return res.status(500).json(serverSideErr500);
  }

  next();
});

/**
 *      OTHER ENDPOINTS
 */
server.use(router);

// запуск сервера
const API_SERVER_PORT = 8000;

server.listen(API_SERVER_PORT, () => {
  console.log(`server is running on ${API_SERVER_PORT} port`);
  // console.log(`http://localhost:${API_SERVER_PORT}/api/v1/users/login`);
  console.log(`http://localhost:${API_SERVER_PORT}/api/v1/books`);
  console.log(`http://localhost:${API_SERVER_PORT}/api/v1/books/1`);
  console.log(`http://localhost:${API_SERVER_PORT}/api/v1/profiles/1`);
});
