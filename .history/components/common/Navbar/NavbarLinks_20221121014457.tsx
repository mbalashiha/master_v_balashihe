import { useRouter } from "next/router";
import React from "react";
import { default as Link, LinkProps } from "next/link";
import s from "./Navbar.module.scss";
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
    }> = [
      { href: "/", name: <HomeIcon /> },
      { href: "/market", name: "Магазин" },
    ];
    navLinks.forEach((elem) => {
      if (elem.href === pathname) {
        elem.active = true;
      }
    });
    return navLinks;
  }, [pathname]);
  const stackOrientation: DividerProps["orientation"] = orientation || "row";
  const displayAs =
    stackOrientation === "row"
      ? { xs: "none", md: "flex" }
      : { xs: "flex", md: "none" };
  const dividerOrientation =
    stackOrientation === "row" ? "vertical" : "horizontal";
  return (
    <Stack
      direction={stackOrientation}
      spacing={0.5}
      divider={
        <Divider
          orientation={dividerOrientation}
          sx={{ background: grey[600] }}
        />
      }
      sx={{
        display: displayAs,
        padding: 2,
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
      {...props}
    >
      {navLinks.map((linkProps) => (
        <React.Fragment key={linkProps.href + "_" + linkProps.name?.toString()}>
          {linkProps.active ? (
            <div className={cn("active", "aLinkPreplacement")}>
              {linkProps.name}
            </div>
          ) : (
            <Link href={linkProps.href} passHref>
              {linkProps.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </Stack>
  );
};
export default NavbarLinks;
