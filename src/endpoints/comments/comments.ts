import * as express from 'express';
import { Auth } from '../../model/Auth';
import { Ret } from '../../model/Ret';
import { Persistence } from '../../model/Persistence';

const router = express.Router();

router.get('/:bookId', async (req, res) => {
  try {
    // if (!Auth.isAuth(req)) {
    //   return Ret.err401(res);
    // }

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

router.post('/', async (req, res) => {
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

export const getCommentsRouts = () => {
  return router;
}
