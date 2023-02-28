import { ArticleLayout } from "@components/site";
import { Container, Grid, Card, Paper } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Article } from "@components/common/Article";
import getArticlesPathes from "@framework/article/get-articles-pathes";
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import getArticleByHandle from "@framework/article/get-article-by-handle";
import util from "util";

export async function getStaticPaths() {
  const paths = await getArticlesPathes();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const { params } = context;
  const slug = (params && params.slug) || "";
  const article = await getArticleByHandle({ handle: slug });
  return {
    props: { article, handle: slug },
  };
};
export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  console.log(props);
  //   debugger;
  return (
    <>
      <Head>
        <title>Мастер в Балашихе</title>
        <meta
          name="description"
          content="Ремонт материнских плат в Балашихе и Московской области"
        />
      </Head>
      <Article title={`в Балашихе и Московской области`}>
        <Typography component="h2" variant="h2" gutterBottom></Typography>
        <p></p>
      </Article>
    </>
  );
}
Page.Layout = ArticleLayout;
