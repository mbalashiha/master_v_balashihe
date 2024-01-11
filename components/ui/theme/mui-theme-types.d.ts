import { PaletteOptions } from "@mui/material/styles/createPalette";
import { Components } from "@mui/material/styles/components";

declare module "@mui/material/styles" {
  export interface PaletteOptions {
    articleText: {
      main: React.CSSProperties["color"];
    };
    secondaryBackground: {
      main: React.CSSProperties["color"];
    };
    cellHeaderBackground: {
      main: React.CSSProperties["color"];
    };
    dialogClickColor: {
      main: React.CSSProperties["color"];
    };
  }
  export interface Components {
    DarkContainer?: {
      defaultProps?: ComponentsProps["MuiAlert"];
      styleOverrides?: ComponentsOverrides<Theme>["MuiAlert"];
      variants?: ComponentsVariants["MuiAlert"];
    };
  }
  export interface Palette {
    articleText: {
      main: React.CSSProperties["color"];
    };
    secondaryBackground: {
      main: React.CSSProperties["color"];
    };
    cellHeaderBackground: {
      main: React.CSSProperties["color"];
    };
    dialogClickColor: {
      main: React.CSSProperties["color"];
    };
  }
}
declare module "@mui/material/styles/createTypography" {
  export interface Typography {
    allVariants: {
      color: React.CSSProperties["color"];
    };
  }
}
