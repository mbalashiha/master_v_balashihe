import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React, { useRef } from "react";
import { useRefFormik } from "@components/ui";
import { CMS } from "@common/types";
import { useField } from "formik";
import { ShortTinyMCE } from "@components/management/TinyMCE";
import { useRouter } from "next/router";

export default function ArticleH2() {
  const [h2Field, meta] = useField("h2");
  return (
    <TextField
      variant="filled"
      label={"Подзаголовок H2"}
      placeholder={"Подзаголовок (необязательно, максимум 150 символов)"}
      maxRows={3}
      minRows={1}
      inputProps={{ maxLength: 150 }}
      multiline
      sx={{ width: "100%" }}
      {...h2Field}
      error={Boolean(meta.error)}
      helperText={meta.error}
    />
  );
}
