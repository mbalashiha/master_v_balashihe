import { ManagementLayout } from "@components/management";
import React from "react";
import { ArticleForm } from "@components/management/blog";
import Head from "next/head";

export default function ArticleCreatePage() {
  return (
    <>
      <Head>
        <title>{"Создание новой статьи"}</title>
      </Head>
      <ArticleForm />
    </>
  );
}
ArticleCreatePage.Layout = ManagementLayout;
