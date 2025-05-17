import * as express from 'express';
import { Auth } from '../../model/Auth';
import { Ret } from '../../model/Ret';
import { Persistence } from '../../model/Persistence';
import { getCommentsByBookID } from './commentsService';

const router = express.Router();

router.get('/:bookId', async (req, res) => {
  return getCommentsByBookID(Number(req.params.bookId), req, res);
});

/** create new */
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

    /** here should be in a command line 
     * comment should be included in books
     * /books/:id/comment/:id...|create
    */
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

/** patch - update comment */
router.patch('/:bookId', async (req, res) => {
  try {
    const user = Auth.isAuth(req);

    if (!user) {
      return Ret.err401(res);
    }

    return Ret.CustomReturnData(res, "Updated comment", {});
  } catch (e) {
    return Ret.err500(res, `err: comments ${e instanceof Error ? e.message : ""}`);
  }
});

/** delete */
router.delete('/:bookId', async (req, res) => {
  try {
    const user = Auth.isAuth(req);

    if (!user) {
      return Ret.err401(res);
    }

    return Ret.CustomReturnData(res, "Delete comment", {});
  } catch (e) {
    return Ret.err500(res, `err: comments ${e instanceof Error ? e.message : ""}`);
  }
});

export const getCommentsRouts = () => router;
