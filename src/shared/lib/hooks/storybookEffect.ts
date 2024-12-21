export const storybookEffect = (callback: () => void) => {
  if (__PROJECT_TYPE__ !== "storybook") {
    callback();
  }
};
