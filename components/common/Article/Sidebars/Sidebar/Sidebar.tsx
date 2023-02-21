import { Box, Typography, Paper, Grid, Stack, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SidebarLink from "@components/common/Article/Sidebars/SidebarLink";

interface Props {
  navigation: Array<NavigationEntry>;
}
export default function Sidebar({ navigation }: Props) {
  return (
    <Paper
      sx={{
        width: "100%",
        minHeight: "400px",
        px: 2,
        "& li": {
          listStyleType: "none",
        },
        "& ul, & li": {
          px: 0,
          mx: 0,
        },
      }}
    >
      <Stack component="ul" direction={"column"}>
        {navigation.map((el) => (
          <SidebarLink key={el.href} item={el} />
        ))}
      </Stack>
    </Paper>
  );
}
