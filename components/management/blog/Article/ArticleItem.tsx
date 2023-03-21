import { CardsLayout } from "@components/site";
import {
  Typography,
  Card,
  Grid,
  Paper,
  Button,
  Box,
  Stack,
} from "@mui/material";
import Head from "next/head";
import { InferGetStaticPropsType } from "next/types";
import { HugeContainer, LinkButton } from "@components/ui";
import getArticlesCards from "@framework/article/get-articles-cards";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Blog } from "@common/types/cms";
import { CMS } from "@common/types";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { blueGrey } from "@mui/material/colors";
import { ConfirmDialog, MouseOverPopover } from "@components/ui";
import useDeleteArticle from "@framework/management/blog/article/use-delete-article";
import Link from "next/link";
interface Props {
  article: CMS.Blog.ArticleCard;
}
const ArticleItem = ({ article }: Props) => {
  const { id } = article;
  const deleteArticle = useDeleteArticle();
  const linkUri = `/management/blog/article/edit/${id}`;
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        "&, & a, & a > *, & .MuiButtonBase-root.MuiIconButton-root": {
          transition: "all .5s ease-in-out",
        },
        "&:hover": {
          boxShadow: "0 35px 15px 0 rgba(0,0,0,.0605)",
        },
        "& a": {
          display: "block",
          width: "100%",
          color: (theme) => theme.palette.articleText.main,
          "&:hover": {
            color: (theme) => theme.palette.primary.main,
          },
        },
        borderRadius: "10px",
      }}
    >
      <Grid container spacing={"2px"}>
        <Grid item xs={12} md={10} lg={11}>
          <Link href={linkUri}>
            <Grid container spacing={"3px"}>
              <Grid item xs={12}>
                {article.title}
              </Grid>
              {article.fragment && (
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: "9pt" }}>
                    {article.fragment}
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <Box color="primary.main" sx={{ fontSize: "9pt" }}>
                    {article.createdAt}
                  </Box>
                  {(typeof article.score === "number" ||
                    typeof article.score === "string") && (
                    <Box
                      sx={{ fontSize: "9pt" }}
                    >{`Релевантность: ${article.score.toString()}`}</Box>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Link>
        </Grid>

        <Grid item xs={12} md={2} lg={1}>
          <Stack width="100%" alignItems={"end"} justifyContent={"end"}>
            <Grid container sx={{ maxWidth: "100px" }} spacing={1}>
              <Grid item xs={6}>
                <MouseOverPopover popoverText={"Удалить"}>
                  <ConfirmDialog
                    confirmCaption="Удалить"
                    message={`Удалить публикацию "${article.title}"?`}
                  >
                    <IconButton
                      sx={{
                        p: "5px",
                        background: "transparent",
                        "&:hover": {
                          background: blueGrey[100],
                        },
                      }}
                      onClick={() => {
                        deleteArticle({ id });
                      }}
                    >
                      <DeleteForeverOutlinedIcon
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                          fontSize: "38px",
                        }}
                      />
                    </IconButton>
                  </ConfirmDialog>
                </MouseOverPopover>
              </Grid>
              <Grid item xs={6}>
                <Link href={linkUri}>
                  <IconButton
                    sx={{
                      p: "6px",
                      background: "transparent",
                      "&:hover": {
                        background: blueGrey[100],
                      },
                    }}
                  >
                    <EditIcon
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                        fontSize: "34px",
                      }}
                    />
                  </IconButton>
                </Link>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ArticleItem;
