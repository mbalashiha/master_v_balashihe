import { Button, Box, styled } from "@mui/material";
import React, { useRef, useEffect, FC } from "react";
import util from "util";

import StepWizard, {
  StepWizardProps,
  StepWizardChildProps,
} from "react-step-wizard";

const StyledWizard = styled(StepWizard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
  width: "100%",
  overflowX: "visible",
  minHeight: "90vh",
  [theme.breakpoints.up("md")]: {
    minHeight: "746px",
  },
  "& > div:last-of-type": {
    flexGrow: 1,
    overflowX: "hidden",
  },
}));

export default StyledWizard;
