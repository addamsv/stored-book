import * as express from "express";
import { Request, Response } from "express";
import { pay } from "../../services/pay/yookassa";

const router = express.Router();

router.post("/",
  async (req: Request, res: Response): Promise<any> => {
    const payResponse = await pay("2", "111", "111");

    return res.json({
      payResponse,
    });
  });

export const Pay = () => router;
