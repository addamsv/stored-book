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

export enum EBookOfHashTagType {
  ALL = "ALL",
  IT = "IT",
  SCIFI = "SCIFI",
  POETRY = "POETRY",
  POLITICS = "POLITICS",
  ECONOMICS = "ECONOMICS",
  SCIENCE = "SCIENCE",
  ADVENTURE = "ADVENTURE"
}

export type TBookBlock = {
  type: "IMAGE";
  src: string;
  title: string;
  id: string;
} | {
  type: "TEXT";
  title: string | undefined;
  paragraphs: string[];
  id: string;
} | {
  type: "CODE";
  code: string;
  id: string;
}

export interface IBook {
  // id: number;
  // owner: number | undefined;
  // title: string;
  // subTitle: string;
  // link: string;
  // img: string;
  // views: number;
  // createdAt: string;
  // hashTagType: EBookOfHashTagType[];
  // blocks: TBookBlock[];

    // title: string;
    // subTitle: string;
    // createdAt: string;
    // hashTagType: EBookOfHashTagType[];

    id: number;
    owner?: number;
    views: number;
    link: string;
    linkEx: string;
    blocks: TBookBlock[];

    img: string;
    Icon?: string;

    Title: string;
    Series?: string;
    Author?: string[];
    Translator?: string[];
    Narrated?: string[];
    Length?: string,
    ReleaseDate?: string;
    PublicationDate: string;
    Language?: string;
    Genres?: EBookOfHashTagType[];
    Format?: "Unabridged Audiobook" | "Podcast" | "Audio Drama";
    Publisher?: string;

    enabled?: boolean;
}
export interface IPersist {
  posts: any[];
  books: IBook[];
  comments: IComment[];
  users: any[];
  profiles: IProfile[];
}
