import express from "express";
import cors from "cors";
import { getUsersRouts } from "./users/users";
import { getProfilesRouts } from "./profiles/profiles";
import { getBooksRouts } from "./books/books";
import { getCommentsRouts } from "./comments/comments";
import bodyParser from "body-parser";
import path from "path";

const app = express();
app.use(cors());
app.use(bodyParser.json());

/* API | ROUTES */
app.use("/api/v1/users", getUsersRouts());
app.use("/api/v1/profiles", getProfilesRouts());
app.use("/api/v1/books", getBooksRouts());
app.use("/api/v1/comments", getCommentsRouts());

/* PUBLIC | STATIC VIEW */
app.use(express.static(path.join(__dirname, "..", "..", "public")));
// app.get("*", (req, res) => { // Handle requests by serving index.html for all routes
//     res.sendFile("index.html", { root: path.join(__dirname, "..", "..", "public") });
// });

export const getExpressApp = () => {
  return app;
}
