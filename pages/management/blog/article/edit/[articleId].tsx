import { ManagementLayout } from "@components/management";
import React from "react";
import Head from "next/head";
import { ArticleForm } from "@components/management/blog";

export default function ArticleCreatePage() {
  return (
    <>
      <Head>
        <title>{"Редактор существующей статьи"}</title>
      </Head>
      <ArticleForm />
    </>
  );
}
ArticleCreatePage.Layout = ManagementLayout;
