import { Container, Grid, Card, Paper, Box } from "@mui/material";
import React from "react";
const LightGreyText = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return <Box color={"grey.400"} component="span">{children}</Box>;
};
export default function Advert1() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        "& h1": {
          textTransform: "uppercase",
          fontSize: "54pt",
        },
      }}
    >
      <h1>
        Мастер
        <LightGreyText>-</LightGreyText>в<LightGreyText>-</LightGreyText>
        Балашихе<LightGreyText>.рф</LightGreyText>
      </h1>
    </Container>
  );
}
