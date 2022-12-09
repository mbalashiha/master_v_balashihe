import { FC } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Button,
  AddButton,
  useUI,
  Grid,
  Box,
  Container,
  UIProvider,
  BootstrapDialog,
} from "@components/ui";
import Header from "@components/shared/NavigationMenu";
import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import styles from "@components/layouts/BaseLayout.module.scss";
import { useRouter } from "next/router";
import IndexHeader from "@components/home_landing/IndexHeader";
import FloatingActions from "@components/management/FloatingActions";
import QuestionModal from "@components/shared/QuestionModal";
import { Navbar, Footer } from "@components/common";
import { Sidebar } from "@/components/ui";
import { CartSidebar } from "@/components/cart";
import { getManagementTheme } from "@components/management";
import { ThemeProvider } from "@mui/material";
import { ManagementApiProvider } from "@framework/commerce/management";
import { useAppContext } from "@common/hooks/TheAppContextProvider";
import { useMemo } from "react";
import ManagerAppBar from "@components/management/ManagerAppBar";

const Layout: FC = ({ children }) => {
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
  const { colorMode } = useAppContext();
  const theme = useMemo(() => getManagementTheme(colorMode), [colorMode]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ManagementApiProvider>
          <Container
            sx={{
              position: "relative",
              minHeight: "100vh",
              paddingBottom: "20rem",
            }}
          >
            <ManagerAppBar></ManagerAppBar>
            <Box
              component="main"
              sx={{ padding: { xs: "3.2rem 0.4rem", xl: "3.2rem 1rem" } }}
            >
              {children}
            </Box>
            <Sidebar onClose={closeSidebar} isOpen={isSidebarOpen}>
              <CartSidebar />
            </Sidebar>
            <Footer />
          </Container>
        </ManagementApiProvider>
      </ThemeProvider>
    </>
  );
};
export default Layout;
