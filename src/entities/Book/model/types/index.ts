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
  IT = "IT",
  SCIFI = "SCIFI",
  POETRY = "POETRY",
}

export interface IBook {
  id: string;
  // owner: string;
  title: string;
  subTitle: string;
  img: string;
  views: number;
  createdAt: string;
  hashTagType: EBookOfHashTagType[];
  blocks: TBookBlock[];
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
