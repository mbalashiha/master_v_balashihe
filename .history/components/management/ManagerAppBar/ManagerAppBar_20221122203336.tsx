import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Button, IconButton } from "@mui/material";
import { Stack } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import useManagementProvider from "@framework/commerce/management/use-auth-provider";
import useSignout from "@framework/commerce/management/use-sign-out";
import Link from "next/link";
import PaletterModeSwitch from "@components/common/paletter/PaletteSwitch";

export default function ManagerAppBar() {
  const { signedinManager } = useManagementProvider();
  const signOut = useSignout();
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
    <AppBar position="static" sx={{ position: "relative" }}>
      <PaletterModeSwitch sx={{ right: "auto", left: 0 }} />
      <Toolbar>
        <Stack sx={{ flexGrow: 1 }}></Stack>
        <Link href={"/management"} as={"/management"} passHref>
          <Button
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <Typography>Все товары</Typography>
          </Button>
        </Link>
        <Box sx={{ mr: 2 }}></Box>
        {signedinManager && (
          <div>
            <Button
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              startIcon={<AccountCircle />}
            >
              <Typography>{signedinManager.friendlyName}</Typography>
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              sx={{
                "&& li": {
                  minWidth: "160px",
                },
              }}
            >
              <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
