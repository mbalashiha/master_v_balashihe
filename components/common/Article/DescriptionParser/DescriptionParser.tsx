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
    if (domNode instanceof Element && domNode.attribs) {
      const { attribs, children } = domNode;
      const convertedProps = attributesToProps(domNode.attribs);
      delete convertedProps.children;
      switch (domNode.name) {
        case "typography":
          return (
            <Typography {...(convertedProps as any)}>
              {domToReact(children, options)}
            </Typography>
          );
          break;
        case "paper":
          return (
            <Paper {...(convertedProps as any)}>
              {domToReact(children, options)}
            </Paper>
          );
          break;
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return (
            <Typography
              {...(convertedProps as any)}
              component={domNode.name}
              variant={domNode.name}
            >
              {domToReact(children, options)}
            </Typography>
          );
          break;
        case "ul":
          return (
            <Paper>
              <ul {...(convertedProps as any)}>
                {domToReact(children, options)}
              </ul>
            </Paper>
          );
          break;
        case "a":
        case "link":
          return (
            <Link {...(convertedProps as any)}>
              {domToReact(children, options)}
            </Link>
          );
          break;
        case "img":
        case "image":
          return (
            <Image
              {...(convertedProps as any)}
              src={convertedProps.src || ""}
              alt={convertedProps.alt || ""}
              width={parseInt(convertedProps.width)}
              height={parseInt(convertedProps.height)}
              fill
            >
              {domToReact(children, options)}
            </Image>
          );
          break;
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
