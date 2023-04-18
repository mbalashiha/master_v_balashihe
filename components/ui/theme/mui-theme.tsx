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
const InterFontFamily = `Inter, Arial, sans-serif`;

export const standartCssTransition = {
  transitionProperty: "all",
  transitionDuration: "0.2s",
  transitionTimingFunction: "ease-in-out",
  transitionDelay: "0s",
};

const getMuiTheme = (): Theme => {
  const colorMode: PaletteMode = "light" as any;
  const fontFamily = "Gotham, Arial, sans-serif";
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
    spacing: 12,
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
        color: colorMode === "light" ? "#303B44" : grey[100],
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
            "@media (max-width: 1000px)": {
              maxWidth: "99.5vw",
              overflowX: "hidden",
            },
            "& .SnackbarContent-root, & .SnackbarItem-contentRoot": {
              "&&": {
                fontFamily: InterFontFamily,
                fontWeight: 500,
                background: "white",
                "&.SnackbarItem-variantError": {
                  color: "white",
                  backgroundColor: "red",
                },
              },
            },
            "& h1, & h2, & h3": {
              color: theme.typography.h1.color,
            },
            "& p": {
              marginBottom: "2rem",
            },
            "& a": {
              ...standartCssTransition,
              color: theme.palette.primary.main,
              textDecoration: "none",
              fontWeight: 600,
              "& > .link-icon": {
                ...standartCssTransition,
                color: theme.palette.primary.main,
                fill: theme.palette.primary.main,
                stroke: theme.palette.primary.light,
              },
              "&:hover": {
                ...standartCssTransition,
                color: "red",
                textDecoration: "none",
              },
              "&:hover > .link-icon": {
                ...standartCssTransition,
                color: "red",
                fill: "red",
                stroke: "red",
              },
            },
            minHeight: "100vh",
            position: "relative",
            paddingBottom: "27rem",
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
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: "4px",
            paddingRight: "4px",
            "@media (min-width: 600px)": {
              paddingLeft: "5px",
              paddingRight: "5px",
            },
            "@media (min-width: 1200px)": {
              paddingLeft: "5px !important",
              paddingRight: "5px !important",
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
            fontFamily,
            fontWeight: "normal",
            fontSize: "1rem",
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: "0.75rem",
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
          root: { ...standartCssTransition },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            ...standartCssTransition,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          elevation1: {
            boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.2)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            ...standartCssTransition,
            borderRadius: "50px",
            border: "3px solid",
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            padding: "10px 30px",
            fontWeight: 600,
            "&:hover": {
              background: theme.palette.primary.main,
              color: "#ffffff",
              boxShadow: "0 0 30px rgb(13 70 144 / 40%)",
            },
            "& .MuiButton-iconSizeMedium": {
              transform: "scale(1.2)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            background: "white",
            color: "#10101a",
            padding: "18px 14px 4px 12px",
            borderRadius: "8px 8px 0 0",
            ...standartCssTransition,
            "&:hover": {
              background: blueGrey[200],
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
            "&:not(.MuiInputLabel-shrink)": {
              transform: "translate(14px, 10px)",
            },
          },
          filled: {
            color: theme.palette.primary.main,
            "&:not(.MuiInputLabel-shrink)": {
              transform: "translate(12px, 14px)",
            },
            "&.MuiInputLabel-shrink": {
              transform: "translate(12px, 1px) scale(0.8)",
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
      MuiInputBase: {
        styleOverrides: {
          input: {
            fontWeight: 500,
            color: "#10101a",
            fontSize: "13pt",
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
