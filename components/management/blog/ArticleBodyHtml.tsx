import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRefFormik } from "@components/ui";
import { CMS } from "@common/types";
import useSaveArticleText from "@framework/management/blog/article/draft/use-save-article-text";
import { useField } from "formik";
import { useArticleContext } from "./ArticleForm";
import { useRouter } from "next/router";
import { BodyEditor } from "./Article/BodyEditor";
import { useTabs } from "@components/common/Tabs/TabsProvider";
import { useWindowDimensions } from "@lib/hooks";

export default function ArticleBodyHtml() {
  const form = useRefFormik<CMS.Blog.ArticleDraft>();
  const saveDraftText = useSaveArticleText();
  const [timeoutId, setTimeoutId] = React.useState<number | null>(null);
  const doTimeout = () => {
    if (!timeoutId) {
      const timeoutId = window.setTimeout(async () => {
        try {
          await saveDraftText({});
        } catch (e: any) {
          console.error("do-Timeout:", e.stack || e.message || e);
        } finally {
          setTimeoutId(null);
        }
      }, 13000);
      setTimeoutId(timeoutId);
    }
  };
  const mutRef = React.useRef({ form, doTimeout, timeoutId, saveDraftText });
  mutRef.current = {
    ...mutRef.current,
    form,
    doTimeout,
    timeoutId,
    saveDraftText,
  };
  React.useEffect(() => {
    const { timeoutId } = mutRef.current;
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);
  // const onBlur = React.useCallback(() => {
  //   const { form, doTimeout } = mutRef.current;
  //   do//Timeout();
  // }, []);
  const onEditorChange = React.useCallback((textHtml: string, text: string) => {
    const { form, doTimeout } = mutRef.current;
    form.setFieldValue("textHtml", textHtml);
    form.setFieldValue("text", text);
    doTimeout();
  }, []);
  const [, meta] = useField("textHtml");
  const { savedArticle, emitter, eventNames } = useArticleContext();
  const { value, handleChange, setTabNumber } = useTabs();
  const boxRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(200);
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  useEffect(() => {
    if (
      windowWidth &&
      windowHeight &&
      typeof value !== "undefined" &&
      typeof window !== "undefined"
    ) {
      const viewportHeight = windowHeight || 0;
      const offset = boxRef.current?.offsetTop || 0;
      const tempVarHeight = viewportHeight - offset;
      const tinyMceEditorHeight = tempVarHeight >= 400 ? tempVarHeight : 400;
      if (tinyMceEditorHeight !== height) {
        setHeight(tinyMceEditorHeight);
      }
    }
  }, [value, height, windowWidth, windowHeight]);
  return (
    <>
      {meta.error && (
        <Paper
          sx={{
            my: 1,
            mx: 0.5,
            px: 1.5,
            color: "#d80000",
            fontWeight: 600,
            fontSize: "14pt",
          }}
        >
          * {meta.error}
        </Paper>
      )}
      <Box
        ref={boxRef}
        sx={{
          border: "none",
          width: "100%",
          "& > textarea": {
            display: "none",
          },
          "&, & > *, & .tox.tox-tinymce": {
            borderRadius: "0 0 8px 8px",
            background: "white",
            height: height + "px",
            minHeight: "400px",
          },
        }}
      >
        <BodyEditor
          initialValue={savedArticle.textHtml}
          onEditorChange={onEditorChange}
          emitter={emitter}
          setContentEventName={eventNames.ARTICLE_TEXTHTML_SET_CONTENT}
          openCodeMirrorEventName={eventNames.openCodeMirror}
        />
      </Box>
    </>
  );
}
