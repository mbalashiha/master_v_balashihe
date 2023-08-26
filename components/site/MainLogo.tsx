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
import { styled } from "@mui/material";
import MasterSvgLogo from "@components/site/Logo/master-svg-logo";

export const MainLogo = () => {
  return (
    <Box
      sx={{
        mr: 0,
        display: "flex",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link href="/" passHref>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <MasterSvgLogo />
          <Typography
            component="div"
            className="logo"
            sx={{
              fontSize: "18px",
              lineHeight: "26px",
              py: 0,
              pl: "0.5rem",
              textTransform: "uppercase",
              position: "relative",
            }}
          >
            Компьютерный Мастер <br /> в Балашихе
          </Typography>
        </Stack>
      </Link>
    </Box>
  );
};
