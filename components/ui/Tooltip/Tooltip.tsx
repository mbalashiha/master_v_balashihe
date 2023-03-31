import { styled, Box, ClickAwayListener } from "@mui/material";
import React from "react";
import StyledTooltip from "./StyledTooltip";

type Props = {
  children: React.ReactNode | React.ReactNode[];
  placement?: "up" | "down" | "left" | "right";
  title: string;
};
const Tooltip = ({ children: trigger, placement, title }: Props) => {
  return (
    <StyledTooltip data-tooltip={placement || "down"} aria-label={title}>
      {trigger}
    </StyledTooltip>
  );
};
export default Tooltip;
