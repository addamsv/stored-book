import * as express from "express";
import { Response, Request } from "express";
import { Auth } from "../../services/auth/Auth";
import { Ret } from "../../model/Ret";
import { Persistence } from "../../model/Persistence";
import { getProfileByUserId } from "./profilesService";

const router = express.Router();

router.get("/:userId",
  async (req: Request, res: Response): Promise<any> => getProfileByUserId(req, res));

router.put("/:profileId",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const user = Auth.isAuth(req);

      if (!user) {
        return Ret.err401(res);
      }

      const data = Persistence.get();

      const { profiles = [] } = data;

      const profileCandidate = profiles.find(
      // (profile) => profile.owner === Number(req.params.profileId)
        (profile) => profile.owner === user.id,
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

export const getProfilesRouts = () => router;
