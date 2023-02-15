import * as React from "react";
import { Box, Popover, Typography } from "@mui/material";

type PopoverProps = React.ComponentProps<typeof Popover>;
interface Props extends Omit<PopoverProps, "open"> {
  popoverText: React.ReactNode | React.ReactNode[];
}
export default function MouseOverPopover({
  children,
  popoverText,
  sx,
  ...rest
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Box
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {children}
      </Box>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
          ...sx,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        {...rest}
      >
        <Typography
          sx={{
            p: 1,
            backgroundColor: "rgb(18, 18, 18)",
            color: "rgb(255, 255, 255)",
          }}
        >
          {popoverText}
        </Typography>
      </Popover>
    </div>
  );
}
