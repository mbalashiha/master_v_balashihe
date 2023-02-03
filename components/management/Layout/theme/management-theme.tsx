import { createTheme, Theme } from "@mui/material/styles";
import { colors, Palette, PaletteMode } from "@mui/material";
import { purple, pink, amber, grey, blueGrey } from "@mui/material/colors";
declare module "@mui/material/styles/createTypography" {
  interface Typography {
    allVariants: {
      color: React.CSSProperties["color"];
    };
  }
  // interface Palette {
  //   borderColor: Palette["primary"] & {
  //     primaryButton: React.CSSProperties["color"];
  //   };
  // }
  // interface PaletteOptions {
  //   borderColor?: PaletteOptions["primary"] & {
  //     primaryButton: React.CSSProperties["color"];
  //   };
  // }
  // interface Theme {
  // status: {
  //   danger: string;
  // };
  // }
  // allow configuration using `createTheme`
  // interface ThemeOptions {
  // status?: {
  //   danger?: string;
  // };
  // }
}
const InterFontFamily = `Inter, Arial, sans-serif`;

const getMuiTheme = (): Theme => {
  const colorMode: PaletteMode = "light" as any;
  const fontFamily = "Roboto, Gotham, Helvetica, Arial, sans-serif";
  let theme = createTheme({
    palette: {
      mode: colorMode,
      primary: { main: "#121220" },
      background: {
        default: "#4D001D",
      },
    },
    shape: {
      borderRadius: 24,
    },
    typography: {
      fontFamily,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      allVariants: {
        color: "#303B44",
      },
      button: {
        fontFamily,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
      },
      h1: {
        fontSize: "40px",
        lineHeight: "52px",
        fontWeight: 700,
      },
      h2: {
        fontSize: "26px",
        lineHeight: "32px",
        fontWeight: 700,
        color: grey[700],
        marginTop: "30px",
      },
      h3: {
        fontSize: "24px",
        lineHeight: "37px",
        fontWeight: 700,
      },
      h5: {
        color: colorMode === "dark" ? "white" : "black",
        fontWeight: 500,
      },
      h6: {
        fontSize: "24px",
        lineHeight: "30px",
        fontWeight: 600,
      },
    },
  });
  return createTheme({
    ...theme,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            "& .SnackbarContent-root.SnackbarItem-variantError": {
              color: "white",
              backgroundColor: colors.red.A700,
            },
            "& h1, & h2, & h3": {
              color: theme.typography.h1.color,
            },
            "& p": {
              marginBottom: "2rem",
            },
            "& a": {
              color: theme.palette.primary.main,
              textDecoration: "none",
              transition: "all 0.1s linear",
              fontWeight: 600,
              "&:hover": {
                color: "red",
                textDecoration: "none",
                transition: "all 0.1s linear",
              },
            },
            minHeight: "100vh",
            position: "relative",
            paddingBottom: "27rem",
            backgroundColor:
              theme.palette.mode === "dark" ? "#212529" : "#BBBBBB",
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
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: "8px",
            paddingRight: "8px",
            "@media (min-width: 600px)": {
              paddingLeft: "18px",
              paddingRight: "18px",
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h1: {},
        },
      },
      MuiPopover: {
        styleOverrides: {
          root: {
            "& .MuiPaper-rounded": {
              borderRadius: "6px",
            },
            "&.MuiMenu-root": {
              "& .MuiPaper-root": {
                backgroundColor: blueGrey["100"],
              },
              "& .MuiMenu-list": {
                padding: 0,
                "& .MuiMenuItem-root": {
                  padding: "10px 20px",
                },
              },
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
            fontFamily: InterFontFamily,
            color: "black",
            fontWeight: 500,
            fontSize: "1.1rem",
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
