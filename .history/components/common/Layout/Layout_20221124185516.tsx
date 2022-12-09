import { FC } from "react";
// import Header from "@components/shared/NavigationMenu";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import IndexHeader from "@components/home_landing/IndexHeader";
import { Navbar, Footer } from "@components/common";
import { Container, styled } from "@mui/material";
import { CartSidebar } from "@/components/cart";
import { useUI, Sidebar } from "@components/ui";
import { CommerceApiProvider } from "@framework/commerce/use-api-provider";
import { CommerceShopProvider } from "@framework/commerce/use-shop-provider";
import HomeIcon from "@mui/icons-material/Home";
import NavBreadcrumbs from "@components/common/NavBreadcrumbs/NavBreadcrumbs";
import { Box } from "@mui/material";
import { Product } from "@common/types";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  product?: Product;
}
const Layout = ({ children, product }: Props) => {
  const breadcrumbs: Array<{ name: string; url: string }> | undefined = (
    children as any
  )?.props?.breadcrumbs;
  const router = useRouter();
  const {
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    isDialogOpen,
    openDialog,
    closeDialog,
    dialogType,
  } = useUI();
  return (
    <>
      <CommerceShopProvider>
        <Container>
          <Navbar />
          {(router.asPath === "/" && <IndexHeader />) || (
            <Box sx={{ width: "100%", height: "6rem" }}></Box>
          )}
          <NavBreadcrumbs breadcrumbs={breadcrumbs}></NavBreadcrumbs>
          <main>{children}</main>
          <Sidebar onClose={closeSidebar} isOpen={isSidebarOpen}>
            <CartSidebar />
          </Sidebar>
          <Footer />
        </Container>
      </CommerceShopProvider>
    </>
  );
};
export default Layout;
