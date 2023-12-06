import { Container } from "@mui/material";
import React from "react";
type ContainerProps = React.ComponentProps<typeof Container>;
interface Props extends ContainerProps {
  children: React.ReactNode | React.ReactNode[];
  sx?: ContainerProps["sx"];
  background?: React.ReactNode | React.ReactNode[];
  FullWidthProps?: ContainerProps;
}
export default function DarkContainer({
  children,
  sx,
  background,
  FullWidthProps,
  ...rest
}: Props) {
  return (
    <Container
      maxWidth={false}
      {...FullWidthProps}
      sx={{
        "&&": {
          px: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 },
          fontFamily: `var(--landing-font-family)`,
        },
        position: "relative",
        ...FullWidthProps?.sx,
      }}
    >
      {background}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          color: "white",
          "& p": { my: 0 },
          pt: "52px",
          pb: "52px",
          ...sx,
        }}
        {...rest}
      >
        {children}
      </Container>
    </Container>
  );
}
