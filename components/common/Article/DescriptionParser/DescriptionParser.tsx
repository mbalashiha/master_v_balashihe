import React, { useState, FC, memo } from "react";
import { Container, Grid, Card, Paper } from "@mui/material";
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
    const { attribs, children } = domNode;
    const Children: string | JSX.Element | JSX.Element[] | undefined =
      children && <>{domToReact(children, options)}</>;
    if (domNode.name) {
      const convertedProps = attributesToProps(domNode.attribs);
      delete convertedProps.children;
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
          return <Paper {...(convertedProps as any)}>{Children}</Paper>;
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
            <Paper>
              <ul {...(convertedProps as any)}>{Children}</ul>
            </Paper>
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
