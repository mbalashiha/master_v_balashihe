import { FC, default as React } from "react";
import { useUI } from "@components/ui";
import Link from "next/link";
// import NavbarLinks from "./NavbarLinks";

import { grey, blueGrey } from "@mui/material/colors";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
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
import { styled } from "@components/ui";
import MenuIcon from "@mui/icons-material/Menu";
import MasterSvgLogo from "@components/site/master-svg-logo";
import dynamic from "next/dynamic";
import PaletterModeSwitch from "@components/common/paletter/PaletteSwitch";
import { useRouter } from "next/router";
import NavbarLinks from "./NavbarLinks";
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "black",
  backgroundColor: "black",
  position: "absolute",
  top: 0,
  zIndex: 1,
}));
const StyledBadge = styled(Badge)(({ theme }) => ({
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    fontSize: "3rem",
    color: grey[50],
    transform: "scale(1.001)",
    transition: "all 0.1s ease-in",
  },
  "& .BaseBadge-badge.MuiBadge-badge": {
    paddingTop: "0.66rem",
    paddingBottom: "0.53rem",
    color: "white",
    background: theme.palette.primary.main,
  },
  "&:hover .MuiSvgIcon-root": {
    transition: "all 0.1s ease-in",
    transform: "scale(1.1)",
  },
}));
const Navbar: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mounted, setIsMounted] = React.useState<boolean>(false);
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
    <StyledAppBar position="fixed">
      {/* <PaletterModeSwitch sx={{ right: "auto", left: 0 }} /> */}
      <Toolbar
        sx={{
          height: "6.2rem",
          background: "black",
          backgroundColor: "black",
          boxShadow: (theme) => {
            return !isIndexPage && theme.palette.mode === "light"
              ? "0 0 40px rgb(80 80 110 / 60%)"
              : "0 0 90px rgb(90 90 90 / 70%)";
          },
          zIndex: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Box sx={{ mr: 2, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{
                "& .MuiList-padding": {
                  p: 0,
                  m: 0,
                },
                "& .MuiListItem-root": {
                  m: 0,
                  p: 0,
                },
                "& a": {
                  p: 0,
                  m: 0,
                  pl: "1.6rem",
                  height: "3rem",
                  width: "100vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  "&:hover": {
                    background: blueGrey[700],
                  },
                },
              }}
            >
              <NavbarLinks handleClose={handleClose} />
            </Menu>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                mr: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link href="/" passHref>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    marginLeft: "-1rem",
                    border: "1px solid #555555",
                    borderRadius: "15px",
                    maxWidth: {
                      xs: "230px",
                      sm: "inherit",
                    },
                    height: { xs: "4.7rem", sm: "inherit" },
                  }}
                >
                  <MasterSvgLogo />
                  <Typography
                    component="h1"
                    variant="h1"
                    className="furore-font-family"
                    sx={{
                      fontSize: {
                        xs: "1.1rem",
                        sm: "1.4rem",
                        lg: "2.15rem",
                      },
                      lineHeight: {
                        xs: "1.4rem",
                        sm: "2rem",
                        lg: "2.5rem",
                      },
                      padding: "0 0.8rem 0 0.3rem",
                      fontStretch: "expanded",
                      fontWeight: 300,
                      "&&&": {
                        color: "white",
                      },
                    }}
                  >
                    Компьютерный <br /> Мастер в Москве
                  </Typography>
                </Stack>
              </Link>
            </Box>
            <NavbarLinks />
          </Box>
          <Box>
          </Box>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
