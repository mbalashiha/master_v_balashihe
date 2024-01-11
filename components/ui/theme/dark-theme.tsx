import { createTheme, Theme } from "@mui/material/styles";
import {
  colors,
  Palette,
  PaletteMode,
  Button,
  Button as MuiButton,
  PaletteColorOptions,
  CSSInterpolation,
} from "@mui/material";
import { grey, blueGrey } from "@mui/material/colors";
import getMuiTheme from "./mui-theme";

const getDarkTheme = (): Theme => {
  const darkTheme = getMuiTheme("dark", {
    defaultProps: {
      sx: {
        pt: "52px",
        pb: "52px",
      },
    },
  });
  return darkTheme;
};
export default getDarkTheme;
