import { useField, useFormikContext } from "formik";
import * as React from "react";
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

export default function StyledLastStepStack({
  sx,
  children,
  ...rest
}: React.ComponentProps<typeof Stack>) {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...sx,
      }}
      spacing={2}
      {...rest}
    >
      {children}
    </Stack>
  );
}
