import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useArticleContext } from "../../ArticleForm";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { useFormikContext } from "formik";
import { useCallback, useState } from "react";
import { Blog } from "@common/types/cms";
import { CloseOutlined } from "@mui/icons-material";

export default function ResetButton() {
  const { resetArticle } = useArticleContext();
  let { dirty, values } = useFormikContext<Blog.ArticleDraft>();
  const [showModal, setShowModal] = useState(false);
  const closeModal = useCallback(() => setShowModal(false), []);
  dirty = Boolean(dirty && values.existingArticleId);
  return (
    <>
      <Button
        disabled={!dirty}
        sx={{
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
        <Dialog open={showModal} onClose={closeModal}>
          <DialogTitle sx={{ position: "relative", px: 6, py: 2 }}>
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                transform: "translate(-10%, 10%)",
              }}
              onClick={closeModal}
            >
              <CloseOutlined sx={{ fontSize: "28px" }} />
            </IconButton>
          </DialogTitle>
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
              sx={{
                background: "darkgrey",
                "&:hover": {
                  background: "grey",
                  boxShadow: "none",
                },
              }}
              onClick={closeModal}
            >
              Отмена
            </Button>
            <Button
              onClick={() => {
                resetArticle();
                closeModal();
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
