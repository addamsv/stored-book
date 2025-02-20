export enum EBookListSortField {
  VIEWS = "views",
  TITLE = "Title",
  SUBTITLE = "Author",
  CREATED_AT = "PublicationDate",
  RELEASE = "ReleaseDate",
}

export enum EBookListView {
  STANDARD = "STANDARD",
  COMPACT = "COMPACT",
}

/**
 *
 *        BLOCKS
 *
 */
export enum EBlockOfBookType {
  CODE = "CODE",
  IMAGE = "IMAGE",
  TEXT = "TEXT"
}

export interface IBlockOfBook {
  id: string;
  type: EBlockOfBookType
}

export interface IBlockOfBookImage extends IBlockOfBook {
  type: EBlockOfBookType.IMAGE;
  src: string;
  title: string;
}

export interface IBlockOfBookText extends IBlockOfBook {
  type: EBlockOfBookType.TEXT;
  title?: string;
  paragraphs: string[];
}

export interface IBlockOfBookCode extends IBlockOfBook {
  type: EBlockOfBookType.CODE;
  code: string;
}

export type TBookBlock = IBlockOfBookImage | IBlockOfBookText | IBlockOfBookCode;

export enum EBookOfHashTagType {
  ALL = "ALL",
  // IT = "IT",
  // SCIFI = "SCIFI",
  // POETRY = "POETRY",
  // POLITICS = "POLITICS",
  // ECONOMICS = "ECONOMICS",
  // SCIENCE = "SCIENCE",
  // ADVENTURE = "ADVENTURE",
  "Arts & Entertainment" = "Arts & Entertainment",
  "Biographies & Memoirs" = "Biographies & Memoirs",
  "Business & Careers" = "Business & Careers",
  "Children's Audiobooks" = "Children's Audiobooks",
  "Comedy & Humor" = "Comedy & Humor",
  "Computers & Technology" = "Computers & Technology",
  "Education & Learning" = "Education & Learning",
  "Erotica" = "Erotica",
  "Health & Wellness" = "Health & Wellness",
  "History" = "History",
  "Home & Garden" = "Home & Garden",
  "Literature & Fiction" = "Literature & Fiction",
  "Money & Finance" = "Money & Finance",
  "Mystery, Thriller & Suspense" = "Mystery, Thriller & Suspense",
  "Politics & Social Sciences" = "Politics & Social Sciences",
  "Relationships, Parenting & Personal Development" = "Relationships, Parenting & Personal Development",
  "Religion & Spirituality" = "Religion & Spirituality",
  "Romance" = "Romance",
  "Science & Engineering" = "Science & Engineering",
  "Science Fiction & Fantasy" = "Science Fiction & Fantasy",
  "Sports & Outdoors" = "Sports & Outdoors",
  "Teen & Young Adult" = "Teen & Young Adult",
  "Travel & Tourism" = "Travel & Tourism"
}

export interface IBook {
  // title: string;
  // subTitle: string;
  // createdAt: string;
  // hashTagType: EBookOfHashTagType[];

  id: number;
  owner?: number;
  views: number;
  link: string;
  linEx?: string;
  blocks: TBookBlock[];

  img: string;
  Icon?: string;

  Title?: string;
  Series?: string;
  Author?: string[];
  Translator?: string[];
  Narrated?: string[];
  Length?: string,
  "ReleaseDate"?: string;
  "PublicationDate"?: string;
  Language?: string;
  Genres?: EBookOfHashTagType[];
  Format?: "Unabridged Audiobook" | "Podcast" | "Audio Drama";
  Publisher?: string;

  enabled?: boolean;
}

/**
 *
 *          === Book Details State Schema ===
 *
*/
export interface IBookDetailsStateSchema {
  isLoading: boolean;
  error?: string;
  data?: IBook;
}
