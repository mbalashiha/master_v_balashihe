import { FC } from "react";
// import Header from "@components/shared/NavigationMenu";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Grid, Box, Container, styled, Paper } from "@mui/material";
import { Layout } from "@components/site";
import { HugeContainer } from "@components/ui";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const CardsLayout: FC<Props> = ({ children }: Props) => {
  return <Layout>{children}</Layout>;
};
export default CardsLayout;
