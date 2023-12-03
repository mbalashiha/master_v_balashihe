import { BottomContactsWithMap } from "@components/site/LandingPage/BottomContactsWithMap";
import { ArticleLayout } from "@components/site";
import { Container, Grid, Card, Paper } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { ContactArticleComponent } from "@components/common/ContactArticle";
import getArticlesPathes from "@framework/article/get-articles-pathes";
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import getArticleByHandle from "@framework/article/get-article-by-handle";
import { BlogArticle } from "@components/common/BlogArticle";
import util from "util";

export async function getStaticPaths() {
  const paths = await getArticlesPathes({ filename: __filename });
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string | string[] }>
) => {
  const { params } = context;
  const slug = (params && params.slug) || "";
  const article = await getArticleByHandle({
    filename: __filename,
    handle: Array.isArray(slug) ? slug.join("/") : slug,
  });
  if (!article || !article.title || !article.url) {
    return {
      notFound: true,
    };
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
  const articleElement =
    article.templateId === 2 ? (
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
      <>{articleElement}</>
      <BottomContactsWithMap />
    </>
  );
}
Page.Layout = ArticleLayout;
