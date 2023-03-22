import { useField, useRefFormik } from "@components/ui";
import { TextField } from "@mui/material";
import useSaveArtDraftProps from "@framework/management/blog/article/draft/use-save-draft-props";
import { slugifyAbsUrl } from "@lib";

export const ArticleAbsoluteUrl = () => {
  const [field, meta] = useField<string>("absURL");
  const saveDraft = useSaveArtDraftProps();
  const onBlur = field.onBlur;
  const { setFieldValue } = useRefFormik();
  const setAbsUrl = (value: string) => setFieldValue("absURL", value);
  return (
    <>
      <TextField
        label="Полный путь страницы на сайте"
        sx={{ width: "100%", height: "71px" }}
        variant="filled"
        error={!!meta.error}
        helperText={meta.error}
        {...field}
        onBlur={(ev, ...rest) => {
          setAbsUrl(slugifyAbsUrl(ev.target.value));
          saveDraft({});
          return onBlur(ev, ...rest);
        }}
      ></TextField>
    </>
  );
};
export default ArticleAbsoluteUrl;
