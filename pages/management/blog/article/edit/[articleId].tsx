import { ManagementLayout } from "@components/management";
import React from "react";
import { ArticleLayout } from "@components/management/blog";

export default function ArticleCreatePage() {
  return (
    <>
      <ArticleLayout />
    </>
  );
}
ArticleCreatePage.Layout = ManagementLayout;
