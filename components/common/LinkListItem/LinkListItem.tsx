import { Box, Typography, Paper, Grid, Stack, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import SidebarLink from "@components/common/Article/Sidebars/SidebarLink";

import { Blog } from "@common/types/cms";
import { SidebarPaper } from "@components/common/Sidebar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { grey } from "@mui/material/colors";
interface LinkProps extends Blog.NavigationItem {
  children: React.ReactNode | React.ReactNode[];
}

export const LinkListItem = ({ children, active, url, title }: LinkProps) => {
  if (active || !url) {
    return (
      <ListItem>
        <ListItemButton
          disableRipple
          sx={{
            "&, &:hover": {
              cursor: "default",
              background: (theme) =>
                `linear-gradient(195deg, rgb(30, 30, 54), ${grey[900]})`,
              "& .MuiTypography-root": {
                color: "white",
              },
            },
          }}
        >
          <ListItemIcon>
            <ArrowForwardIosRoundedIcon sx={{ color: "white" }} />
          </ListItemIcon>
          {children}
        </ListItemButton>
      </ListItem>
    );
  } else {
    return (
      <ListItem>
        <ListItemButton
          component={({ children, ...rest }) => (
            <Link {...rest} href={url} as={url}>
              {children}
            </Link>
          )}
        >
          <ListItemIcon>
            <ArrowForwardIosRoundedIcon />
          </ListItemIcon>
          {children}
        </ListItemButton>
      </ListItem>
    );
  }
};
export default LinkListItem;
