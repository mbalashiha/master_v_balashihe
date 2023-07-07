// import {
//   disableBodyScroll as __disableBodyScroll,
//   enableBodyScroll,
//   clearAllBodyScrollLocks,
// } from "b//ody-scroll-lock";
// import type { BodyScrollOptions } from "b//ody-scroll-lock";import { FC, useRef, useEffect } from "react";
import * as React from "react";
import {
  DialogActions,
  DialogContent,
  IconButton,
  Button,
  ExtendButtonBase,
  Typography,
  Dialog,
  SxProps,
  Box,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { FC, useMemo, useRef } from "react";
import BaseDialogHeader from "../BaseDialogHeader/BaseDialogHeader";
import { standartCssTransition } from "../theme/mui-theme";

type TriggerButton = React.ReactNode | React.ReactNode[];
interface Props {
  children: TriggerButton;
  content: React.ReactNode | React.ReactNode[];
  title?: React.ReactNode | React.ReactNode[];
  sx?: SxProps;
  component?: React.ComponentProps<typeof Box>["component"];
  noContainer?: boolean;
}

const BaseDialog = React.forwardRef(function BaseDialog(
  {
    children: inTrigger,
    content,
    title,
    sx,
    component = "div",
    noContainer,
  }: Props,
  ref: any
) {
  const [isOpen, setIsOpen] = React.useState(false);
  const close = () => setIsOpen(false);
  const trigger: TriggerButton = useMemo(
    () =>
      React.Children.map(inTrigger, (element: any) => {
        if (React.isValidElement(element)) {
          const onClick: React.MouseEventHandler<HTMLButtonElement> = (
            event
          ) => {
            if (event && typeof event.stopPropagation === "function") {
              event.stopPropagation();
            }
            setIsOpen(true);
          };
          return React.cloneElement(element, {
            onClick,
          } as any);
        } else {
          return element;
        }
      }) as any,
    [inTrigger]
  );
  React.useEffect(() => {
    if (isOpen) {
      const evt = new CustomEvent("MouseOverPopoverOpened");
      window.dispatchEvent(evt);
    }
  }, [isOpen]);
  return (
    <>
      {noContainer ? (
        <>{trigger}</>
      ) : (
        <Box
          component={component}
          sx={{
            cursor: "pointer",
            "&:hover": {
              "&, & > *": {
                color: "red",
              },
              "& > svg": {
                fill: "red",
              },
            },
            "& > *": {
              color: "#2e2d58",
            },
            "& > svg": {
              fill: "#2e2d58",
            },
          }}
          onClick={(event: any) => {
            if (event && typeof event.stopPropagation === "function") {
              event.stopPropagation();
            }
            setIsOpen(true);
          }}
        >
          {trigger}
        </Box>
      )}
      {isOpen ? (
        <Dialog
          maxWidth={"lg"}
          ref={ref}
          open={isOpen}
          onClose={close}
          sx={{
            "& .Dialog-container": {
              "& > *": {
                borderRadius: (theme) => theme.shape.borderRadius / 2 + "px",
                margin: { xs: "2px", sm: "6px", md: "inherit" },
              },
              "& .DialogContent-root": {
                p: {
                  xs: "0px 4px 20px 4px",
                  sm: "0px 8px 20px 8px",
                  md: "0px 24px 20px 24px",
                },
              },
            },
            ...sx,
          }}
        >
          <BaseDialogHeader close={close}>{title}</BaseDialogHeader>
          <DialogContent>{content}</DialogContent>
          <DialogActions>
            <Button onClick={() => close()}>Закрыть</Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
});

export default BaseDialog;
