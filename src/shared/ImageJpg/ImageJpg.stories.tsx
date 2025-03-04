import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { ImageJpg } from "./ImageJpg";
import jpg from "./story.jpg";

export default {
  title: "shared/ImageJpg",
  component: ImageJpg,
  argTypes: {
    backgroundColor: { control: "color" },
  }
} as ComponentMeta<typeof ImageJpg>;

const Template: ComponentStory<typeof ImageJpg> = (args) => <ImageJpg {...args} />;

export const Primary = Template.bind({});
Primary.args = { w: 150, src: jpg };

export const Small = Template.bind({});
Small.args = { w: 50, src: jpg };
