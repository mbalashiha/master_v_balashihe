export { default as ArticleTextEditor } from "./editor";
export { default as ArticleKeyTextEditor } from "./ArticleKeyTextEditor";
import dinamyc from "next/dynamic";
export const ArticleForm = dinamyc(() => import("./ArticleForm"), {
  ssr: false,
});
