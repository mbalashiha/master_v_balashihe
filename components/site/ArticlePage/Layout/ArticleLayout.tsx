import { FC } from "react";
// import Header from "@components/shared/NavigationMenu";
import React from "react";
import { Grid, Box, Container, styled, Paper } from "@mui/material";
import { Layout } from "@components/site";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const ArticleLayout: FC<Props> = ({ children }: Props) => {
  return <Layout>{children}</Layout>;
};
export default ArticleLayout;
