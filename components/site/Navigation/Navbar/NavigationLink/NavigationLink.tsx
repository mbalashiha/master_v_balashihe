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
  const { name, href, active, submenu } = linkProps;
  return (
    <Box
      component="li"
      itemProp={about ? "about" : "itemListElement"}
      itemScope
      itemType="https://schema.org/ItemList"
      className={cn(
        className,
        { active: active },
        {
          menuLink: !href,
        }
      )}
    >
      {submenu?.length ? (
        <DropDownMenu
          name={name}
          href={href}
          active={active}
          submenu={submenu}
        />
      ) : (
        <>
          <meta
            itemProp="name"
            content={
              typeof linkProps.name === "object"
                ? linkProps.href || "Начальная страница"
                : (linkProps.name || linkProps.href || "Страница").toString()
            }
          />
          {active ? (
            <div className="menu-item">
              {name}
            </div>
          ) : active && href ? (
            <Link className="menu-item" href={href} passHref itemProp="url">
              {name}
            </Link>
          ) : href ? (
            <Link className="menu-item" href={href} passHref itemProp="url">
              {name}
            </Link>
          ) : active && name ? (
            <div className="menu-item">
              {name}
            </div>
          ) : null}
        </>
      )}
    </Box>
  );
}
