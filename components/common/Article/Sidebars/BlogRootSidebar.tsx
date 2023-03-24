import { CardsLayout } from "@components/site";
import { Typography, Card, Grid, Button, Box } from "@mui/material";
import Head from "next/head";
import { InferGetStaticPropsType } from "next/types";
import { HugeContainer } from "@components/ui";
import getArticlesCards from "@framework/article/get-articles-cards";
import { ArticleCard } from "@components/common/Article";
import { SidebarPaper } from "@components/common/Sidebar";

export const BlogRootSidebar = () => {
  return (
    <SidebarPaper
      title={"Недавние"}
      sx={{ width: "100%", height: "800px" }}
    ></SidebarPaper>
  );
};
export default BlogRootSidebar;
