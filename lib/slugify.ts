import { default as originalSlugify } from "slugify";

export const slugify = function slugify(string: string, options?: {
    replacement?: string;
    remove?: RegExp;
    lower?: boolean;
    strict?: boolean;
    locale?: string;
    trim?: boolean;
} | string): string {
  return originalSlugify(string, options)
    .replace(/[\/\\_\!\>\<\.]/gim, "-")
    .replace(/\-{2,}/gim, "-")
    .toLowerCase();
}
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
