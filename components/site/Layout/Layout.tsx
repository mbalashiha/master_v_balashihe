import { FC } from "react";
import React from "react";
import { Navbar, NavBreadcrumbs } from "@components/site/Navigation";
import s from "@components/site/Layout/DiscountButton.module.scss";
import DiscountIcon from "@public/icons/badge-discount.svg";
import {
  Grid,
  ThemeProvider,
  Container,
  Box,
  Stack,
  Button,
} from "@mui/material";
import { BottomContactsWithMap } from "@components/site/LandingPage/BottomContactsWithMap";
import { Search } from "@components/site";
import RootLayout from "./RootLayout";
import ContactDialog from "../contacts/ContactDialog";

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
        <Box component="main" pb="26rem">
          {children}
          <BottomContactsWithMap />
        </Box>
        <ContactDialog hideTrigger>
          <Button
            startIcon={<DiscountIcon />}
            sx={{
              zIndex: 2,
              position: "fixed",
              bottom: 0,
              left: "4px",
              border: "none",
              color: "white",
              background: (theme) => theme.palette.primary.main,
              pl: "14px",
              pt: "14px",
              pb: "10px",
              borderRadius: "20px 20px 0 0",
              "& svg": {
                width: "40px",
                height: "40px",
                mr: "2px",
              },
            }}
            className={s.button}
          >
            Получить скидку
            <span className={s.buttonFlare}></span>
          </Button>
        </ContactDialog>
      </RootLayout>
    </>
  );
};
export default Layout;
