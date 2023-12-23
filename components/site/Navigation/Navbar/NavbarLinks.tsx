import { useRouter } from "next/router";
import React from "react";
import { default as Link, LinkProps } from "next/link";
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
  { href: "/computer-master-balashiha", name: "Контакты", about: true },
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
    <Box
      component="nav"
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
      sx={{
        p: 0,
        m: 0,
        alignSelf: { xs: "flex-start", sm: "flex-end" },
        justifySelf: { xs: "flex-start", sm: "flex-end" },
        display: "flex",
        justifyContent: "flex-end",
        alignItems: { xs: "flex-start", sm: "flex-end" },
        flexWrap: "wrap",
      }}
    >
      <Stack
        direction={"row"}
        spacing={0}
        component="ul"
        itemScope
        itemType="https://schema.org/ItemList"
        sx={{
          listStyleType: "none",
          py: 0,
          px: { xs: "2px", sm: 0 },
          alignSelf: { xs: "flex-start", sm: "flex-end" },
          display: "flex",
          justifyContent: "flex-start",
          alignItems: { xs: "flex-start", sm: "center" },
          flexWrap: "wrap",
          gap: "4px",
          color: (theme) => theme.palette.text.primary,
          "& svg": {
            color: (theme) => theme.palette.text.primary,
            fill: (theme) => theme.palette.text.primary,
          },
          "&:hover": {
            "& > li": {
              "&.active > .menu-item": {
                color: "black",
                "& svg": {
                  color: "black",
                  fill: "black",
                },
                "&:after": {
                  width: 0,
                  background: "transparent",
                },
                "&:hover:after": {
                  width: "100%",
                  background: "black",
                },
              },
            },
          },
          "& > li": {
            "&.active > .menu-item, &.clicked > .menu-item, & .menu-item:hover":
              {
                "&:after": {
                  width: "100%",
                  background: "black",
                },
              },
            "&.active > .menu-item": {
              cursor: "default",
            },
            "&.active > a[href].menu-item": {
              cursor: "pointer",
            },
            "& .menu-item": {
              cursor: "pointer",
              color: (theme) => theme.palette.text.primary,
              "& svg": {
                color: (theme) => theme.palette.text.primary,
                fill: (theme) => theme.palette.text.primary,
              },
              fontFamily: `var(--header-font-family)`,
              background: "transparent",
              fontWeight: 600,
              position: "relative",
              transition: "color .5s ease, background-color .5s ease",
              px: { xs: 0, sm: "12px" },
              py: { xs: "6px", sm: "14px" },
              borderRadius: 0,
              minWidth: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              lineHeight: "24px",
              "&.active, &:hover, &.clicked": {
                "& svg": {
                  color: "black",
                  fill: "black",
                },
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
            },
          },
          "& .dropdown": {
            "&, & > button, & > .dropbtn, & > button.dropbtn": {
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
    </Box>
  );
};
export default NavbarLinks;
