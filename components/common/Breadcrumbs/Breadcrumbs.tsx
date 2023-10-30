import { Box, Stack } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
  path: {
    href: string;
    title: string;
  }[];
};

export default function Breadcrumbs({ path }: Props) {
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
        mb: "8px",
        maxWidth: "95vw",
        overflow: "hidden",
        "& li": {
          display: "flex",
          flexDirection: "row",
          px: 0,
          mx: 0,
          "&, & > *": {
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "24px",
          },
          "&:after": {
            content: `"/"`,
            px: "4px",
            color: grey[600],
          },
          "& > *": {
            maxWidth: "340px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
          "& a": {
            color: blueGrey[900],
            transitionProperty: "none",
            transitionDuration: 0,
            "&:hover": {
              transitionProperty: "none",
              transitionDuration: 0,
              color: "black",
              textDecoration: "underline",
            },
          },
        },
        "& li:last-of-type": {
          "&:after": {
            content: `""`,
            px: 0,
          },
          // "& a": {
          //   color: grey[600],
          //   cursor: "default",
          //   "&:hover": {
          //     textDecoration: "none",
          //   },
          // },
        },
      }}
    >
      {path.map(({ href, title }, i) => (
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
