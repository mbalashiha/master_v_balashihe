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
  { href: "/uslugi-mastera-v-balashihe", name: "Услуги" },
];
export const NavbarLinks = ({
  orientation,
  handleClose,
  sx,
  ...props
}: Props) => {
  const { pathname } = useRouter();
  const navLinks = React.useMemo(() => {
    const navLinks: Array<{
      name: string | React.ReactNode;
      href: string;
      active?: boolean;
    }> = getLinks();
    navLinks.forEach((elem) => {
      if (elem.href === pathname) {
        elem.active = true;
      }
    });
    return navLinks;
  }, [pathname]);
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
        "& a, & .aLinkPreplacement": {
          p: 1,
          borderRadius: 1,
          minWidth: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            background: (theme) => theme.palette.primary.main,
          },
          "&.active": {
            background: (theme) => theme.palette.primary.main,
            cursor: "default",
          },
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
