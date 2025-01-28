import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    let newTheme: Theme;
    // const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT;
        break;
      case Theme.LIGHT:
        newTheme = Theme.DARK_BLUE;
        break;
      case Theme.DARK_BLUE:
        newTheme = Theme.LIGHT_BLUE;
        break;
      case Theme.LIGHT_BLUE:
        newTheme = Theme.LIGHT_GREEN;
        break;
      case Theme.LIGHT_GREEN:
        newTheme = Theme.DARK;
        break;
      default:
        newTheme = Theme.DARK;
    }

    document.body.className = newTheme;

    setTheme?.(newTheme);

    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return {
    theme: theme || Theme.DARK,
    toggleTheme,
  };
}
