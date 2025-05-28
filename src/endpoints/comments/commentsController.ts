import * as express from "express";
import { Request, Response } from "express";
import { Auth } from "../../services/auth/Auth";
import { Ret } from "../../model/Ret";
import { createComment, getCommentsByBookID } from "./commentsService";

const router = express.Router();

router.get("/:bookId",
  async (req: Request, res: Response): Promise<any> => getCommentsByBookID(Number(req.params.bookId), req, res));

/** create new */
router.post("/",
  async (req: Request, res: Response): Promise<any> => createComment(req, res));

/** patch - update comment */
router.patch("/:bookId", async (req: Request, res: Response): Promise<any> => {
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
router.delete("/:bookId", async (req: Request, res: Response): Promise<any> => {
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
