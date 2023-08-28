import { Container } from "@mui/material";
import React from "react";
type ContainerProps = React.ComponentProps<typeof Container>;
interface Props {
  children: React.ReactNode | React.ReactNode[];
  sx?: ContainerProps["sx"];
}
export default function DarkContainer({ children, sx }: Props) {
  return (
    <Container
      maxWidth={false}
      sx={{
        position: "relative",
        backgroundColor: "#010101",
        overflow: "hidden",
        py: "55px",
        ...sx,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          "&, & > *, & *": {
            fontFamily: `"Noto Sans", Arial, sans-serif`,
            color: "white",
            "& p": { my: 0 },
          },
        }}
      >
        {children}
      </Container>
    </Container>
  );
}
