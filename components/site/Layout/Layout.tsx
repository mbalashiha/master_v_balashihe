import { FC } from "react";
import React from "react";
import {
  Grid,
  ThemeProvider,
  Container,
  Box,
  Stack,
  Button,
} from "@mui/material";
import { BottomContactsWithMap } from "@components/site/LandingPage/BottomContactsWithMap";
import SiteLayout from "./SiteLayout";
import GetDiscountButton from "../Footer/GetDiscountButton";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const Layout: FC<Props> = ({ children }: Props) => {
  // const breadcrumbs: Array<{ name: string; url: string }> | undefined = (
  //   children as any
  // )?.props?.breadcrumbs;
  return (
    <>
      <SiteLayout>
        <Box component="main" pb="26rem">
          {children}
          <BottomContactsWithMap />
        </Box>
      </SiteLayout>
    </>
  );
};
export default Layout;
