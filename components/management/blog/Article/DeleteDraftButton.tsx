import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {
  ConfirmDialog,
  RefFormik,
  SubmitButton,
  useRefFormik,
} from "@components/ui";
import useArticleDraft from "@framework/management/blog/article/draft/use-article-draft";
import useDeleteDraft from "@framework/management/blog/article/draft/use-delete-draft";
import React, { useRef, useEffect, useMemo } from "react";

const DeleteDraftButton = () => {    
  const { data } = useArticleDraft();
  const deleteDraft = useDeleteDraft();
  return <>{
    data && data.id && (
      <ConfirmDialog message="Очистить черновик?">
        <Button
          sx={{ background: "black" }}
          onClick={() => {
            if (data.id) {
              deleteDraft({ id: data.id });
            }
          }}
        >
          Удалить черновик
        </Button>
      </ConfirmDialog>
    )
  }</>
};
export default DeleteDraftButton;
