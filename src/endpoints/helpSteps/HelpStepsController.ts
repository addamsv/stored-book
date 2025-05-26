import * as express from 'express';
import { getHelpSteps } from './HelpStepsService';
import {Request, Response} from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<any> => {
  return await getHelpSteps(res);
});

export const HelpSteps = () => router;
