import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import cn from "classnames";
import { Check } from "@components/icons";
import invert from "invert-color";
import { grey, blueGrey } from "@mui/material/colors";
import { styled, IconButton } from "@mui/material";
import { isDark } from "@lib/color";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  label?: string;
  color?: string;
  variant?: "size" | "color" | string;
  active?: boolean;
}

const StyledCheck = Check;

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
          <StyledCheck />
        </span>
      )}
    </button>
  );
};
export default Swatch;
