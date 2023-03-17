import { ArticleLayout } from "@components/site";
import { Container, Grid, Card, Paper } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Article, DescriptionParser } from "@components/common/Article";
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
  const { article } = props;
  const { renderHtml } = article;
  return (
    <>
      <Head>
        <title>{`Мастер в Балашихе - ${article.title}`}</title>
        <meta
          name="description"
          content={`Мастер по ремонту в Балашихе и Московской области - ${article.title}`}
        />
      </Head>
      <Article title={article.title} navigation={article.navigation}>
        <DescriptionParser descriptionHTML={renderHtml} />
      </Article>
    </>
  );
}
Page.Layout = ArticleLayout;
