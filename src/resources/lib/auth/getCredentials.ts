import { IUserData } from "entities/User/model/types/IUserSchema";
import { USER_LOCAL_STORAGE_KEY } from "resources/application";

/**
 * Get user credentials from localstorage
 * @returns User Data stored within Localstorage
 */
export const getCredentials = (): IUserData | undefined => {
  if (localStorage.getItem(USER_LOCAL_STORAGE_KEY) === "undefined") {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);

    return undefined;
  }

  const userData = localStorage.getItem(USER_LOCAL_STORAGE_KEY) || "";

  try {
    const user: IUserData = JSON.parse(userData);
    return user;
  } catch (e) {
    return undefined;
  }
};
