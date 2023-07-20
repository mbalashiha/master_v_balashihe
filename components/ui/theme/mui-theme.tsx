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
  const themeGreyColor = "rgba(40, 39, 37, 0.94)";
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
      secondaryBackground: {
        main: "#F3F5FE",
      },
      cellHeaderBackground: {
        main: "#EFDDD1",
      },
      text: {
        primary: "#303B44",
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
            "& .SnackbarContent-root, & .SnackbarItem-contentRoot": {
              fontFamily: InterFontFamily,
              fontWeight: 500,
              background: "white",
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
              ...standartCssTransition,
              color: theme.palette.primary.main,
              textDecoration: "none",
              fontWeight: 600,
              "& > .link-icon": {
                ...standartCssTransition,
                color: themeGreyColor,
                fill: themeGreyColor,
                stroke: themeGreyColor,
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
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: "4px",
            paddingRight: "4px",
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
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "none",
            boxShadow: "none",
            "& a": {
              color: themeGreyColor,
              fontWeight: 600,
            },
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            backdropFilter: "saturate(180%) blur(15px)",
            backgroundColor: "rgba(241, 243, 245, 0.75)",
            boxShadow: `rgba(0, 0, 0, 0.05) 0px -1px 0px inset`,
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            backgroundColor: colors.red[900],
            color: "white",
            "&:hover": {
              backgroundColor: colors.red.A700,
              boxShadow: "none",
            },
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            ...standartCssTransition,
            "&:disabled": {
              borderColor: "#adadad",
              color: "#adadad",
            },
            "& svg.SvgIcon-root": {},
          },
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
              "& svg.SvgIcon-root": {
                fill: "red",
              },
            },
            "& .Button-iconSizeMedium": {
              transform: "scale(1.2)",
            },
            "&:disabled": {
              borderColor: "#adadad",
              color: "#adadad",
              "& svg.SvgIcon-root": {
                fill: "#adadad",
              },
            },
            "& svg.SvgIcon-root": {
              fill: theme.palette.primary.main,
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.mode === "light" ? "white" : "black",
            color: "#10101a",
            padding: "18px 14px 4px 12px",
            borderRadius: "8px 8px 0 0",
            ...standartCssTransition,
            "&:hover": {
              borderColor: blueGrey[200],
              backgroundColor:
                theme.palette.mode === "light" ? "white" : "black",
            },
            "&.Mui-focused": {
              backgroundColor:
                theme.palette.mode === "light" ? "white" : "black",
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
            "&:not(.InputLabel-shrink)": {
              transform: "translate(14px, 10px)",
            },
          },
          filled: {
            color: theme.palette.primary.main,
            "&:not(.InputLabel-shrink)": {
              transform: "translate(12px, 14px)",
            },
            "&.InputLabel-shrink": {
              transform: "translate(12px, 1px) scale(0.8)",
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
            padding: "12px",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.mode === "light" ? "white" : "black",
            padding: "10px",
            "&:hover": {
              borderColor: blueGrey[200],
            },
          },
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
