import { FC } from "react";
import React, { useContext } from "react";
import { Navbar, NavBreadcrumbs } from "@components/site/Navigation";
import { ThemeProvider, Container, Box, Stack } from "@mui/material";
import Head from "next/head";
import RootLayout from "./RootLayout";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const SearchPageLayout: FC<Props> = ({ children }: Props) => {
  // const breadcrumbs: Array<{ name: string; url: string }> | undefined = (
  //   children as any
  // )?.props?.breadcrumbs;
  return (
    <>
      <RootLayout>
        <Box component="main" pb="24rem">
          {children}
        </Box>
      </RootLayout>
    </>
  );
};
export default SearchPageLayout;
