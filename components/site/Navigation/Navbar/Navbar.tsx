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
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "none",
  backdropFilter: "saturate(180%) blur(15px)",
  backgroundColor: "rgba(241, 243, 245, 0.75)",
  boxShadow: "0px 4px 10px 0px rgb(48 59 68 / 20%)",
  minHeight: "83px",
  "& a": {
    textDecoration: "none",
  },
}));
const Navbar: FC = () => {
  // const { pathname } = useRouter();
  // const isIndexPage = pathname === "/";
  // const cartPage = pathname === "/market/cart";
  return (
    <>
      <StyledAppBar position="static">
        {/* <PaletterModeSwitch sx={{ right: "auto", left: 0 }} /> */}
        <Toolbar
          sx={{
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "0 0 40px rgb(80 80 110 / 60%)"
                : "0 0 90px rgb(90 90 90 / 70%)",
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
              <Tooltip title="Позвонить WhatsApp">
                <a
                  href={`${process.env["NEXT_PUBLIC_WHATSAPP_LINK"]}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <PhoneCallIcon />
                  <Box>{process.env["NEXT_PUBLIC_CONTACT_PHONE_NUMBER"]}</Box>
                </a>
              </Tooltip>
              <Box
                sx={{ ml: 1, "&, & svg": { width: "70px", height: "70px" } }}
              >
                <a
                  href={`${process.env["NEXT_PUBLIC_TELEGRAM_LINK"]}`}
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
      </StyledAppBar>
    </>
  );
};

export default Navbar;
