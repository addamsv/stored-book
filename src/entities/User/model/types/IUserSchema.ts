export interface IUser {
  id: number;
  name: string;
  iat?: string;
  roles?: string;
  enabled?: boolean;
}

export interface IUserData {
  user: IUser;
  token: string;
  avatar?: string;
}

export interface IUserSchema {
  authData?: IUserData;

  isAuthDataMounted?: boolean;
}
