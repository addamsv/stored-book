import { Persistence } from "../../model/Persistence";
import { ECollectionName, IProfile } from "../../types";
import { isArrTypeProper } from "../../utils/typesHelpers";

export const getProfiles = async () => {
  const profiles = await Persistence.findAll(ECollectionName.PROFILES);

  if (!profiles || !isArrTypeProper<IProfile[]>(profiles, ["owner", "firstname", "lastname", "age"])) {
    throw new Error("profiles have unknown type");
  }

  return profiles;
};

export const getProfileById = async (id: number) => {
  const profiles = await Persistence.findAll(ECollectionName.PROFILES);

  if (!profiles || !isArrTypeProper<IProfile[]>(profiles, ["owner", "firstname", "lastname", "age"])) {
    return null;
  }

  const profilesArr = profiles
    .filter((profile) => profile.owner === id);

  return profilesArr[0];
};
