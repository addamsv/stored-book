import { Ret } from "../../model/Ret";
import { getCommentsAndProfiles } from "./commentsRepository";

export const getCommentsByBookID = (bookId: number, req, res) => {
    try {
      const { comments = [], profiles = [] } = getCommentsAndProfiles(bookId);
  
      const filteredCommentsByBookId = comments
        //.filter((comment) => comment.bookId === Number(req.params.bookId))
        .map((comment) => {
          const profileCandidate = profiles
            .find((profile) => profile.owner === comment.owner);
  
          if (profileCandidate) {
            const { id, firstname: name, image } = profileCandidate;
            return { ...comment, owner: { id, name, image } };
          }
  
          return { ...comment, owner: undefined };
        });
  
      return Ret.CustomReturnData(res, `Comments for book: ${bookId}`, filteredCommentsByBookId || []);
    } catch (e) {
      return Ret.err500(res, `err: comments/{bookId} ${e instanceof Error ? e.message : ""}`);
    }
} 