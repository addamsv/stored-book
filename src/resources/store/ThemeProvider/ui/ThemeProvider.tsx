import React, { FC, useMemo, useState } from "react";
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
} from "../lib/ThemeContext";

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.DARK;

interface IThemeProviderProps {
  initialTheme?: Theme;
  children?: React.ReactNode;
}

export const ThemeProvider = ({ children, initialTheme }: IThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  const defaultProps = useMemo(
    () => ({ theme, setTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};
