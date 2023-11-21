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
      <link
        itemProp="image"
        href={`/images/about/computer_master_photo_balashikha.jpg`}
      />
      <Link itemProp="url" href="/" passHref>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <MasterSvgLogo />
          <Typography
            component="div"
            className="logo"
            itemProp="name"
            sx={{
              fontSize: "18px",
              lineHeight: "26px",
              py: 0,
              pl: "0.5rem",
              textTransform: "uppercase",
              position: "relative",
            }}
          >
            {process.env.NEXT_PUBLIC_SITE_NAME && (
              <>
                <Box
                  component={"strong"}
                  fontSize={"21px"}
                  color="var(--header-typography-color)"
                >
                  {process.env.NEXT_PUBLIC_SITE_NAME || ""}
                </Box>{" "}
                <br />
              </>
            )}
            Компьютерный мастер <br /> НА ДОМ ИЛИ В ОФИС
          </Typography>
        </Stack>
      </Link>
    </Box>
  );
};
