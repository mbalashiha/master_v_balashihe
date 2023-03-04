import { CardsLayout } from "@components/site";
import { Typography, Card, Grid, Button, Box } from "@mui/material";
import Head from "next/head";
import { InferGetStaticPropsType } from "next/types";
import Link from "next/link";
import { HugeContainer, LinkButton } from "@components/ui";
import getArticlesCards from "@framework/article/get-articles-cards";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Blog } from "@common/types/cms";

interface Props {
  article: Blog.ArticleCard;
}
const ArticleCard = ({article}: Props) => {
  return <Grid key={article.url} item xs={12}>
    <Card
      elevation={0}
      sx={{
        p: 2,
        "&, & h5, & p": {
          color: (theme) => theme.palette.articleText.main,
        },
        "&, & a, & a > *": {
          transition: "all .5s ease-in-out",
        },
        "&:hover": {
          boxShadow: "0 35px 15px 0 rgba(0,0,0,.0605)",
          "& a": {
            "& button": {
              color: (theme) => theme.palette.articleText.main,
            },
            "&, & > *": {
              color: (theme) => theme.palette.primary.main,
            },
          },
        },
      }}
    >
      <Typography>{article.createdAt}</Typography>
      <Link href={article.url}>
        <Typography component="h5" variant="h5" gutterBottom>
          {article.title}
        </Typography>
      </Link>
      <Box>
        <LinkButton href={article.url} endIcon={<ArrowForwardIosRoundedIcon />}>
          Перейти к статье
        </LinkButton>
      </Box>
    </Card>
  </Grid>;
};
export default ArticleCard;