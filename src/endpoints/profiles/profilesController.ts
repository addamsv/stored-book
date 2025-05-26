import * as express from 'express';
import { Auth } from '../../model/Auth';
import { Ret } from '../../model/Ret';
import { Persistence } from '../../model/Persistence';
import { Response, Request } from 'express';

const router = express.Router();

router.get('/:userId', async (req: Request, res: Response): Promise<any> => {
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

router.put('/:profileId', async (req: Request, res: Response): Promise<any> => {
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

export const getProfilesRouts = () => {
  return router;
}
