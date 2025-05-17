import { Ret } from "../../model/Ret";
import { getAllHelpSteps } from "./HelpStepsRepository";

export const getHelpSteps = (res) => {
    try {
    const helpSteps = getAllHelpSteps();

    return Ret.CustomReturnData(res, "Help Steps", helpSteps);
  } catch (e) {
    return Ret.err500(res, `err: books ${e instanceof Error ? e.message : ""}`);
  }
}
