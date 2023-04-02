import { styled, Box, ClickAwayListener } from "@mui/material";
import React from "react";
import HtmlTooltip from "../HtmlTooltip";
import StyledTooltip from "./StyledTooltip";

type Props = {
  children: React.ReactNode | React.ReactNode[];
  placement?: "up" | "down" | "left" | "right";
  delay?: 100 | 500 | 1000;
  title: string | React.ReactNode | React.ReactNode[];
  inline?: boolean;
};
const Tooltip = ({
  children: trigger,
  placement,
  title,
  inline,
  delay,
}: Props) => {
  if (title && typeof title === "string") {
    return (
      <StyledTooltip
        data-tooltip={placement || "down" + (delay ? delay.toString() : "")}
        aria-label={title}
        className={(inline && "inline") || ""}
      >
        {trigger}
      </StyledTooltip>
    );
  } else {
    return (
      <HtmlTooltip
        placement={placement}
        tooltip={title}
        inline={inline}
        delay={delay}
      >
        {trigger}
      </HtmlTooltip>
    );
  }
};
export default Tooltip;
