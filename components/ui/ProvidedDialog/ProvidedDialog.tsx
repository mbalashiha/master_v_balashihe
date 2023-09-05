import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import cn from "classnames";
import type { BodyScrollOptions } from "body-scroll-lock";
import * as React from "react";
import {
  DialogActions,
  DialogContent,
  IconButton,
  Button,
  Typography,
  Dialog,
  SxProps,
  Box,
  DialogProps,
  Theme,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { FC, useMemo, useRef } from "react";
import BaseDialogHeader from "../BaseDialogHeader/BaseDialogHeader";

export interface ProvidedDialogProps extends DialogProps {
  children: React.ReactNode | React.ReactNode[];
  dialogActions?: boolean | React.ReactNode | React.ReactNode[];
  noPadding?: boolean;
  close: () => void;
}

const ProvidedDialog = React.forwardRef(function ProvidedDialog(
  {
    open,
    close,
    children,
    onClose,
    title,
    sx,
    maxWidth = "lg",
    dialogActions,
    noPadding,
    ...rest
  }: ProvidedDialogProps,
  ref: any
) {
  const contentRef = useRef<HTMLDivElement>();
  React.useEffect(() => {
    process.nextTick(() => {
      const dialog = contentRef && contentRef.current;
      if (open && dialog) {
        enableBodyScroll(dialog);
      } else if (!open) {
        clearAllBodyScrollLocks();
      }
    });
    return () => clearAllBodyScrollLocks();
  }, [open]);
  return (
    <Dialog
      ref={contentRef as any}
      maxWidth={maxWidth}
      open={open}
      onClose={onClose || (() => close())}
      sx={{
        "& .Dialog-container": {
          maxWidth: "100vw",
          maxHeight: "100vh",
          "& > div:first-of-type": {
            position: "relative",
            borderRadius: (theme) => theme.shape.borderRadius / 2 + "px",
            margin: { xs: "2px", sm: "6px", md: "inherit" },
            ...(sx as any),
          },
          "& .DialogContent-root": {
            p: noPadding
              ? 0
              : {
                  xs: "20px 4px 20px 4px",
                  sm: "20px 8px 20px 8px",
                  md: "20px 24px 20px 24px",
                },
            overflowX: "hidden",
          },
        },
      }}
      {...rest}
    >
      <BaseDialogHeader close={close}>{title}</BaseDialogHeader>
      <DialogContent ref={ref}>{children}</DialogContent>
      {dialogActions === false ? null : (
        <DialogActions>
          {dialogActions && dialogActions !== true ? (
            dialogActions
          ) : (
            <Button onClick={close}>Закрыть</Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
});

export default ProvidedDialog;
