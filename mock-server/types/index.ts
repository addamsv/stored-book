export interface ICommentUserProfile {
  id: number;
  name: string;
  image?: string;
}

export interface IComment {
  id: number;
  owner: number; // ICommentUserProfile;
  text: string;
  iat: string;
  bookId: number;
}
export interface IProfile {
  id: number;
  owner?: number;
  firstname?: string;
  lastname?: string;
  age?: number;
  country?: string;
  city?: string;
  address?: string;
  image?: string;
  currency?: string;
}

export interface IPersist {
  posts: any[]
  books: any[]
  comments: IComment[]
  users: any[]
  profiles: IProfile[]
}
