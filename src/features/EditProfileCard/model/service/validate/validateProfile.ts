import { IProfile } from "entities/Profile";
import { EnumValidateProfileErrs } from "../../types/IEditProfileCardStateSchema";

export const validateProfile = (profile?: IProfile) => {
  if (!profile) {
    return [EnumValidateProfileErrs.NO_DATA];
  }
  const { firstname, lastname, age, country, currency } = profile;

  const errs: EnumValidateProfileErrs[] = [];

  if (!firstname || !lastname) {
    errs.push(EnumValidateProfileErrs.INCORRECT_USER_DATA);
  }

  if (!age || !Number.isInteger(age)) {
    errs.push(EnumValidateProfileErrs.INCORRECT_AGE);
  }

  if (!country) {
    errs.push(EnumValidateProfileErrs.INCORRECT_COUNTRY);
  }

  if (!currency) {
    errs.push(EnumValidateProfileErrs.INCORRECT_CURRENCY);
  }

  return errs;
};
