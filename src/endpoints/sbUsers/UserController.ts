import * as express from 'express';
import { Ret } from '../../model/Ret';
import { Response, Request } from 'express';
import getLoginUserInfoAndJWT from './UserService';

const router = express.Router();

router.post('/login', async (req: Request, res: Response): Promise<any> => {
  return await getLoginUserInfoAndJWT(req, res);
});

router.post('/signin', async (req: Request, res: Response): Promise<any> => {
  return Ret.err401(res);
});

router.post('/recovery', async (req: Request, res: Response): Promise<any> => {
  return Ret.err401(res);
});

/** reset pass */
router.post('/reset', async (req: Request, res: Response): Promise<any> => {
  return Ret.err401(res);
});

export const Users = () => router;
