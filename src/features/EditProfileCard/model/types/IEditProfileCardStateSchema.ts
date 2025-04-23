import { IProfile } from "entities/Profile";

export enum EnumValidateProfileErrs {
  INCORRECT_USER_DATA = "INCORRECT_USER_DATA",
  INCORRECT_AGE = "INCORRECT_AGE",
  INCORRECT_COUNTRY = "INCORRECT_COUNTRY",
  INCORRECT_CURRENCY = "INCORRECT_CURRENCY",
  SERVER_ERROR = "SERVER_ERROR",
  CLIENT_ERROR = "CLIENT_ERROR",
  NO_DATA = "NO_DATA"
}

export interface IProfileStateSchema {
  data?: IProfile;
  isLoading?: boolean;
  error?: string;
  isReadOnly?: boolean;

  editedData?: IProfile;
  validationError?: EnumValidateProfileErrs[];
}
