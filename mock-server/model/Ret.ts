import { IS_DEV } from "../conf";

export const Ret = {
  _res: undefined as any,

  _req: undefined as any,

  err500: (res: any, data: string) => {
    if (IS_DEV) {
      console.log(data);
    }

    if (!res) {
      console.log("_res is not Defined");
      throw new Error("_res is not Defined");
    }

    res.status(500);

    return res.json({
      isSuccess: false,
      statusCode: 500,
      message: "Server Side Error",
      data
    });
  },

  err403: (res: any, unit: string) => {
    res.status(403);

    return res.json({
      isSuccess: false,
      statusCode: 403,
      message: `${unit} not allowed`,
    });
  },

  err404: (res: any, unit: string) => {
    res.status(404);

    return res.json({
      isSuccess: false,
      statusCode: 404,
      message: `${unit} not found`
    });
  },

  err401: (res: any) => {
    res.status(401);

    res.set({ "www-authenticate": "Basic realm=\"Realm\"" });

    return res.json({
      isSuccess: false,
      statusCode: 401,
      message: "Unauthorized"
    });
  },

  CustomReturnData: (res: any, message: string, data: any) => {
    return res!.json({
      isSuccess: true,
      statusCode: 200,
      message,
      data
    });
  }
};
