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
) => {
  return originalSlugify(name, options)
    .replace(/[\/\\_\!\>\<\.]/gim, "-")
    .replace(/\-{2,}/gim, "-")
    .toLowerCase();
}) as any;
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
