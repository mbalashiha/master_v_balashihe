import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import Link from "next/link";
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
import DropDownMenu from "./DropDownMenu";

export interface NavLinkProps {
  name: string | React.ReactNode;
  href?: string;
  active?: boolean;
  hideHrefLink?: boolean;
  submenu?: Array<NavLinkProps>;
  about?: boolean;
}
interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  linkProps: NavLinkProps;
}

export default function NavigationLink({
  linkProps,
  className,
  about,
  ...props
}: Props) {
  return (
    <Box
      component="li"
      itemProp={about ? "about" : "itemListElement"}
      itemScope
      itemType="https://schema.org/ItemList"
      className={cn(
        className,
        { active: linkProps.active },
        {
          menuLink: !linkProps.href || linkProps.hideHrefLink,
        }
      )}
    >
      {linkProps.submenu?.length ? (
        <DropDownMenu {...(linkProps as any)} />
      ) : (
        <>
          {linkProps.active && linkProps.hideHrefLink ? (
            <div className="menu-item" {...props}>
              {linkProps.name}
            </div>
          ) : linkProps.active && linkProps.href ? (
            <Link
              className="menu-item"
              href={linkProps.href}
              passHref
              {...(props as any)}
            >
              {linkProps.name}
            </Link>
          ) : linkProps.href ? (
            <Link
              className="menu-item"
              href={linkProps.href}
              passHref
              {...(props as any)}
            >
              {linkProps.name}
            </Link>
          ) : linkProps.active && linkProps.name ? (
            <div className="menu-item" {...props}>
              {linkProps.name}
            </div>
          ) : null}
        </>
      )}
    </Box>
  );
}
