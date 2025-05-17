import express from "express";
import cors from "cors";
import { Users } from "./sbUsers/UserController";
import { getProfilesRouts } from "./profiles/profilesController";
import { Books } from "./books/BooksController";
import { getCommentsRouts } from "./comments/commentsController";
import bodyParser from "body-parser";
import path from "path";
import { HelpSteps } from "./helpSteps/HelpStepsController";

const app = express();
app.use(cors());
app.use(bodyParser.json());

/* API | ROUTES */
app.use("/api/v1/users", Users());
app.use("/api/v1/profiles", getProfilesRouts());
app.use("/api/v1/books", Books());
app.use("/api/v1/comments", getCommentsRouts());
app.use("/api/v1/helpSteps", HelpSteps());

/* PUBLIC | STATIC VIEW */
app.use(express.static(path.join(__dirname, "..", "..", "public")));
// app.get("*", (req, res) => { // Handle requests by serving index.html for all routes
//     res.sendFile("index.html", { root: path.join(__dirname, "..", "..", "public") });
// });

export const getExpressApp = () => {
  return app;
}
