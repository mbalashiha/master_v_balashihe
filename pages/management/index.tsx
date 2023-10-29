import { MainActionButton } from "@components/ui";
import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { ManagementLayout } from "@components/management";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import Link from "next/link";
import useArticleList from "@framework/management/blog/use-article-list";
import {
  ArticleItem,
  SearchProvider,
} from "@components/management/blog/Article";
import { useFabButton } from "@components/management/Layout";
import { SearchField } from "@components/management/blog/Article";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import util from "util";
import { Blog } from "@common/types/cms";
import { ID } from "@framework/types";
import getArticlesCardsProps from "@framework/management/blog/queries/get-articles-cards-props";
import { CMS } from "@common/types";

export default function ManagementHomePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props.articles) {
    throw new Error("No props.articles on management home page!");
  }
  const {
    data: listData,
    isEmpty,
    mutate: updateArticleList,
  } = useArticleList({
    swrOptions: {
      fallbackData: props,
    },
  });
  const articles = listData?.articles || [];
  const search = listData?.search || "";
  const { setCreateButton } = useFabButton();
  useEffect(() => {
    setCreateButton({ href: "/management/blog/article/create" });
  }, [setCreateButton]);
  return (
    <SearchProvider search={search} updateArticleList={updateArticleList}>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={6}>
          <Link href="/management/blog/article/create">
            <Button>Добавить статью</Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <SearchField />
        </Grid>
        {(!isEmpty &&
          articles &&
          articles.length &&
          articles.map((elem) => (
            <Grid key={elem.id} item xs={12}>
              <ArticleItem article={elem} />
            </Grid>
          ))) ||
          (search && (
            <Typography component="h1" variant="h1">
              {`По запросу "${search}" ничего не найдено.`}
            </Typography>
          ))}
      </Grid>
    </SearchProvider>
  );
}
ManagementHomePage.Layout = ManagementLayout;

export const getServerSideProps: GetServerSideProps<{
  search: string;
  articles: CMS.Blog.ArticleCard[];
}> = async (ctx) => {
  let q = ctx.query.search;
  const search = Array.isArray(q) ? q[0] : q ? q : null;
  try {
    const data = await getArticlesCardsProps({ search }, ctx);
    return { props: data };
  } catch (e: any) {
    if (e.message === "Manager Unauthorized") {
      return {
        redirect: {
          destination: "/management/login",
          permanent: false,
        },
      };
    } else {
      throw new Error(e);
    }
  }
};
