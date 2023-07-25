import { useField, useFormikContext } from "formik";
import * as React from "react";
import { StyledContainer, WizValues } from "./Providers";
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
  Alert,
  FormHelperText,
} from "@mui/material";

export default function StyledMainStack({
  sx,
  children,
  ...rest
}: React.ComponentProps<typeof Stack>) {
  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "596px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
      spacing={2}
      {...rest}
    >
      {children}
    </Stack>
  );
}
