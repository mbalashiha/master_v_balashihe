import { ComponentProps, HTMLAttributes } from "react";
import cn from "classnames";
import s from "./LoadingDots.module.scss";
type Props = React.HTMLAttributes<HTMLSpanElement>;
const LoadingDots: React.FC<Props> = ({ className, ...props }) => {
  return (
    <span {...props} className={cn(s.root, className)}>
      <span />
      <span />
      <span />
    </span>
  );
};

export default LoadingDots;
