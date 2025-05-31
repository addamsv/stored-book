import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import { Users } from "./sbUsers/UserController";
import { getProfilesRouts } from "./profiles/profilesController";
import { Books } from "./books/BooksController";
import { getCommentsRouts } from "./comments/commentsController";
import { HelpSteps } from "./helpSteps/HelpStepsController";
import { Products } from "./products/ProductsController";
import { corsOptionsDelegate, DEV_PORT, IS_PROD } from "../../conf";
import { Pay } from "./pay/PayController";
import { Mail } from "./mail/MailController";
import "dotenv/config";

const app = express();

app.use(bodyParser.json());

if (!IS_PROD) {
  console.log("ENV.IS_PROD: ", IS_PROD);
  console.log("HTML CONTENT: ", `http://localhost:${DEV_PORT}`);
}

app.use(cors(corsOptionsDelegate));

/* API | ENDPOINTS | ROUTES */
app.use("/api/v1/users", Users());
app.use("/api/v1/profiles", getProfilesRouts());
app.use("/api/v1/books", Books());
app.use("/api/v1/products", Products());
app.use("/api/v1/comments", getCommentsRouts());
app.use("/api/v1/helpSteps", HelpSteps());
app.use("/api/v1/pay", Pay());
app.use("/api/v1/mail", Mail());

/* PUBLIC | STATIC VIEW | HTML JS IMAGES */
app.use(express.static(path.join(__dirname, "..", "..", "public")));

export const getExpressApp = () => app;
