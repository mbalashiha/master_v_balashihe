import {
  Container,
  Grid,
  Card,
  Paper,
  Button,
  Stack,
  Box,
} from "@mui/material";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef } from "react";
import DarkContainer from "./DarkContainer";
import InPageWizard from "./LandingWizard/InPageWizard";

export default function LandingWizard() {
  return (
    <DarkContainer sx={{ pt: 0 }}>
      <Paper
        sx={{
          padding: 0,
          borderRadius: "8px",
          background: "#EFEFF4",
          "& .FormControl-root, & .Typography-root, & .Typography-body1, & .FormControlLabel-label":
            {
              "&, & *:not(.Mui-error)": {
                color: `#24263F`,
                fontWeight: 500,
              },
            },
        }}
      >
        <InPageWizard />
      </Paper>
    </DarkContainer>
  );
}
