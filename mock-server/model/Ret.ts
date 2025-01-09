const IS_PROD = false;

export const Ret = {
  _res: undefined as any,

  _req: undefined as any,

  err500: (data: string) => {
    if (!IS_PROD) {
      console.log(data);
    }

    if (!Ret._res) {
      throw new Error("_res is not Defined");
    }

    Ret._res.status(500);

    return Ret._res.json({
      isSuccess: false,
      statusCode: 500,
      message: "Server Side Error",
      data
    });
  },

  err403: (unit: string) => {
    Ret._res.status(403);

    return Ret._res.json({
      isSuccess: false,
      statusCode: 403,
      message: `${unit} not allowed`,
    });
  },

  err404: (unit: string) => {
    Ret._res.status(404);

    return Ret._res.json({
      isSuccess: false,
      statusCode: 404,
      message: `${unit} not found`
    });
  },

  err401: () => {
    Ret._res.status(401);

    Ret._res.set({ "www-authenticate": "Basic realm=\"Realm\"" });

    return Ret._res.json({
      isSuccess: false,
      statusCode: 401,
      message: "Unauthorized"
    });
  },

  CustomReturnData: (message: string, data: any) => {
    return Ret._res!.json({
      isSuccess: true,
      statusCode: 200,
      message,
      data
    });
  }
};
