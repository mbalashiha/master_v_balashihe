import { ManagementLayout } from "@components/management";
import React from "react";
import Head from "next/head";
import { ArticleForm } from "@components/management/blog";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import util from "util";
import { Blog } from "@common/types/cms";
import { ID } from "@framework/types";
import getArticleEdit from "@framework/article/get-article-edit";

export default function ArticleCreatePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
      <Head>
        <title>{"Редактор существующей статьи"}</title>
      </Head>
      <ArticleForm article={props.article} />
    </>
  );
}
ArticleCreatePage.Layout = ManagementLayout;

export const getServerSideProps: GetServerSideProps<{
  article: Blog.ArticleDraft;
}> = async (ctx) => {
  let q = ctx.query.articleId;
  const articleId = Array.isArray(q) ? q[0] : q ? q : null;
  let article: Blog.ArticleDraft | undefined;
  if (articleId) {
    try {
      article = await getArticleEdit({ articleId }, ctx);
    } catch (e: any) {
      if (e.message === "Manager Unauthorized") {
        return {
          redirect: {
            destination: "/management/login",
            permanent: false,
          },
        };
      } else {
        throw new Error(e);
      }
    }
  }
  if (!article) {
    return {
      notFound: true,
    };
  }
  return { props: { article } };
};
