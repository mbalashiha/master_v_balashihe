import { Button } from "@mui/material";
import { useArticleContext } from "../../ArticleForm";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";

export default function OpenCodemirrorButton() {
  const { emitter, eventNames } = useArticleContext();
  return (
    <Button
      sx={{
        background: (theme) => theme.palette.primary.dark,
        "&:hover": { background: "black" },
      }}
      startIcon={<CodeRoundedIcon />}
      onClick={() => emitter.emit(eventNames.openCodeMirror)}
    >
      Код
    </Button>
  );
}
