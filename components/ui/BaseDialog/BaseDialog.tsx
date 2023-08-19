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
// type ButtonProps = React.ComponentProps<typeof Button>;
const getTriggerSx = ({
  color,
  fill,
  opacity,
}: {
  color?: React.CSSProperties["color"];
  fill?: React.CSSProperties["color"];
  opacity?: React.CSSProperties["opacity"];
}): SxProps<Theme> => {
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
      color: (theme) => color || theme.palette.primary.main,
    },
    "& > svg": {
      fill: (theme) => fill || color || theme.palette.primary.main,
    },
    opacity: typeof opacity !== "undefined" ? opacity : 1,
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
  TriggerProps?: {
    color?: React.CSSProperties["color"];
    fill?: React.CSSProperties["color"];
  };
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
    TriggerProps,
    ...rest
  }: BaseDialogProps,
  ref: any
) {
  const [isOpen, setIsOpen] = React.useState(false);
  const shouldHideTrigger = isOpen && hideTrigger;
  const triggerSx = useMemo(
    () =>
      getTriggerSx({
        color: TriggerProps?.color || undefined,
        fill: TriggerProps?.fill || undefined,
        opacity: shouldHideTrigger ? 0 : 1,
      }),
    [TriggerProps?.color, TriggerProps?.fill, shouldHideTrigger]
  );
  const close = () => setIsOpen(false);
  const hasMuiComponent = useRef(false);
  const onClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    (event) => {
      if (event && typeof event.stopPropagation === "function") {
        event.stopPropagation();
      }
      setIsOpen(true);
    },
    []
  );
  const trigger: TriggerButton = useMemo(
    () =>
      React.Children.map(inTrigger, (element: any) => {
        if (React.isValidElement(element)) {
          const newProps: any = {
            onClick,
          };
          const elementProps: any = element.props;
          if (
            elementProps &&
            (React.isValidElement(elementProps.startIcon) ||
              React.isValidElement(elementProps.endIcon) ||
              (elementProps.sx && typeof elementProps.sx === "object"))
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
    [inTrigger, triggerSx, component, onClick]
  );
  React.useEffect(() => {
    if (isOpen) {
      const evt = new CustomEvent("MouseOverPopoverOpened");
      window.dispatchEvent(evt);
    }
  }, [isOpen]);
  return (
    <>
      <>
        {noContainer || hasMuiComponent.current ? (
          <>{trigger}</>
        ) : (
          <Box
            component={component || "div"}
            sx={{ ...triggerSx }}
            onClick={onClick}
          >
            {trigger}
          </Box>
        )}
      </>
      {isOpen ? (
        <InDialog
          maxWidth={maxWidth}
          open={isOpen}
          onClose={close}
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
