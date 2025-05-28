import { Request, Response } from "express";
import { Auth } from "../../services/auth/Auth";
import { Ret } from "../../model/Ret";
import { getProfileById } from "./profilesRepository";

export const getProfileByUserId = async (req: Request, res: Response) => {
  try {
    const user = Auth.isAuth(req);

    if (!user) {
      return Ret.err401(res);
    }

    const profileCandidate = await getProfileById(Number(req.params.userId));

    if (profileCandidate) {
      return Ret.CustomReturnData(res, `Profile info for User: ${req.params.userId}`, profileCandidate);
    }

    return Ret.err404(res, `Profile info for User: ${req.params.userId}`);
  } catch (e) {
    return Ret.err500(res, `err: profiles/{userId} ${e instanceof Error ? e.message : ""}`);
  }
};
