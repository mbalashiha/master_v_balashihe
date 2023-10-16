import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Button,
  Container,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { Blog } from "@common/types/cms";
import React from "react";

interface Props {
  articlesList: Blog.NavigationItem[];
  ariaLabel?: string;
}

export default function NavigationList({ articlesList, ariaLabel }: Props) {
  return (
    <Container
      component="nav"
      maxWidth="sm"
      sx={{
        float: "left",
        "&&": {
          paddingLeft: 0,
          paddingRight: 0,
        },
      }}
      aria-label={ariaLabel || "Навигация по публикациям"}
    >
      <Stack
        component="ul"
        spacing="12px"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
        sx={{
          listStyleType: "none",
          m: 0,
          p: 0,
          "& li::before": {
            fontFamily: "Material Icons Round",
            fontStyle: "normal",
            content: `"\\e5c8"`,
            paddingLeft: 0,
            paddingRight: "7px",
            paddingTop: 0,
            color: (theme) => theme.palette.articleText.main,
            fontSize: "20px",
            lineHeight: "20px",
          },
          "& li": {
            display: "flex",
            flexDirection: "row",
          },
          "& a, & div": {
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "22px",
            maxHeight: "44px",
            overflow: "hidden",
          },
          "& a": {
            color: (theme) => theme.palette.articleText.main,
          },
        }}
      >
        {articlesList.map((el) => (
          <li itemProp="name" key={el.title + "_" + (el.url || "")}>
            {el.active ? (
              <div>{el.title}</div>
            ) : (
              <Link itemProp="url" href={el.url}>
                {el.title}
              </Link>
            )}
          </li>
        ))}
      </Stack>
    </Container>
  );
}
