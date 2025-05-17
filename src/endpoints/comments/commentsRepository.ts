import { Persistence } from "../../model/Persistence";

export const getCommentsAndProfiles = (bookId: number) => {
  const { comments = [], profiles = [] } = Persistence.get();
  
  const commentsArr = comments
    .filter((comment) => comment.bookId === bookId);

  return { comments: commentsArr, profiles };
}