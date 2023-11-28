import { Typography, Card, Grid, Button, Box, Stack } from "@mui/material";
import Link from "next/link";
import { HugeContainer, LinkButton } from "@components/ui";
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
          px: 4,
          py: 2,
          background: "#F8F8F8",
          borderRadius: "16px",
          "&, & h5, & p": {},
          transitionDuration: "0.3s",
          transitionTimingFunction: "ease",
          "&:hover": {
            background: "white",
            boxShadow: "0 4px 15px 1px rgba(0,0,0,.15)",
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
        <meta itemProp="datePublished" content={article.datePublishedISO} />
        <meta itemProp="dateModified" content={article.dateModifiedISO} />
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
            }}
            spacing={"4px"}
          >
            <Box
              itemProp="datePublished"
              component="time"
              dateTime={article.datePublishedISO}
              sx={{
                minWidth: "110px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                "&::before": {
                  display: "inline-block",
                  fontFamily: "Material Icons Round",
                  fontStyle: "normal",
                  content: `"\\ebcc"`,
                  pr: "4px",
                  fontSize: "16px",
                  lineHeight: "23px",
                },
              }}
            >
              {article.publishedDate}
            </Box>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
};
export default ArticleCard;
