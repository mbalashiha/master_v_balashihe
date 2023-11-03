import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { useArticleContext } from "../../ArticleForm";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { useFormikContext } from "formik";
import { useState } from "react";
import { Blog } from "@common/types/cms";

export default function ResetButton() {
  const { resetArticle } = useArticleContext();
  let { dirty, values } = useFormikContext<Blog.ArticleDraft>();
  const [showModal, setShowModal] = useState(false);
  dirty = Boolean(dirty && values.existingArticleId);
  return (
    <>
      <Button
        disabled={!dirty}
        sx={{
          background: (theme) => theme.palette.primary.dark,
          "&:hover": { background: "black" },
        }}
        startIcon={<RestartAltRoundedIcon />}
        onClick={() => {
          if (dirty) {
            setShowModal(true);
          }
        }}
      >
        Сбросить
      </Button>
      {dirty && (
        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogContentText sx={{ p: 6 }}>
            <h1>Сбросить форму?</h1>
          </DialogContentText>
          <DialogActions
            sx={{
              "& button": {
                borderRadius: 1,
                padding: "16px",
              },
            }}
          >
            <Button
              sx={{ background: "grey" }}
              onClick={() => setShowModal(true)}
            >
              Отмена
            </Button>
            <Button
              onClick={() => {
                resetArticle();
                setShowModal(false);
              }}
            >
              Сбросить
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
