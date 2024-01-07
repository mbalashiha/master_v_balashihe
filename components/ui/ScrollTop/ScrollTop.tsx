import * as React from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

type Props = React.ComponentProps<typeof Box>;

export function ScrollTop({ sx, children, ...props }: Props) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ zIndex: 2, position: "fixed", bottom: 16, right: 16, ...sx }}
        {...props}
      >
        {children}
      </Box>
    </Fade>
  );
}
