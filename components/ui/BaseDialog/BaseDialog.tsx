import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import cn from "classnames";
import a from "@components/ui/Transitions/animation.module.scss";
import type { BodyScrollOptions } from "body-scroll-lock";
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
  DialogProps,
  Theme,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { FC, useMemo, useRef } from "react";
import BaseDialogHeader from "../BaseDialogHeader/BaseDialogHeader";
import { standartCssTransition } from "../theme/mui-theme";
const getTriggerSx = (color?: string): SxProps<Theme> => {
  const sx: SxProps<Theme> = {
    ...standartCssTransition,
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
      color: (theme) => color || theme.palette.dialogClickColor.main,
    },
    "& > svg": {
      fill: color,
    },
  };
  return sx;
};
type MuiDialogProps = React.ComponentProps<typeof Dialog>;
type TriggerButton = React.ReactNode | React.ReactNode[];
export interface BaseDialogProps
  extends Omit<Omit<DialogProps, "open">, "color"> {
  children: TriggerButton;
  content: React.ReactNode | React.ReactNode[];
  dialogActions?: boolean | React.ReactNode | React.ReactNode[];
  component?: React.ComponentProps<typeof Box>["component"];
  noContainer?: boolean;
  noPadding?: boolean;
  hideTrigger?: boolean;
}
const InDialog = (props: React.ComponentProps<typeof Dialog>) => {
  const contentRef = useRef<HTMLDivElement>();
  React.useEffect(() => {
    process.nextTick(() => {
      const dialog = contentRef && contentRef.current;
      if (props.open && dialog) {
        enableBodyScroll(dialog);
      } else if (!props.open) {
        clearAllBodyScrollLocks();
      }
    });
    return () => clearAllBodyScrollLocks();
  }, [props.open]);
  return <Dialog {...props} ref={contentRef as any} />;
};
const BaseDialog = React.forwardRef(function BaseDialog(
  {
    children: inTrigger,
    content,
    title,
    sx,
    component,
    noContainer,
    maxWidth = "lg",
    dialogActions,
    noPadding,
    hideTrigger,
    ...rest
  }: BaseDialogProps,
  ref: any
) {
  const triggerSx = useMemo(() => getTriggerSx(), []);
  const [isOpen, setIsOpen] = React.useState(false);
  const close = () => setIsOpen(false);
  const hasMuiComponent = useRef(false);
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
          const newProps: any = {
            onClick,
          };
          const elementProps: any = element.props;
          if (
            elementProps &&
            (React.isValidElement(elementProps.startIcon) ||
              React.isValidElement(elementProps.endIcon) ||
              typeof elementProps.sx === "object")
          ) {
            hasMuiComponent.current = true;
            newProps.sx = { ...triggerSx, ...elementProps.sx };
            if (component) {
              newProps.component = component;
            }
          }
          return React.cloneElement(element, {
            ...newProps,
          });
        } else {
          return element;
        }
      }) as any,
    [inTrigger, triggerSx, component]
  );
  React.useEffect(() => {
    if (isOpen) {
      const evt = new CustomEvent("MouseOverPopoverOpened");
      window.dispatchEvent(evt);
    }
  }, [isOpen]);
  return (
    <>
      {isOpen && hideTrigger ? null : (
        <>
          {noContainer || hasMuiComponent.current ? (
            <>{trigger}</>
          ) : (
            <Box
              component={component || undefined}
              sx={triggerSx}
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
        </>
      )}
      {isOpen ? (
        <InDialog
          maxWidth={maxWidth}
          open={isOpen}
          onClose={close}
          sx={{
            "& .Dialog-container": {
              "& > *:first-child": {
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
          <DialogContent ref={ref}>{content}</DialogContent>
          {dialogActions === false ? null : (
            <DialogActions>
              {dialogActions && dialogActions !== true ? (
                dialogActions
              ) : (
                <Button onClick={() => close()}>Закрыть</Button>
              )}
            </DialogActions>
          )}
        </InDialog>
      ) : null}
    </>
  );
});

export default BaseDialog;
