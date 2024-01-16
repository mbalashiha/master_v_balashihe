import { createTheme, Theme } from "@mui/material/styles";
import { colors, Palette, PaletteMode } from "@mui/material";
import { purple, pink, amber, grey, blueGrey, red } from "@mui/material/colors";
import tinycolor from "tinycolor2";
const InterFontFamily = `Inter, Arial, sans-serif`;

const getMuiTheme = (): Theme => {
  const colorMode: PaletteMode = "light" as any;
  const fontFamily = `var(--text-font-family)`;
  let theme = createTheme({
    palette: {
      mode: colorMode,
      primary: { main: "#006CE7" },
      background: {
        default: "black",
      },
      articleText: {
        main: "#302f5c",
      },
      secondaryBackground: {
        main: "#D9E3EF",
      },
      cellHeaderBackground: {
        main: "#EFDDD1",
      },
      dialogClickColor: {
        main: "#2e2d58",
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
  const inputFieldBackground = tinycolor(theme.palette.primary.light)
    .setAlpha(0.1)
    .toRgbString();
  const inputFieldFocusedBackground = tinycolor(theme.palette.primary.main)
    .setAlpha(0.1)
    .toRgbString();
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
              fontWeight: 600,
              "&:hover": {
                color: "red",
                textDecoration: "none",
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
          },
          maxWidthXl: {
            "@media (min-width: 600px)": {
              "&": {
                paddingLeft: "4px",
                paddingRight: "4px",
              },
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
      MuiInputBase: {
        styleOverrides: {
          root: {},
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            minHeight: "inherit",
            padding: "4px 0 4px 0",
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {},
          input: {
            padding: "0 6px 3px 0",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "24px",
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            background: inputFieldBackground,
            "&:hover": {
              background: inputFieldBackground,
            },
            "&.Mui-focused, &.Mui-focused:hover": {
              background: inputFieldFocusedBackground,
            },
            color: "#10101a",
            padding: "20px 12px 7px 12px",
            borderRadius: "8px 8px 0 0",
          },
          multiline: {},
          input: {
            padding: 0,
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "24px",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            background: inputFieldBackground,
            "&:hover": {
              background: inputFieldBackground,
            },
            "&.Mui-focused, &.Mui-focused:hover": {
              background: inputFieldFocusedBackground,
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            "&.InputLabel-outlined.InputLabel-shrink": {
              transform: "translate(5.5px, 1px) scale(0.835)",
              color: theme.palette.primary.main,
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
            transform: "translate(14px, 10px)",
            background: "transparent",
            padding: "0 8px",
            fontSize: "16px",
            "&.InputLabel-shrink": {
              fontWeight: 500,
              transform: "translate(12px, -8px) scale(0.835)",
            },
          },
          filled: {
            color: theme.palette.primary.main,
            transform: "translate(12px, 12px)",
            fontSize: "18px",
            "&.InputLabel-shrink": {
              fontWeight: 500,
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
          root: {},
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
            backgroundColor: theme.palette.primary.dark,
            color: "white",
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
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
            background: "white",
            border: `1px solid ${grey[300]}`,
            "&:hover": {
              borderColor: grey[200],
            },
          },
        },
      },
    },
  });
};
export default getMuiTheme;
