import * as express from "express";
import { Request, Response } from "express";
import { getBookDetailsByID, getBooksLimitedAndPaged } from "./BooksService";

const router = express.Router();

router.get("/",
  async (req: Request, res: Response): Promise<any> => getBooksLimitedAndPaged(req, res));

router.get("/:id",
  async (req: Request, res: Response): Promise<any> => getBookDetailsByID(req, res));

export const Books = () => router;
