import {
  Stack,
  Box,
  TextField,
  Typography,
  InputAdornment,
  Button,
  Checkbox,
  Link as MuiLink,
  AlertTitle,
  FormHelperText,
  Divider,
} from "@mui/material";

const ColBox = ({ sx, ...rest }: React.ComponentProps<typeof Stack>) => (
  <Stack
    spacing={3}
    sx={{
      ...sx,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& div, & p, & h3, & label, & h1, & h5": {
        fontFamily: `var(--landing-font-family)`,
        color: "black",
        fontWeight: 400,
      },

      "& p": {
        fontSize: "14px",
        lineHeight: "22px",
      },
      "& .TextField-root": {
        width: "100%",
        "& .FormHelperText-root.Mui-error": { height: 0, oveflow: "visible" },
      },
      "& .TextField-root .InputBase-root": {
        padding: "18px",
        "& input": {
          fontSize: "16px",
        },
      },
    }}
    {...rest}
  />
);
export default ColBox;
