import Cookies from "js-cookie";
import util from "util";
import React, { useEffect, FC, useContext, useRef } from "react";
import { PaletteMode, Theme, ThemeProvider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  CURRENT_SYSTEM_PALETTE_MODE_COOKIE,
  MANUAL_PALETTE_MODE_COOKIE,
  SHOP_COOKIE_EXPIRE,
} from "@framework/commerce/const";
const supportsLocalStorage =
  typeof window !== "undefined" && window.localStorage;

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
const getStoredColorMode = () => {
  return (
    typeof window !== "undefined" &&
    window.localStorage &&
    window.localStorage[MANUAL_PALETTE_MODE_COOKIE]
  );
};
const getStateColorMode = () => {
  return getStoredColorMode() || getSystemColorMode();
};
const useThemePalette = (getMuiTheme: (colorMode: PaletteMode) => Theme) => {
  const [paletteMode, setPaletterMode] = React.useState<PaletteMode>(
    useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light"
  );
  React.useEffect(() => {
    const storedMode = getStateColorMode();
    if (storedMode !== paletteMode) {
      setPaletterMode(storedMode);
    }
  }, [paletteMode]);
  const setThemePalette = React.useCallback((themePaletteMode: PaletteMode) => {
    if (supportsLocalStorage) {
      const currentSystemColorMode: PaletteMode = getSystemColorMode();
      if (currentSystemColorMode === themePaletteMode) {
        window.localStorage.removeItem(MANUAL_PALETTE_MODE_COOKIE);
        window.localStorage.setItem(
          CURRENT_SYSTEM_PALETTE_MODE_COOKIE,
          themePaletteMode
        );
      } else {
        window.localStorage.setItem(
          MANUAL_PALETTE_MODE_COOKIE,
          themePaletteMode
        );
      }
    }
    setPaletterMode(themePaletteMode);
  }, []);
  React.useEffect(() => {
    const systemColorModeChangeListener = (event) => {
      const newSystemMode = getSystemColorMode();
      if (newSystemMode !== paletteMode && !getStoredColorMode()) {
        setPaletterMode(newSystemMode);
      }
    };
    if (typeof window !== "undefined" && window.matchMedia) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", systemColorModeChangeListener);
    }
    return () => {
      if (typeof window !== "undefined" && window.matchMedia) {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .removeEventListener("change", systemColorModeChangeListener);
      }
    };
  }, [paletteMode]);
  const theme = React.useMemo(() => {
    return getMuiTheme(paletteMode);
  }, [getMuiTheme, paletteMode]);
  const props = {
    colorMode: paletteMode,
    setThemePalette,
    theme,
  };
  return React.useMemo(() => {
    return {
      colorMode: props.colorMode,
      setThemePalette: props.setThemePalette,
      theme: props.theme,
    };
  }, [props.colorMode, props.setThemePalette, props.theme]);
};
export default useThemePalette;
