import React, { useState, createContext, useContext } from "react";
import Button from "@mui/material/Button";
import { styled } from "@components/ui";
import MuiDialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, TextField } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";

export const BootstrapDialog = styled(MuiDialog)(({ theme }) => ({  
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default BootstrapDialog;
