import { Button } from "@mui/material";
import { useArticleContext } from "../../ArticleForm";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";

export default function OpenCodemirrorButton() {
  const { emitter, eventNames } = useArticleContext();
  return (
    <Button
      sx={{}}
      startIcon={<CodeRoundedIcon />}
      onClick={() => emitter.emit(eventNames.openCodeMirror)}
    >
      Код
    </Button>
  );
}
