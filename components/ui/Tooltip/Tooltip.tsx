import { styled, Box, ClickAwayListener } from "@mui/material";
import React from "react";
import StyledTooltip from "./StyledTooltip";

type Props = {
  children: React.ReactNode | React.ReactNode[];
  placement?: "up" | "down" | "left" | "right";
  title: string;
  inline?: boolean;
};
const Tooltip = ({ children: trigger, placement, title, inline }: Props) => {
  return (
    <StyledTooltip
      data-tooltip={placement || "down"}
      aria-label={title}
      className={(inline && "inline") || ""}
    >
      {trigger}
    </StyledTooltip>
  );
};
export default Tooltip;
