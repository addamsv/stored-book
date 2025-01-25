import { IBooksDetailsCommentsStateSchema } from "./IBooksDetailsCommentsStateSchema";
import { IRecommendationsStateSchema } from "./IRecommendationsStateSchema";

export interface IBooksDetailsPageStateSchema {
  comments: IBooksDetailsCommentsStateSchema;

  recommendations: IRecommendationsStateSchema;
}
