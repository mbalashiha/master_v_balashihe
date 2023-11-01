import { Button } from "@mui/material";
import { useArticleContext } from "../../ArticleForm";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";

export default function OpenCodemirrorButton() {
  const { emitter } = useArticleContext();
  return (
    <Button
      sx={{
        background: (theme) => theme.palette.primary.dark,
        "&:hover": { background: "black" },
      }}
      startIcon={<CodeRoundedIcon />}
      onClick={() => emitter.emit("textHtml-codemirror-editor-open")}
    >
      Код
    </Button>
  );
}
