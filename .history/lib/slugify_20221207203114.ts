import { default as originalSlugify } from "slugify";

export const slugify: typeof originalSlugify = ((
  name: string,
  options?:
    | string
    | {
        replacement?: string | undefined;
        remove?: RegExp | undefined;
        lower?: boolean | undefined;
        strict?: boolean | undefined;
        locale?: string | undefined;
        trim?: boolean | undefined;
      }
    | undefined
) =>
  originalSlugify(name, options)
    .replace(/[\/\\_\!\>\<\.]/gim, "-")
    .replace(/\-{2,}/gim, "-")
    .toLowerCase());
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
