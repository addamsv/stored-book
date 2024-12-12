export enum EBlockOfArticleType {
  CODE = "CODE",
  IMAGE = "IMAGE",
  TEXT = "TEXT"
}

export interface IBlockOfArticle {
  id: string;
  type: EBlockOfArticleType
}

export interface IBlockOfArticleImage extends IBlockOfArticle {
  type: EBlockOfArticleType.IMAGE;
  src: string;
  title: string;
}

export interface IBlockOfArticleText extends IBlockOfArticle {
  type: EBlockOfArticleType.TEXT;
  title?: string;
  paragraphs: string[];
}

export interface IBlockOfArticleCode extends IBlockOfArticle {
  type: EBlockOfArticleType.CODE;
  code: string;
}

export type TArticleBlock = IBlockOfArticleImage | IBlockOfArticleText | IBlockOfArticleCode;

export enum EArticleOfHashTagType {
  IT = "IT",
  SCIFI = "SCIFI",
  POETRY = "POETRY",
}

export interface IArticle {
  id: string;
  // owner: string;
  title: string;
  subTitle: string;
  img: string;
  views: number;
  createdAt: string;
  hashTagType: EArticleOfHashTagType[];
  blocks: TArticleBlock[];
}
