import React, { useCallback } from "react";
import { useState, useContext, useMemo, ReactNode } from "react";
type InnerRef<T> = React.MutableRefObject<any | null>;

interface ContextType {}
const FormContext = React.createContext<Partial<ContextType>>({});
interface Props {
  children: React.ReactNode | React.ReactNode[];
}
export const ArticleProvider = ({ children }: Props) => {
  const providerConfig = useMemo(() => {
    return {};
  }, []);
  return (
    <FormContext.Provider value={providerConfig}>
      {children}
    </FormContext.Provider>
  );
};

export const useArticleContext = () => {
  return useContext(FormContext) as ContextType;
};
