import { FC } from "react";
// import Header from "@components/shared/NavigationMenu";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Grid, Box, Container, styled, Paper } from "@mui/material";
import { Layout } from "@components/site";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const CardsLayout: FC<Props> = ({ children }: Props) => {
  return (
    <Layout>
      <Container sx={{ mt: "140px", px: { xs: 1, xl: 0 } }} maxWidth={"xl"}>
        {children}
      </Container>
    </Layout>
  );
};
export default CardsLayout;
