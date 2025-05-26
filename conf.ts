import { Request } from "express";

export const IS_PROD = process.env.IS_PROD || false;

export const DEV_PORT = "8000";

export const CREDENTIALS = true;

export  const ORIGIN_ALLOW_LIST = [
  "https://stored-books.netlify.app/",
  "http://localhost:3000"
];

export  const EXTENSION_ALLOW_LIST = [".jpg", ".png"];

export const corsOptionsDelegate = (req: Request, callback: (a: null, corsOptions: {credentials: boolean, origin: boolean}) => void) => {
  const corsOptions = {
    credentials: CREDENTIALS,
    origin: false // disable CORS for this request
  };

  // const isExtensionAllowed = req.path.endsWith('.jpg');
  
  if (ORIGIN_ALLOW_LIST.indexOf(req.header('Origin') || "") !== -1) {
    corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
  }

  // console.log(req.header("Origin"));
  // console.log(ALLOW_LIST.indexOf(req.header('Origin')));
  // console.log(corsOptions);

  callback(null, corsOptions) // callback expects two parameters: error and options
}

export const SECRET_KEY = process.env.SECRET_KEY || "L16wsStHbN1V44K0f7xM4vJb3lvC3rrHGRCloTOD3f";

export const DB_NAME = process.env.DB_NAME || "sb-data";

export const DATABASE_URL = process.env.DATABASE_URL || "postgres://postgres:@localhost:5432/postgres";
