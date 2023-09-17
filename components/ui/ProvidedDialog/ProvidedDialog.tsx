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
  Portal,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { FC, useMemo, useRef } from "react";
import BaseDialogHeader from "../BaseDialogHeader/BaseDialogHeader";

export interface ProvidedDialogProps extends Omit<DialogProps, "open"> {
  children: React.ReactNode | React.ReactNode[];
  dialogActions?: boolean | React.ReactNode | React.ReactNode[];
  noPadding?: boolean;
  close: () => void;
  opened?: boolean | undefined;
}

const ProvidedDialog = React.forwardRef(function ProvidedDialog(
  {
    opened,
    close,
    children,
    onClose: inOnClose,
    title,
    sx,
    maxWidth = "lg",
    dialogActions,
    noPadding,
    ...rest
  }: ProvidedDialogProps,
  ref: any
) {
  opened = typeof opened === "undefined" ? true : opened;
  const contentRef = useRef<HTMLDivElement>();
  React.useEffect(() => {
    process.nextTick(() => {
      const dialog = contentRef && contentRef.current;
      if (opened && dialog) {
        enableBodyScroll(dialog);
      } else if (!opened) {
        clearAllBodyScrollLocks();
      }
    });
    return () => clearAllBodyScrollLocks();
  }, [opened]);
  const onClose = React.useMemo(() => {
    return inOnClose || (() => close());
  }, [inOnClose, close]);
  return (
    <Dialog
      ref={contentRef as any}
      maxWidth={maxWidth}
      open={opened}
      onClose={onClose}
      sx={{
        "&&": {
          position: "fixed",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          bottom: "auto",
          right: "auto",
          background: "transparent",
          maxWidth: "100vw",
          maxHeight: "100vh",
        },
        "& .Dialog-container": {
          position: "fixed",
          width: "100%",
          height: "100%",
          left: "",
          top: "",
          bottom: "",
          right: "",
          maxWidth: "100vw",
          maxHeight: "100vh",
          margin: "auto",
          "& > div:first-of-type": {
            position: "relative",
            borderRadius: (theme) => theme.shape.borderRadius / 2 + "px",
            margin: 0,
          },
          "& .DialogContent-root": {
            p: noPadding
              ? 0
              : {
                  xs: "20px 14px 20px 14px",
                  sm: "20px 14px 20px 14px",
                  md: "20px 24px 20px 24px",
                },
            overflowX: "hidden",
            ...(sx as any),
          },
        },
      }}
      {...rest}
    >
      <BaseDialogHeader close={close}>{title}</BaseDialogHeader>
      <DialogContent ref={ref}>{children}</DialogContent>
      {dialogActions && (
        <DialogActions>
          {dialogActions === true ? (
            <Button onClick={close}>Закрыть</Button>
          ) : (
            <>{dialogActions}</>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
});

export default ProvidedDialog;
