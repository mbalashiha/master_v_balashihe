import { Container, Grid, Card, Paper } from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef } from "react";
import { Blog } from "@common/types/cms";
import useCountViews from "@framework/site/use-count-views";
import { DescriptionParser } from "@components/common/BlogArticle";
interface Props {
  article: Blog.Article;
}
export default function Hero({ article }: Props) {
  if (!article || !article.renderHtml) {
    throw new Error("No article for this page!");
  }
  let { renderHtml, title, image } = article;
  const countViews = useCountViews();
  const countViewsRef = useRef(countViews);
  useEffect(() => {
    countViewsRef.current = countViews;
  }, [countViews]);
  useEffect(() => {
    if (article.id) {
      const countViews = countViewsRef.current;
      countViews({ articleId: article.id });
    }
  }, [article.id]);
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, pb: "55px" }}>
        <Typography
          component="h1"
          variant="h1"
          mb={{ xs: "4px", xl: 2 }}
          pb={0}
          sx={{ textAlign: "center" }}
        >
          Давайте познакомимся
        </Typography>
        <Grid container spacing={{ xs: "1.2rem", xl: 0 }}>
          {image && (
            <Grid
              item
              xs={12}
              xl={4.12}
              sx={{
                zIndex: 0,
                display: "flex",
                alignItems: { xs: "center", xl: "flex-start" },
                justifyContent: { xs: "center", xl: "flex-end" },
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  maxWidth: "100vw",
                  "& > img": {
                    maxWidth: { xs: "100%", sm: "inherit" },
                    height: "auto",
                    borderRadius: (theme) =>
                      theme.shape.borderRadius - 10 + "px",
                  },
                  p: 0.7,
                  pb: 0.1,
                  marginBottom: { xs: 0, xl: 0 },
                  marginTop: { xs: 0, xl: "20px" },
                  marginRight: { xs: 0, md: "-26px" },
                  borderRadius: (theme) => theme.shape.borderRadius - 5 + "px",
                }}
              >
                <Image
                  src={image.url}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  quality={100}
                ></Image>
              </Paper>
            </Grid>
          )}
          <Grid item xs={12} xl={7.88}>
            <Paper
              sx={{
                border: "12px solid",
                borderColor: (theme) => theme.palette.background.paper,
                borderRadius: "24px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  border: "3px solid",
                  borderColor: (theme) => theme.palette.primary.light,
                  borderRadius: (theme) => theme.shape.borderRadius - 9 + "px",
                  p: 3,
                  pb: 0,
                  pr: 1,
                  fontFamily: "var(--text-font-family)",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "28px",
                  color: (theme) =>
                    theme.palette.mode === "light" ? "#04040a" : "white",
                }}
              >
                <DescriptionParser descriptionHTML={renderHtml} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
