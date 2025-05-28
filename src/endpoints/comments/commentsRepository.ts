import { Persistence } from "../../model/Persistence";
import { ECollectionName, IComment, IProfile } from "../../types";
import { isArrTypeProper } from "../../utils/typesHelpers";

export const getCommentsAndProfiles = (bookId: number) => {
  const { comments = [], profiles = [] } = Persistence.get();

  const commentsArr = comments
    .filter((comment) => comment.bookId === bookId);

  return { comments: commentsArr, profiles };
};

export const getCommentsByBookID = (bookId: number) => {
  const comments = Persistence.findAll(ECollectionName.COMMENTS);

  if (!comments || !isArrTypeProper<IComment[]>(comments, ["owner", "text", "iat", "bookId"])) {
    return null;
  }

  const commentsArr = comments
    .filter((comment) => comment.bookId === bookId);

  return commentsArr;
};

export const getProfiles = () => {
  const profiles = Persistence.findAll(ECollectionName.PROFILES);

  if (!profiles || !isArrTypeProper<IProfile[]>(profiles, ["owner", "firstname", "lastname", "age"])) {
    return null;
  }

  return profiles;
};
