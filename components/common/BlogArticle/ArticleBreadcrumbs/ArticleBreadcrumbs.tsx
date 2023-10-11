import { Box, Stack } from "@mui/material";
import Link from "next/link";
import { useMemo } from "react";

interface Props {
  title: string;
  url: string;
}

export default function ArticleBreadcrumbs({ title, url }: Props) {
  const pathArray = useMemo(() => {
    return [
      { href: "/", title: "Главная" },
      { href: "/uslugi-mastera-v-balashihe/", title: "Компьютерный мастер" },
      { href: url, title: title },
    ];
  }, [title, url]);
  return (
    <Stack
      component="ul"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
      direction="row"
      flexWrap="wrap"
      sx={{
        px: 0,
        mx: 0,
        py: 0,
        my: 0,
        "& li": {
          display: "flex",
          flexDirection: "row",
          px: 0,
          mx: 0,
          "&:after": {
            content: `"/"`,
            px: "5px",
          },
          "& > *": {
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            maxWidth: "300px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        },
        "& li:last-of-type": {
          "&:after": {
            content: `""`,
            px: 0,
          },
          "& a": {
            color: "grey",
            cursor: "default",
          },
        },
      }}
    >
      {pathArray.map(({ href, title }, i) => (
        <li
          key={href + "_" + title}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link href={href} title={title} itemProp="item">
            <span itemProp="name">{title}</span>
            <meta itemProp="position" content={i.toString()} />
          </Link>
        </li>
      ))}
    </Stack>
  );
}
