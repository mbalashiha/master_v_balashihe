import util from "util";
import React, { useEffect, FC, useContext, useRef } from "react";
import { PaletteMode, Theme, ThemeProvider } from "@mui/material";

export interface UseThemePalletteResult {
  colorMode: PaletteMode;
  theme: Theme;
  setThemePalette: (themePaletteMode: PaletteMode) => void;
}
const getSystemColorMode = () => {
  return typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};
const useThemePalette = (getMuiTheme: () => Theme) => {
  const getMuiThemeRef = React.useRef(getMuiTheme);
  getMuiThemeRef.current = getMuiTheme;
  const theme = React.useMemo(() => {
    const getMuiTheme = getMuiThemeRef.current;
    return getMuiTheme();
  }, []);
  return React.useMemo(() => {
    return {
      colorMode: "light",
      theme,
    };
  }, [theme]);
};
export default useThemePalette;
