import { Response, Request } from "express";
import { Auth } from "../../services/auth/Auth";
import { Ret } from "../../model/Ret";
import { IS_PROD } from "../../../conf";
import { getProfileById } from "./UserRepository";

const getLoginUserInfoAndJWT = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = Auth.isAuth(req);

    if (!user) {
      return Ret.err401(res);
    }

    const token = Auth.getCustomJWT(user.name);

    const profileCandidate = await getProfileById(Number(user.id));

    const data = { user, token, avatar: profileCandidate?.image };

    if (!IS_PROD) {
      console.log(data);
    }

    return Ret.CustomReturnData(res, "Login User info and JWT", data);
  } catch (e: unknown) {
    return Ret.err500(res, `err: Login ${e instanceof Error ? e.message : ""}`);
  }
};

export default getLoginUserInfoAndJWT;
