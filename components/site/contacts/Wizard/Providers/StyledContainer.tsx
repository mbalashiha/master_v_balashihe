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

const StyledContainer = styled(Box)(({ theme }) => ({
  "&, & > p, & > *": {
    fontWeight: 500,
    color: `#24263F`,
  },
  "& label": {
    fontSize: "21px",
  },
  "& .FormLabel-root.FormLabel-colorPrimary": {
    padding: "4px 0 12px 0",
    fontSize: "18px",
    [theme.breakpoints.up("md")]: {
      fontSize: "21px",
    },
    fontWeight: 500,
  },
  width: "100%",
  minHeight: "516px",
  maxHeight: "90vh",
  overflow: "visible",
  paddingBottom: "15px",
}));
export default StyledContainer;
