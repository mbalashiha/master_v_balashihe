import { Box, Typography, Paper, Grid, Stack, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { Blog } from "@common/types/cms";
import { SidebarPaper } from "@components/common/Sidebar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Divider } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { LinkListItem } from "@components/common/LinkListItem";
import React from "react";

interface Props {
  articlesList: Blog.NavigationItem[];
  ariaLabel?: string;
}

export default function NavigationList({ articlesList, ariaLabel }: Props) {
  return (
    <nav aria-label={ariaLabel || "navigation articles"}>
      <Stack component="ul" spacing="3px">
        {articlesList.map((el, indx) => {
          const prefixKey = (el.url || "") + "_" + (el.title || "");
          return (
            <React.Fragment key={prefixKey}>
              <LinkListItem {...el}>
                <ListItemText primary={el.title} />
              </LinkListItem>
              {indx < articlesList.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          );
        })}
      </Stack>
    </nav>
  );
}
