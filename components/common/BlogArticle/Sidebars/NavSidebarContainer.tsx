import { Box, Typography, Paper, Grid, Stack, Button } from "@mui/material";
import { StyledHeader } from "@components/common/Sidebar/StyledHeader";
import React from "react";

export interface NavSidebarContainerProps
  extends React.ComponentProps<typeof Box> {
  title: string;
  ariaLabel?: string;
  children: React.ReactNode | React.ReactNode[];
}
export default function NavSidebarContainer({
  title,
  children,
  ariaLabel,
  sx,
  ...rest
}: NavSidebarContainerProps) {
  return (
    <Box
      width="100%"
      sx={{
        float: "left",
        maxWidth: "382px",
        ...sx,
      }}
      aria-label={ariaLabel || "Навигация по публикациям"}
      {...rest}
    >
      {title && <StyledHeader>{title}</StyledHeader>}
      {children}
    </Box>
  );
}
