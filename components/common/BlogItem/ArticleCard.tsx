import { CardsLayout } from "@components/site";
import { Typography, Card, Grid, Button, Box, Stack } from "@mui/material";
import Head from "next/head";
import { InferGetStaticPropsType } from "next/types";
import Link from "next/link";
import { HugeContainer, LinkButton } from "@components/ui";
import getArticlesCards from "@framework/article/get-articles-cards";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Blog } from "@common/types/cms";
import { grey, blueGrey } from "@mui/material/colors";
import { standartCssTransition } from "@components/ui/theme/mui-theme";

interface Props {
  article: Blog.ArticleCard;
}
const ArticleCard = ({ article }: Props) => {
  return (
    <Grid key={article.url} item xs={12}>
      <Card
        itemProp="blogPosts"
        itemScope
        itemType="https://schema.org/BlogPosting"
        elevation={0}
        sx={{
          p: 2,
          boxShadow:
            "#0000001a 0rem 0.25rem 0.375rem -0.0625rem, #0000000f 0rem 0.125rem 0.25rem -0.0625rem",
          "&, & h5, & p": {
            color: (theme) => theme.palette.articleText.main,
          },
          "&:hover": {
            ...standartCssTransition,
            boxShadow: "0 35px 15px 0 rgba(0,0,0,.0605)",
            color: (theme) => theme.palette.primary.dark,
            "& a": {
              "& button": {
                color: (theme) => theme.palette.primary.dark,
              },
              "&, & > *": {
                color: (theme) => theme.palette.primary.dark,
              },
            },
          },
        }}
      >
        <link
          itemProp="mainEntityOfPage"
          itemScope
          itemType="https://schema.org/WebPage"
          itemID={article.canonicalUrl}
          href={article.canonicalUrl}
        />
        <meta itemProp="datePublished" content={article.datePublished} />
        <meta itemProp="dateModified" content={article.dateModified} />
        {article.image?.canonicalUrl && (
          <meta itemProp="image" content={article.image?.canonicalUrl} />
        )}
        <Link itemProp="url" href={article.url}>
          <Typography
            itemProp="description"
            component="h5"
            variant="h5"
            gutterBottom
          >
            {article.title}
          </Typography>
        </Link>
        {article.fragment && (
          <Box sx={{ mb: "6px" }}>
            <Typography>{article.fragment}</Typography>
          </Box>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 0, sm: 1 }}
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Stack
            sx={{
              flexGrow: 1,
            }}
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 0, sm: 2, xl: 3 }}
            alignItems="center"
          >
            <Box>
              <LinkButton
                href={article.url}
                endIcon={<ArrowForwardIosRoundedIcon />}
              >
                Перейти к статье
              </LinkButton>
            </Box>
            {(typeof article.score === "number" ||
              typeof article.score === "string") && (
              <Box color="primary.main">{`Релевантность: ${article.score.toString()}`}</Box>
            )}
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              "&, & > *": {
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "23px",
                textTransform: "none",
              },
              justifyContent: "center",
              alignItems: "center",
              "& .material-icons-round": {
                fontSize: "16px",
                lineHeight: "23px",
              },
            }}
            spacing={"4px"}
          >
            <Box className="material-icons-round" aria-hidden="true">
              schedule
            </Box>
            <Box
              itemProp="datePublished"
              component="time"
              dateTime={article.datePublished}
              sx={{ minWidth: "140px" }}
            >
              {article.humanDates.datePublished}
            </Box>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
};
export default ArticleCard;
