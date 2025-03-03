import fs from "fs/promises";
import { getRootDir } from "./getRootDir";
import { mkUI } from "./mkUI";
import { mkModel } from "./mkModel";
import { mkPublicAPI } from "./mkPublicAPI";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

export type TLayer = "features" | "entities" | "pages";

export const create = async (layer: TLayer, slice: string) => {
  try {
    await fs.mkdir(getRootDir("src", layer, capitalizeFirstLetter(slice)));
  } catch (error) {
    console.log(`Не получилось создать папку для слайса ${slice}`);
  }

  await mkUI(layer, slice);

  await mkModel(layer, slice);

  await mkPublicAPI(layer, slice);
};
