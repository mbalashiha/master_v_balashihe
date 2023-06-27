import React, { DetailedHTMLProps, HTMLAttributes } from "react";
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
import DropDownMenu from "./DropDownMenu";

export interface NavLinkProps {
  name: string | React.ReactNode;
  href?: string;
  active?: boolean;
  hideHrefLink?: boolean;
  submenu?: Array<NavLinkProps>;
}
interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  linkProps: NavLinkProps;
}

export default function NavigationLink({
  linkProps,
  className,
  ...props
}: Props) {
  if (linkProps.submenu?.length) {
    return <DropDownMenu {...linkProps} />;
  } else {
    return (
      <>
        {linkProps.active && linkProps.hideHrefLink ? (
          <div className={cn(className, "active", "menuLink")} {...props}>
            {linkProps.name}
          </div>
        ) : linkProps.active && linkProps.href ? (
          <Link
            href={linkProps.href}
            className={cn(className, "active")}
            passHref
            {...(props as any)}
          >
            {linkProps.name}
          </Link>
        ) : linkProps.href ? (
          <Link
            href={linkProps.href}
            className={cn(className)}
            passHref
            {...(props as any)}
          >
            {linkProps.name}
          </Link>
        ) : linkProps.active && linkProps.name ? (
          <div
            className={cn(className, linkProps.active && "active", "menuLink")}
            {...props}
          >
            {linkProps.name}
          </div>
        ) : null}
      </>
    );
  }
}
