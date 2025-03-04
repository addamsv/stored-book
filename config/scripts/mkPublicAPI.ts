import fs from "fs/promises";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import { TLayer } from "./create";
import { getRootDir } from "./getRootDir";

export const mkPublicAPI = async (layer: TLayer, slice: string) => {
  const capName = capitalizeFirstLetter(slice);

  const schemaName = `I${capName}StateSchema`;

  try {
    await fs.writeFile(
      getRootDir("src", layer, slice, "index.ts"),
      `export { ${capName} } from "./ui/${capName}/${capName}";
export { ${schemaName} } from "./model/types/${schemaName}";
`,
    );
  } catch (e) {
    console.log("Не удалось создать PUBLIC API");
  }
};
