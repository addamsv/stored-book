import { Response } from "express";
import { Ret } from "../../model/Ret";
import { getAllHelpSteps } from "./HelpStepsRepository";

export const getHelpSteps = async (res: Response) => {
  try {
    const helpSteps = await getAllHelpSteps();

    return Ret.CustomReturnData(res, "Help Steps", helpSteps);
  } catch (e) {
    return Ret.err500(res, `err: books ${e instanceof Error ? e.message : ""}`);
  }
};
