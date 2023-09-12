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
  return (
    <Dialog
      ref={contentRef as any}
      maxWidth={maxWidth}
      open={opened}
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
                  xs: "20px 14px 20px 14px",
                  sm: "20px 14px 20px 14px",
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
