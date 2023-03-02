import { PaletteOptions } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles" {
  export interface PaletteOptions {
    articleText: {
      main: React.CSSProperties["color"];
    };
  }
  export interface Palette {
    articleText: {
      main: React.CSSProperties["color"];
    };
  }
  export interface Typography {
    allVariants: {
      color: React.CSSProperties["color"];
    };
  }
}
