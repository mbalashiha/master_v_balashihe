import { useField } from "@components/ui";
import { TextField } from "@mui/material";
import useSaveArtDraftProps from "@framework/management/blog/article/draft/use-save-draft-props";

export const ArticleTitle = () => {
  const [field, meta] = useField<string>("title");
  const saveDraft = useSaveArtDraftProps();
  const onBlur = field.onBlur;
  return (
    <>
      <TextField
        label="Заголовок статьи"
        required
        sx={{ width: "100%" }}
        variant="filled"
        {...field}
        onBlur={(ev, ...rest) => {
          saveDraft({});
          return onBlur(ev, ...rest);
        }}
      ></TextField>
    </>
  );
};
export default ArticleTitle;
