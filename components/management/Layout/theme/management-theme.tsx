import { createTheme, Theme } from "@mui/material/styles";
import { colors, Palette, PaletteMode } from "@mui/material";
import { purple, pink, amber, grey, blueGrey, red } from "@mui/material/colors";
import { standartCssTransition } from "@components/ui/theme/mui-theme";
const InterFontFamily = `Inter, Arial, sans-serif`;

const getMuiTheme = (): Theme => {
  const colorMode: PaletteMode = "light" as any;
  const fontFamily = "Roboto, Gotham, Helvetica, Arial, sans-serif";
  let theme = createTheme({
    palette: {
      mode: colorMode,
      primary: { main: "#AA203E" },
      background: {
        default: "#4D001D",
      },
      articleText: {
        main: "#302f5c",
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
        color: "#121220",
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
            minHeight: "100vh",
            position: "relative",
            backgroundColor:
              theme.palette.mode === "dark" ? "#212529" : "#F1F3F5",
            color: theme.palette.mode === "dark" ? "#f1f3f5" : "#10101a",
            "& > footer": {
              height: "24rem",
              width: "100%",
            },
            "& button": {
              background: theme.palette.secondary.light,
            },
            "& .SnackbarContent-root, & .SnackbarItem-contentRoot": {
              "& .SnackbarItem-message": {
                color: "black",
                fontFamily: InterFontFamily,
                fontWeight: 500,
                fontSize: "11.5pt",
              },
              "&.SnackbarItem-variantError": {
                color: "white",
                backgroundColor: "red",
              },
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
              ...standartCssTransition,
              fontWeight: 600,
              "&:hover": {
                color: "red",
                textDecoration: "none",
                ...standartCssTransition,
              },
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
      MuiFormControl: {
        styleOverrides: {
          root: {},
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            background: "white",
            color: "#10101a",
            padding: "18px 14px 4px 12px",
            borderRadius: "8px 8px 0 0",
            "&:hover": {
              background: blueGrey[50],
            },
            "&.Mui-focused": {
              background: "white",
              color: "black",
            },
          },
          input: {
            padding: 0,
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "18px",
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
            transform: "translate(14px, 10px)",
            background: "transparent",
            padding: "0 8px",
            "&.InputLabel-shrink": {
              transform: "translate(12px, -8px) scale(0.835)",
              background: theme.palette.background.paper,
            },
          },
          filled: {
            color: theme.palette.primary.main,
            transform: "translate(12px, 12px)",
            "&.InputLabel-shrink": {
              transform: "translate(12px, 1px) scale(0.8)",
            },
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          root: {
            "& .Paper-rounded": {
              borderRadius: "6px",
            },
            "&.Menu-root": {
              "& .Paper-root": {
                backgroundColor: blueGrey["100"],
              },
              "& .Menu-list": {
                padding: 0,
                "& .MenuItem-root": {
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
            backgroundColor: colors.red.A700,
            color: "white",
            ":hover": {
              backgroundColor: colors.red[900],
              boxShadow: "0 0 30px rgb(13 70 144 / 40%)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "4px",
            fontWeight: 500,
            fontSize: "18px",
            padding: "6px 15px",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            "&, && *": {
              fontFamily,
            },
            ...standartCssTransition,
            border: "none",
            borderColor: "none",
            background: theme.palette.primary.main,
            color: "#ffffff",
            padding: "0 20px",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "16px",
            letterSpacing: "0.4px",
            height: "38px",
            textTransform: "capitalize",
            "&:hover": {
              background: theme.palette.primary.dark,
              color: "#ffffff",
              boxShadow: "0 0 30px rgb(13 70 144 / 40%)",
            },
            "& .Button-iconSizeMedium": {
              transform: "scale(1.2)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            padding: 0,
          },
          root: {
            padding: "12px 14px 8px 14px",
          },
        },
      },
    },
  });
};
export default getMuiTheme;
