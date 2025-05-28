import * as express from "express";
import { Request, Response } from "express";
import { getHelpSteps } from "./HelpStepsService";

const router = express.Router();

router.get("/",
  async (req: Request, res: Response): Promise<any> => getHelpSteps(res));

export const HelpSteps = () => router;
