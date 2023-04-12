import React, { useState, FC, memo } from "react";
import {
  Container,
  Grid,
  Card,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Article } from "@components/common/Article";

import parse, {
  attributesToProps,
  HTMLReactParserOptions,
  Element,
  domToReact,
} from "html-react-parser";

interface Props {
  descriptionHTML: string;
}
const options = {
  trim: true,
  replace: (domNode: any) => {
    if (domNode.name) {
      const { attribs, children } = domNode;
      const convertedProps = attributesToProps(attribs);
      delete convertedProps.children;
      if (Array.isArray(children) && children.length > 0) {
        if (domNode.name !== "pre") {
          /// Cleaning spaces in text nodes:
          children.forEach((ch) => {
            if (ch && ch.type === "text" && ch.data) {
              ch.data = ch.data.replace(/[\s]{2,}/gim, " ");
            }
          });
        }
      }
      const Children: string | JSX.Element | JSX.Element[] | undefined =
        children && <>{domToReact(children, options)}</>;
      switch (domNode.name) {
        case "typography":
          if (typeof convertedProps.gutterBottom === "string") {
            convertedProps.gutterBottom = true as any;
          }
          return (
            <Typography {...(convertedProps as any)}>{Children}</Typography>
          );
          break;
        case "paper":
          return (
            <Paper {...(convertedProps as any)} component="div">
              {Children}
            </Paper>
          );
          break;
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          if (typeof convertedProps.gutterBottom === "string") {
            convertedProps.gutterBottom = true as any;
          }
          return (
            <Typography
              {...(convertedProps as any)}
              component={domNode.name}
              variant={domNode.name}
            >
              {Children}
            </Typography>
          );
          break;
        case "ul":
          return (
            <Paper component="div">
              <ul {...(convertedProps as any)}>{Children}</ul>
            </Paper>
          );
          break;
        case "tbody":
          return <>{Children}</>;
          break;
        case "thead":
          return <>{Children}</>;
          break;
        case "tfoot":
          return <>{Children}</>;
          break;
        case "table":
          return (
            <Paper
              component="div"
              sx={{
                "&, & > table": {
                  width: "100%",
                  "& td": {
                    px: 2,
                    py: 0.5,
                  },
                },
              }}
            >
              <Grid container component="div">
                {Children}
              </Grid>
            </Paper>
          );
          break;
        case "tr":
        case "th":
          // eslint-disable-next-line react/jsx-no-undef
          return (
            <Grid item xs={12} component="div">
              <Grid container component="div">
                {Children}
              </Grid>
            </Grid>
          );
          break;
        case "td":
          // eslint-disable-next-line react/jsx-no-undef
          return (
            <Grid item xs={12} md={6} component="div" px={1} py={0.5}>
              {Children}
            </Grid>
          );
          break;
        case "a":
        case "link":
          return <Link {...(convertedProps as any)}>{Children}</Link>;
          break;
        case "img":
        case "image":
          const width = parseInt(
            convertedProps.width || convertedProps["data-original-width"] || "0"
          );
          const height = parseInt(
            convertedProps.height ||
              convertedProps["data-original-height"] ||
              "0"
          );
          const src = (convertedProps.src || "").replace(
            /^(\.\.(\/)+)+/gim,
            "/"
          );
          if (!src) {
            return <></>;
          }
          const title = convertedProps.title || "";
          const alt = convertedProps.alt || "";
          return (
            <>
              <Image
                src={src}
                alt={alt}
                title={title}
                width={width}
                height={height}
                onLoad={(event: any) => {
                  const target = (event.target ||
                    event.currentTarget) as HTMLImageElement;
                  if (
                    target.parentElement?.offsetWidth &&
                    target.offsetWidth > target.parentElement?.offsetWidth
                  ) {
                    target.setAttribute("width", "auto");
                    target.setAttribute("height", "auto");
                    target.style.width = "100%";
                    target.style.height = "auto";
                  }
                }}
              />
              <>{Children}</>
            </>
          );
          break;
        case "div":
          if (convertedProps["data-images-container"]) {
            return (
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
              >
                {Children}
              </Box>
            );
          } else if (convertedProps["data-component-tag"]) {
            switch (convertedProps["data-component-tag"]) {
              case "table":
                return (
                  <Paper sx={{ p: 1, m: 0, "&&": { marginBottom: "1.3rem" } }}>
                    {Children}
                  </Paper>
                );
                break;
              case "tbody":
                return <>{Children}</>;
                break;
              case "thead":
                return <h4>{Children}</h4>;
                break;
              case "tfoot":
                return <h4>{Children}</h4>;
                break;
              case "tr":
                return (
                  <Grid container spacing={1}>
                    {Children}
                  </Grid>
                );
                break;
              case "td":
                return (
                  <Grid item xs={12} sm={6}>
                    {Children}
                  </Grid>
                );
                break;
              case "th":
                return (
                  <Grid item xs={12} sm={6}>
                    {Children}
                  </Grid>
                );
                break;
            }
          }
      }
      if (
        [
          "script",
          "style",
          "form",
          "input",
          "textarea",
          "frame",
          "iframe",
        ].includes(domNode.name)
      ) {
        return <></>;
      }
    }
    return domNode;
  },
};
const DescriptionParser = memo<Props>(function HtmlDescriptionParser({
  descriptionHTML,
}: Props) {
  return <>{parse(descriptionHTML, options)}</>;
});
export default DescriptionParser;
