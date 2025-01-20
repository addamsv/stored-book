import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { StoreDecorator } from "resources/config/storybook/StoreDecorator/StoreDecorator";
import { ECountry } from "entities/Country";
import { ECurrency } from "entities/Currency";
import image from "resources/assets/images/img.png";
import { ProfileCard } from "./ProfileCard";

export default {
  title: "entities/ProfileCard",
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  profileCardData: {
    firstname: "John",
    lastname: "Dore",
    age: 22,
    country: ECountry.Armenia,
    city: "Erevan",
    address: "Mira, 1-23",
    currency: ECurrency.USD,
    image
  }
};

export const ProfileCardWithError = Template.bind({});
ProfileCardWithError.args = {
  error: "sth goes wrong"
};

export const ProfileCardWithLoadingState = Template.bind({});
ProfileCardWithLoadingState.args = {
  isLoading: true
};
