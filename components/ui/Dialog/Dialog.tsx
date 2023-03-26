import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  DialogActions,
  DialogContent,
  IconButton,
  Button,
  ExtendButtonBase,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { FC, useRef } from "react";
import StyledDialog from "./StyledDialog";
import BootstrapDialogTitle from "./DialogTitle";

interface Props {
  // children: React.ReactElement | React.ReactElement[];
  confirmCaption?: string;
  title?: React.ReactNode | React.ReactNode[];
  message: string;
  onConfirm: () => void;
  onClose: ()=>void;
  isOpen: boolean;
}

const Dialog = React.forwardRef(function ConfirmDialog(
  { confirmCaption, title, message, isOpen, onConfirm, onClose }: Props,
  ref: any
) {
  const close = onClose;
  title = title || "";
  message = message || "Подвердите операцию";
  confirmCaption = confirmCaption || "OK";
  return (
    <>
      {isOpen ? (
        <StyledDialog ref={ref} open={isOpen} onClose={onClose}>
          <IconButton
            aria-label="close"
            onClick={close}
            sx={{
              position: "absolute",
              right: 4,
              top: 3,
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
          {title && <BootstrapDialogTitle>{title}</BootstrapDialogTitle>}
          <DialogContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography component="div">
              {message}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                onConfirm();
                close();
              }}
            >
              {confirmCaption}
            </Button>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                close();
              }}
              sx={{
                background: blueGrey[700],
                "&:hover": {
                  background: blueGrey[900],
                },
              }}
            >
              Отмена
            </Button>
          </DialogActions>
        </StyledDialog>
      ) : null}
    </>
  );
});

export default Dialog;
