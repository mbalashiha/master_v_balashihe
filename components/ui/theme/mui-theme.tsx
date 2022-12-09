import { createTheme, Theme } from "@mui/material/styles";
import {
  colors,
  Palette,
  PaletteMode,
  Button,
  Button as MuiButton,
} from "@mui/material";
import { purple, pink, amber, grey, blueGrey } from "@mui/material/colors";
declare module "@mui/material/styles" {
  interface Theme {
    // status: {
    //   danger: string;
    // };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    // status?: {
    //   danger?: string;
    // };
  }
  interface Palette {
    borderColor: Palette["primary"] & {
      primaryButton: React.CSSProperties["color"];
    };
  }
  interface PaletteOptions {
    borderColor?: PaletteOptions["primary"] & {
      primaryButton: React.CSSProperties["color"];
    };
  }
}
const getMuiTheme = (): Theme => {
  const colorMode: PaletteMode = "light";
  const fontFamily = "Gotham, Arial, sans-serif";
  let theme = createTheme({
    palette: {
      mode: colorMode,
      primary: { main: "#AA203E" },
      background: {
        default: "#4D001D",
      },
      borderColor: {
        primaryButton: "#DD2626",
      },
    },
    spacing: 12,
    typography: {
      fontFamily,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      button: {
        fontFamily,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
      },
    },
  });
  return createTheme({
    ...theme,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            "& h1, & h2, & h3": {
              color: "#303B44",
            },
            minHeight: "100vh",
            position: "relative",
            paddingBottom: "27rem",
            backgroundColor:
              theme.palette.mode === "dark" ? "#212529" : "#F1F3F5",
            color: theme.palette.mode === "dark" ? "#f1f3f5" : "#000000",
            "& > footer": {
              height: "24rem",
              width: "100%",
            },
            "& button": {
              background: theme.palette.secondary.light,
            },
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            fontSize: "1rem",
            fontFamily,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontFamily: "var(--theme-font)",
            fontWeight: "normal",
            fontSize: "1rem",
          },
        },
      },
      // Name of the component
      MuiAlert: {
        styleOverrides: {
          icon: {
            display: "none",
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            backgroundColor: colors.red[900],
            color: "white",
            ":hover": {
              backgroundColor: colors.red.A700,
              boxShadow: "-1px 6px 12px 6px rgba(130, 0, 0, 0.3)",
            },
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            transition: "all .15s ease .05s",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: "all .15s ease .05s",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            transition: "all .15s ease .05s",
            borderRadius: "50px",
            border: "3px solid",
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            padding: "10px 30px",
            fontWeight: 600,
            "&:hover": {
              background: theme.palette.primary.main,
              color: "#ffffff",
            },
            "& .MuiButton-iconSizeMedium": {
              transform: "scale(1.2)",
              marginLeft: "-15px",
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: theme.palette.mode === "dark" ? grey[100] : "black",
            fontFamily,
          },
          outlined: {
            "&:not(.MuiInputLabel-shrink)": {
              transform: "translate(14px, 10px)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            fontFamily,
          },
          input: {
            padding: 0,
          },
          root: {
            padding: "12px 14px 8px 14px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "&&, && *": {
              fontFamily,
            },
            "& textarea": {
              padding: 0,
            },
          },
        },
      },
    },
  });
};
export default getMuiTheme;
