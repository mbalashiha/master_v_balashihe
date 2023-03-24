import { Box, Typography, Paper, Grid, Stack, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { Blog } from "@common/types/cms";
import { SidebarPaper } from "@components/common/Sidebar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { LinkListItem } from "@components/common/LinkListItem";

interface Props {
  navigation: Blog.BlogArticleNavigation;
}
export default function NavSidebar({ navigation }: Props) {
  return (
    <SidebarPaper title={"Навигация"}>
      <nav aria-label="navigation articles">
        <List sx={{}}>
          {navigation.nearestSiblings?.map((el) => (
            <LinkListItem key={(el.url || "") + "_" + el.title} {...el}>
              <ListItemText primary={el.title} />
            </LinkListItem>
          ))}
        </List>
      </nav>
    </SidebarPaper>
  );
}
