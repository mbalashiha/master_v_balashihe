import { FC } from "react";
// import Header from "@components/shared/NavigationMenu";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Footer from "../Footer";
import { Navbar, NavBreadcrumbs } from "../Navigation";
import { Container, styled } from "@mui/material";
import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const Layout: FC<Props> = ({ children }: Props) => {
  const breadcrumbs: Array<{ name: string; url: string }> | undefined = (
    children as any
  )?.props?.breadcrumbs;
  return (
    <>
      <Navbar />
      {/* {(router.asPath === "/" && <IndexHeader />) || (
            <Box sx={{ width: "100%", height: "6rem" }}></Box>
          )} */}
      <NavBreadcrumbs breadcrumbs={breadcrumbs}></NavBreadcrumbs>
      <Box component="main" pb="24rem">
        {children}
      </Box>
      <Footer />
    </>
  );
};
export default Layout;
