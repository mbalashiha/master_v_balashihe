/* eslint-disable react/display-name */
import MuiPopper from "@mui/material/Popper";
import {
  Button as MuiButton,
  Card,
  Grid,
  Paper,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  AppBar,
  Toolbar,
  Box,
  ButtonGroup,
  ClickAwayListener,
} from "@mui/material";
import {
  default as MuiPopover,
  PopoverProps,
  popoverClasses,
} from "@mui/material/Popover";
import {
  default as React,
  FC,
  ReactNode,
  ComponentProps,
  CSSProperties,
} from "react";
import { styled, Container } from "@components/ui";
import deepEqual from "deep-equal";

interface StyledPopperReffedProps
  extends React.ComponentProps<typeof MuiPopper> {
  popRef: React.MutableRefObject<HTMLDivElement | null>;
  arrowStyle: any;
  popperBodyStyle: any;
  children: React.ReactNode | React.ReactNode[];
}
const StyledPopperReffed = styled(
  ({
    children,
    placement,
    arrowStyle,
    popRef,
    ...rest
  }: StyledPopperReffedProps) => {
    return (
      <MuiPopper
        onClick={(event) => event.stopPropagation()}
        placement={placement || "bottom"}
        {...rest}
        ref={popRef}
      >
        <div className="arrow">&nbsp;</div>
        <div className="popperBody">{children}</div>
      </MuiPopper>
    );
  }
)<StyledPopperReffedProps>(
  ({ theme, placement, popperBodyStyle, arrowStyle }) => {
    return {
      "&&&&": {
        zIndex:
          popperBodyStyle && arrowStyle ? "9999 !important" : "-2 !important",
        opacity:
          popperBodyStyle && arrowStyle ? "1 !important" : "0 !important",
        background: "transparent",
        color: "transparent",
        "& .arrow": {
          position: "absolute",
          width: 0,
          height: 0,
          background: "transparent",
          color: "transparent",
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderBottom: "14px solid #fff",
          top: 0,
          left: "50%",
          ...arrowStyle,
        },
        "& .popperBody": {
          color: "#2d2f43",
          background: "#fff",
          overflow: "visible",
          padding: "4px 8px",
          minWidth: 290,
          minHeight: 80,
          // marginTop: "14px",
          fontFamily: "Helvetica",
          fontSize: "15px",
          fontWeight: 500,
          border: "none",
          outline: "none",
          borderRadius: "5px",
          boxShadow:
            "0 0.4rem 2.0rem rgb(0 0 0 / 18%), 0 1.0rem 1.33rem rgb(0 0 0 / 10%), 0 -2.4rem 1.33rem rgb(0 0 0 / 7%)",
          width: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          ...popperBodyStyle,
        },
      },
    };
  }
);
interface StyledPopperProps extends React.ComponentProps<typeof MuiPopper> {
  children: React.ReactNode | React.ReactNode[];
}
const StyledPopper = ({
  children,
  anchorEl,
  placement: inPlacement,
  ...rest
}: StyledPopperProps) => {
  const [placement, setPlacement] = React.useState<
    StyledPopperReffedProps["placement"]
  >(inPlacement || "bottom");
  const popperRef = React.useRef<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);
  const [arrowStyle, setArrowStyle] = React.useState<any>(undefined);
  const [popperBodyStyle, setPopperBodyStyle] = React.useState<any>(undefined);
  const setStyles = React.useCallback(
    (event: any, inPopperElement?: any) => {
      if (
        !inPopperElement ||
        typeof inPopperElement.querySelector !== "function"
      ) {
        inPopperElement = popperElement;
      }
      if (!inPopperElement || !anchorEl) {
        if (arrowStyle) {
          setArrowStyle(undefined);
        }
        if (popperBodyStyle) {
          setPopperBodyStyle(undefined);
        }
        return;
      }
      const popperBody =
        (inPopperElement as HTMLDivElement).querySelector(".popperBody") ||
        inPopperElement;
      const anchorCoords = (anchorEl as HTMLDivElement).getBoundingClientRect();
      const popperCoords = (
        popperBody as HTMLDivElement
      ).getBoundingClientRect();
      const newArrowStyle = {
        ...arrowStyle,
      };
      const newPopperBodyStyle = {
        ...popperBodyStyle,
      };
      if (
        popperCoords.top < anchorCoords.top - popperCoords.height * 0.55 ||
        anchorCoords.top + anchorCoords.height / 3 > popperCoords.bottom
      ) {
        if (placement !== "top") {
          setPlacement("top");
        }
        newArrowStyle.bottom = "auto";
        newArrowStyle.top = popperCoords.height + "px";
        newArrowStyle.right = "auto";
        newArrowStyle.left =
          Math.abs(
            anchorCoords.left + anchorCoords.width / 2 - popperCoords.left
          ) -
          12 +
          "px";
        newArrowStyle.transform = "rotate(180deg)";
        newPopperBodyStyle.margin = "0 0 12px 0";
      } else if (
        popperCoords.top > anchorCoords.bottom + popperCoords.height * 0.55 ||
        anchorCoords.bottom - anchorCoords.height / 3 < popperCoords.top
      ) {
        if (placement !== "bottom") {
          setPlacement("bottom");
        }
        newArrowStyle.bottom = "auto";
        newArrowStyle.top = 0 + "px";
        newArrowStyle.right = "auto";
        newArrowStyle.left =
          Math.abs(
            anchorCoords.left + anchorCoords.width / 2 - popperCoords.left
          ) -
          12 +
          "px";
        newArrowStyle.transform = "rotate(0deg)";
        newPopperBodyStyle.margin = "12px 0 0 0";
      } else if (
        anchorCoords.left + anchorCoords.width / 4 >=
        popperCoords.right
      ) {
        if (placement !== "left") {
          setPlacement("left");
        }
        newArrowStyle.bottom = "auto";
        newArrowStyle.top =
          Math.abs(
            anchorCoords.top + anchorCoords.height / 2 - popperCoords.top - 7
          ) + "px";
        newArrowStyle.right = "auto";
        newArrowStyle.left = popperCoords.width - 6 + "px";
        newArrowStyle.transform = "rotate(90deg)";
        newPopperBodyStyle.margin = "0 12px 0 0";
      } else if (
        anchorCoords.right - anchorCoords.width / 4 <=
        popperCoords.left
      ) {
        if (placement !== "right") {
          setPlacement("right");
        }
        newArrowStyle.bottom = "auto";
        newArrowStyle.right = "auto";
        newArrowStyle.top =
          anchorCoords.top +
          anchorCoords.height / 2 -
          popperCoords.top -
          7 +
          "px";
        newArrowStyle.left = -6 + "px";
        newArrowStyle.transform = "rotate(-90deg)";
        newPopperBodyStyle.margin = "0 0 0 12px";
      }
      if (!deepEqual(newArrowStyle, arrowStyle)) {
        setArrowStyle(newArrowStyle);
      }
      if (!deepEqual(newPopperBodyStyle, popperBodyStyle)) {
        setPopperBodyStyle(newPopperBodyStyle);
      }
    },
    [placement, popperElement, anchorEl, arrowStyle, popperBodyStyle]
  );
  React.useEffect(() => {
    process.nextTick(() => {
      if (
        anchorEl &&
        popperRef.current &&
        popperRef.current !== popperElement
      ) {
        setStyles(null, popperRef.current);
        setPopperElement(popperRef.current);
      }
    });
    window.addEventListener("resize", setStyles);
    return () => window.removeEventListener("resize", setStyles);
  }, [anchorEl, popperElement, setStyles]);
  return (
    <StyledPopperReffed
      arrowStyle={arrowStyle}
      popperBodyStyle={popperBodyStyle}
      popRef={popperRef}
      {...rest}
      anchorEl={anchorEl}
      placement={placement}
    >
      {children}
    </StyledPopperReffed>
  );
};
interface MyPopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: (event: any) => void;
  anchorEl: HTMLButtonElement | null;
}
type PopoverButtonProps = ComponentProps<typeof MuiButton> & {
  confirm?: boolean;
};
export const PopoverButton = styled(MuiButton)<PopoverButtonProps>(
  ({ theme, confirm: isConfirm, ...props }) => ({
    "&&&&": {
      fontFamily: "Verdana",
      fontWeight: 500,
      fontSize: "10pt",
      color: "#2d2f43",
      margin: 0,
      marginRight: "8px",
      "&:last-of-type": {
        marginRight: 0,
      },
      padding: "0.25em 3em",
      outline: "none",
      borderRadius: "0.38em",
      minWidth: "102px",
      background: isConfirm ? "#ff7676" : "#F5F5F5",
      border: "1px solid gray",
      borderColor: isConfirm ? "#ff7676" : "#B1B3CF",
      "&:hover": {
        textShadow: "none",
        background: isConfirm ? theme.palette.primary.main : "black",
        color: "white",
      },
    },
  })
);
export const ConfirmMessage = styled("div")(({ theme, ...props }) => ({
  fontFamily: "Verdana",
  fontWeight: 600,
  letterSpacing: theme.typography.button.letterSpacing,
  color: "#000000",
  fontSize: "11pt",
  marginBottom: "7px",
}));

const PopoverDialogChild = ({
  message,
  onConfirm,
  closePopover,
}: {
  message: Props["message"];
  onConfirm: Props["onConfirm"];
  closePopover: (event: any) => void;
}) => {
  const onCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.stopPropagation();
    }
    closePopover(event);
  };
  return (
    <>
      <ConfirmMessage>{message}</ConfirmMessage>
      <div>
        <PopoverButton confirm onClick={onConfirm}>
          Да
        </PopoverButton>
        <PopoverButton onClick={onCancel}>Нет</PopoverButton>
      </div>
    </>
  );
};
interface Props {
  trigger: React.ReactElement;
  message: string | React.ReactElement | React.ReactElement[];
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
  placement?: StyledPopperReffedProps["placement"];
}

const NEW_CONFIRM_POPOVER_EVENT_NAME = "NEW_CONFIRM_POPOVER_EVENT";
const newConfirmPopoverEvent = new Event(NEW_CONFIRM_POPOVER_EVENT_NAME);

const ConfirmPopover = ({
  trigger,
  onConfirm,
  placement,
  message,
  ...rest
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openPopover = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      window.dispatchEvent(newConfirmPopoverEvent);
      setAnchorEl(event.currentTarget);
      event.stopPropagation();
      event.preventDefault();
    },
    []
  );
  const closePopover = React.useCallback(() => {
    setAnchorEl(null);
  }, []);
  const isOpened = Boolean(anchorEl);
  trigger = React.cloneElement(trigger, {
    onClick: openPopover,
  });
  const confirmAndClose = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    closePopover();
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    return onConfirm(event!);
  };
  React.useEffect(() => {
    if (anchorEl) {
      window.addEventListener(NEW_CONFIRM_POPOVER_EVENT_NAME, closePopover);
      window.addEventListener("click", closePopover);
    } else {
      window.removeEventListener(NEW_CONFIRM_POPOVER_EVENT_NAME, closePopover);
      window.removeEventListener("click", closePopover);
    }
    return () => {
      window.removeEventListener(NEW_CONFIRM_POPOVER_EVENT_NAME, closePopover);
      window.removeEventListener("click", closePopover);
    };
  }, [anchorEl, closePopover]);
  return (
    <>
      {trigger}
      {isOpened && (
        <StyledPopper open={isOpened} anchorEl={anchorEl} placement={placement}>
          <PopoverDialogChild
            closePopover={closePopover}
            message={message}
            onConfirm={confirmAndClose}
          />
        </StyledPopper>
      )}
    </>
  );
};

export default ConfirmPopover;
