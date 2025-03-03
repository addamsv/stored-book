import { capitalizeFirstLetter } from "../../capitalizeFirstLetter";
import { TLayer } from "../../create";

export const getStory = (layer: TLayer, name: string) => {
  const capName = capitalizeFirstLetter(name);

  return `import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { ${name} } from "./${name}";

export default {
  title: "${layer}/${name}",
  component: ${name},
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ${name}>;

const Template: ComponentStory<typeof ${name}> = (args) => <${name} {...args} />;

export const Light = Template.bind({});
Light.args = {
  // children: "Text"
};

export const Dark = Template.bind({});
Dark.args = {
  // children: "Text"
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
`;
};
