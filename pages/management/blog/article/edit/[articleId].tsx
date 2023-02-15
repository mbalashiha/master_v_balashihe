import { ManagementLayout } from "@components/management";
import React from "react";
import { ArticleForm } from "@components/management/blog";

export default function ArticleCreatePage() {
  return (
    <>
      <ArticleForm />
    </>
  );
}
ArticleCreatePage.Layout = ManagementLayout;
