// // @ts-nocheck

import jsonServer from "json-server";
import path from "path";
import { Auth } from "./model/Auth";
import { Persistence } from "./model/Persistence";
import { Ret } from "./model/Ret";

/** __ENV__ */
const IS_PROD = false;

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, "db.json"));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

/**
 *
 *        SET RET AND REQ
 *
 */
server.use(async (req, res, next) => {
  /** задержка - как в реальном АПИ */
  await new Promise((res) => {
    setTimeout(res, 800);
  });

  next();
});

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
    const user = Auth.isAuth(req);

    if (!user) {
      return Ret.err401(res);
    }

    const token = Auth.getCustomJWT(user.name);

    const data = { user, token };

    if (!IS_PROD) {
      console.log(data);
    }

    return Ret.CustomReturnData(res, "Login user info and JWT", data);
  } catch (e: unknown) {
    return Ret.err500(res, `err: Login ${e instanceof Error ? e.message : ""}`);
  }
});

/**
 *
 *        PRIVATE API
 *
 */

/**  Get profile by USER ID
 *
 *  GET /api/v1/profiles/{profileId} (authOnly)
 *
 */
server.get("/api/v1/profiles/:userId", (req, res) => {
  try {
    const user = Auth.isAuth(req);

    if (!user) {
      return Ret.err401(res);
    }

    const { profiles = [] } = Persistence.get();

    const profileCandidate = profiles.find(
      (profile) => profile.owner === Number(req.params.userId)
    );

    if (profileCandidate) {
      return Ret.CustomReturnData(res, `Profile info for User: ${req.params.userId}`, profileCandidate);
    }

    return Ret.err404(res, `Profile info for User: ${req.params.userId}`);
  } catch (e) {
    return Ret.err500(res, `err: profiles/{userId} ${e instanceof Error ? e.message : ""}`);
  }
});

/**   Update Profile
 *
 * PUT /api/v1/profiles/{profileId} (authOnly)
 *
 */
server.put("/api/v1/profiles/:profileId", (req, res) => {
  try {
    const user = Auth.isAuth(req);

    if (!user) {
      return Ret.err401(res);
    }

    const data = Persistence.get();

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

      Persistence.put(json);

      return Ret.CustomReturnData(res, `Updated Profile for User: ${user.id}`, updatedProfile);
    }

    return Ret.err403(res, `Updated Profile for User: ${user.id}`);
  } catch (e) {
    return Ret.err500(res, `err: profiles/{profileId} ${e instanceof Error ? e.message : ""}`);
  }
});

/** Get All books
 *
 *  GET /api/v1/books (authOnly)
 *
 */
server.get("/api/v1/books", (req, res) => {
  try {
    if (!Auth.isAuth(req)) {
      return Ret.err401(res);
    }

    const { books = [] } = Persistence.get();

    // _page = 1, _limit = 10, _sort = false, _order = "asc", first, prev, next, last, links
    const { _page = 1, _limit = 10 }: {_page?: number, _limit?: number, _sort?: boolean, _order?: string } = req.query;

    const offset = _limit * _page - _limit;
    const result = books.filter((_, indx) => indx < _limit * _page && indx >= offset);

    return Ret.CustomReturnData(res, `All books limit:${_limit}, page:${_page}`, result);
  } catch (e) {
    return Ret.err500(res, `err: books ${e instanceof Error ? e.message : ""}`);
  }
});

/** Get book by ID
 *
 *  GET /api/v1/books/{id} (authOnly)
 *
 */
server.get("/api/v1/books/:id", (req, res) => {
  try {
    if (!Auth.isAuth(req)) {
      return Ret.err401(res);
    }

    const { books = [] } = Persistence.get();

    const bookCandidate = books.find(
      (book) => book.id === Number(req.params.id)
    );
    console.log("bookCandidate", bookCandidate);
    if (bookCandidate) {
      return Ret.CustomReturnData(res, `Book Details with ID: ${req.params.id}`, bookCandidate);
    }

    return Ret.err404(res, `Book Details with ID: ${req.params.id}`);
  } catch (e) {
    return Ret.err500(res, `err: books/{id} ${e instanceof Error ? e.message : ""}`);
  }
});

/** Get Comments for Book with certain ID with User Profiles in it
 *
 *  GET /api/v1/comments/{bookId} (authOnly)
 *
 */
server.get("/api/v1/comments/:bookId", (req, res) => {
  try {
    if (!Auth.isAuth(req)) {
      return Ret.err401(res);
    }

    const { comments = [], profiles = [] } = Persistence.get();

    const filteredCommentsByBookId = comments
      .filter((comment) => comment.bookId === Number(req.params.bookId))
      .map((comment) => {
        const profileCandidate = profiles
          .find((profile) => profile.owner === comment.owner);

        if (profileCandidate) {
          const { id, firstname: name, image } = profileCandidate;
          return { ...comment, owner: { id, name, image } };
        }

        return { ...comment, owner: undefined };
      });

    // _expand "profile"
    // console.log("PARAMS: ", Number(req.params.bookId));
    // console.log("QUERY: ", req.query, Number(req.query.bookId), req.query._expand);

    return Ret.CustomReturnData(res, `Comments for book: ${req.params.bookId}`, filteredCommentsByBookId || []);
  } catch (e) {
    return Ret.err500(res, `err: comments/{bookId} ${e instanceof Error ? e.message : ""}`);
  }
});

/** Add Comment
 *
 *  POST /api/v1/comments (authOnly)
 *
 */
server.post("/api/v1/comments", (req, res) => {
  try {
    const user = Auth.isAuth(req);

    if (!user) {
      return Ret.err401(res);
    }

    const { comments = [] } = Persistence.get();

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

    const json = { ...Persistence.get() };

    json.comments.push(comment);

    Persistence.put(json);

    return Ret.CustomReturnData(res, "New comment", comment);
  } catch (e) {
    return Ret.err500(res, `err: comments ${e instanceof Error ? e.message : ""}`);
  }
});

/**
 *      CHECK AUTH
 */
// eslint-disable-next-line consistent-return
server.use((req, res, next) => {
  try {
    if (!Auth.isAuth(req)) {
      return Ret.err401(res);
    }
  } catch (e) {
    return Ret.err500(res, `err: CHECK AUTH ${e instanceof Error ? e.message : ""}`);
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
    console.log("login: \"guest\", pass: \"123\"");
    console.log(`http://localhost:${API_SERVER_PORT}/api/v1/users/login`);
    console.log(`http://localhost:${API_SERVER_PORT}/api/v1/books`);
    console.log(`http://localhost:${API_SERVER_PORT}/api/v1/books/1`);
    console.log(`http://localhost:${API_SERVER_PORT}/api/v1/profiles/1`);
    console.log(`http://localhost:${API_SERVER_PORT}/api/v1/comments/1`);
  }
});
