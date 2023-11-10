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
import type { Element, DOMNode, Text } from "html-react-parser";
import { Highlight, themes } from "prism-react-renderer";

import parse, {
  attributesToProps,
  HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";
import TableStructure from "./TableStructure";
import MyHighlight from "./MyHighlight";
import { EnhImage } from "@components/ui";

interface Props {
  descriptionHTML: string;
}
const options = {
  trim: true,
  replace: (in_domNode: DOMNode) => {
    if (in_domNode.type === "text") {
      const domNode: Text = in_domNode as Text;
      if (typeof domNode.data === "string") {
        domNode.data = domNode.data.replace(/[\s]{2,}/gim, " ");
      }
      return domNode;
    } else if (in_domNode.type === "script" || in_domNode.type === "style") {
      const domNode: Element = in_domNode as Element;
      const { attribs, children } = domNode;
      const convertedProps = attributesToProps(attribs);
      const Children: string | JSX.Element | JSX.Element[] | undefined =
        children && <>{domToReact(children, options)}</>;
      delete convertedProps.children;
      const styleSX = convertedProps.style || undefined;
      if (typeof convertedProps.style !== "undefined") {
        delete (convertedProps as any).style;
      }
      return (
        <Box component="code" sx={{ ...styleSX }}>
          <pre>{Children}</pre>
        </Box>
      );
    } else if (in_domNode.type === "tag" && (in_domNode as Element).name) {
      const domNode: Element = in_domNode as Element;
      const { attribs, children } = domNode;
      if (
        domNode.name === "pre" &&
        attribs.class &&
        attribs.class.startsWith("language-")
      ) {
        const language = attribs.class.substring("language-".length);
        const codeChild: any = children && children[0];
        const textContent =
          codeChild &&
          codeChild.children &&
          codeChild.children[0] &&
          codeChild.children[0].data;
        if (language && textContent) {
          return <MyHighlight language={language} code={textContent} />;
        }
      }
      const className = attribs["class"] || "";
      if (
        className === "data-image-container" ||
        attribs["data-image-container"]
      ) {
        const convertedProps = attributesToProps(attribs);
        const Children: string | JSX.Element | JSX.Element[] | undefined =
          children && <>{domToReact(children, options)}</>;
        delete convertedProps.children;
        const styleSX = convertedProps.style || undefined;
        if (typeof convertedProps.style !== "undefined") {
          delete (convertedProps as any).style;
        }
        delete styleSX?.width;
        delete convertedProps.width;
        return (
          <Box
            className={"data-image-container"}
            {...(convertedProps as any)}
            width="100%"
            sx={{ ...styleSX }}
          >
            {Children}
          </Box>
        );
      } else if (
        className === "data-image-title" ||
        attribs["data-image-title"]
      ) {
        const convertedProps = attributesToProps(attribs);
        const Children: string | JSX.Element | JSX.Element[] | undefined =
          children && <>{domToReact(children, options)}</>;
        delete convertedProps.children;
        const styleSX = convertedProps.style || undefined;
        if (typeof convertedProps.style !== "undefined") {
          delete (convertedProps as any).style;
        }
        return (
          <Box
            className={"data-image-title"}
            {...(convertedProps as any)}
            sx={{ ...styleSX }}
          >
            {Children}
          </Box>
        );
      }
      const hasStyle = !!attribs.style;
      let passThroughFlag = false;
      switch (domNode.name) {
        case "table":
          return (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 0, sm: 1 },
                m: 0,
                marginBottom: "2rem",
                boxShadow: "none",
                border: `2px solid #EBEBEA`,
              }}
            >
              <TableStructure tableNode={domNode} options={options} />
            </Paper>
          );
          break;
        case "p":
        case "br":
        case "span":
        case "strong":
        case "b":
        case "i":
        case "svg":
        case "pre":
        case "code":
        case "sub":
        case "sup":
          if (!hasStyle) {
            return domNode;
          } else {
            passThroughFlag = true;
          }
          break;
        default:
          break;
      }
      const convertedProps = attributesToProps(attribs);
      const Children: string | JSX.Element | JSX.Element[] | undefined =
        children && <>{domToReact(children, options)}</>;
      delete convertedProps.children;
      const styleSX = convertedProps.style || undefined;
      if (typeof convertedProps.style !== "undefined") {
        delete (convertedProps as any).style;
      }
      // if (
      //   styleSX &&
      //   typeof styleSX.width === "string" &&
      //   styleSX.width.endsWith("%")
      // ) {
      //   let roundedWidth = parseInt(styleSX.width);
      //   if (roundedWidth > 100) {
      //     roundedWidth = 100;
      //   }
      //   styleSX.width = roundedWidth + "%";
      // }
      if (passThroughFlag && hasStyle) {
        if (domNode.name === "p") {
          return (
            <Typography component={"p"} {...convertedProps} sx={{ ...styleSX }}>
              {Children}
            </Typography>
          );
        } else {
          return (
            <Box
              {...convertedProps}
              component={domNode.name as any}
              sx={{ ...styleSX }}
            >
              {Children}
            </Box>
          );
        }
      }
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
      switch (domNode.name) {
        case "typography":
          if (typeof convertedProps.gutterBottom === "string") {
            convertedProps.gutterBottom = true as any;
          }
          return (
            <Typography {...(convertedProps as any)} sx={{ ...styleSX }}>
              {Children}
            </Typography>
          );
          break;
        case "paper":
          return (
            <Paper
              {...(convertedProps as any)}
              component="div"
              sx={{ ...styleSX }}
            >
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
              sx={{ ...styleSX }}
            >
              {Children}
            </Typography>
          );
          break;
        case "ul":
          return (
            <Paper component="div">
              {hasStyle ? (
                <Box
                  {...(convertedProps as any)}
                  component={"ul"}
                  sx={{ ...styleSX }}
                >
                  {Children}
                </Box>
              ) : (
                <ul {...(convertedProps as any)}>{Children}</ul>
              )}
            </Paper>
          );
          break;
        case "ol":
          return (
            <Paper
              elevation={0}
              sx={{
                px: 2,
                py: 1.2,
                mt: 0,
                mb: 2,
                background: (theme) => theme.palette.secondaryBackground.main,
              }}
            >
              <Box
                {...(convertedProps as any)}
                component={"ol"}
                sx={{ ...styleSX }}
              >
                {Children}
              </Box>
            </Paper>
          );
          break;
        case "li":
          if (hasStyle) {
            return (
              <Box
                component={"li"}
                {...(convertedProps as any)}
                sx={{ ...styleSX }}
              >
                {Children}
              </Box>
            );
          } else {
            return <li {...(convertedProps as any)}>{Children}</li>;
          }
          break;
        case "a":
        case "link":
          if (hasStyle) {
            <Box component="span" sx={{ ...styleSX }}>
              <Link {...(convertedProps as any)}>{Children}</Link>
            </Box>;
          } else {
            return <Link {...(convertedProps as any)}>{Children}</Link>;
          }
          break;
        case "img":
        case "image":
          const width = parseInt(
            convertedProps["data-original-width"] || convertedProps.width || "0"
          );
          const height = parseInt(
            convertedProps["data-original-height"] ||
              convertedProps.height ||
              "0"
          );
          const src = (convertedProps.src || "").replace(
            /^(\.\.(\/)+)+/gim,
            "/"
          );
          if (!src) {
            return <></>;
          }
          delete styleSX?.width;
          delete convertedProps.width;
          const title = convertedProps.title || "";
          const alt = convertedProps.alt || "";
          return (
            <>
              <EnhImage
                src={src}
                alt={alt}
                title={title}
                width={width}
                height={height}
                fitWidth={1152}
                quality={90}
              />
              <>{Children}</>
            </>
          );
          break;
        case "div":
          if (styleSX) {
            return (
              <Box {...(convertedProps as any)} sx={{ ...styleSX }}>
                {Children}
              </Box>
            );
          } else {
            return <div {...(convertedProps as any)}>{Children}</div>;
          }
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
            <Grid container spacing={1} sx={{ ...styleSX }}>
              {Children}
            </Grid>
          );
          break;
        case "td":
          return (
            <Grid item xs={12} sm={6} sx={{ ...styleSX }}>
              {Children}
            </Grid>
          );
          break;
        case "th":
          return (
            <Grid item xs={12} sm={6} sx={{ ...styleSX }}>
              {Children}
            </Grid>
          );
          break;
        case "caption":
          return (
            <Typography component="h5" sx={{ p: 0, m: 0, pl: 1, ...styleSX }}>
              {Children}
            </Typography>
          );
          break;
        case "frame":
        case "iframe":
          return <></>;
          break;
        case "script":
        case "style":
          return (
            <Box component="code" sx={{ ...styleSX }}>
              <pre>{Children}</pre>
            </Box>
          );
          break;
        case "form":
        case "input":
        case "textarea":
          if (hasStyle) {
            return (
              <Box component="code" sx={{ ...styleSX }}>
                <div>{`<${domNode.name}>`}</div>
                <div>
                  <pre>{Children}</pre>
                </div>
                <div>{`</${domNode.name}>`}</div>
              </Box>
            );
          } else {
            return (
              <code>
                <div>{`<${domNode.name}>`}</div>
                <pre>{Children}</pre>
                <div>{`</${domNode.name}>`}</div>
              </code>
            );
          }
          break;
        default:
          return (
            <Box component="section" sx={{ ...styleSX }}>
              <div>{`<${domNode.name}>`}</div>
              <pre>{Children}</pre>
              <div>{`</${domNode.name}>`}</div>
            </Box>
          );
      }
      return (
        <Box component="section" sx={{ ...styleSX }}>
          <div>{`<${domNode.name}>`}</div>
          <pre>{Children}</pre>
          <div>{`</${domNode.name}>`}</div>
        </Box>
      );
    } else {
      return in_domNode;
    }
  },
};
export default memo<Props>(function HtmlDescriptionParser({
  descriptionHTML,
}: Props) {
  return <>{parse(descriptionHTML, options)}</>;
});
