import MuiPopover from "@mui/material/Popover";
import { ComponentProps } from "react";
type Props = ComponentProps<typeof MuiPopover>;
const Popover = ({ children, ...props }: Props) => {
  return (
    <MuiPopover
      {...props}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
        ...props.anchorOrigin,
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
        ...props.transformOrigin,
      }}
    >
      {children}
    </MuiPopover>
  );
};

export default Popover;
