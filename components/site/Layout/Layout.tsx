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
        <Container maxWidth="xl" sx={{ mt: 1.3 }}>
          <Grid container spacing={{ xs: 1, xl: 3 }}>
            <Grid item xs={12} md={6} lg={7}></Grid>
            <Grid item xs={12} md={6} lg={5}>
              <Search />
            </Grid>
          </Grid>
        </Container>
        <Box component="main" pb="24rem" mt="4rem">
          {children}
          <BottomContactsWithMap />
        </Box>
      </RootLayout>
    </>
  );
};
export default Layout;
