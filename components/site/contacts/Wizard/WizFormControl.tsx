import {
  Box,
  styled,
  Typography,
  Container,
  Grid,
  Card,
  Paper,
  Stack,
  SxProps,
} from "@mui/material";
import FormControl, { FormControlProps } from "@mui/material/FormControl";
import React from "react";
import { StyledContainer } from "./Providers";

type Props = FormControlProps;
export default function WizFormControl({ children, sx, ...rest }: Props) {
  return (
    <StyledContainer>
      <FormControl sx={{ width: "100%", ...sx }} {...rest}>
        {children}
      </FormControl>
    </StyledContainer>
  );
}
