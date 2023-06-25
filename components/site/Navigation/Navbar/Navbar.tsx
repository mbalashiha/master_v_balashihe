import { FC, default as React } from "react";
import { useUI } from "@components/ui";
import { Tooltip } from "@components/ui";
import Link from "next/link";
import { grey, blueGrey } from "@mui/material/colors";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import {
  Badge,
  Stack,
  Typography,
  Divider,
  Grid,
  Box,
  List,
  Menu,
  MenuItem,
  MenuList,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import dynamic from "next/dynamic";
import PaletterModeSwitch from "@components/common/paletter/PaletteSwitch";
import { useRouter } from "next/router";
import NavbarLinks from "./NavbarLinks";
import { MainLogo } from "@components/site/MainLogo";
import { PhoneCallIcon, TelegramIcon } from "@components/icons";
import {
  NEXT_PUBLIC_WHATSAPP_LINK,
  NEXT_PUBLIC_CONTACT_PHONE_NUMBER,
  NEXT_PUBLIC_TELEGRAM_LINK,
} from "@framework/const";
import { WhatsappLink } from "@components/site/contacts";

const Navbar: FC = () => {
  // const { pathname } = useRouter();
  // const isIndexPage = pathname === "/";
  // const cartPage = pathname === "/market/cart";
  return (
    <>
      <AppBar
        component={"div"}
        position="static"
        sx={{
          minHeight: "83px",
          "& a": {
            textDecoration: "none",
          },
        }}
      >
        {/* <PaletterModeSwitch sx={{ right: "auto", left: 0 }} /> */}
        <Toolbar
          component="div"
          sx={{
            p: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            flexWrap="wrap"
            sx={{
              width: "100%",
              maxWidth: "1900px",
              overflow: "visible",
            }}
          >
            <MainLogo />
            <NavbarLinks />
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              flexWrap="nowrap"
              sx={{
                color: "#2E2D58",
                fontSize: "30px",
                lineHeight: "30px",
                fontWeight: 700,
                letterSpacing: "0.001rem",
                height: "75px",
                "& a": {
                  display: "flex",
                  direction: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "nowrap",
                  "& > svg": {
                    width: "66x",
                    height: "66px",
                    marginBottom: "-5px",
                    marginRight: "10px",
                  },
                },
              }}
            >
              <WhatsappLink>
                <PhoneCallIcon />
                <Box>{NEXT_PUBLIC_CONTACT_PHONE_NUMBER}</Box>
              </WhatsappLink>
              <Box
                sx={{ ml: 1, "&, & svg": { width: "70px", height: "70px" } }}
              >
                <a
                  href={NEXT_PUBLIC_TELEGRAM_LINK}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Tooltip title="Telegram" placement="left">
                    <TelegramIcon />
                  </Tooltip>
                </a>
              </Box>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
