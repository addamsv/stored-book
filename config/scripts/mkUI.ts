import fs from "fs/promises";
import { TLayer } from "./create";
import { getRootDir } from "./getRootDir";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import { getUIComponent } from "./templates/ui/getUIComponent";
import { getStory } from "./templates/ui/getStory";

export const mkUI = async (layer: TLayer, slice: string) => {
  const getUIPath = (...segments: string[]) => getRootDir("src", layer, slice, "ui", ...segments);

  try {
    await fs.mkdir(getUIPath());
  } catch (error) {
    console.log(`не удалось создать UI для компонентв ${slice}`, error);
  }

  const mkUI = async () => {
    try {
      const componentName = capitalizeFirstLetter(slice);

      await fs.mkdir(getUIPath(componentName));

      await fs.writeFile(
        getUIPath(componentName, `${componentName}.tsx`),
        getUIComponent(componentName),
      );

      await fs.writeFile(
        getUIPath(componentName, `${componentName}.stories.tsx`),
        getStory(layer, componentName),
      );

      await fs.writeFile(
        getUIPath(componentName, `${componentName}.module.scss`),
        `.${slice} {
  display: block;
}
` // styleTemplate(componentName),
      );
    } catch (e) {
      console.log("Не удалось создать компонент");
    }
  };

  await mkUI();
};
