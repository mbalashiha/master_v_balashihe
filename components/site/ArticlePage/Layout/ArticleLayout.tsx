import { FC } from "react";
// import Header from "@components/shared/NavigationMenu";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Grid, Box, Container, styled, Paper } from "@mui/material";
import { Layout } from "@components/site";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const ArticleLayout: FC<Props> = ({ children }: Props) => {
  return (
    <Layout>
      <Box sx={{ }}>
        <Container
          maxWidth={false}
          sx={{ maxWidth: "1900px", px: { xs: 1, md: 2, lg: 3, xl: 1 } }}
        >
          {children}
        </Container>
      </Box>
    </Layout>
  );
};
export default ArticleLayout;
