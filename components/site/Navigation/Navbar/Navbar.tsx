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
import { NEXT_PUBLIC_CONTACT_PHONE_TEXT } from "@framework/const";
import IconPhoneCircle from "@components/icons/IconPhoneCircle";
import { useSiteModal } from "@components/site/ModalProvider/ModalProvider";

const Navbar: FC = () => {
  // const { pathname } = useRouter();
  // const isIndexPage = pathname === "/";
  // const cartPage = pathname === "/market/cart";
  const { toggleModal } = useSiteModal();
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
        component="header"
        itemScope
        itemType="https://schema.org/WPHeader"
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
          itemScope
          itemType="https://schema.org/LocalBusiness"
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
              fontFamily: `var(--navbar-font-family)`,
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
              onClick={() => toggleModal("contact list")}
            >
              <IconPhoneCircle fill={"#C59457"} />
              <Stack direction="column">
                <Box
                  itemProp="telephone"
                  sx={{
                    "&&": {
                      color: "var(--header-typography-color)",
                    },
                  }}
                >
                  {NEXT_PUBLIC_CONTACT_PHONE_TEXT}
                </Box>
                <Typography
                  component="time"
                  itemProp="openingHours"
                  dateTime="Mo-Su"
                  className="timeline-typography"
                  sx={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    alignSelf: "flex-end",
                    "&&": {
                      color: "var(--header-typography-color)",
                    },
                  }}
                >
                  Ежедневно с 09:00 до 23:00
                </Typography>
                <span
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <meta itemProp="postalCode" content="143912" />
                  <meta itemProp="addressLocality" content="Балашиха" />
                  <meta
                    itemProp="streetAddress"
                    content="шоссе Энтузиастов, 7/1"
                  />
                  <meta itemProp="addressRegion" content="Московская область" />
                  <meta itemProp="addressCountry" content="Россия" />
                </span>
                <span
                  itemProp="geo"
                  itemScope
                  itemType="https://schema.org/GeoCoordinates"
                >
                  <meta itemProp="latitude" content="55.795469" />
                  <meta itemProp="longitude" content="37.933977" />
                </span>
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
