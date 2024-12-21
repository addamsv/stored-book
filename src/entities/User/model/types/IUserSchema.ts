export interface IUser {
  id: number;
  name: string;
  roles?: string;
  enabled?: boolean;

  // temp
  image?: string;
}

export interface IUserData {
  user: IUser;
  token: string;
}

export interface IUserSchema {
  authData?: IUserData;

  isAuthDataMounted?: boolean;
}
