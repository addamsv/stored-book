import { Story } from "@storybook/react";
import { Theme, ThemeProvider } from "resources/store/ThemeProvider";

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <ThemeProvider initialTheme={theme}>
    <div className={`app ${theme}`}>
      <StoryComponent />
    </div>
  </ThemeProvider>
);
