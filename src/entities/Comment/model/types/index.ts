import { IUser } from "entities/User";

export interface ICommentUserProfile {
  id: number;
  name: string;
  image?: string;
}

export interface IComment {
  id: string;
  owner: ICommentUserProfile;
  text: string;
}
