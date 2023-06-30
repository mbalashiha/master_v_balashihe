import { PaletteOptions } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles" {
  export interface PaletteOptions {
    articleText: {
      main: React.CSSProperties["color"];
    };
    secondaryBackground: {
      main: React.CSSProperties["color"];
    };
    articleText: {
      main: React.CSSProperties["color"];
    };
  }
  export interface Palette {
    articleText: {
      main: React.CSSProperties["color"];
    };
    secondaryBackground: {
      main: React.CSSProperties["color"];
    };
    articleText: {
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
