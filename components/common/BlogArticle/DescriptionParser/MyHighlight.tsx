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
      theme={theme || themes.vsDark}
      code={code}
      language={language}
      {...rest}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <Stack
            width="100%"
            direction="row"
            spacing={"3px"}
            className={className}
            sx={{
              position: "relative",
              clear: "both",
              borderRadius: "10px",
              pl: "5px",
              py: 2,
              pt: 3,
              "&, & pre": {
                fontFamily: "monospace",
                fontSize: "15px",
                lineHeight: "18px",
                overflowX: "auto",
              },
              "& pre": {
                p: 0,
                m: 0,
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
                color: codeHasBeenCopied ? blueGrey[50] : grey[100],
                fontWeight: 400,
                textTransform: "none",
                "&:hover": {
                  background: "none",
                  color: codeHasBeenCopied ? blueGrey[50] : "white",
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
            <Box sx={{ minWidth: "21px" }}>
              {tokens.map((line, i) => {
                return (
                  <React.Fragment key={i}>
                    {i + 1}
                    <br />
                  </React.Fragment>
                );
              })}
            </Box>
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
                      return (
                        <Box
                          component="span"
                          key={key}
                          {...restProps}
                          sx={{ ...style }}
                        />
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
          </Stack>
        );
      }}
    </Highlight>
  );
}
