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
import { useRouter } from "next/router";
import FloatingActions from "@components/management/FloatingActions";
import QuestionModal from "@components/shared/QuestionModal";
import { Navbar, Footer } from "@components/common";
import { Sidebar } from "@/components/ui";
import { getManagementTheme } from "@components/management";
import { ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import ManagerAppBar from "@components/management/ManagerAppBar";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const Layout: FC<Props> = ({ children }: Props) => {
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
        <Footer />
      </Container>
    </>
  );
};
export default Layout;
