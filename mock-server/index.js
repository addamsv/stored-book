const fs = require("fs");
const jsonServer = require("json-server");
const path = require("path");

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

const err500 = {
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

// const getUserByCredentials = (data) => {
//   try {
//     const decode = decodeBase64(data);

//     const [username] = decode.split(":");

//     const { users = [] } = getData();

//     return users.find((user) => user.name === username);
//   } catch (e) {
//     throw new Error(e.message);
//   }
// };

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

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
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
      (user) => user.name === username // && user.password === password,
    );

    if (candidate) {
      const data = {
        user: candidate,
        // eslint-disable-next-line max-len
        token: "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW4iLCJleHAiOjE3MzI4Mjc4MjIsImlhdCI6MTczMjgyMDYyMiwiYXV0aG9yaXRpZXMiOiJST0xFX0FETUlOIn0.L16wsStHbN1V44K0f7xM4vJb3lvC3rrHGRCloTOD3f-9abNn8BJCpeWCCst-IZwWjEM2XVgUjMxZTQoZpcs0wPY76bmGsH-gYEXIbY9h3HCmi3dqPq1NOKfEZnsY2A6ecKf8jFJliyHygfcVSkRvSYxPieo7A-0rlt6o2Aa90jP99sPemPiPyizA2hbxneVi6y5UrpOfBCxHwmo7XKAHddqWPN0dbyQKD_PaOpcLv3HnSFE7gdhJ_iS7ciejt49cmL4gzxD9xUzGJzwrXq1_mgy-r8fMLENfJO51sR9cHVEYDWPt-Gtrw2qpRSz4GTapqSlFStvJcsvMZSLqpiJSAA"
      };

      return res.json(CustomReturnData("Login user info and JWT", data));
    }

    return res.status(403).json(err403("User"));
  } catch (e) {
    console.log(e);

    return res.status(500).json(err500);
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

    const { profiles = [] } = getData();

    const profileCandidate = profiles.find(
      (profile) => profile.owner === Number(req.params.profileId)
    );

    if (profileCandidate) {
      return res.json(CustomReturnData("Profile info", profileCandidate));
    }

    return res.status(403).json(err403("Profile"));
  } catch (e) {
    return res.status(500).json(err500);
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

    return res.status(500).json(err500);
  }
});

/** Get All articles (authOnly)
 *
 *  GET /api/v1/articles
 *
 */
server.get("/api/v1/articles", (req, res) => {
  try {
    const username = isAuth(req);

    if (!username) {
      return res.status(403).json(err403("User"));
    }

    const { articles = [] } = getData();

    return res.json(CustomReturnData("All articles", articles));
  } catch (e) {
    return res.status(500).json(err500);
  }
});

/** Get article by ID (authOnly)
 *
 *  GET /api/v1/articles
 *
 */
server.get("/api/v1/articles/:id", (req, res) => {
  try {
    if (!isAuth(req)) {
      return res.status(403).json(err403("User"));
    }

    const { articles = [] } = getData();

    const articleCandidate = articles.find(
      (article) => article.id === Number(req.params.id)
    );

    if (articleCandidate) {
      return res.json(CustomReturnData("Article Details", articleCandidate));
    }

    return res.status(404).json(CustomReturnData(`Article with id: ${req.params.id}`, null));
  } catch (e) {
    console.log(e);

    return res.status(500).json(err500);
  }
});

// eslint-disable-next-line
// server.use((req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(403).json({
//       isSuccess: false,
//       statusCode: 403,
//       message: "AUTH ERROR"
//     });
//   }

//   next();
// });

server.use(router);

// запуск сервера
const API_SERVER_PORT = 8000;

server.listen(API_SERVER_PORT, () => {
  console.log(`server is running on ${API_SERVER_PORT} port`);
  // console.log(`http://localhost:${API_SERVER_PORT}/api/v1/users/login`);
  console.log(`http://localhost:${API_SERVER_PORT}/api/v1/profiles/1`);
});
