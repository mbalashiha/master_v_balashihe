import React, { useState, createContext, useContext } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, TextField } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 1.4, display: "flex" }} {...other}>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Box sx={{ width: "54px" }}>&nbsp;</Box>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 2,
            top: 2,
            color: (theme) => theme.palette.grey[500],
            transition: `all 0.2s ease-in-out`,
            ":hover": {
              transition: `all 0.2s ease-in-out`,
              color: (theme) => theme.palette.text.primary,
            },
          }}
        >
          <CloseIcon sx={{ transform: "scale(1.2)" }} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default BootstrapDialogTitle;
