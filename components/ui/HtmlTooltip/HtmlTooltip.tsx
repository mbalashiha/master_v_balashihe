import { styled, Box, ClickAwayListener } from "@mui/material";
import React from "react";
import StyledHtmlTooltip from "./StyledHtmlTooltip";
import cn from "classnames";

type Props = Omit<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >,
  "title"
> & {
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
  className,
  ...rest
}: Props) => {
  return (
    <StyledHtmlTooltip
      {...rest}
      data-tooltip={placement || "down" + (delay ? delay.toString() : "")}
      className={cn(className, { inline: inline })}
    >
      {trigger}
      <strong>{tooltip}</strong>
    </StyledHtmlTooltip>
  );
};
export default HtmlTooltip;
