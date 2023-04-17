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

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  linkProps: {
    name: string | React.ReactNode;
    href: string;
    active?: boolean | undefined;
    hideHrefLink?: boolean;
  };
}

export default function NavigationLink({
  linkProps,
  className,
  ...props
}: Props) {
  return (
    <>
      {linkProps.active && linkProps.hideHrefLink ? (
        <div
          className={cn(className, "active", "aLinkPreplacement")}
          {...props}
        >
          {linkProps.name}
        </div>
      ) : linkProps.active ? (
        <Link
          href={linkProps.href}
          className={cn(className, "active")}
          passHref
          {...(props as any)}
        >
          {linkProps.name}
        </Link>
      ) : (
        <Link
          href={linkProps.href}
          className={cn(className)}
          passHref
          {...(props as any)}
        >
          {linkProps.name}
        </Link>
      )}
    </>
  );
}
