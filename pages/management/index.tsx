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
export default function ManagementHomePage() {
  const { data: listData, isEmpty } = useArticleList();
  const articles = listData?.articles || [];
  const search = listData?.search || "";
  const { setCreateButton } = useFabButton();
  useEffect(() => {
    setCreateButton({ href: "/management/blog/article/create" });
  }, [setCreateButton]);
  return (
    <SearchProvider search={search}>
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
