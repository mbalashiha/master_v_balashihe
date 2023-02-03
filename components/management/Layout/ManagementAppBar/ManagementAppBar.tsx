import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useManagementLayoutProvider } from "@common/management/utils";
import useSignOut from "@framework/management/auth/use-sign-out";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "next/link";

export default function ManagementAppBar() {
  const { manager } = useManagementLayoutProvider();
  const signOut = useSignOut();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLogout = () => {
    setAnchorEl(null);
    signOut();
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          "& *": {
            "&, &.MuiTypography-root": {
              color: "white",
            },
          },
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CMS
        </Typography>
        <Box sx={{ mr: 2, flexGrow: 1 }}></Box>
        {manager && (
          <>
            <Button
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              startIcon={<AccountCircle />}
            >
              <Typography component={"span"}>{manager.friendlyName}</Typography>
            </Button>
            {Boolean(anchorEl) && (
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                sx={{
                  "& li": {
                    minWidth: "20ch",
                  },
                }}
              >
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
