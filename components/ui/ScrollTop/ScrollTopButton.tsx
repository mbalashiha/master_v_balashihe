import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import { ScrollTop } from "./ScrollTop";
type Props = React.ComponentProps<typeof Fab> & {
  FabContainer?: React.ComponentProps<typeof Box>;
};

export default function BackToTop({ sx, FabContainer, ...props }: Props) {
  return (
    <ScrollTop {...FabContainer}>
      <Fab
        aria-label="scroll back to top"
        sx={{
          "& svg": {
            width: "36px",
            height: "36px",
          },
          background: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.text.primary,
          ...sx,
        }}
        {...props}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  );
}
