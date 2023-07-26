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
  minHeight: "596px",
  overflowX: "hidden",
  "& > div:last-of-type": {
    flexGrow: 1,
  },
}));

export default StyledWizard;
