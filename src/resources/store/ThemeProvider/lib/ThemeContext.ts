import { createContext } from "react";

export enum Theme {
  LIGHT = "app_light_theme",
  DARK = "app_dark_theme",
  DARK_BLUE = "app_dark_blue_theme",
  LIGHT_BLUE = "app_light_blue_theme",
  LIGHT_GREEN = "app_light_green_theme",
}

export interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = "theme";
