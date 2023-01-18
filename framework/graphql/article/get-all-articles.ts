import { fetchApi } from "@framework/utils";
import { getAllArticlesQuery } from "./queries";

const getAllArticles = async (): Promise<number[]> => {
  const articles = await fetchApi({ query: getAllArticlesQuery });
  console.log(articles);
  debugger;
  return articles;
};

export default getAllArticles;
