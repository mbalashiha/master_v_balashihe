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
  title: inTitle,
  inline,
  delay,
}: Props) => {
  const title = React.useMemo(() => {
    let title = inTitle;
    if (inTitle && typeof inTitle === "string") {
      if (inTitle.length >= 27) {
        let title = inTitle;
        let prevIndex = 0;
        let newTitle: string = "";
        do {
          const nextIndex = title.indexOf(" ", prevIndex + 20);
          let addingSubstring = "";
          if (nextIndex >= 0) {
            addingSubstring = title.substring(prevIndex, nextIndex + 1) + "\n";
            prevIndex = nextIndex + 1;
          } else {
            addingSubstring = title.substring(prevIndex);
            prevIndex = -1;
          }
          newTitle += addingSubstring.replace(/[^\s]{27}/gim, (matched) => {
            return matched + "-\n";
          });
        } while (prevIndex >= 0);
        title = newTitle
          .replaceAll(". ", ". \n")
          .replace(/[\r\n]\s*[\r\n]/gim, "\n")
          .trim();
        return title;
      }
    }
    return title;
  }, [inTitle]);
  if (title && typeof title === "string") {
    return (
      <StyledTooltip
        data-tooltip={placement || "down" + (delay ? delay.toString() : "")}
        aria-label={title as string}
        role="contentinfo"
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
