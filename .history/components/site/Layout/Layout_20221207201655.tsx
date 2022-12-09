import { FC } from "react";
// import Header from "@components/shared/NavigationMenu";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Navbar, Footer } from "@components/common";
import { Container, styled } from "@mui/material";
import { useUI, Sidebar } from "@components/ui";
import HomeIcon from "@mui/icons-material/Home";
import NavBreadcrumbs from "@components/common/NavBreadcrumbs/NavBreadcrumbs";
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
      <Container>
        <Navbar />
        {/* {(router.asPath === "/" && <IndexHeader />) || (
            <Box sx={{ width: "100%", height: "6rem" }}></Box>
          )} */}
        <NavBreadcrumbs breadcrumbs={breadcrumbs}></NavBreadcrumbs>
        <main>{children}</main>
        <Footer />
      </Container>
    </>
  );
};
export default Layout;
