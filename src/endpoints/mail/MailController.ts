import * as express from "express";
import { Request, Response } from "express";
import { sendEmail } from "../../services/mailer/Mail";

const router = express.Router();

router.post("/",
  async (req: Request, res: Response): Promise<any> => {
    const mailResponse = await sendEmail("send email tets", "Text as test");

    return res.json({
      mailResponse,
    });
  });

export const Mail = () => router;
