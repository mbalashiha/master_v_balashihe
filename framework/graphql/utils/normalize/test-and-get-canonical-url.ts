import { getCanonicalUrl } from "./normalize-article";

export const testAndGetCanonicalUrl = (url: string): string => {
  if (!/^((\w+)?\:)?\/\//im.test(url)) {
    return getCanonicalUrl(url);
  } else {
    return url;
  }
};
