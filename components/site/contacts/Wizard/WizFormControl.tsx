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
import FormControl from "@mui/material/FormControl";
import React from "react";
import { WizValues } from "./wiztypes";

const WizFormControl = styled(FormControl)(({ theme }) => ({
  "&, & > p, & > *": {
    fontWeight: 500,
    color: `#24263F`,
  },
  [theme.breakpoints.down("md")]: {
    minHeight: "300px",
    minWidth: "90vw",
    maxHeight: "70vh",
  },
  [theme.breakpoints.up("md")]: {
    minHeight: "500px",
    minWidth: "800px",
    maxHeight: "70vh",
  },
  "& label": {
    fontSize: "21px",
  },
  "& .FormLabel-root.FormLabel-colorPrimary": {
    padding: "7px 0 12px 0",
    fontSize: "21px",
    fontWeight: 500,
  },
}));
export default WizFormControl;
