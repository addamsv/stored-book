import { Response, Request } from "express";
import { Auth } from "../../model/Auth";
import { Ret } from "../../model/Ret";
import { IS_PROD } from "../../../conf";
import { ECollectionName, Persistence } from "../../model/Persistence";
import { IProfile } from "../../types";
import { isArrTypeProper } from "../../utils/typesHelpers";

const getLoginUserInfoAndJWT = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = Auth.isAuth(req);

    if (!user) {
      return Ret.err401(res);
    }

    const token = Auth.getCustomJWT(user.name);

    const profiles = await Persistence.findAll(ECollectionName.PROFILES);

    if (!profiles || !isArrTypeProper<IProfile[]>(profiles, ["owner", "firstname", "lastname", "age"])) {
      throw new Error("profiles have unknown type");
    }

    const profileCandidate = profiles.find(
      (profile) => profile.owner === Number(user.id),
    );

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
