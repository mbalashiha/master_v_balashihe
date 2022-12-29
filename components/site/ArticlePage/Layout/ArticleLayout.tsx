import { FC } from "react";
// import Header from "@components/shared/NavigationMenu";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Grid, Box, Container, styled } from "@mui/material";
import { Layout } from "@components/site";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const ArticleLayout: FC<Props> = ({ children }: Props) => {
  return (
    <Layout>
      <Container sx={{ pt: "160px" }} maxWidth={"xl"}>
        <Grid container>
          <Grid item xs={12} md={9}>
            {children}
          </Grid>
          <Grid item xs={12} md={3}></Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
export default ArticleLayout;
