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
const CloseButton = ({ close }: { close: () => void }) => (
  <IconButton
    aria-label="close"
    onClick={close}
    sx={{
      color: (theme) => theme.palette.grey[500],
      ...standartCssTransition,
      m: "4px",
      "& svg": { transform: "scale(1)", width: "28px", height: "28px" },
      position: "absolute",
      right: 0,
      top: 0,
      "&:hover": {
        ...standartCssTransition,
        color: (theme) => theme.palette.text.primary,
      },
    }}
  >
    <CloseIcon />
  </IconButton>
);
export const BaseDialogHeader = ({
  children,
  close,
  sx,
  ...other
}: DialogTitleProps) => {
  return children ? (
    <DialogTitle
      sx={{
        m: 0,
        position: "relative",
        p: {
          xs: children ? "20px 52px 0 8px" : 0,
          md: children ? "20px 52px 0 20px" : 0,
        },
        ...sx,
      }}
      {...other}
    >
      {children}
      <CloseButton close={close} />
    </DialogTitle>
  ) : (
    <CloseButton close={close} />
  );
};

export default BaseDialogHeader;
