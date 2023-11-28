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
    <Grid
      key={article.url}
      item
      xs={12}
      sx={{
        "& > a": {
          display: "block",
          borderRadius: "16px",
          transitionDuration: 0,
          transitionTimingFunction: "ease-in-out",
          transitionProperty: "none",
        },
      }}
    >
      <Link
        itemProp="blogPosts"
        itemScope
        itemType="https://schema.org/BlogPosting"
        href={article.url}
      >
        <Button
          sx={{
            width: "100%",
            display: "block",
            textAlign: "left",
            border: "none",
            borderRadius: "inherit",
            background: "#F8F8F8",
            p: 0,
            m: 0,
            px: 4,
            py: 2,
            transitionDuration: "0.3s",
            transitionTimingFunction: "ease-in-out",
            transitionProperty: "all",
            "& h5": {
              textTransform: "none",
            },
            "&:hover": {
              background: (theme) => theme.palette.primary.light,
              boxShadow: "0 4px 15px 1px rgba(0,0,0,.15)",
              "& h5, & time": {
                color: "white",
              },
              "& .action": {
                color: "#21201f",
              },
            },
            "& div, & time": {
              transitionProperty: "none",
              transitionDuration: 0,
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
          <meta itemProp="url" content={article.url} />
          {article.image?.canonicalUrl && (
            <meta itemProp="image" content={article.image?.canonicalUrl} />
          )}
          <Typography
            itemProp="description"
            component="h5"
            variant="h5"
            gutterBottom
          >
            {article.title}
          </Typography>
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
                fontWeight: 400,
              }}
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 0, sm: 2, xl: 3 }}
              alignItems="center"
            >
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent={"center"}
                className="action"
                sx={{
                  lineHeight: "24px",
                  background: "#e7e7e7",
                  p: "4px 4px 4px 10px",
                  borderRadius: "6px",
                  color: "#21201f",
                  "&:after": {
                    content: `"\\e5c8"`,
                    fontFamily: "Material Icons",
                    fontWeight: 400,
                    color: "#21201f",
                    fontSize: "23px",
                    lineHeight: "18px",
                    mt: 0,
                  },
                }}
              >
                <div>Перейти к статье</div>
              </Stack>
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
                  "&:before": {
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
        </Button>
      </Link>
    </Grid>
  );
};
export default ArticleCard;
