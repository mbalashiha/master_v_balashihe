import { Container, Grid, Card, Paper } from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DescriptionParser } from "@components/common/Article";
import React from "react";
import { fitWidth } from "@lib/aspect-ration-fit";
import { Blog } from "@common/types/cms";
interface Props {
  article: Blog.Article;
}
export default function Hero({ article }: Props) {
  if (!article || !article.renderHtml) {
    throw new Error("No article for this page!");
  }
  let { renderHtml, title, image } = article;
  image = React.useMemo(() => {
    if (image && image.width) {
      const { width, height } = fitWidth(image.width, image.height, 230);
      image.width = width;
      image.height = height;
      return image;
    } else {
      return image;
    }
  }, [image]);
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography
          component="h1"
          variant="h1"
          mb={2}
          pb={0}
          sx={{ textAlign: "center" }}
        >
          Давайте познакомимся
        </Typography>
        <Grid container>
          {image && (
            <Grid
              item
              xs={12}
              md={4.12}
              sx={{
                zIndex: 0,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-end",
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  p: 0.7,
                  pb: 0.1,
                  marginBottom: { xs: "15px", md: 0 },
                  marginTop: { md: "20px" },
                  marginRight: { md: "-26px" },
                  borderRadius: (theme) => theme.shape.borderRadius - 5 + "px",
                  "& img": {
                    borderRadius: (theme) =>
                      theme.shape.borderRadius - 10 + "px",
                  },
                }}
              >
                <Image
                  src={image.url}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                ></Image>
              </Paper>
            </Grid>
          )}
          <Grid item xs={12} md={7.88}>
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
                  fontFamily: `Roboto, "Segoe UI", Tahoma, Verdana, Arial`,
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
