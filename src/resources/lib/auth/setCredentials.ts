import { IUserData } from "entities/User/model/types/IUserSchema";
import { USER_LOCAL_STORAGE_KEY } from "resources/application";

export const setCredentials = (userData: IUserData | undefined) => {
  if (!userData) {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  }

  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(userData));
};
