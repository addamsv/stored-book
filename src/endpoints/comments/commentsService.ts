import { Request, Response } from "express";
import { Auth } from "../../model/Auth";
import { Persistence } from "../../model/Persistence";
import { Ret } from "../../model/Ret";
import { getCommentsAndProfiles } from "./commentsRepository";

export const getCommentsByBookID = (bookId: number, req: Request, res: Response) => {
  try {
    const { comments = [], profiles = [] } = getCommentsAndProfiles(bookId);

    const filteredCommentsByBookId = comments
    // .filter((comment) => comment.bookId === Number(req.params.bookId))
      .map((comment) => {
        const profileCandidate = profiles
          .find((profile) => profile.owner === comment.owner);

        if (profileCandidate) {
          const { id, firstname: name, image } = profileCandidate;
          return { ...comment, owner: { id, name, image } };
        }

        return { ...comment, owner: undefined };
      });

    return Ret.CustomReturnData(res, `Comments for book: ${bookId}`, filteredCommentsByBookId || []);
  } catch (e) {
    return Ret.err500(res, `err: comments/{bookId} ${e instanceof Error ? e.message : ""}`);
  }
};

export const createComment = (req: Request, res: Response) => {
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
      text: body.text,
    };

    const json = { ...Persistence.get() };

    json.comments.push(comment);

    Persistence.put(json);

    return Ret.CustomReturnData(res, "New comment", comment);
  } catch (e) {
    return Ret.err500(res, `err: comments ${e instanceof Error ? e.message : ""}`);
  }
};
