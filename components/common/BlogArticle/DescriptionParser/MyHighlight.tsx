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
            width="100%"
            className={className}
            sx={{
              position: "relative",
              clear: "both",
              borderRadius: "10px",
              my: "1px",
              pl: "3px",
              pt: "24px",
              pb: "10px",
              fontFamily: `Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace`,
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "25px",
              "& pre": {
                padding: 0,
                margin: 0,
                fontFamily: `Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace`,
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "25px",
                overflowX: "auto",
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
                    borderRight: "1px solid #ddd",
                    textAlign: "right",
                    padding: "0 .5em 0 .5em",
                    marginRight: ".5em",
                    color: "#888",
                  },
                },
              },
              ...style,
            }}
          >
            <Button
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
                p: "3px",
                pr: "10px",
                border: "none",
                borderRadius: "3px",
                background: "none",
                color: codeHasBeenCopied ? blueGrey[50] : "#EDEDE8",
                textTransform: "none",
                fontFamily: `Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace`,
                fontWeight: 500,
                fontSize: "18px",
                "&:hover": {
                  background: "none",
                  color: codeHasBeenCopied ? blueGrey[50] : "white",
                  boxShadow: "none",
                },
                "&::before": {
                  fontFamily: "Material Icons Round",
                  fontStyle: "normal",
                  content: codeHasBeenCopied ? `"\\e876"` : `"\\e14d"`,
                  paddingLeft: 0,
                  paddingRight: "5px",
                  paddingTop: 0,
                  fontSize: "18px",
                  lineHeight: "18px",
                },
              }}
              onClick={() => {
                navigator.clipboard.writeText(code);
                setCodeCopied(true);
                setTimeout(() => setCodeCopied(false), 1500);
              }}
            >
              {codeHasBeenCopied ? "Код скопирован" : "Скопировать"}
            </Button>
            <Box component={"pre"} className={className} sx={{ ...style }}>
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
