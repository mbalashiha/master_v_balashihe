import { createTheme, Theme } from "@mui/material/styles";
import { colors, Palette, PaletteMode } from "@mui/material";
import { grey, blueGrey } from "@mui/material/colors";
const InterFontFamily = `Inter, Arial, sans-serif`;

export const standartCssTransition = {
  transitionProperty: "all",
  transitionDuration: "0.16s",
  transitionTimingFunction: "ease-in-out",
  transitionDelay: "0s",
};

const getMuiTheme = (colorMode?: PaletteMode): Theme => {
  colorMode = colorMode || "light";
  const fontFamily = `var(--text-font-family)`;
  const themeGreyColor = "rgba(40, 39, 37, 0.94)";
  let theme = createTheme({
    palette: {
      mode: colorMode,
      primary: { main: "#b87d36" },
      secondary: {
        main: "#ffc14d",
      },
      articleText: {
        main: "#0e0e0f",
      },
      secondaryBackground: {
        main: "#F3F5FE",
      },
      cellHeaderBackground: {
        main: "#EFDDD1",
      },
      text: {
        primary: "#25252c",
        secondary: "#757575",
      },
      dialogClickColor: {
        main: "#3b362b",
      },
    },
    shape: {
      borderRadius: 24,
    },
    typography: {
      fontFamily: `var(--text-font-family)`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      allVariants: {
        color: colorMode === "light" ? "#3b362b" : grey[100],
      },
      button: {
        fontFamily: `var(--header-font-family)`,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
      },
      h1: {
        fontFamily: `var(--header-font-family)`,
        fontSize: "40px",
        lineHeight: "52px",
        fontWeight: 700,
      },
      h2: {
        fontFamily: `var(--header-font-family)`,
        fontSize: "26px",
        lineHeight: "32px",
        fontWeight: 700,
        color: grey[700],
        marginTop: "30px",
      },
      h3: {
        fontFamily: `var(--header-font-family)`,
        fontSize: "21px",
        lineHeight: "28px",
        fontWeight: 700,
      },
      h5: {
        fontFamily: `var(--header-font-family)`,
        color: colorMode === "dark" ? "white" : "black",
        fontWeight: 500,
      },
      h6: {
        fontFamily: `var(--header-font-family)`,
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
              color: theme.palette.primary.main,
              textDecoration: "none",
              fontWeight: 600,
              "& > .link-icon": {
                color: themeGreyColor,
                fill: themeGreyColor,
                stroke: themeGreyColor,
              },
              "&:hover": {
                color: "red",
                textDecoration: "none",
              },
              "&:hover > .link-icon": {
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
      MuiLink: {
        styleOverrides: {
          root: {
            cursor: "pointer",
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
            fontFamily: `var(--header-font-family)`,
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
          root: {},
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
            fontFamily: `var(--header-font-family)`,
            borderRadius: "50px",
            border: "3px solid",
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            padding: "10px 30px",
            fontWeight: 700,
            "&:hover": {
              background: theme.palette.primary.main,
              color: "#ffffff",
              boxShadow: "0 0 30px rgb(13 70 144 / 40%)",
              "& svg.SvgIcon-root": {
                fill: "white",
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
