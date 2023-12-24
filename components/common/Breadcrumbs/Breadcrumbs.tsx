import { Box, Stack } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
  path: {
    href?: string;
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
      spacing={0}
      sx={{
        p: 0,
        m: 0,
        maxWidth: "95vw",
        overflow: "hidden",
        listStyleType: "none",
        gap: "5px",
        "& > li": {
          p: 0,
          m: 0,
          fontSize: "14px",
          lineHeight: "18px",
          color: "transparent",
          background: "transparent",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          "& > *": {
            color: (theme) => theme.palette.text.primary,
            fontFamily: `var(--header-font-family)`,
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "18px",
            transitionProperty: "none",
            background: "#F5F4F2",
            pl: "9px",
            pr: "2px",
            py: "4px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            "&:after": {
              display: "block",
              pl: 0,
              pr: 0,
              content: `"\\e409"`,
              fontFamily: "Material Icons",
              fontWeight: 300,
              color: (theme) => theme.palette.text.secondary,
              fontSize: "15px",
              lineHeight: "18px",
              transform: "scale(1.4)",
              mb: "-2.5px",
            },
            "& > span": {
              maxWidth: "400px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              transitionProperty: "color, text-decoration",
              transitionDuration: ".1s",
              transitionTimingFunction: "ease-in-out",
            },
          },
          "& > a": {
            "&:hover": {
              color: "black",
              "& > span": {
                textDecoration: "underline",
              },
            },
          },
        },
        "& li:last-of-type > *": {
          pr: "9px",
          "&:after": {
            content: `""`,
            display: "none",
          },
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
          {href ? (
            <Link href={href} title={title} itemProp="item">
              <span itemProp="name">{title}</span>
              <meta itemProp="position" content={i.toString()} />
            </Link>
          ) : (
            <div itemProp="item">
              <span itemProp="name">{title}</span>
              <meta itemProp="position" content={i.toString()} />
            </div>
          )}
        </li>
      ))}
    </Stack>
  );
}
