import * as express from 'express';
import { getHelpSteps } from './HelpStepsService';

const router = express.Router();

router.get('/', async (req, res) => {
  return getHelpSteps(res);
});

export const HelpSteps = () => router;
