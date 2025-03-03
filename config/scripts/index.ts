import { create, TLayer } from "./create";

const layerArgName = process.argv[2] as TLayer;

const sliceArgName = process.argv[3];

const layers = ["features", "entities", "pages"];

if (!layerArgName || !layers.includes(layerArgName)) {
  throw new Error("Непонятный слой. \"features\" | \"entities\" | \"pages\"");
}

if (!sliceArgName) {
  throw new Error("отсутствует название соайса!");
}

create(layerArgName, sliceArgName);
