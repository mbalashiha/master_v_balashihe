import { FC } from "react";
import React, { useContext } from "react";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { theme as getMuiTheme } from "@components/management/Layout/theme";
import { useThemePalette } from "@components/ui";
import { ThemeProvider } from "@mui/material";
import { ManagementApiProvider } from "@framework/management";
import { LoginProvider } from "@components/management/LoginLayout";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const LoginLayout: FC<Props> = ({ children }: Props) => {
  const themePaletteCtx = useThemePalette(getMuiTheme);
  const { theme } = themePaletteCtx;
  return (
    <>
    <Head>
      <title>Вход в панель управления CMS</title>
    </Head>
      <ManagementApiProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <LoginProvider>{children}</LoginProvider>
        </ThemeProvider>
      </ManagementApiProvider>
    </>
  );
};
export default LoginLayout;
