import { IArticle } from ".";

export interface IArticleDetailsStateSchema {
  isLoading: boolean;
  error?: string;
  data?: IArticle;
}
