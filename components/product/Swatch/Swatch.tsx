import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import cn from "classnames";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  label?: string;
  color?: string;
  variant?: "size" | "color" | string;
  active?: boolean;
}


const Swatch: FC<Props> = ({
  color,
  label,
  active,
  variant,
  size = "lg",
  ...rest
}: Props) => {
  color = (color && color?.toLowerCase()) || "";
  label = (label && label?.toLowerCase()) || "";
  variant = (variant && variant.toLowerCase()) || "";
  const rootClassName = cn();
  return (
    <button
      style={color ? { backgroundColor: color } : {}}
      className={rootClassName}
      {...rest}
    >
      {color && color === label ? null : label}
      {active && (
        <span>
        </span>
      )}
    </button>
  );
};
export default Swatch;
