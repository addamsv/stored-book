const fs = require("fs");
const jsonServer = require("json-server");
const path = require("path");
const { createHmac } = require("node:crypto");

/** __ENV__ */
const SECRET_KEY = "L16wsStHbN1V44K0f7xM4vJb3lvC3rrHGRCloTOD3f";

/** __ENV__ */
const IS_PROD = false;

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

/**
 *
 * Custom Return Errors
 *
 */
const err500 = (res, data) => {
  if (!IS_PROD) {
    console.log(data);
  }

  res.status(500);

  return res.json({
    isSuccess: false,
    statusCode: 500,
    message: "Server Side Error",
    data
  });
};

const err403 = (res, unit) => {
  res.status(403);

  return res.json({
    isSuccess: false,
    statusCode: 403,
    message: `${unit} not allowed`,
  });
};

const err404 = (res, unit) => {
  res.status(404);

  return res.json({
    isSuccess: false,
    statusCode: 404,
    message: `${unit} not found`
  });
};

const err401 = (res) => {
  res.status(401);

  res.set({ "www-authenticate": "Basic realm=\"Realm\"" });

  return res.json({
    isSuccess: false,
    statusCode: 401,
    message: "Unauthorized"
  });
};

const CustomReturnData = (res, message, data) => {
  return res.json({
    isSuccess: true,
    statusCode: 200,
    message,
    data
  });
};

/**
 *
 *
 *
 *          Persistence and JWT
 *
 *
 *
 *
 */

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

const getData = () => {
  try {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"));
  } catch (e) {
    throw new Error(`Error with getData: ${e.message}`);
  }
};

const putData = (json) => {
  try {
    const data = JSON.stringify(json);
    fs.writeFileSync(path.resolve(__dirname, "db.json"), data, "UTF-8");
  } catch (e) {
    throw new Error(`Error with putData: ${e.message}`);
  }
};

const getIat = Math.round((new Date().getTime() / 1000));
// in seconds from now:
// (new Date().getTime() + seconds * 1000)/1000
// 1 hour from now:
const getExp = Math.round((new Date().getTime() + 60 * 60 * 1000) / 1000);

const basicAuthFilter = (data) => {
  try {
    const decode = decodeBase64(data);

    const [username, password] = decode.split(":");

    const cPass = password;

    const hmac = createHmac("sha256", SECRET_KEY);

    hmac.update(cPass);

    const signature = hmac.digest("hex");

    const { users = [] } = getData();

    const candidate = users.find(
      (user) => user.name === username && user.password === signature,
    );

    if (candidate) {
      if (!IS_PROD) {
        console.log("BasicAuth");
      }

      const { password, ...returnUserData } = candidate;
      return returnUserData;
    }

    return false;
  } catch (e) {
    throw new Error(`basicAuthFilter: ${e.message}`);
  }
};

const getCustomJWT = (sub) => {
  const { users = [] } = getData();

  const candidate = users.find(
    (user) => user.name === sub
  );

  if (!candidate) {
    throw new Error("getCustomJWT: User Not found");
  }

  const jwtHeader = { alg: "RS256" };

  const authorities = candidate.roles;

  const iat = getIat;

  const exp = getExp;

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
};

const parseJwt = (token) => {
  try {
    const tokenParts = token.split(".");

    const payloadClaims = JSON.parse(atob(tokenParts[1]));
    // console.log(atob(tokenParts[0]));
    // console.log(atob(tokenParts[1]));

    const hmac = createHmac("sha256", SECRET_KEY);

    const data = `${tokenParts[0]}.${tokenParts[1]}`;

    hmac.update(data);

    const signature = hmac.digest("hex");

    if (!IS_PROD) {
      console.log("isExp:", payloadClaims.exp < getIat);
    }

    if (payloadClaims.exp < getIat) {
      return null;
    }

    if (signature === tokenParts[2]) {
      return payloadClaims;
    }

    return null;
  } catch (e) {
    throw new Error("parseJwt err");
  }
};

const authFilterByToken = (data) => {
  try {
    const decode = parseJwt(data);

    const { users = [] } = getData();

    const candidate = users.find(
      (user) => user.name === decode.sub
    );

    if (candidate) {
      if (!IS_PROD) {
        console.log(`JWTAuth, User: "${decode.sub}", roles: "${decode.authorities}"`);
      }

      const { password, ...returnUserData } = candidate;
      return returnUserData;
    }

    if (!IS_PROD) {
      console.log("authFilterByToken: No candidate");
    }
    return false;
  } catch (e) {
    if (!IS_PROD) {
      console.log(e.message);
    }
    return false;
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
    return basicAuthFilter(data);
  }

  return false;
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
      return err401(res);
    }

    const token = getCustomJWT(user.name);

    const data = { user, token };

    if (!IS_PROD) {
      console.log(data);
    }

    return CustomReturnData(res, "Login user info and JWT", data);
  } catch (e) {
    return err500(res, e.message);
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
      return err401(res);
    }

    const { profiles = [] } = getData();

    const profileCandidate = profiles.find(
      (profile) => profile.owner === Number(req.params.userId)
    );

    if (profileCandidate) {
      return CustomReturnData(res, `Profile info for User: ${req.params.userId}`, profileCandidate);
    }

    return err404(res, `Profile info for User: ${req.params.userId}`);
  } catch (e) {
    return err500(res, e.message);
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
      return err401(res);
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

      return CustomReturnData(res, `Updated Profile for User: ${user.id}`, updatedProfile);
    }

    return err403(res, `Updated Profile for User: ${user.id}`);
  } catch (e) {
    return err500(res, e.message);
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
      return err401(res);
    }

    const { books = [] } = getData();

    // _page = 1, _limit = 10, _sort = false, _order = "asc", first, prev, next, last, links
    const {
      _page = 1,
      _limit = 10,
      _sort = false,
      _order = "asc",
    } = req.query;

    const offset = _limit * _page - _limit;

    const result = books.filter((_, indx) => indx < _limit * _page && indx >= offset);

    return CustomReturnData(res, `All books limit:${_limit}, page:${_page}`, result);
  } catch (e) {
    return err500(res, e.message);
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
      return err401(res);
    }

    const { books = [] } = getData();

    const bookCandidate = books.find(
      (book) => book.id === Number(req.params.id)
    );

    if (bookCandidate) {
      return CustomReturnData(res, `Book Details with ID: ${req.params.id}`, bookCandidate);
    }

    return err404(res, `Book Details with ID: ${req.params.id}`);
  } catch (e) {
    return err500(res, e.message);
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
      return err401(res);
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

    return CustomReturnData(res, `Comments for book: ${req.params.bookId}`, filteredCommentsByBookId || []);
  } catch (e) {
    return err500(res, e.message);
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
      return err401(res);
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

    const json = { ...getData() };

    json.comments.push(comment);

    putData(json);

    return CustomReturnData(res, "New comment", comment);
  } catch (e) {
    return err500(res, e.message);
  }
});

/**
 *      CHECK AUTH
 */
// eslint-disable-next-line consistent-return
server.use((req, res, next) => {
  try {
    if (!isAuth(req)) {
      return err401(res);
    }
  } catch (e) {
    return err500(res, e.message);
  }

  next();
});

/**
 *      OTHER ENDPOINTS
 */
server.use(router);

// запуск сервера
const API_SERVER_PORT = IS_PROD ? 80 : 8000;

server.listen(API_SERVER_PORT, () => {
  if (!IS_PROD) {
    const d = new Date();
    // eslint-disable-next-line max-len
    console.log(`server is running on ${API_SERVER_PORT} port ${d.getDate()}.${Number(d.getMonth()) + 1}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`);
    console.log(`http://localhost:${API_SERVER_PORT}/api/v1/users/login`);
    console.log(`http://localhost:${API_SERVER_PORT}/api/v1/books`);
    console.log(`http://localhost:${API_SERVER_PORT}/api/v1/books/1`);
    console.log(`http://localhost:${API_SERVER_PORT}/api/v1/profiles/1`);
    console.log(`http://localhost:${API_SERVER_PORT}/api/v1/comments/1`);
  }
});
