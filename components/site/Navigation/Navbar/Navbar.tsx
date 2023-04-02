import { FC, default as React } from "react";
import { useUI } from "@components/ui";
import Link from "next/link";
import { grey, blueGrey } from "@mui/material/colors";import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );
  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);
  const { pathname } = useRouter();
  const isIndexPage = pathname === "/";
  const cartPage = pathname === "/market/cart";
  return (
    <>
      <StyledAppBar position="static">
        {/* <PaletterModeSwitch sx={{ right: "auto", left: 0 }} /> */}
        <Toolbar
          sx={{
            boxShadow: (theme) => {
              return !isIndexPage && theme.palette.mode === "light"
                ? "0 0 40px rgb(80 80 110 / 60%)"
                : "0 0 90px rgb(90 90 90 / 70%)";
            },
            px: { xs: "0.2rem", md: "0.3rem", lg: "2rem", xl: "4rem" },
            py: 0,
          }}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            flexWrap="wrap"
            sx={{ width: "100%", maxWidth: "98vw", overflow: "hidden" }}
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
              }}
            >
              <PhoneRoundedIcon sx={{ width: "50px", height: "50px" }} />
              <Box>8 (926) 212-12-55</Box>
            </Stack>
          </Stack>
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

export default Navbar;
