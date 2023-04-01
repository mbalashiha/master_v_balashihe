import { CardsLayout } from "@components/site";
import { Typography, Card, Grid, Button, Box } from "@mui/material";
import Head from "next/head";
import { InferGetStaticPropsType } from "next/types";
import { HugeContainer } from "@components/ui";
import getArticlesCards from "@framework/article/get-articles-cards";
import { ArticleCard } from "@components/common/Article";
import { SidebarPaper } from "@components/common/Sidebar";
import { Blog } from "@common/types/cms";
import NavigationList from "./NavigationList";

interface Props {
  recentArticles: Blog.NavigationItem[];
}
export const BlogRootSidebar = ({ recentArticles }: Props) => {
  return (
    <SidebarPaper
      ellipsis
      title={"Недавние"}
      sx={{ width: "100%", height: { lg: "800px" } }}
    >
      {recentArticles && (
        <NavigationList
          ariaLabel="recent articles"
          articlesList={recentArticles}
        />
      )}
    </SidebarPaper>
  );
};
export default BlogRootSidebar;
