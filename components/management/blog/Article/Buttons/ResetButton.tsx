import { Button } from "@mui/material";
import { useArticleContext } from "../../ArticleForm";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import { useFormikContext } from "formik";

export default function ResetButton() {
  const { resetArticle } = useArticleContext();
  const { dirty } = useFormikContext();
  if (dirty) {
    return (
      <Button
        sx={{
          background: (theme) => theme.palette.primary.dark,
          "&:hover": { background: "black" },
        }}
        startIcon={<CodeRoundedIcon />}
        onClick={() => resetArticle()}
      >
        Сбросить
      </Button>
    );
  } else {
    return <></>;
  }
}
