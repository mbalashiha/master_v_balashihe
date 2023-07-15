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
import { WizValues } from "./WizardProvider/wiztypes";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "&, & > p, & > *": {
    fontWeight: 500,
    color: `#24263F`,
  },
  "& label": {
    fontSize: "21px",
  },
  "& .FormLabel-root.FormLabel-colorPrimary": {
    padding: "7px 0 12px 0",
    fontSize: "21px",
    fontWeight: 500,
  },
  width: "100%",
  height: "520px",
  maxHeight: "60vh",
  overflow: "auto",
}));
type Props = FormControlProps;
export default function WizFormControl({ children, ...rest }: Props) {
  return <StyledFormControl {...rest}>{children}</StyledFormControl>;
}
