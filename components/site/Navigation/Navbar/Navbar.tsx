import { FC, default as React } from "react";
import { useUI } from "@components/ui";
import Link from "next/link";
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
import MasterSvgLogo from "@components/site/Logo/master-svg-logo";
import dynamic from "next/dynamic";
import PaletterModeSwitch from "@components/common/paletter/PaletteSwitch";
import { useRouter } from "next/router";
import NavbarLinks from "./NavbarLinks";
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "none",
  backdropFilter: "saturate(180%) blur(15px)",
  backgroundColor: "rgba(241, 243, 245, 0.75)",
  boxShadow: "0px 4px 10px 0px rgb(48 59 68 / 20%)",
  height: "83px",
  "& a": {
    textDecoration: "none",
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
            "&&&": {
              px: { xs: "0.2rem", md: "0.3rem", lg: "2rem", xl: "4rem" },
              py: 0,
            },
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
                  py: "0.25rem",
                }}
              >
                <Link href="/" passHref>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      width: "300px",
                    }}
                  >
                    <MasterSvgLogo />
                    <Typography
                      component="h1"
                      variant="h1"
                      sx={{
                        fontSize: "1.4rem",
                        lineHeight: "1.3rem",
                        px: "0.5rem",
                        py: 0,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0,
                        display: "block",
                        position: "relative",
                      }}
                    >
                      <Box
                        component="span"
                        letterSpacing={0}
                        fontSize="1.0rem"
                        display="block"
                        pl="0.108rem"
                        sx={{
                          color: "#575757",
                        }}
                      >
                        Компьютерный&nbsp;
                      </Box>
                      <Box
                        component="span"
                        letterSpacing={0}
                        fontSize="1.7rem"
                        display="block"
                        position="relative"
                        top="-0.07rem"
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                        }}
                      >
                        Мастер&nbsp;
                      </Box>
                      <Box
                        component="span"
                        letterSpacing={0}
                        fontSize="1.293rem"
                        display="block"
                        sx={{
                          color: "#010031",
                        }}
                      >
                        в Балашихе
                      </Box>
                    </Typography>
                  </Stack>
                </Link>
              </Box>
              <NavbarLinks />
            </Box>
            <Box></Box>
          </Stack>
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

export default Navbar;
