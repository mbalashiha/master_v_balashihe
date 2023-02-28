// import {
//   disableBodyScroll as __disableBodyScroll,
//   enableBodyScroll,
//   clearAllBodyScrollLocks,
// } from "b//ody-scroll-lock";
// import type { BodyScrollOptions } from "b//ody-scroll-lock";import { FC, useRef, useEffect } from "react";
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
import BootstrapDialogTitle from "./ConfirmDialogTitle";

type TriggerButton = React.ReactElement | React.ReactElement[];
interface Props {
  children: TriggerButton;
  confirmCaption?: string;
  title?: React.ReactNode | React.ReactNode[];
  message?: string;
}

const ConfirmDialog = React.forwardRef(function ConfirmDialog(
  { children: trigger, confirmCaption, title, message }: Props,
  ref: any
) {
  title = title || "";
  message = message || "Подвердите операцию";
  confirmCaption = confirmCaption || "OK";
  const [isOpen, setIsOpen] = React.useState(false);
  const close = () => setIsOpen(false);
  let onConfirm: (() => void) | undefined = undefined;
  trigger = React.Children.map(trigger, (element: any) => {
    if (!React.isValidElement(element)) return element;
    const { onClick: onClickTrigger } = (element.props || {}) as any;
    if (onClickTrigger) {
      onConfirm = onClickTrigger;
      const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        setIsOpen(true);
      };
      return React.cloneElement(element, {
        onClick,
      } as any);
    }
    return element;
  }) as any;
  if (typeof onConfirm !== "function") {
    throw new Error(
      "No trigger button on-click event handler (used in onConfirm action)."
    );
  }
  React.useEffect(() => {
    if (isOpen) {
      const evt = new CustomEvent("MouseOverPopoverOpened");
      window.dispatchEvent(evt);
    }
  }, [isOpen]);
  return (
    <>
      {trigger}
      {isOpen ? (
        <StyledDialog ref={ref} open={isOpen} onClose={close}>
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
            <Typography variant="h2" component="div">
              {message || title}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                if (onConfirm) {
                  onConfirm();
                }
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

export default ConfirmDialog;
