import { Management } from "@common/types/cms";
import { FabButtonProvider } from "@components/management/Layout";
import { ID } from "@framework/types";
import React from "react";
import { createContext, useContext, useMemo } from "react";
import { KeyedMutator } from "swr";
export interface SearchConfig {
  search: string;
  setSearchQuery: (search: string) => void;
}
export const SearchContext = createContext<Partial<SearchConfig>>({});

interface Props {
  children: React.ReactNode | React.ReactNode[];
  search: string;
}

export const SearchProvider = ({ children, search: inSearch }: Props) => {
  const [search, setSearchQuery] = React.useState(inSearch || "");
  return (
    <SearchContext.Provider value={{ search, setSearchQuery }}>
      <FabButtonProvider>{children}</FabButtonProvider>
    </SearchContext.Provider>
  );
};

export const useSearchProvider = () => {
  return useContext(SearchContext) as SearchConfig;
};
