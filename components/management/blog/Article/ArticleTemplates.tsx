import { Dialog, useField, useRefFormik } from "@components/ui";
import { TextField } from "@mui/material";
import useSaveArtDraftProps from "@framework/management/blog/article/draft/use-save-draft-props";
import useCheckArticle from "@framework/management/blog/article/draft/use-check-article";
import * as React from "react";
import { Blog } from "@common/types/cms";
import { useRouter } from "next/router";
import { CMS } from "@common/types";
import useTemplateList from "@framework/management/blog/article/use-template-list";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import {
  FormControl,
  FormHelperText,
  NativeSelect,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ID } from "@framework/types";

export const ArticleTitle = () => {
  const [{ value: __receivedValue, ...field }, meta] =
    useField<ID>("templateId");
  const receivedValue = __receivedValue || "1";
  const { data: list } = useTemplateList({
    swrOptions: {
      fallbackData: [
        { templateId: receivedValue, templateName: "Шаблон", lastUsed: 0 },
      ],
    },
  });
  const fieldValue = receivedValue;
  return (
    <FormControl fullWidth error={Boolean(meta.error)}>
      <InputLabel
        error={Boolean(meta.error)}
        shrink
        htmlFor="article-templates-select"
        id="article-templates-select-label"
        required
      >
        Шаблон страницы
      </InputLabel>
      <Select
        labelId="article-templates-select-label"
        label="Шаблон страницы"
        id="article-templates-select"
        sx={{ background: (theme) => theme.palette.background.paper }}
        {...field}
        required
        value={fieldValue}
        error={Boolean(meta.error)}
        variant="filled"
      >
        {list?.map((el) => (
          <MenuItem
            key={el.templateId}
            selected={el.templateId == fieldValue}
            value={el.templateId}
          >
            {el.templateName}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={Boolean(meta.error)}>{meta.error}</FormHelperText>
    </FormControl>
  );
};
export default ArticleTitle;
