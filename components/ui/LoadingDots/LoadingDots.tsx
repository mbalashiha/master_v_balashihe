import { ComponentProps, HTMLAttributes } from "react";
import cn from "classnames";
type Props = React.HTMLAttributes<HTMLSpanElement>;
const LoadingDots: React.FC<Props> = ({ className, ...props }) => {
  return (
    <span {...props} className={cn(className)}>
      <span />
      <span />
      <span />
    </span>
  );
};

export default LoadingDots;
