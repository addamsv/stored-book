import { addDecorator } from "@storybook/react";
import { StyleDecorator } from "../../src/resources/config/storybook/StyleDecorator/StyleDecorator";
import { ThemeDecorator } from "../../src/resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "../../src/resources/store/ThemeProvider";
import { RouterDecorator } from "../../src/resources/config/storybook/RouterDecorator/RouterDecorator";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator(StyleDecorator);

// addDecorator(I18nDecorator);

addDecorator(ThemeDecorator(Theme.LIGHT));

addDecorator(RouterDecorator);
