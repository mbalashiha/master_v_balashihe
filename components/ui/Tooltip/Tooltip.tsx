import React from "react";
import HtmlTooltip from "../HtmlTooltip";
import StyledTooltip from "./StyledTooltip";
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
  title: React.ReactNode | React.ReactNode[];
  inline?: boolean;
};
const Tooltip = ({
  children: trigger,
  placement,
  title: inTitle,
  inline,
  delay,
  className,
  ...rest
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
        {...rest}
        data-tooltip={placement || "down" + (delay ? delay.toString() : "")}
        aria-label={title as string}
        role="contentinfo"
        className={cn(className, { inline: inline })}
      >
        {trigger}
      </StyledTooltip>
    );
  } else {
    return (
      <HtmlTooltip
        {...rest}
        placement={placement}
        tooltip={title}
        inline={inline}
        delay={delay}
        className={cn(className)}
      >
        {trigger}
      </HtmlTooltip>
    );
  }
};
export default Tooltip;
