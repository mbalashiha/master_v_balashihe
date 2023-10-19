import { Box, Typography, Paper, Grid, Stack, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { Blog } from "@common/types/cms";
import NavigationList from "./NavigationList";
import NavSidebarContainer from "./NavSidebarContainer";

interface Props {
  navigation: Blog.BlogArticleNavigation;
  title?: string;
  ariaLabel?: string;
}
export default function NavSidebar({
  title = "Навигация",
  navigation,
  ariaLabel,
}: Props) {
  return (
    <NavSidebarContainer title={title} ariaLabel={ariaLabel}>
      {navigation.nearestSiblings && (
        <NavigationList articlesList={navigation.nearestSiblings} />
      )}
    </NavSidebarContainer>
  );
}
