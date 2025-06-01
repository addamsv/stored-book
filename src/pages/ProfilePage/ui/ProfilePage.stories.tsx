import React, { Suspense } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreProvider } from "resources/store/StoreProvider";
import { StoreDecorator } from "resources/config/storybook/StoreDecorator/StoreDecorator";
import { ECountry } from "entities/Country";
import { ECurrency } from "entities/Currency";
import ProfilePage from "./ProfilePage";

export default {
  title: "pages/ProfilePage/ProfilePage",
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // decorators: [
  //   (Story) => (
  //     <StoreProvider>
  //       <Story />
  //     </StoreProvider>
  //   ),
  // ],
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({
  profile: {
    editedData: {
      firstname: "John",
      lastname: "Dore",
      age: 22,
      country: ECountry.Armenia,
      city: "Erevan",
      address: "Mira, 1-23",
      currency: ECurrency.USD,
      // image
    }
  }
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    editedData: {
      firstname: "John",
      lastname: "Dore",
      age: 22,
      country: ECountry.Armenia,
      city: "Erevan",
      address: "Mira, 1-23",
      currency: ECurrency.USD,
      // image
    }
  }
})];
