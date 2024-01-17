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
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Script from "next/script";
import type { Element, DOMNode, Text } from "html-react-parser";
import crc32 from "crc/crc32";

import parse, {
  attributesToProps,
  HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";

interface Props {
  htmlString: string;
}
const options = {
  trim: true,
  replace: (in_domNode: DOMNode) => {
    if (in_domNode.type === "text") {
      const domNode: Text = in_domNode as Text;
      return domNode;
    } else if (in_domNode.type === "style") {
      return <></>;
    } else if (in_domNode.type === "script") {
      const domNode: Element = in_domNode as Element;
      const { attribs, children } = domNode;
      const convertedProps = attributesToProps(attribs);
      const Children: string | JSX.Element | JSX.Element[] | undefined =
        children && <>{domToReact(children, options)}</>;
      return (
        <Script
          {...(convertedProps as any)}
          id={`inline-script-id-${crc32(Children?.props?.children || "")}`}
          strategy="afterInteractive"
        >
          {`${Children?.props?.children || ""}`}
        </Script>
      );
    } else if (in_domNode.type === "tag" && (in_domNode as Element).name) {
      const domNode: Element = in_domNode as Element;
      const { attribs, children } = domNode;
      const convertedProps = attributesToProps(attribs);
      const Children: string | JSX.Element | JSX.Element[] | undefined =
        children && <>{domToReact(children, options)}</>;
      if (typeof convertedProps.children !== "undefined") {
        delete convertedProps.children;
      }
      if (domNode.name === "noscript") {
        return domNode;
      } else if (domNode.name === "a" && convertedProps.href) {
        return (
          <Link {...(convertedProps as any)} target="_blank">
            {Children}
          </Link>
        );
      } else if (domNode.name === "img") {
        // case "img":
        const src = convertedProps.src || "";
        if (!src) {
          return null;
        }
        const width = parseInt(convertedProps.width || "1") || 1;
        delete convertedProps.width;
        const height = parseInt(convertedProps.height || "1") || 1;
        delete convertedProps.height;
        const alt = convertedProps.alt || "";
        return (
          <Image
            {...(convertedProps as any)}
            src={src}
            alt={alt}
            width={width}
            height={height}
            unoptimized
            loading="lazy"
          />
        );
      } else {
        const styleSX = convertedProps.style || undefined;
        if (typeof convertedProps.style !== "undefined") {
          delete (convertedProps as any).style;
        }
        return (
          <Box
            component={domNode.name}
            {...(convertedProps as any)}
            sx={{ ...styleSX }}
          >
            {Children}
          </Box>
        );
      }
    } else {
      return in_domNode;
    }
  },
};
export default memo<Props>(function MetrikaScriptsParser({
  htmlString,
}: Props) {
  if (htmlString) {
    return <>{parse(htmlString, options)}</>;
  } else {
    return null;
  }
});
