import { Persistence } from "../../model/Persistence";
import { ECollectionName, IBook } from "../../types";
import { isArrTypeProper } from "../../utils/typesHelpers";

export const getBookByID = async (bookId: number) => {
  const books = await Persistence.findAll(ECollectionName.BOOKS);

  if (!books || !isArrTypeProper<IBook[]>(books, ["owner", "link", "blocks", "img"])) {
    return null;
  }

  const bookCandidate = books
    .find((book) => book.id === bookId);

  return bookCandidate;
};

export const getAllBooks = async () => {
  const books = await Persistence.findAll(ECollectionName.BOOKS);

  if (!books || !isArrTypeProper<IBook[]>(books, ["owner", "link", "blocks", "img"])) {
    return null;
  }

  return books;
};
