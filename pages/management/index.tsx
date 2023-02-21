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
import { ArticleItem } from "@components/management/blog/Article";
import { useFabButton } from "@components/management/Layout";

export default function ManagementHomePage() {
  const { data: articles, isEmpty } = useArticleList();
  const { setCreateButton } = useFabButton();
  useEffect(() => {
    setCreateButton({ href: "/management/blog/article/create" });
  }, [setCreateButton]);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Link href="/management/blog/article/create">
            <Button>Добавить статью</Button>
          </Link>
        </Grid>
        {!isEmpty &&
          articles &&
          articles.map((elem) => (
            <Grid key={elem.id} item xs={12} md={12}>
              <ArticleItem article={elem} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
ManagementHomePage.Layout = ManagementLayout;
