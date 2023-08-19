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
        alignItems: "center",
        justifyContent: "center",
        height: "82px",
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
            component="h1"
            variant="h1"
            sx={{
              fontSize: "1.4rem",
              lineHeight: "1.3rem",
              py: 0,
              pl: "0.5rem",
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
              Компьютерный
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
              Мастер
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
  );
};
