import {
  Button,
  Card,
  Grid,
  Paper,
  CardHeader,
  CardContent,
  CardActions,
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
  useCallback,
} from "react";
import { styled, Container } from "@mui/material";
import StyledPopover from "./StyledPopover";

type PopoverButtonProps = React.ComponentProps<typeof Button> & {
  confirm?: boolean;
};
export const PopoverButton = ({
  children,
  sx,
  confirm: isConfirm,
  ...rest
}: PopoverButtonProps) => {
  return (
    <Button
      sx={{
        fontFamily: "Roboto",
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
          background: (theme) =>
            isConfirm ? theme.palette.primary.main : "black",
          color: "white",
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
export const ConfirmMessage = styled("div")(({ theme }) => ({
  fontFamily: "Roboto",
  fontWeight: 600,
  letterSpacing: theme.typography.button.letterSpacing,
  color: "white",
  fontSize: "11pt",
  marginBottom: "7px",
}));

const PopoverDialogChild = ({
  message,
  onConfirm,
  closePopover,
}: {
  message: Props["message"];
  onConfirm: (event: any) => void;
  closePopover: () => void;
}) => {
  const onCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.stopPropagation();
    }
    closePopover();
  };
  return (
    <div className="popoverChild">
      <ConfirmMessage>{message}</ConfirmMessage>
      <div>
        <PopoverButton confirm onClick={(event: any) => onConfirm(event)}>
          Да
        </PopoverButton>
        <PopoverButton onClick={onCancel}>Нет</PopoverButton>
      </div>
    </div>
  );
};
interface Props {
  children: React.ReactElement | React.ReactElement[];
  message: string | React.ReactElement | React.ReactElement[];
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
  placement?: "up" | "down" | "left" | "right";
}

const NEW_CONFIRM_POPOVER_EVENT_NAME = "NEW_CONFIRM_POPOVER_EVENT";

const ConfirmPopover = ({
  children: trigger,
  onConfirm,
  placement,
  message,
  ...rest
}: Props) => {
  if (typeof onConfirm !== "function") {
    throw new Error(
      "No trigger button on-click event handler (used in onConfirm action)."
    );
  }
  message = message || "Подтвердите операцию";
  const [isOpen, setIsOpen] = React.useState(false);
  const closePopover = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleOnConfirm = (event: any) => {
    try {
      closePopover();
      onConfirm(event);
    } catch (e: any) {
      alert(e.stack || e.message || e);
    }
  };
  trigger = React.Children.map(trigger, (element: any) => {
    if (React.isValidElement(element)) {
      const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        setIsOpen(true);
      };
      return React.cloneElement(element, {
        onClick,
      } as any);
    } else {
      return element;
    }
  }) as any;
  React.useEffect(() => {
    if (isOpen) {
      const evt = new CustomEvent(NEW_CONFIRM_POPOVER_EVENT_NAME);
      window.dispatchEvent(evt);
      window.addEventListener(NEW_CONFIRM_POPOVER_EVENT_NAME, closePopover);
      // window.addEventListener("click", closePopover);
    } else {
      window.removeEventListener(NEW_CONFIRM_POPOVER_EVENT_NAME, closePopover);
      // window.removeEventListener("click", closePopover);
    }
    return () => {
      window.removeEventListener(NEW_CONFIRM_POPOVER_EVENT_NAME, closePopover);
      // window.removeEventListener("click", closePopover);
    };
  }, [isOpen, closePopover]);
  return (
    <>
      {isOpen ? (
        <ClickAwayListener onClickAway={closePopover}>
          <StyledPopover data-popover={placement || "down"}>
            {trigger}
            <PopoverDialogChild
              closePopover={closePopover}
              message={message}
              onConfirm={handleOnConfirm}
            />
          </StyledPopover>
        </ClickAwayListener>
      ) : (
        <>{trigger}</>
      )}
    </>
  );
};

export default ConfirmPopover;
