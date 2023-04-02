import { styled, Box, ClickAwayListener } from "@mui/material";
import React from "react";
import StyledHtmlTooltip from "./StyledHtmlTooltip";

type Props = {
  children: React.ReactNode | React.ReactNode[];
  placement?: "up" | "down" | "left" | "right";
  delay?: 100 | 500 | 1000;
  tooltip: string | React.ReactNode | React.ReactNode[];
  inline?: boolean;
};
const HtmlTooltip = ({
  children: trigger,
  placement,
  tooltip,
  inline,
  delay,
}: Props) => {
  return (
    <StyledHtmlTooltip
      data-tooltip={placement || "down" + (delay ? delay.toString() : "")}
      className={(inline && "inline") || ""}
    >
      {trigger}
      <strong>{tooltip}</strong>
    </StyledHtmlTooltip>
  );
};
export default HtmlTooltip;
