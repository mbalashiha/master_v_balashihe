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
      const hasStyle = !!attribs.style;
      let passThroughFlag = false;
      switch (domNode.name) {
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
      if (
        styleSX &&
        typeof styleSX.width === "string" &&
        styleSX.width.endsWith("%")
      ) {
        let roundedWidth = parseInt(styleSX.width);
        if (roundedWidth > 100) {
          roundedWidth = 100;
        }
        styleSX.width = roundedWidth + "%";
        console.log(styleSX);
      }
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
              component={domNode.name}
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
                  component={"ul"}
                  {...(convertedProps as any)}
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
        case "ol":
          return (
            <Paper component="div">
              {hasStyle ? (
                <Box
                  component={"ol"}
                  {...(convertedProps as any)}
                  sx={{ ...styleSX }}
                >
                  {Children}
                </Box>
              ) : (
                <ol {...(convertedProps as any)}>{Children}</ol>
              )}
            </Paper>
          );
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
          }
          break;
        case "table":
          if (styleSX && styleSX.height) {
            delete styleSX.height;
          }
          return (
            <Paper
              sx={{
                p: 1,
                m: 0,
                "&&": { marginBottom: "1.3rem" },
                ...styleSX,
              }}
            >
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
        case "frame":
        case "iframe":
          return <></>;
          break;
        case "script":
        case "style":
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
    } else if (domNode && domNode.type === "text" && domNode.data) {
      domNode.data = domNode.data.replace(/[\s]{2,}/gim, " ");
      return domNode;
    }
    return domNode;
  },
};
export default memo<Props>(function HtmlDescriptionParser({
  descriptionHTML,
}: Props) {
  return <>{parse(descriptionHTML, options)}</>;
});
