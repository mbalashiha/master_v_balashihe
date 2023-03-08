import { Box, Typography, Paper, Grid, Stack, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import SidebarLink from "@components/common/Article/Sidebars/SidebarLink";

import { Blog } from "@common/types/cms";
interface Props {
  navigation: Blog.BlogArticleNavigation;
}
export default function NavSidebar({ navigation }: Props) {
  return (
    <Paper
      elevation={0}
      component="ul"
      sx={{
        width: "100%",
        minHeight: "400px",
        pl: "6px",
        pr: "6px",
        "& > li, & a, & div": {
          wordBreak: "keep-all",
          overflow: "hidden",
          textOverflow: "ellipsis !important",
          whiteSpace: "nowrap",
          "&:hover": {
            backgroundColor: "transparent",
            color: "red",
          },
        },
      }}
    >
      <Box>
        <Typography component="h6" variant="h6" sx={{ textAlign: "center", mb: "10px", color: 'grey.700' }}>
          Информация
        </Typography>
      </Box>
      {navigation.nearestSiblings?.map((el) => (
        <>
          {el && (
            <SidebarLink
              key={el.url}
              title={el.title}
              url={el.url}
              active={el.active}
            />
          )}
        </>
      ))}
    </Paper>
  );
}
