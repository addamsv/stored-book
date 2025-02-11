import fs from "fs";
import path from "path";
import { IPersist } from "../types";

export const Persistence = {
  get: () => {
    try {
      // @ts-ignore
      const data: IPersist = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "db.json"), "UTF-8"));
      return data;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Error with getData: ${e.message}`);
      }
      throw new Error("Error with getData");
    }
  },

  put: (json: IPersist) => {
    try {
      const data = JSON.stringify(json);
      // @ts-ignore
      fs.writeFileSync(path.resolve(__dirname, "..", "db.json"), data, "UTF-8");
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(`Error with putData: ${e.message}`);
      }
      throw new Error("Error with putData");
    }
  }
};
