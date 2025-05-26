import { ECollectionName, Persistence } from "../../model/Persistence";
import { IHelpSteps } from "../../types";
import { isArrTypeProper } from "../../utils/typesHelpers";

export const getAllHelpSteps = async (): Promise<IHelpSteps[] | null> => {
  const helpSteps = await Persistence.findAll(ECollectionName.HELP_STEPS);

  if (!helpSteps || !isArrTypeProper<IHelpSteps[]>(helpSteps, ["link", "title", "description"])) {
    return null;
  }

  return helpSteps;
};
