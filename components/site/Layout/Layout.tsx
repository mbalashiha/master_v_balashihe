import { FC } from "react";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Footer from "@components/site/Footer";

import { HugeContainer } from "@components/ui";
import { Navbar, NavBreadcrumbs } from "@components/site/Navigation";
import { Grid, ThemeProvider, Container, Box, Stack } from "@mui/material";
import { BottomContactsWithMap } from "@components/site/LandingPage/BottomContactsWithMap";
import { Search } from "@components/site";
import RootLayout from "./RootLayout";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const Layout: FC<Props> = ({ children }: Props) => {
  // const breadcrumbs: Array<{ name: string; url: string }> | undefined = (
  //   children as any
  // )?.props?.breadcrumbs;
  return (
    <>
      <RootLayout>
        <Box component="main" pb="24rem">
          {children}
          <BottomContactsWithMap />
        </Box>
      </RootLayout>
    </>
  );
};
export default Layout;
