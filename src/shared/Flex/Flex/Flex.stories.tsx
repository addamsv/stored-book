import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";

import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { Flex } from "./Flex";

export default {
  title: "shared/Flex",
  component: Flex,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const LightRow = Template.bind({});
LightRow.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  )
};

export const DarkRow = Template.bind({});
DarkRow.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  )
};
DarkRow.decorators = [ThemeDecorator(Theme.DARK)];

export const LightColumn = Template.bind({});
LightColumn.args = {
  direction: "column",
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  )
};

export const DarkColumn = Template.bind({});
DarkColumn.args = {
  direction: "column",
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  )
};
DarkColumn.decorators = [ThemeDecorator(Theme.DARK)];

export const LightColumnGap16 = Template.bind({});
LightColumnGap16.args = {
  gap: "16",
  direction: "column",
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  )
};

export const DarkColumnGap16 = Template.bind({});
DarkColumnGap16.args = {
  gap: "16",
  direction: "column",
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  )
};
DarkColumnGap16.decorators = [ThemeDecorator(Theme.DARK)];

export const LightRowGap4 = Template.bind({});
LightRowGap4.args = {
  gap: "4",
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  )
};

export const DarkRowGap4 = Template.bind({});
DarkRowGap4.args = {
  gap: "4",
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  )
};
DarkRowGap4.decorators = [ThemeDecorator(Theme.DARK)];

export const LightRowGap8 = Template.bind({});
LightRowGap8.args = {
  gap: "8",
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  )
};

export const DarkRowGap8 = Template.bind({});
DarkRowGap8.args = {
  gap: "8",
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  )
};
DarkRowGap8.decorators = [ThemeDecorator(Theme.DARK)];

export const LightRowGap32 = Template.bind({});
LightRowGap32.args = {
  gap: "32",
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  )
};

export const DarkRowGap32 = Template.bind({});
DarkRowGap32.args = {
  gap: "32",
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  )
};
DarkRowGap32.decorators = [ThemeDecorator(Theme.DARK)];
