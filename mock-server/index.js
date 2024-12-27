const fs = require("fs");
const jsonServer = require("json-server");
const path = require("path");
const { createHmac } = require("node:crypto");
const CustomReturnData = require("./model/CustomReturnData.ts");

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

const getIat = Math.round((new Date().getTime() / 1000));
// in seconds from now:
// (new Date().getTime() + seconds * 1000)/1000
// 1 hour from now:
const getExp = Math.round((new Date().getTime() + 60 * 60 * 1000) / 1000);

const authFilterByUsernameAndPassword = (data) => {
  try {
    const decode = decodeBase64(data);

    const [username, password] = decode.split(":");

    const cPass = password;

    const hmac = createHmac("sha256", SECRET_KEY);

    hmac.update(cPass);

    const signature = hmac.digest("hex");

    console.log("pass signature:");

    console.log(signature);

    const { users = [] } = getData();

    const candidate = users.find(
      (user) => user.name === username && user.password === signature,
    );

    if (candidate) {
      console.log("Auth by Basic");

      const { password, ...returnUserData } = candidate;
      return returnUserData;
    }

    return false;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getCustomJWT = (sub) => {
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

  console.log("jwt signature:");
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
      const { password, ...returnUserData } = candidate;
      return returnUserData;
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
  return getCustomJWT(name);
};

/**
 *
 *        PUBLIC API
 *
 */

/**   Authentication of user by login and password -> token
 *
 *     POST /api/v1/users/login
 *
 */
server.post("/api/v1/users/login", (req, res) => {
  try {
    const user = isAuth(req);

    if (!user) {
      return res.status(403).json(err403("User"));
    }

    const token = getToken(user.name);

    console.log(token);

    const data = { user, token };

    return res.json(CustomReturnData("Login user info and JWT", data));
  } catch (e) {
    console.log(e);

    return res.status(500).json(serverSideErr500);
  }
});

/**
 *
 *        PRIVATE API
 *
 *        auth required
 *
 */

/**  Get profile by USER ID
 *
 *  GET /api/v1/profiles/{profileId} (authOnly)
 *
 */
server.get("/api/v1/profiles/:userId", (req, res) => {
  try {
    const user = isAuth(req);

    if (!user) {
      return res.status(403).json(err403("User"));
    }

    const { profiles = [] } = getData();

    const profileCandidate = profiles.find(
      (profile) => profile.owner === Number(req.params.userId)
    );

    if (profileCandidate) {
      console.log(profileCandidate);

      return res.json(CustomReturnData(`Profile info for User: ${req.params.userId}`, profileCandidate));
    }

    return res.status(403).json(err403("Profile"));
  } catch (e) {
    return res.status(500).json(serverSideErr500);
  }
});

/**   Update Profile
 *
 * PUT /api/v1/profiles/{profileId} (authOnly)
 *
 */
server.put("/api/v1/profiles/:profileId", (req, res) => {
  try {
    const user = isAuth(req);

    if (!user) {
      return res.status(403).json(err403("User"));
    }

    const data = getData();

    const { profiles = [] } = data;

    const profileCandidate = profiles.find(
      // (profile) => profile.owner === Number(req.params.profileId)
      (profile) => profile.owner === user.id
    );

    if (profileCandidate) {
      const json = { ...data };
      const { body } = req;
      // some validation in real API...
      const updatedProfile = { ...profileCandidate, ...body };
      // put updatedProfile JSON
      json.profiles[profiles.indexOf(profileCandidate)] = updatedProfile;

      putData(json);

      return res.json(CustomReturnData(`Updated Profile for User: ${user.id}`, updatedProfile));
    }

    return res.status(403).json(err403("User"));
  } catch (e) {
    console.log(e);

    return res.status(500).json(serverSideErr500);
  }
});

/** Get All books
 *
 *  GET /api/v1/books (authOnly)
 *
 */
server.get("/api/v1/books", (req, res) => {
  try {
    if (!isAuth(req)) {
      return res.status(403).json(err403("User"));
    }

    const { books = [] } = getData();

    return res.json(CustomReturnData("All books", books));
  } catch (e) {
    return res.status(500).json(serverSideErr500);
  }
});

/** Get book by ID
 *
 *  GET /api/v1/books/{id} (authOnly)
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
      return res.json(CustomReturnData(`Book Details with ID: ${req.params.id}`, bookCandidate));
    }

    return res.status(404).json(CustomReturnData(`Book with id: ${req.params.id} not found`, null));
  } catch (e) {
    console.log(e);

    return res.status(500).json(serverSideErr500);
  }
});

/** Get Comments for Book with certain ID with User Profiles in it
 *
 *  GET /api/v1/comments/{bookId} (authOnly)
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
    // _expand "profile"
    // console.log("PARAMS: ", Number(req.params.bookId));
    // console.log("QUERY: ", req.query, Number(req.query.bookId), req.query._expand);

    return res.json(CustomReturnData(`Comments for book: ${req.params.bookId}`, filteredCommentsByBookId || []));
  } catch (e) {
    console.log(e);

    return res.status(500).json(serverSideErr500);
  }
});

/** Add Comment
 *
 *  POST /api/v1/comments (authOnly)
 *
 */
server.post("/api/v1/comments", (req, res) => {
  try {
    const user = isAuth(req);

    if (!user) {
      return res.status(403).json(err403("User"));
    }

    const { comments = [] } = getData();

    const commentIds = comments
      .map((comment) => comment.id);

    const maxCommentId = Math.max.apply(null, commentIds);

    const { body } = req;

    const d = new Date();

    const comment = {
      id: maxCommentId + 1,
      bookId: body.bookId,
      iat: `${d.getDate()}.${Number(d.getMonth()) + 1}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`,
      owner: user.id,
      text: body.text
    };

    // console.log(comment);
    // console.log(user);
    // console.log(body);

    const json = { ...getData() };

    json.comments.push(comment);

    putData(json);

    return res.json(CustomReturnData("New comment", comment));
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
  const d = new Date();
  // eslint-disable-next-line max-len
  console.log(`server is running on ${API_SERVER_PORT} port ${d.getDate()}.${Number(d.getMonth()) + 1}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`);
  console.log(`http://localhost:${API_SERVER_PORT}/api/v1/users/login`);
  console.log(`http://localhost:${API_SERVER_PORT}/api/v1/books`);
  console.log(`http://localhost:${API_SERVER_PORT}/api/v1/books/1`);
  console.log(`http://localhost:${API_SERVER_PORT}/api/v1/profiles/1`);
  console.log(`http://localhost:${API_SERVER_PORT}/api/v1/comments/1`);
});
