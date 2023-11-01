import { Blog, Management } from "@common/types/cms";
import { ID } from "@framework/types";
import React from "react";
import { createContext, useContext, useMemo } from "react";
import { KeyedMutator } from "swr";
export interface SearchConfig {
  search: string;
  setSearchQuery: (search: string) => void;
  updateArticleList: KeyedMutator<{
    search: string;
    articles: Blog.ArticleCard[];
  }>;
}
export const SearchContext = createContext<Partial<SearchConfig>>({});

interface Props {
  children: React.ReactNode | React.ReactNode[];
  search: string;
  updateArticleList: SearchConfig["updateArticleList"];
}

export const SearchProvider = ({
  children,
  search: inSearch,
  updateArticleList,
}: Props) => {
  const [search, setSearchQuery] = React.useState(inSearch || "");
  return (
    <SearchContext.Provider
      value={{ search, setSearchQuery, updateArticleList }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchProvider = () => {
  return useContext(SearchContext) as SearchConfig;
};
