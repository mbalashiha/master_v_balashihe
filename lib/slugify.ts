import { default as originalSlugify } from "slugify";

export const slugify = function slugify(
  string: string,
  options?:
    | {
        replacement?: string;
        remove?: RegExp;
        lower?: boolean;
        strict?: boolean;
        locale?: string;
        trim?: boolean;
      }
    | string
): string {
  return originalSlugify(string.replace(/[\[\]]+/gim, "-bracket-"), options)
    .replace(/[\/\\_\!\>\<\.\(\)]/gim, "-")
    .replace(/\-{2,}/gim, "-")
    .replace(/[\-]+$/im, "")
    .toLowerCase();
};
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const slugifyAbsUrl = (value: string) => {
  value = (value || "").trim();
  if (value && value !== "/") {
    value =
      "/" +
      value
        .split(/\s*[\/\\]+\s*/gim)
        .filter((el) => Boolean(el.length))
        .map((el) => slugify(el))
        .join("/");
  }
  return value;
};
