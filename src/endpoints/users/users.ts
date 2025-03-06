import * as express from 'express';
import { Auth } from '../../model/Auth';
import { Ret } from '../../model/Ret';
import { IS_PROD } from '../../../conf';
import { Persistence } from '../../model/Persistence';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const user = Auth.isAuth(req);

    if (!user) {
      return Ret.err401(res);
    }

    const token = Auth.getCustomJWT(user.name);

    const { profiles = [] } = Persistence.get();

    const profileCandidate = profiles.find(
      (profile) => profile.owner === Number(user.id)
    );

    const data = { user, token, avatar: profileCandidate?.image };

    if (!IS_PROD) {
      console.log(data);
    }

    return Ret.CustomReturnData(res, "Login user info and JWT", data);
  } catch (e: unknown) {
    return Ret.err500(res, `err: Login ${e instanceof Error ? e.message : ""}`);
  }
});

export const getUsersRouts = () => {
  return router;
}
