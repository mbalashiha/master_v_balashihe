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
import { grey } from "@mui/material/colors";

const DeleteDraftButton = () => {
  const { data } = useArticleDraft({ variables: undefined });
  const deleteDraft = useDeleteDraft();
  const disabled = !(data && data.id);
  return (
    <>
      <ConfirmDialog
        disabled={disabled}
        message="Очистить черновик?"
        onConfirm={() => {
          if (data && data.id) {
            deleteDraft({ id: data.id });
          }
        }}
      >
        <Button
          sx={{
            "&&": {
              background: disabled ? grey[300] : "black",
              color: disabled ? grey[200] : "white",
            },
          }}
          disabled={disabled}
        >
          Удалить черновик
        </Button>
      </ConfirmDialog>
    </>
  );
};
export default DeleteDraftButton;
