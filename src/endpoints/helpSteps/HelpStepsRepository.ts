import { Persistence } from "../../model/Persistence";

export const getAllHelpSteps = () => {
  const { helpSteps = [] } = Persistence.get();

  return helpSteps;
}