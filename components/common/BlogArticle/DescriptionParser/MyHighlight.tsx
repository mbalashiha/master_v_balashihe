import React, { useState, FC, memo, useMemo, useRef } from "react";
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
  Box,
  Stack,
  Button,
} from "@mui/material";
import cn from "classnames";
import { Highlight, themes } from "prism-react-renderer";
import { grey, blueGrey } from "@mui/material/colors";

interface Props
  extends Omit<React.ComponentProps<typeof Highlight>, "children"> {}

export default function MyHighlight({ language, code, theme, ...rest }: Props) {
  const [codeHasBeenCopied, setCodeCopied] = useState<boolean>(false);
  const codeCopiedTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const replacedLanguage = useMemo(() => {
    switch (language) {
      case "markup":
        return "html";
        break;
      default:
        return language;
    }
  }, [language]);
  return (
    <Highlight
      theme={theme || themes.okaidia}
      code={code}
      language={language}
      {...rest}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <Box
            component="code"
            width="100%"
            className={className}
            itemScope
            itemType="https://schema.org/Thing"
            sx={{
              ...style,
              display: "block",
              position: "relative",
              overflow: "hidden",
              clear: "both",
              borderRadius: "10px",
              my: "1px",
              pl: "3px",
              pt: "2px",
              pb: "10px",
              fontFamily: `Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace`,
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "25px",
              "& pre": {
                maxHeight: "70vh",
                overflowX: "auto",
                overflowY: "auto",
                padding: 0,
                margin: 0,
                fontFamily: `Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace`,
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "25px",
                textShadow: "0 1px rgba(0,0,0,.3)",
                wordSpacing: "normal",
                wordWrap: "normal",
                tabSize: 4,
                hyphens: "none",
                textWrap: "wrap",
                whiteSpaceCollapse: "preserve",
                boxSizing: "border-box",
                counterReset: "line",
                wordBreak: "break-all",
                whiteSpace: "pre-wrap",
                "& .token.attr-value": {
                  color: "#e6db74",
                  wordBreak: "break-all",
                  whiteSpace: "pre-wrap",
                },
                "& > .token-line": {
                  "&:before": {
                    counterIncrement: "line",
                    minWidth: "35px",
                    content: "counter(line)",
                    display: "inline-block",
                    borderRight: "1px solid #88888822",
                    textAlign: "right",
                    padding: "0 .5em 0 .5em",
                    marginRight: ".5em",
                    color: "#888",
                  },
                },
              },
            }}
          >
            <Stack
              component={"menu"}
              width="100%"
              flexDirection={"row"}
              sx={{
                ...style,
                alignItems: "flex-center",
                px: "14px",
                py: 0,
                m: 0,
                "&&": {
                  "& > *": {
                    p: "3px",
                    pb: 0,
                    fontSize: "14px",
                    lineHeight: "16px",
                    fontFamily: `var(--text-font-family)`,
                  },
                  "& .copyButton": {
                    justifySelf: "flex-end",
                    pr: "10px",
                    border: "none",
                    borderRadius: "3px",
                    background: "none",
                    textTransform: "none",
                    fontFamily: `var(--text-font-family)`,
                    fontWeight: 400,
                    "&:hover": {
                      background: "none",
                      boxShadow: "none",
                      color: "#EDEDE8",
                    },
                    "&::before": {
                      fontFamily: "Material Icons Round",
                      fontStyle: "normal",
                      paddingLeft: 0,
                      paddingRight: "5px",
                      paddingTop: 0,
                      fontSize: "16px",
                      lineHeight: "16px",
                      content: `"\\e14d"`,
                    },
                    color: "#cecece",
                  },
                  "& .copyButton.codeHasBeenCopied": {
                    "&:hover": {
                      color: "lightgreen",
                    },
                    "&::before": {
                      content: `"\\e876"`,
                      color: "lightgreen",
                    },
                    color: "lightgreen",
                  },
                },
              }}
            >
              <Box
                sx={{ flexGrow: 1, textTransform: "uppercase", color: "#888" }}
              >
                <meta
                  itemProp="name"
                  content={`computer code ${replacedLanguage} ${className}`}
                />
                {replacedLanguage}
              </Box>
              <Button
                className={cn("copyButton", {
                  codeHasBeenCopied: codeHasBeenCopied,
                })}
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  setCodeCopied(true);
                  if (codeCopiedTimeoutId.current) {
                    clearTimeout(codeCopiedTimeoutId.current);
                  }
                  codeCopiedTimeoutId.current = setTimeout(
                    () => setCodeCopied(false),
                    2500
                  );
                }}
              >
                {codeHasBeenCopied ? "Код скопирован" : "Скопировать"}
              </Button>
            </Stack>
            <Box
              itemProp="description"
              component={"pre"}
              className={className}
              sx={{ ...style }}
            >
              {tokens.map((line, i) => {
                const { style, ...restProps } = getLineProps({
                  line,
                });
                return (
                  <Box component="div" key={i} sx={{ ...style }} {...restProps}>
                    {line.map((token, key) => {
                      const { style, ...restProps } = getTokenProps({
                        token,
                      });
                      if (style && style.color === "#f92672") {
                        // style.fontSize = "16.5px";
                        // style.fontWeight = 600;
                        style.color = "#ffa17b";
                      }
                      return (
                        <Box
                          component="span"
                          key={key}
                          sx={{
                            ...style,
                          }}
                          {...restProps}
                        />
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      }}
    </Highlight>
  );
}
