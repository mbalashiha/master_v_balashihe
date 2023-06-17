import React, { useState, createContext, useContext } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import MuiDialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, TextField } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";

export const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  "& .Dialog-paperScrollPaper": {
    overflowX: "hidden",
  },
  "& .Dialog-paper, & .Dialog-paperScrollPaper": {
    backgroundColor: "white",
    margin: 0,
    width: "99.5vw",
    [theme.breakpoints.down("sm")]: {
      minHeight: "50vh",
    },
    [theme.breakpoints.up("sm")]: {
      minHeight: "21vh",
    },
    [theme.breakpoints.up("md")]: { width: "90vw" },
    [theme.breakpoints.up("lg")]: { width: "70vw" },
    "& .Typography-root": {
      color: "black",
      textOverflow: "ellipsis",
      maxWidth: "90%",
      overflowX: "hidden",
      wordWrap: "break-word",
    },
  },
}));

export default StyledDialog;
