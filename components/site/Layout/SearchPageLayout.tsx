import { FC } from "react";
import React, { useContext } from "react";
import { ThemeProvider, Container, Box, Stack } from "@mui/material";
import Head from "next/head";
import SiteLayout from "./SiteLayout";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const SearchPageLayout: FC<Props> = ({ children }: Props) => {
  // const breadcrumbs: Array<{ name: string; url: string }> | undefined = (
  //   children as any
  // )?.props?.breadcrumbs;
  return (
    <>
      <SiteLayout>
        <Box component="main" pb="24rem">
          {children}
        </Box>
      </SiteLayout>
    </>
  );
};
export default SearchPageLayout;
