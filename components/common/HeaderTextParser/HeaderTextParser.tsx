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
  htmlText: string;
}
const options = {
  trim: true,
  replace: (domNode: any) => {
    if (domNode.name) {
      const { attribs, children } = domNode;
      const convertedProps = attributesToProps(attribs);
      delete convertedProps.children;
      /** if (Array.isArray(children) && children.length > 0) {
        if (domNode.name !== "pre") {
          /// Cleaning spaces in text nodes:
          children.forEach((ch) => {
            if (ch && ch.type === "text" && ch.data) {
              ch.data = ch.data.replace(/[\s]{2,}/gim, " ");
            }
          });
        }
      } **/
      const Children: string | JSX.Element | JSX.Element[] | undefined =
        children && <>{domToReact(children, options)}</>;
      switch (domNode.name) {
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
          return <>{Children}</>;
          break;
        case "a":
        case "link":
          return <Link {...(convertedProps as any)}>{Children}</Link>;
          break;
        case "img":
        case "image":
          return <></>;
          break;
        default:
          return <p {...(convertedProps as any)}>{Children}</p>;
      }
    } else if (domNode && domNode.type === "text" && domNode.data) {
      domNode.data = domNode.data.replace(/[\s]{2,}/gim, " ");
      return domNode;
    }
    return domNode;
  },
};
const HeaderTextParser = memo<Props>(function HeaderTextParser({
  htmlText,
}: Props) {
  return <>{parse(htmlText, options)}</>;
});
export default HeaderTextParser;
