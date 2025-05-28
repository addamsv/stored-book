import { Request, Response } from "express";
import { IS_PROD } from "../../../conf";
import { Ret } from "../../model/Ret";
import { getAllBooks, getBookByID } from "./BooksRepository";
import { TBookBlock, IBook } from "../../types";

export const getBookDetailsByID = async (req: Request, res: Response) => {
  try {
    // if (!Auth.isAuth(req)) {
    //   return Ret.err401(res);
    // }

    const bookCandidate = await getBookByID(Number(req.params.id));

    if (!IS_PROD) {
      console.log("bookCandidate", bookCandidate);
    }

    if (bookCandidate) {
      return Ret.CustomReturnData(res, `Book Details with ID: ${req.params.id}`, bookCandidate);
    }

    return Ret.err404(res, `Book Details with ID: ${req.params.id}`);
  } catch (e) {
    return Ret.err500(res, `err: books/{id} ${e instanceof Error ? e.message : ""}`);
  }
};

export const getBooksLimitedAndPaged = async (req: Request, res: Response) => {
  try {
    // if (!Auth.isAuth(req)) {
    //   return Ret.err401(res);
    // }

    const books = await getAllBooks();

    // q = "",  _page = 1, _limit = 10, _sort = false, _order = "asc", first, prev, next, last, links

    const {
      q = "", _page = 1, _limit = 10, _order, hashTag, _sort,
    }: {
      q?: string,
      _page?: number,
      _limit?: number,
      _sort?: "Title" | "Author" | "views" | "PublicationDate" | "ReleaseDate",
      _order?: "asc" | "desc",
      hashTag?: string,
    } = req.query;

    if (!IS_PROD) {
      console.log(q, _order, _sort, hashTag);
    }

    const isTitleInc = (title?: string) => {
      if (!title) {
        return false;
      }
      return title.toLowerCase().includes(q.toLowerCase());
    };

    const isAuthorInc = (authors?: string[]) => {
      if (!authors) {
        return false;
      }
      return authors.some((author) => isTitleInc(author));
    };

    const isBlockInc = (blocks: TBookBlock[]) => blocks.some((block) => (block.type === "TEXT" ? block.paragraphs.some((par) => isTitleInc(par)) : false));

    const offset = _limit * _page - _limit;

    if (!books) {
      return Ret.CustomReturnData(res, `All books limit:${_limit}, page:${_page}`, []);
    }

    const result = books
      // hashTag
      .filter((book: IBook) => {
        if (hashTag) {
          return book.Genres?.some((tag) => tag === hashTag);
        }
        return true;
      })
      // query
      .filter((book: IBook) => {
        if (q) {
          return isTitleInc(book.Title) || isAuthorInc(book.Author) || isBlockInc(book.blocks);
        }
        return true;
      })
      // _sort
      .sort((a, b) => {
        if (_sort && a[_sort]) {
          // _order PublicationDate
          if (_sort === "PublicationDate" || _sort === "ReleaseDate") {
            const arrDateA = a[_sort].split("-");
            const arrDateB = b[_sort].split("-");
            // 0 - mm; 1 - dd; 3 - yy
            const dateA = Number(`${arrDateA[2]}${arrDateA[0]}${arrDateA[1]}`);
            const dateB = Number(`${arrDateB[2]}${arrDateB[0]}${arrDateB[1]}`);
            // console.log(dateA, dateA > dateB ? ">" : "<", dateB)
            if (dateA < dateB) {
              return _order === "desc" ? 1 : -1;
            }

            if (dateA > dateB) {
              return _order === "desc" ? -1 : 1;
            }

            return 0;
          }
          // _order views
          if (_sort === "views") {
            return _order === "desc" ? a[_sort] - b[_sort] : b[_sort] - a[_sort];
          }
          // _order Title
          if (_sort === "Title") {
            const nameA = a[_sort].toUpperCase();

            const nameB = b[_sort].toUpperCase();

            if (nameA < nameB) {
              return _order === "desc" ? 1 : -1;
            }

            if (nameA > nameB) {
              return _order === "desc" ? -1 : 1;
            }

            return 0;
          }
          // _order Author
          if (_sort === "Author") { //
            const nameA = a[_sort].join(", ").toUpperCase();

            const nameB = b[_sort].join(", ").toUpperCase();

            if (nameA < nameB) {
              return _order === "desc" ? 1 : -1;
            }

            if (nameA > nameB) {
              return _order === "desc" ? -1 : 1;
            }

            return 0;
          }
        }
        return 0;
      })
      // paging | infinite scroll
      .filter((_, indx) => indx < _limit * _page && indx >= offset);

    return Ret.CustomReturnData(res, `All books limit:${_limit}, page:${_page}`, result);
  } catch (e) {
    return Ret.err500(res, `err: books ${e instanceof Error ? e.message : ""}`);
  }
};
