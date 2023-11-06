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

export default function ArticleSeoDescription() {
  const [descriptionFieled, meta] = useField("description");
  return (
    <TextField
      variant="filled"
      label={"Описание (150 символов)"}
      placeholder={"Описание (150 символов)"}
      maxRows={3}
      minRows={1}
      inputProps={{ maxLength: 150 }}
      multiline
      sx={{ width: "100%" }}
      {...descriptionFieled}
    />
  );
}
