import { ArticleLayout } from "@components/site";
import { Container, Grid, Card, Paper } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ContactArticleComponent } from "@components/common/ContactArticle";
import getArticlesPathes from "@framework/article/get-articles-pathes";
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import getArticleByHandle from "@framework/article/get-article-by-handle";
import util from "util";
import { renderToString } from "react-dom/server";
import { ApiProvider } from "@framework";
import { BlogArticle } from "@components/common/BlogArticle";

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
  if (!article || !article.title || !article.url) {
    throw new Error("404");
  }
  return {
    props: { article, handle: slug },
  };
};
export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { article } = props;
  const { renderHtml, image, navigation, title } = article;
  const articleElement = article.templateId ? (
    <ContactArticleComponent {...article} />
  ) : (
    <BlogArticle {...article} />
  );
  return (
    <>
      <Head>
        <title>{`${article.title}Мастер по ремонту в Балашихе и Московской области `}</title>
        <meta
          name="description"
          content={`${
            article.h2 || article.title
          } Мастер по ремонту в Балашихе и Московской области`}
        />
      </Head>
      {articleElement}
    </>
  );
}
Page.Layout = ArticleLayout;
