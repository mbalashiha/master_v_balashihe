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
import CloseIcon from "@mui/icons-material/Close";
import { standartCssTransition } from "../theme/mui-theme";

interface DialogTitleProps extends React.ComponentProps<typeof DialogTitle> {
  children?: React.ReactNode | React.ReactNode[];
  close: () => void;
}

export const BaseDialogHeader = ({
  children,
  close,
  ...other
}: DialogTitleProps) => {
  return (
    <DialogTitle sx={{ m: 0, p: 0, display: "flex" }} {...other}>
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: children ? "20px 8px" : 0, md: children ? "20px 24px" : 0 },
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          height: "100%",
          width: "54px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: "4px",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={close}
          sx={{
            color: (theme) => theme.palette.grey[500],
            ...standartCssTransition,
            "&:hover": {
              ...standartCssTransition,
              color: (theme) => theme.palette.text.primary,
            },
          }}
        >
          <CloseIcon sx={{ transform: "scale(1.2)" }} />
        </IconButton>
      </Box>
    </DialogTitle>
  );
};

export default BaseDialogHeader;
