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
      MuiFilledInput: {
        styleOverrides: {
          root: {
            background: "white",
            color: "#10101a",
            padding: "28px 14px 14px 12px",
            borderRadius: "8px 8px 0 0",
            "&:hover": {
              background: blueGrey[50],
            },
            "&.Mui-focused": {
              background: "white",
              color: "black",
            },
          },
          multiline: {
            padding: "28px 14px 14px 12px",
          },
          input: {
            padding: 0,
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "18px",
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
            backgroundColor: colors.red.A700,
            color: "white",
            "&:hover": {
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
            ...standartCssTransition,
            border: "none",
            borderColor: "none",
            background: theme.palette.primary.main,
            color: "#ffffff",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "16px",
            textTransform: "capitalize",
            borderRadius: "12px",
            padding: "10px",
            "&:disabled": {
              background: grey[200],
            },
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
          input: {},
          root: {},
        },
      },
    },
  });
};
export default getMuiTheme;
