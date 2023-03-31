import { styled, Box, ClickAwayListener } from "@mui/material";
import React from "react";
import StyledTip from "./StyledTip";

type Props = {
  children: React.ReactNode | React.ReactNode[];
  placement?: "up" | "down" | "left" | "right";
  message: string;
};
const AlertPoper = ({ children: trigger, placement, message }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const closePopover = React.useCallback(() => {
    setIsOpen(false);
  }, []);
  trigger = React.Children.map(trigger, (element: any) => {
    if (React.isValidElement(element)) {
      const elementOnClick =
        typeof (element.props as any).onClick === "function"
          ? (element.props as any).onClick
          : (event: any) => {};
      const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        elementOnClick(event);
        setIsOpen(true);
      };
      return React.cloneElement(element, {
        onClick,
      } as any);
    } else {
      return element;
    }
  }) as any;
  return (
    <>
      {isOpen ? (
        <StyledTip data-alert={placement || "down"} aria-label={message}>
          {trigger}
        </StyledTip>
      ) : (
        <>{trigger}</>
      )}
    </>
  );
};
export default AlertPoper;
