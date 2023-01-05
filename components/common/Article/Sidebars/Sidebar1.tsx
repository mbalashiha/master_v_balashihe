import { Box, Typography, Paper, Grid, Stack, Button } from "@mui/material";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SidebarLink from "./SidebarLink";
import Sidebar from "./Sidebar/Sidebar";

const getNavigation = (routerPath?: string): Array<NavigationEntry> => {
  const entries: Array<NavigationEntry> = [
    {
      href: "/uslugi-mastera-v-balashihe/ustanovka-windows",
      name: "Установка Windows",
    },
    {
      href: "/uslugi-mastera-v-balashihe/nizkaya-tsena-udaleniya-computer-virus",
      name: "Удаление вирусов",
    },
    {
      href: "/uslugi-mastera-v-balashihe/remont-kompyuterov-s-horoshymi-otzyvami",
      name: "Ремонт в Балашихе",
    },
  ];
  entries.forEach((elem) => {
    if (elem.href === routerPath) {
      elem.active = true;
    }
  });
  return entries;
};
export default function Sidebar1() {
  const router = useRouter();
  const navigation = getNavigation(router.asPath);
  return <Sidebar navigation={navigation} />;
}
