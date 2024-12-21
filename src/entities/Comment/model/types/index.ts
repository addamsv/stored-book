import { IUser } from "entities/User";

export interface ICommentUserProfile {
  id: number;
  name: string;
  image?: string;
}

export interface IComment {
  id: number;
  owner: ICommentUserProfile;
  text: string;
  iat: string;
  bookId: number;
}
