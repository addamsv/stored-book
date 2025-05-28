import { Persistence } from "../../model/Persistence";
import { ECollectionName, IProfile } from "../../types";
import { isArrTypeProper } from "../../utils/typesHelpers";

export const getProfileById = async (id: number) => {
  const profiles = await Persistence.findAll(ECollectionName.PROFILES);

  if (!profiles || !isArrTypeProper<IProfile[]>(profiles, ["owner", "firstname", "lastname", "age"])) {
    return null;
  }

  const profilesArr = profiles
    .filter((profile) => profile.owner === id);

  return profilesArr[0];
};
