import React, { useState } from "react";
import cn from "classnames";
import { styled, Paper, IconButton, Alert } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
interface CloseButtonProps {
  onClick: () => void;
}
const CloseButton = styled((props: CloseButtonProps) => {
  return (
    <IconButton {...props}>
      <CloseRoundedIcon />
    </IconButton>
  );
})(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
}));
interface Props extends React.ComponentProps<typeof Alert> {
  isDefaultShown?: boolean;
  timeout?: number;
  shakingEffect?: boolean;
}
const ClosableAlert = ({
  isDefaultShown = true,
  timeout = 250,
  children,
  onClose,
  shakingEffect,
  ...rest
}: Props) => {
  const [isShown, setIsShown] = React.useState(isDefaultShown);
  const [isLeaving, setIsLeaving] = React.useState(false);
  let timeoutId: NodeJS.Timeout | null = null;
  React.useEffect(() => {
    setIsShown(true);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeout, timeoutId]);
  const closeAlert = (event: React.SyntheticEvent<Element, Event>) => {
    setIsLeaving(true);
    timeoutId = setTimeout(() => {
      setIsLeaving(false);
      setIsShown(false);
      if (typeof onClose === "function") {
        onClose(event);
      }
    }, timeout);
  };

  return (
    <>
      {isShown && (
        <Alert
          role="alert"
          onClose={closeAlert}
          {...rest}
        >
          {children}
        </Alert>
      )}
    </>
  );
};

export default ClosableAlert;
