import { FC } from "react";
import React, { useContext } from "react";
import { Container, styled } from "@mui/material";
import { Box } from "@mui/material";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { theme as getMuiTheme } from "@components/management/Layout/theme";
import { useThemePalette } from "@components/ui";
import { ThemeProvider } from "@mui/material";
import { ManagementApiProvider } from "@framework/management";
import { ManagementLayoutProvider } from "@framework/management/utils/providers";
import ManagementAppBar from "./ManagementAppBar";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const ManagementLayout: FC<Props> = ({ children }: Props) => {
  // const breadcrumbs: Array<{ name: string; url: string }> | undefined = (
  //   children as any
  // )?.props?.breadcrumbs;
  const themePaletteCtx = useThemePalette(getMuiTheme);
  const { theme } = themePaletteCtx;
  return (
    <>
      <Head>
        <title>Панель управления сайтом CMS</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ManagementApiProvider>
          <ManagementLayoutProvider>
            <ManagementAppBar />
            {children}
          </ManagementLayoutProvider>
        </ManagementApiProvider>
      </ThemeProvider>
    </>
  );
};
export default ManagementLayout;
