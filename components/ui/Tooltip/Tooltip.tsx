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
    if (title.length > 22) {
      let prevIndex = 0;
      let newTitle: string = "";
      do {
        const nextIndex = title.indexOf(" ", prevIndex + 20);
        if (nextIndex >= 0) {
          newTitle += title.substring(prevIndex, nextIndex + 1) + "\n";
          prevIndex = nextIndex + 1;
        } else {
          newTitle += title.substring(prevIndex);
          prevIndex = -1;
          break;
        }
      } while (prevIndex >= 0);
      title = newTitle.replaceAll(". ", ". \n");
    }
    return (
      <StyledTooltip
        data-tooltip={placement || "down" + (delay ? delay.toString() : "")}
        aria-label={title as string}
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
