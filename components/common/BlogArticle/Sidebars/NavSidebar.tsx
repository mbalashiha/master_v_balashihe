import { Box, Typography, Paper, Grid, Stack, Button } from "@mui/material";
import { Blog } from "@common/types/cms";
import NavSidebarContainer from "./NavSidebarContainer";
import type { NavSidebarContainerProps } from "./NavSidebarContainer";
import NavStackContainer from "./NavStackContainer";
import ListItem from "./NavigationList";

interface Props extends Omit<NavSidebarContainerProps, "children"> {
  list: Blog.NavigationItem[];
  title: string;
  ariaLabel?: string;
}
export default function NavSidebar({
  title = "Навигация",
  list,
  ariaLabel,
  ...rest
}: Props) {
  return (
    <NavSidebarContainer
      title={title}
      ariaLabel={ariaLabel}
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
      component="nav"
      {...rest}
    >
      <NavStackContainer itemScope itemType="https://schema.org/ItemList">
        {list.map((el) => (
          <ListItem key={(el.title || "") + "_" + (el.url || "")} {...el} />
        ))}
      </NavStackContainer>
    </NavSidebarContainer>
  );
}
