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
      <Container sx={{ pt: "160px", px: { xl: 0 } }} maxWidth={"xl"}>
        {children}
      </Container>
    </Layout>
  );
};
export default ArticleLayout;
