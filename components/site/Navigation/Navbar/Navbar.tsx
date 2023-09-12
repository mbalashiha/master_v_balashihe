import { FC, default as React } from "react";
import { useUI } from "@components/ui";
import { Tooltip } from "@components/ui";
import { Search } from "@components/site";
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
  Container,
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
  NEXT_PUBLIC_TELEGRAM_LINK,
  NEXT_PUBLIC_CONTACT_PHONE_TEXT,
} from "@framework/const";
import IconPhoneCircle from "@components/icons/IconPhoneCircle";
import { useSiteModal } from "@components/site/contacts/ModalProvider";

const Navbar: FC = () => {
  // const { pathname } = useRouter();
  // const isIndexPage = pathname === "/";
  // const cartPage = pathname === "/market/cart";
  const { openContactRequest } = useSiteModal();
  return (
    <AppBar
      component={"div"}
      position="static"
      sx={{
        "& a": {
          textDecoration: "none",
        },
      }}
    >
      <Toolbar
        component="div"
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          zIndex: 3,
          background: "white",
          color: "black",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: "4px", sm: 2 }}
          flexWrap="wrap"
          sx={{
            width: "100%",
            maxWidth: "1600px",
            minHeight: "112px",
            overflow: "visible",
            justifyContent: "space-between",
            alignItems: "space-between",
            "&, & *, & .logo, & .timeline-typography": {
              fontFamily: `var(--landing-font-family)`,
              color: "black",
              fontWeight: 400,
            },
          }}
        >
          <MainLogo />
          <NavbarLinks />
          <Stack
            direction={"row"}
            justifyContent="flex-start"
            alignItems="center"
            flexWrap="nowrap"
            alignSelf={"center"}
            sx={{
              color: "black",
              fontSize: "26px",
              lineHeight: "37px",
              "&, & a, & a > *": {
                transitionProperty: "color",
              },
              "& a, & > div": {
                display: "flex",
                direction: "row",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                "& > svg": {
                  marginBottom: "-2px",
                  marginRight: "6px",
                },
              },
              "&&& svg": {
                width: "55px",
                height: "55px",
                marginTop: "5px",
              },
            }}
          >
            <Stack
              direction={"row"}
              spacing={1}
              sx={{ cursor: "pointer" }}
              onClick={openContactRequest}
            >
              <IconPhoneCircle fill={"black"} />
              <Stack direction="column">
                <Box>{NEXT_PUBLIC_CONTACT_PHONE_TEXT}</Box>
                <Typography
                  component="div"
                  className="timeline-typography"
                  sx={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    alignSelf: "flex-end",
                  }}
                >
                  Ежедневно с 09:00 до 24:00
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Toolbar>
      <Toolbar
        sx={{
          zIndex: 0,
          boxShadow:
            "#0000001a 0rem 0.25rem 0.375rem -0.0625rem, #0000000f 0rem 0.125rem 0.25rem -0.0625rem",

          backgroundColor: "rgba(237, 239, 245, 0.75)",
        }}
      >
        <Container
          maxWidth={"lg"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 0,
            py: "10px",
          }}
        >
          <Search navbarSearch />
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
