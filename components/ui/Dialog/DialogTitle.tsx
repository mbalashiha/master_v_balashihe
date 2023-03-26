import React, { useState, createContext, useContext } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box, TextField } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";

interface DialogTitleProps extends React.ComponentProps<typeof DialogTitle> {
  children: React.ReactNode | React.ReactNode[];
}

export const BootstrapDialogTitle = ({
  children,
  ...other
}: DialogTitleProps) => {
  return (
    <DialogTitle sx={{ m: 0, p: 1.4, display: "flex" }} {...other}>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Box sx={{ width: "54px" }}>&nbsp;</Box>
    </DialogTitle>
  );
};

export default BootstrapDialogTitle;
