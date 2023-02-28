import { ArticleLayout } from "@components/site";
import { Typography, Card, Grid, Button, Box } from "@mui/material";
import Head from "next/head";
import { InferGetStaticPropsType } from "next/types";
import Link from "next/link";
import { LinkButton } from "@components/ui";
import getArticlesCards from "@framework/article/get-articles-cards";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <Head>
        <title>Мастер в Балашихе</title>
        <meta
          name="description"
          content="Ремонт материнских плат в Балашихе и Московской области"
        />
      </Head>
      <Grid container spacing={{ xs: 1, lg: 2, xl: 3 }}>
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ width: "100%", height: "800px" }}></Card>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={{ xs: 2, lg: 3 }}>
            {props.pathes.map((article) => (
              <Grid key={article.url} item xs={12}>
                <Card
                  elevation={0}
                  sx={{
                    p: 2,
                    "&, & h5, & p": {
                      color: "#302f5b",
                    },
                    "&, & a, & a > *": {
                      transition: "all .5s ease-in-out",
                    },
                    "&:hover": {
                      boxShadow: "0 35px 15px 0 rgba(0,0,0,.0605)",
                      "& a": {
                        "& button": {
                          color: "#302f5b",
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
                    <LinkButton
                      href={article.url}
                      endIcon={<ArrowForwardIosRoundedIcon />}
                    >
                      Перейти к статье
                    </LinkButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
Page.Layout = ArticleLayout;
export async function getStaticProps() {
  return {
    props: {
      pathes: await getArticlesCards(),
    },
  };
}
