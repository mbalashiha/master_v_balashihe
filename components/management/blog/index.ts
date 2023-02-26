export { default as ArticleTextEditor } from "./editor";
import dinamyc from "next/dynamic";
export const ArticleForm = dinamyc(() => import("./ArticleForm"), {
  ssr: false,
});
