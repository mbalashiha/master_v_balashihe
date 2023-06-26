import { useRouter } from "next/router";
import React from "react";
import { default as Link, LinkProps } from "next/link";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import cn from "classnames";
import { grey, blueGrey } from "@mui/material/colors";
import {
  Badge,
  Stack,
  Divider,
  Button,
  Box,
  Menu,
  MenuItem,
  ListItem,
  ListItemButton,
  SxProps,
  Theme,
} from "@mui/material";
import { NavigationLink } from "./NavigationLink";

type DividerProps = {
  orientation: "row" | "column";
  sx?: SxProps<Theme> | undefined;
};
type ItemProps = React.PropsWithChildren<LinkProps> & {
  className?: string;
  handleClose?: (event: any) => void;
  divider: boolean;
  dividerOrientation: DividerProps["orientation"];
};
type StackProps = React.ComponentProps<typeof Stack>;
interface Props extends StackProps {
  handleClose?: ItemProps["handleClose"];
  orientation?: DividerProps["orientation"];
}
const getLinks = () => [
  { href: "/", name: <HomeIcon /> },
  {
    href: "/uslugi-mastera-v-balashihe/remont-kompyuterov-bystro-balashiha-na-domu-ili-v-ofise",
    name: "Ремонт компьютера",
  },
  {
    href: "/uslugi-mastera-v-balashihe/remont-noutbuka-mfc-balashiha",
    name: "Ремонт ноутбука",
  },
  { href: "/uslugi-mastera-v-balashihe", name: "Услуги" },
  { href: "/computer-master-balashiha", name: "О мастере" },
];
export const NavbarLinks = ({
  orientation,
  handleClose,
  sx,
  ...props
}: Props) => {
  const { pathname, asPath } = useRouter();
  const navLinks = React.useMemo(() => {
    const navLinks: Array<{
      name: string | React.ReactNode;
      href: string;
      active?: boolean;
      hideHrefLink?: boolean;
    }> = getLinks();
    let activeSetted = false;
    navLinks.forEach((elem) => {
      if (elem.href === asPath) {
        elem.active = true;
        elem.hideHrefLink = true;
        activeSetted = true;
      }
    });
    if (!activeSetted) {
      const pathnamePrefix =
        "/" +
        asPath
          .split("/")
          .filter((el) => el)
          .shift();
      navLinks.forEach((elem) => {
        if (elem.href === pathnamePrefix) {
          elem.active = true;
          elem.hideHrefLink = false;
          activeSetted = true;
        }
      });
    }
    return navLinks;
  }, [asPath]);
  return (
    <List
      component="nav"
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
        padding: 0,
        "& > *": {
          margin: "0 0.5px",
          fontWeight: 600,
        },
        "& a, & .menuLink": {
          p: 1,
          borderRadius: 1,
          minWidth: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            background: (theme) => theme.palette.primary.main,
          },
        },
        "& a.active": {
          background: (theme) => theme.palette.primary.main,
          cursor: "pointer",
          color: "white",
          "&:hover": {
            background: (theme) => theme.palette.primary.main,
            boxShadow: "0 0 30px rgb(13 70 144 / 50%)",
            color: "white",
          },
        },
        "& .menuLink": {
          background: (theme) => theme.palette.primary.main,
          color: "white",
        },
        ...sx,
      }}
    >
      {navLinks.map((linkProps) => (
        <NavigationLink
          key={linkProps.href + "_" + (linkProps.name || "")}
          linkProps={linkProps}
        >
          {linkProps.name || ""}
        </NavigationLink>
      ))}
    </List>
  );
};
export default NavbarLinks;
