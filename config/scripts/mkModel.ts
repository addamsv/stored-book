import fs from "fs/promises";
import { TLayer } from "./create";
import { getRootDir } from "./getRootDir";
import { getReduxSlice } from "./templates/model/getReduxSlice";
import { getTypeTemplate } from "./templates/model/getTypeTemplate";
import { getService } from "./templates/model/getService";
import { getSelectors } from "./templates/model/getSelectors";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

export const mkModel = async (layer: TLayer, slice: string) => {
  const getModelPath = (...segments: string[]) => getRootDir("src", layer, slice, "model", ...segments);

  try {
    await fs.mkdir(getModelPath());
    await fs.mkdir(getModelPath("types"));
    await fs.mkdir(getModelPath("slices"));
    await fs.mkdir(getModelPath("selectors"));
    await fs.mkdir(getModelPath("services"));
  } catch (error) {
    console.log(`не удалось создать MODEL для слайса ${slice}`, error);
  }

  const makeReduxSlice = async () => {
    try {
      await fs.writeFile(
        getModelPath("slices", `${slice}Slice.ts`),
        getReduxSlice(slice),
      );
    } catch (error) {
      console.log(`не удалось создать REUX слайс ${slice}`, error);
    }
  };

  const makeTypes = async () => {
    try {
      await fs.writeFile(
        getModelPath("types", `I${capitalizeFirstLetter(slice)}StateSchema.ts`),
        getTypeTemplate(slice),
      );
    } catch (error) {
      console.log(`не удалось создать TYPE ${slice}`, error);
    }
  };

  const makeServices = async () => {
    try {
      await fs.writeFile(
        getModelPath("services", `${slice}.ts`),
        getService(layer, slice),
      );
    } catch (error) {
      console.log(`не удалось создать TYPE ${slice}`, error);
    }
  };

  const makeSelectors = async () => {
    try {
      await fs.writeFile(
        getModelPath("selectors", `${slice}.ts`),
        getSelectors(),
      );
    } catch (error) {
      console.log(`не удалось создать SELECTOR ${slice}`, error);
    }
  };

  await makeReduxSlice();
  await makeTypes();
  await makeServices();
  await makeSelectors();
};
