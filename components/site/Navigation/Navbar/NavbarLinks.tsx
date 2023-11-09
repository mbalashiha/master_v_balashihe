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
import { NavLinkProps } from "./NavigationLink";
import { standartCssTransition } from "@components/ui/theme/mui-theme";

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
const getLinks = (): Array<NavLinkProps> => [
  { href: "/", name: <HomeIcon /> },
  {
    href: "/uslugi-mastera-v-balashihe/remont-noutbuka-mfc-balashiha",
    name: "Услуги",
    submenu: [
      {
        href: "/uslugi-mastera-v-balashihe/remont-kompyuterov-bystro-balashiha-na-domu-ili-v-ofise",
        name: "Ремонт компьютера",
      },
      {
        href: "/uslugi-mastera-v-balashihe/remont-noutbuka-mfc-balashiha",
        name: "Ремонт ноутбука",
      },
      {
        href: "/uslugi-mastera-v-balashihe/ustanovka-programm-balashiha",
        name: "Установка программ",
      },
      {
        href: "/uslugi-mastera-v-balashihe/udalit-virusy-v-kompyutere-po-nizkoj-cene-v-balashihe-ili-poprobovat-udalit-virusy-samomu",
        name: "Удаление вирусов",
      },
      {
        href: "/uslugi-mastera-v-balashihe/kompyuternye-sistemnye-bloki-v-balashihe-remont-pk",
        name: "Установка ОС",
      },
    ],
  },
  { href: "/uslugi-mastera-v-balashihe", name: "Блог" },
  { href: "/computer-master-balashiha", name: "Контакты" },
];
export const NavbarLinks = ({
  orientation,
  handleClose,
  sx,
  ...props
}: Props) => {
  const { pathname, asPath } = useRouter();
  const navLinks = React.useMemo(() => {
    const navLinks: Array<NavLinkProps> = getLinks();
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
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing="2px"
      component="nav"
      sx={{
        "&, & *": {
          fontFamily: "Gotham, Arial, sans-serif",
          color: "#303b44",
        },
        py: 0,
        px: { xs: "12px", sm: 0 },
        alignSelf: { xs: "flex-start", sm: "flex-end" },
        display: "flex",
        justifyContent: "flex-start",
        alignItems: { xs: "flex-start", sm: "center" },
        flexWrap: "wrap",
        "& > *, & > .dropdown": {
          margin: "0 0.5px",
        },
        "& .dropbtn, & button": {
          margin: 0,
          border: "none",
          color: (theme) => theme.typography.allVariants.color,
        },
        "& a, & button, & .menuLink, & > .dropdown > .dropbtn": {
          px: { xs: 0, sm: "12px" },
          py: { xs: "6px", sm: "14px" },
          borderRadius: 0,
          minWidth: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          lineHeight: "24px",
        },
        "&:hover": {
          "& > a, & > div": {
            "&.active:not(:hover):after": {
              width: 0,
              background: "transparent",
            },
          },
        },
        "& > a, & > div, & > button, & .dropdown .dropbtn, & .dropdown-content > *":
          {
            background: "transparent",
            fontWeight: 600,
            position: "relative",
            transition: "color .5s ease, background-color .5s ease",
            "&:hover, &.clicked": {
              color: (theme) => theme.palette.primary.main,
            },
            "&.active": {
              color: (theme) => theme.palette.primary.main,
            },
            "&:after": {
              position: "absolute",
              left: 0,
              bottom: 0,
              content: `""`,
              display: "block",
              height: "4px",
              width: 0,
              background: "transparent",
              transition: "width .5s ease, background-color .5s ease",
            },
            "&:hover:after, &.active:after, &.clicked:after": {
              width: "100%",
              background: (theme) => theme.palette.primary.main,
            },
          },
        "& > .dropdown": {
          "&, & > button, && > .dropbtn, && > button.dropbtn": {
            borderRadius: `8px 8px 0 0`,
          },
        },
        "& .dropdown-content": {
          background: "white",
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
    </Stack>
  );
};
export default NavbarLinks;
